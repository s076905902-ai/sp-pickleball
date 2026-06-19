/**
 * fill-seo-geo.ts — 自動補齊缺少的 SEO Meta 與 GEO 資料
 * npx tsx prisma/fill-seo-geo.ts
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function buildSeoTitle(name: string, brandName?: string | null): string {
  const base = brandName ? `${name} — ${brandName}` : name;
  return `${base} | SP Pickleball 台灣`;
}

function buildSeoDescription(
  name: string,
  description: string,
  brandName?: string | null,
  categoryName?: string | null
): string {
  const descSnippet = description
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 100)
    .replace(/\s\S*$/, "");

  const brand = brandName ? `${brandName} ` : "";
  const cat = categoryName ?? "匹克球裝備";

  if (descSnippet.length > 30) {
    return `${brand}${name}。${descSnippet}... 台灣正品公司貨，SP Pickleball 專業${cat}選購。`;
  }
  return `購買 ${brand}${name}，台灣 SP Pickleball 專業${cat}代理商。正品保固，快速出貨，專業客服。`;
}

async function main() {
  console.log("=== 補齊 SEO Meta & GEO 資料 ===\n");

  const products = await prisma.product.findMany({
    include: {
      brand: { select: { name: true } },
      category: { select: { name: true } },
    },
    orderBy: { name: "asc" },
  });

  const existingSeo = await prisma.seoMeta.findMany({ select: { entityId: true } });
  const existingGeo = await prisma.geoContent.findMany({ select: { entityId: true } });
  const seoIds = new Set(existingSeo.map((s) => s.entityId));
  const geoIds = new Set(existingGeo.map((g) => g.entityId));

  let seoCreated = 0;
  let geoCreated = 0;

  for (const p of products) {
    const brandName = p.brand?.name ?? null;
    const categoryName = p.category?.name ?? null;
    const description = p.description ?? "";

    // ── SEO Meta ──────────────────────────────────────────
    if (!seoIds.has(p.id)) {
      const title = buildSeoTitle(p.name, brandName);
      const desc = buildSeoDescription(p.name, description, brandName, categoryName);
      await prisma.seoMeta.create({
        data: {
          entityType: "product",
          entityId: p.id,
          title,
          description: desc,
          ogTitle: title,
          ogDescription: desc,
          ogImage: p.mainImage ?? null,
          canonical: `/products/${p.slug}`,
          inSitemap: true,
          noIndex: false,
          noFollow: false,
        },
      });
      console.log(`✅ SEO: ${p.name}`);
      seoCreated++;
    }

    // ── GEO Content ───────────────────────────────────────
    if (!geoIds.has(p.id)) {
      const brand = brandName ?? "頂級品牌";
      const cat = categoryName ?? "匹克球裝備";
      await prisma.geoContent.create({
        data: {
          entityType: "product",
          entityId: p.id,
          aiSummary: `${p.name} 是由 ${brand} 推出的專業${cat}，適合台灣匹克球愛好者選購。SP Pickleball 為台灣授權代理商，提供原廠保固與專業售後服務。`,
          suitableFor: ["初學者", "中級球友", "進階選手"],
          pros: ["台灣正品公司貨", "原廠保固", "專業客服支援"],
          cons: [],
          notSuitableFor: [],
        },
      });
      console.log(`🌍 GEO: ${p.name}`);
      geoCreated++;
    }
  }

  console.log(`\n=== 完成 ===`);
  console.log(`SEO 新建: ${seoCreated}`);
  console.log(`GEO 新建: ${geoCreated}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
