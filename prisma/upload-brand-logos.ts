import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const BLOB_TOKEN = "vercel_blob_rw_KTeAVo89Jvm3QCmB_wRtxNpD6H4ThHoi1x5yIQtuXalmQW2";

const LOGOS: { slug: string; name: string; url: string; filename: string }[] = [
  {
    slug: "joola",
    name: "JOOLA",
    url: "https://cdn.shopify.com/s/files/1/0658/1809/0645/files/joola-logo.png",
    filename: "joola-logo.png",
  },
  {
    slug: "paddletek",
    name: "Paddletek",
    url: "https://paddletek.com/cdn/shop/files/Paddletek-Logo-White.png",
    filename: "paddletek-logo.png",
  },
];

// Fallback: use publicly available CDN images
const FALLBACK_LOGOS: { slug: string; name: string; url: string; filename: string }[] = [
  {
    slug: "joola",
    name: "JOOLA",
    url: "https://picklenest.tw/cdn/shop/files/joola-logo.png",
    filename: "joola-logo.png",
  },
  {
    slug: "paddletek",
    name: "Paddletek",
    url: "https://picklenest.tw/cdn/shop/files/paddletek-logo.png",
    filename: "paddletek-logo.png",
  },
];

async function uploadLogo(url: string, filename: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") ?? "image/png";
    if (!contentType.startsWith("image/")) return null;
    const buffer = await res.arrayBuffer();
    if (buffer.byteLength < 1000) return null; // too small, probably not an image

    const uploadRes = await fetch(
      `https://blob.vercel-storage.com/brands/${filename}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${BLOB_TOKEN}`,
          "x-content-type": contentType,
          "x-add-random-suffix": "1",
        },
        body: Buffer.from(buffer),
      }
    );
    if (!uploadRes.ok) return null;
    const data = (await uploadRes.json()) as { url: string };
    return data.url;
  } catch {
    return null;
  }
}

async function main() {
  // Try primary sources first, then fallbacks
  const allSources = [...LOGOS, ...FALLBACK_LOGOS];
  const processed = new Set<string>();

  for (const logo of allSources) {
    if (processed.has(logo.slug)) continue;

    console.log(`\n🔍 ${logo.name} ← ${logo.url}`);
    const blobUrl = await uploadLogo(logo.url, logo.filename);

    if (blobUrl) {
      await prisma.brand.updateMany({
        where: { slug: logo.slug },
        data: { logo: blobUrl },
      });
      console.log(`✅ ${logo.name} → ${blobUrl}`);
      processed.add(logo.slug);
    } else {
      console.log(`❌ 下載失敗: ${logo.url}`);
    }
  }

  // Report remaining missing
  const stillMissing = await prisma.brand.findMany({
    where: { logo: null },
    select: { name: true, slug: true },
  });
  if (stillMissing.length > 0) {
    console.log(`\n仍缺圖: ${stillMissing.map(b => b.name).join(", ")}`);
  } else {
    console.log("\n✅ 所有品牌都有 logo 了！");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
