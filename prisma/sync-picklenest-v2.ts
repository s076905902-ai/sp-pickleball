/**
 * sync-picklenest-v2.ts — 精確對照版
 * 每個 DB slug 對應到正確的 picklenest.tw Shopify handle
 * 執行方式:
 *   $env:DATABASE_URL="..."
 *   $env:BLOB_READ_WRITE_TOKEN="vercel_blob_rw_KTeAVo89Jvm3QCmB_wRtxNpD6H4ThHoi1x5yIQtuXalmQW2"
 *   npx tsx prisma/sync-picklenest-v2.ts
 */

import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

// ============================================================
// 精確對照表：DB slug → picklenest.tw Shopify handle
// ============================================================
const MAPPING: Record<string, string> = {
  // Selkirk 球拍
  "selkirk-omni":                   "selkirk-omni",
  "selkirk-labs-boomstik":          "selkirk-project-boomstik",
  "selkirk-labs-boomstik-raw-16":   "selkirk-labs-project-boomstik-raw-carbon",
  "selkirk-labs-007-invikta":       "selkirk-labs-project-007-invikta-10mm",
  "selkirk-slk-geo":                "selkirk-slk-geo",
  "selkirk-slk-valkyrie":           "selkirk-slk-valkyrie",
  "selkirk-slk-era-power":          "selkirk-slk-era-power",
  "selkirk-slk-dauntless":          "selkirk-slk-dauntless",
  "selkirk-slk-atlas-max-bundle":   "selkirk-slk-atlas-max-bundle",

  // Everyday Social 球拍
  "everyday-gran-class-pwr":        "everyday-social-gran-class-pwr-16mm",
  "everyday-gran-class-110":        "everyday-social-gran-class-110-r-16mm",
  "everyday-asama-18k-pwr":         "everyday-social%C2%AE-asama-18k-pwr",

  // ProKennex 球拍
  "prokennex-black-ace-avenger-lg-11": "prokennex-black-ace-avenger-lg",
  "prokennex-black-ace-avenger-11":    "prokennex-black-ace-avenger-11-11mm",
  "prokennex-black-ace-16":            "prokennex-black-ace-16mm",
  "prokennex-black-ace-lg-14":         "prokennex-black-ace-lg-14mm",
  "prokennex-black-ace-xf-14":         "prokennex-black-ace-xf-14mm",
  "prokennex-black-ace-14":            "prokennex-black-ace-14mm",

  // RPM 球拍
  "rpm-q2":                         "rpm-q2",
  "rpm-friction-pro-16-v2":         "rpm-friction-pro-16mm-elongated-v2",
  "rpm-friction-pro-14-v2-ryan-fu": "rpm-friction-pro-14mm-elongated-v2-ryan-fu-%E8%81%B7%E6%A5%AD%E7%B0%BD%E5%90%8D%E7%89%88%E9%80%B2%E6%94%BB%E7%90%83%E6%8B%8D-t700-%E5%8E%9F%E7%94%9F%E7%A2%B3%E7%BA%96%E7%B6%AD-%E6%A5%B5%E8%87%B4%E5%8B%95%E5%8A%9B-%E7%86%B1%E5%A3%93%E4%B8%80%E9%AB%94%E6%88%90%E5%9E%8B",
  "rpm-friction-pro-16-v1":         "rpm-friction-pro-16mm-%E5%8A%A0%E9%95%B7%E5%9E%8B%E6%A5%B5%E8%87%B4%E6%97%8B%E8%BD%89%E7%90%83%E6%8B%8D",

  // 球
  "selkirk-pro-s1-ball":            "selkirk-pro-s1-pickleball",
  "franklin-x40-ball":              "franklin-x-40",

  // 保護套 / 球拍周邊
  "rpm-paddle-cover":               "rpm-paddle-cover-%E5%B0%88%E6%A5%AD%E7%B4%9A%E6%B0%AF%E4%B8%81%E6%A9%A1%E8%86%A0%E7%90%83%E6%8B%8D%E4%BF%9D%E8%AD%B7%E5%A5%97-%E9%AB%98%E5%BC%B7%E5%BA%A6%E9%98%B2%E8%AD%B7-%E8%80%90%E7%A3%A8%E6%8A%97%E9%9C%87-%E5%85%A8%E5%9E%8B%E8%99%9F%E9%80%9A%E7%94%A8",
  "everyday-gran-class-gold-cover": "everyday-social%C2%AE-gran-class-gold",
  "reset-paddle-cleaning-kit":      "paddle-reset",
  "selkirk-premium-paddle-case":    "selkirk-premium-paddle-case",

  // 配件 — 握把布 / 球袋 / 帽子
  "everyday-classic-grip-tape":     "everyday-social%C2%AE-classic-grip-tape",
  "everyday-classic-crew-socks":    "everyday-social-classic-crew-socks",
  "everyday-competition-paddle-bag": "everyday-social%C2%AE-the-competition-paddle-bag-%E5%B0%88%E6%A5%AD%E7%AB%B6%E8%B3%BD%E7%B4%9A%E5%BE%8C%E8%83%8C%E6%97%85%E8%A1%8C%E7%90%83%E5%8C%85-%E9%9A%94%E7%86%B1%E7%90%83%E6%8B%8D%E5%80%89-%E7%8D%A8%E7%AB%8B%E9%9E%8B%E8%89%99-%E5%85%A9%E8%89%B2%E4%BB%BB%E9%81%B8",
  "selkirk-vanguard-geo-grip":      "selkirk-vanguard-geo-grip",
  "selkirk-sport-tacky-overgrip-3pk": "selkirk-sport-tacky-pickleball-overgrip-3-pack",
  "selkirk-comfort-grip":           "selkirk-comfort-grip",
  "rpm-pro-performance-overgrip-4pk": "rpm-pro-performance-overgrip",
  "selkirk-core-day-bag":           "selkirk-core-day-bag",
  "rpm-signature-hat":              "rpm-signature-hat-%E5%B0%88%E6%A5%AD%E9%81%8B%E5%8B%95%E6%A9%9F%E8%83%BD%E8%80%81%E5%B8%BD-%E7%B6%93%E5%85%B8%E7%B4%94%E9%BB%91%E9%99%90%E5%AE%9A%E7%89%88-%E5%90%B8%E6%BF%95%E6%8E%92%E6%B1%97-%E9%AB%98%E6%95%88%E9%80%8F%E6%B0%A3",

  // 以下在 picklenest 上沒有對應商品，跳過
  // "paddle-zip-cover"          → 無
  // "paddle-eraser"             → 無
  // "paddle-lead-tape-10pk"     → 無
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function fetchProductJson(handle: string) {
  const url = `https://picklenest.tw/products/${handle}.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`  ⚠ HTTP ${res.status} for handle: ${handle}`);
      return null;
    }
    const data = await res.json() as { product: any };
    return data.product;
  } catch (e) {
    console.log(`  ⚠ Fetch error for handle: ${handle}`, e);
    return null;
  }
}

async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

function getContentType(url: string): string {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase() ?? "jpg";
  if (ext === "png") return "image/png";
  if (ext === "gif") return "image/gif";
  if (ext === "webp") return "image/webp";
  return "image/jpeg";
}

async function uploadToBlob(buffer: Buffer, filename: string, contentType: string): Promise<string | null> {
  try {
    const blob = await put(`products/${filename}`, buffer, { access: "public", contentType });
    return blob.url;
  } catch (e) {
    console.error("  ❌ Blob upload error:", e);
    return null;
  }
}

async function main() {
  console.log("=== Sync Picklenest v2 (精確對照) ===\n");

  const dbProducts = await prisma.product.findMany({
    select: { id: true, slug: true, name: true },
  });

  let updated = 0;
  let skipped = 0;

  for (const dbProd of dbProducts) {
    const shopifyHandle = MAPPING[dbProd.slug];

    if (!shopifyHandle) {
      console.log(`⏭  Skip (no mapping): ${dbProd.slug}`);
      skipped++;
      continue;
    }

    console.log(`\n→ ${dbProd.slug}  →  ${shopifyHandle}`);

    const shopifyProd = await fetchProductJson(shopifyHandle);
    if (!shopifyProd) {
      console.log(`  ❌ Could not fetch product JSON`);
      skipped++;
      continue;
    }

    const rawImageUrl: string | null = shopifyProd.images?.[0]?.src ?? null;
    const imageUrl = rawImageUrl?.split("?")[0] ?? null;
    const description = shopifyProd.body_html ? stripHtml(shopifyProd.body_html) : null;

    let newImageUrl: string | null = null;

    if (imageUrl) {
      console.log(`  📥 Downloading: ${imageUrl}`);
      const buffer = await downloadImage(imageUrl);
      if (buffer) {
        const ext = imageUrl.split(".").pop()?.toLowerCase() ?? "jpg";
        const filename = `${dbProd.slug}-${Date.now()}.${ext}`;
        const contentType = getContentType(imageUrl);
        newImageUrl = await uploadToBlob(buffer, filename, contentType);
        if (newImageUrl) console.log(`  ☁  Uploaded: ${newImageUrl}`);
      }
    }

    await prisma.product.update({
      where: { id: dbProd.id },
      data: {
        ...(newImageUrl ? { mainImage: newImageUrl } : {}),
        ...(description ? { description } : {}),
      },
    });

    console.log(`  ✅ DB updated`);
    updated++;

    await new Promise((r) => setTimeout(r, 400));
  }

  console.log(`\n=== 完成 ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
