/**
 * sync-picklenest.ts
 * 從 picklenest.tw Shopify API 抓取商品圖片與描述，
 * 上傳圖片到 Vercel Blob，並更新資料庫。
 *
 * 執行方式:
 *   $env:DATABASE_URL="..."
 *   $env:BLOB_READ_WRITE_TOKEN="vercel_blob_rw_KTeAVo89Jvm3QCmB_wRtxNpD6H4ThHoi1x5yIQtuXalmQW2"
 *   npx tsx prisma/sync-picklenest.ts
 */

import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

interface ShopifyImage {
  src: string;
}
interface ShopifyProduct {
  handle: string;
  title: string;
  body_html: string;
  images: ShopifyImage[];
  variants: { price: string }[];
}

// Strip HTML tags
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/\n\n+/g, "\n").trim();
}

// Clean image URL (remove Shopify query params for cleaner filename)
function cleanImageUrl(url: string): string {
  return url.split("?")[0];
}

async function fetchShopifyProducts(): Promise<ShopifyProduct[]> {
  const all: ShopifyProduct[] = [];
  let page = 1;
  while (true) {
    const url = `https://picklenest.tw/products.json?limit=50&page=${page}`;
    console.log(`Fetching page ${page}: ${url}`);
    const res = await fetch(url);
    const data = await res.json() as { products: ShopifyProduct[] };
    if (!data.products || data.products.length === 0) break;
    all.push(...data.products);
    if (data.products.length < 50) break;
    page++;
  }
  return all;
}

async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    return Buffer.from(buf);
  } catch {
    return null;
  }
}

async function uploadToBlob(imageBuffer: Buffer, filename: string, contentType: string): Promise<string | null> {
  try {
    const blob = await put(`products/${filename}`, imageBuffer, {
      access: "public",
      contentType,
    });
    return blob.url;
  } catch (e) {
    console.error("  Blob upload error:", e);
    return null;
  }
}

function getContentType(url: string): string {
  const lower = url.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

async function main() {
  console.log("=== Sync Picklenest → SP Pickleball ===\n");

  // 1. Get all our DB products
  const dbProducts = await prisma.product.findMany({
    select: { id: true, slug: true, name: true, mainImage: true },
  });
  console.log(`DB products: ${dbProducts.length}`);

  // 2. Fetch Shopify products
  const shopifyProducts = await fetchShopifyProducts();
  console.log(`Shopify products fetched: ${shopifyProducts.length}\n`);

  // 3. Build a map: handle → shopify product
  const shopifyMap = new Map<string, ShopifyProduct>();
  for (const sp of shopifyProducts) {
    shopifyMap.set(sp.handle, sp);
  }

  // 4. For each DB product, try to match
  let updated = 0;
  let skipped = 0;
  let notFound = 0;

  for (const dbProd of dbProducts) {
    // Try exact slug match first, then partial match
    let match = shopifyMap.get(dbProd.slug);

    if (!match) {
      // Try finding by partial handle match
      for (const [handle, sp] of shopifyMap) {
        if (handle.includes(dbProd.slug) || dbProd.slug.includes(handle)) {
          match = sp;
          break;
        }
      }
    }

    if (!match) {
      // Try matching by first keyword of slug
      const keyword = dbProd.slug.split("-")[0];
      for (const [handle, sp] of shopifyMap) {
        if (handle.startsWith(keyword)) {
          match = sp;
          break;
        }
      }
    }

    if (!match) {
      console.log(`❌ No match: ${dbProd.slug}`);
      notFound++;
      continue;
    }

    console.log(`✓ Matched: ${dbProd.slug} → ${match.handle}`);

    // Get image URL
    const imageUrl = match.images?.[0]?.src;
    const cleanUrl = imageUrl ? cleanImageUrl(imageUrl) : null;

    // Get description
    const description = match.body_html ? stripHtml(match.body_html) : null;

    // Upload image if available and not already set
    let newImageUrl: string | null = dbProd.mainImage;

    if (cleanUrl && (!dbProd.mainImage || dbProd.mainImage.includes("broken") || !dbProd.mainImage.startsWith("http"))) {
      console.log(`  Downloading image: ${cleanUrl}`);
      const buffer = await downloadImage(cleanUrl);
      if (buffer) {
        const ext = cleanUrl.split(".").pop()?.toLowerCase() ?? "jpg";
        const filename = `${dbProd.slug}-${Date.now()}.${ext}`;
        const contentType = getContentType(cleanUrl);
        const blobUrl = await uploadToBlob(buffer, filename, contentType);
        if (blobUrl) {
          console.log(`  Uploaded: ${blobUrl}`);
          newImageUrl = blobUrl;
        }
      }
    } else if (cleanUrl && dbProd.mainImage) {
      // Already has image, but update to latest from picklenest
      console.log(`  Re-uploading image for: ${dbProd.slug}`);
      const buffer = await downloadImage(cleanUrl);
      if (buffer) {
        const ext = cleanUrl.split(".").pop()?.toLowerCase() ?? "jpg";
        const filename = `${dbProd.slug}-${Date.now()}.${ext}`;
        const contentType = getContentType(cleanUrl);
        const blobUrl = await uploadToBlob(buffer, filename, contentType);
        if (blobUrl) {
          console.log(`  Re-uploaded: ${blobUrl}`);
          newImageUrl = blobUrl;
        }
      }
    }

    // Update DB
    await prisma.product.update({
      where: { id: dbProd.id },
      data: {
        ...(newImageUrl ? { mainImage: newImageUrl } : {}),
        ...(description ? { description } : {}),
      },
    });

    updated++;
    console.log(`  ✅ Updated DB\n`);

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n=== Done ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Not found: ${notFound}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
