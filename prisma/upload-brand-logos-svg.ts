import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const BLOB_TOKEN = "vercel_blob_rw_KTeAVo89Jvm3QCmB_wRtxNpD6H4ThHoi1x5yIQtuXalmQW2";

// Simple brand wordmark SVGs
const SVG_LOGOS: { slug: string; name: string; svg: string; filename: string }[] = [
  {
    slug: "joola",
    name: "JOOLA",
    filename: "joola-wordmark.svg",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
  <rect width="200" height="80" fill="white"/>
  <text x="100" y="52" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="42" fill="#1a1a1a" text-anchor="middle" letter-spacing="2">JOOLA</text>
</svg>`,
  },
  {
    slug: "paddletek",
    name: "Paddletek",
    filename: "paddletek-wordmark.svg",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" width="280" height="80">
  <rect width="280" height="80" fill="white"/>
  <text x="140" y="52" font-family="Arial, sans-serif" font-weight="700" font-size="34" fill="#1a1a1a" text-anchor="middle" letter-spacing="1">Paddletek</text>
</svg>`,
  },
];

async function uploadSvg(svg: string, filename: string): Promise<string | null> {
  try {
    const buffer = Buffer.from(svg, "utf-8");
    const uploadRes = await fetch(
      `https://blob.vercel-storage.com/brands/${filename}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${BLOB_TOKEN}`,
          "x-content-type": "image/svg+xml",
          "x-add-random-suffix": "1",
        },
        body: buffer,
      }
    );
    if (!uploadRes.ok) {
      const text = await uploadRes.text();
      console.error(`Upload error: ${uploadRes.status} ${text}`);
      return null;
    }
    const data = (await uploadRes.json()) as { url: string };
    return data.url;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function main() {
  for (const logo of SVG_LOGOS) {
    console.log(`\n📤 上傳 ${logo.name} SVG logo...`);
    const blobUrl = await uploadSvg(logo.svg, logo.filename);

    if (blobUrl) {
      await prisma.brand.updateMany({
        where: { slug: logo.slug },
        data: { logo: blobUrl },
      });
      console.log(`✅ ${logo.name} → ${blobUrl}`);
    } else {
      console.log(`❌ 上傳失敗: ${logo.name}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
