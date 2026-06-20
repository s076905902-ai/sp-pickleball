/**
 * SP Pickleball — 全站資料庫盤點報告
 * 執行：npx tsx prisma/audit-report.ts
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("\n════════════════════════════════════════════════");
  console.log("  SP Pickleball — 全站資料庫盤點報告");
  console.log("════════════════════════════════════════════════\n");

  // ── 品牌 ─────────────────────────────────────────
  const brands = await prisma.brand.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });
  console.log(`【品牌】總計 ${brands.length} 個`);
  for (const b of brands) {
    const issues = [];
    if (!b.logo) issues.push("無logo");
    if (!b.description) issues.push("無描述");
    if (!b.coverImage) issues.push("無封面");
    console.log(`  ${b.isActive ? "✅" : "❌"} ${b.name.padEnd(30)} 商品:${String(b._count.products).padStart(3)}  ${issues.length ? "⚠️ " + issues.join(", ") : "✓"}`);
  }

  // ── 分類 ─────────────────────────────────────────
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });
  console.log(`\n【分類】總計 ${categories.length} 個`);
  for (const c of categories) {
    console.log(`  ${c.isActive ? "✅" : "❌"} ${c.name.padEnd(25)} slug:${c.slug.padEnd(20)} 商品:${String(c._count.products).padStart(3)}`);
  }

  // ── 商品 ─────────────────────────────────────────
  const products = await prisma.product.findMany({
    include: { brand: true, category: true },
    orderBy: { name: "asc" },
  });
  console.log(`\n【商品】總計 ${products.length} 個（PUBLISHED: ${products.filter(p => p.status === "PUBLISHED").length}）`);

  let noImage = 0, noPrice = 0, noWeight = 0, noSku = 0, noSuitableFor = 0;
  const problemProducts: string[] = [];

  for (const p of products) {
    const issues = [];
    if (!p.mainImage) { issues.push("無主圖"); noImage++; }
    if (!p.price || Number(p.price) === 0) { issues.push("無價格"); noPrice++; }
    if (!p.weight) { issues.push("無重量"); noWeight++; }
    if (!p.sku) { issues.push("無SKU"); noSku++; }
    if (!p.suitableFor || p.suitableFor.length === 0) { issues.push("無suitableFor"); noSuitableFor++; }
    if (issues.length > 0) {
      problemProducts.push(`  ⚠️  ${p.name.slice(0, 40).padEnd(40)} [${p.brand.name}]  →  ${issues.join(", ")}`);
    }
  }

  if (problemProducts.length > 0) {
    console.log(`\n  問題商品（${problemProducts.length} 個）：`);
    for (const pp of problemProducts) console.log(pp);
  } else {
    console.log("  ✅ 全部商品資料完整");
  }

  // ── SEO ──────────────────────────────────────────
  const seoMetas = await prisma.seoMeta.findMany();
  const productIds = products.map(p => p.id);
  const productsWithSeo = seoMetas.filter(s => productIds.includes(s.entityId)).length;
  console.log(`\n【SEO Meta】總計 ${seoMetas.length} 筆`);
  console.log(`  商品 SEO 覆蓋：${productsWithSeo}/${products.length} 個`);

  // ── GEO ──────────────────────────────────────────
  const geoContents = await prisma.geoContent.findMany();
  const productsWithGeo = geoContents.filter(g => productIds.includes(g.entityId)).length;
  const brandsWithGeo = geoContents.filter(g => brands.map(b => b.id).includes(g.entityId)).length;
  const catsWithGeo = geoContents.filter(g => categories.map(c => c.id).includes(g.entityId)).length;
  console.log(`\n【GEO Content】總計 ${geoContents.length} 筆`);
  console.log(`  商品 GEO：${productsWithGeo}/${products.length}`);
  console.log(`  品牌 GEO：${brandsWithGeo}/${brands.length}`);
  console.log(`  分類 GEO：${catsWithGeo}/${categories.length}`);

  // ── 文章 ─────────────────────────────────────────
  const articles = await prisma.article.findMany({ orderBy: { title: "asc" } });
  console.log(`\n【文章】總計 ${articles.length} 篇（PUBLISHED: ${articles.filter(a => a.status === "PUBLISHED").length}）`);
  for (const a of articles) {
    const issues = [];
    if (!a.coverImage) issues.push("無封面");
    if (!a.excerpt) issues.push("無摘要");
    console.log(`  ${a.status === "PUBLISHED" ? "✅" : "📝"} ${a.title.slice(0, 50).padEnd(50)}  ${issues.length ? "⚠️ " + issues.join(", ") : "✓"}`);
  }

  // ── FAQ ──────────────────────────────────────────
  const faqs = await prisma.fAQ.findMany({ where: { isActive: true } });
  console.log(`\n【FAQ】啟用中 ${faqs.length} 筆`);
  const faqCategories = [...new Set(faqs.map(f => f.category))];
  for (const cat of faqCategories) {
    console.log(`  ${cat}: ${faqs.filter(f => f.category === cat).length} 筆`);
  }

  // ── 訂單 ─────────────────────────────────────────
  const orders = await prisma.order.count();
  console.log(`\n【訂單】總計 ${orders} 筆`);

  // ── 總結摘要 ──────────────────────────────────────
  console.log("\n════════════════════════════════════════════════");
  console.log("  盤點摘要");
  console.log("════════════════════════════════════════════════");
  console.log(`品牌總數：        ${brands.length}`);
  console.log(`商品總數：        ${products.length}（上架：${products.filter(p => p.status === "PUBLISHED").length}）`);
  console.log(`文章總數：        ${articles.length}（發布：${articles.filter(a => a.status === "PUBLISHED").length}）`);
  console.log(`FAQ 總數：        ${faqs.length}`);
  console.log(`SEO Meta 筆數：   ${seoMetas.length}`);
  console.log(`GEO Content 筆數：${geoContents.length}`);
  console.log(`訂單總數：        ${orders}`);
  console.log("");
  console.log(`❗ 無主圖商品：   ${noImage}`);
  console.log(`❗ 無重量商品：   ${noWeight}`);
  console.log(`❗ 無SKU商品：    ${noSku}`);
  console.log(`❗ 無suitableFor：${noSuitableFor}`);
  console.log(`❗ 無SEO商品：    ${products.length - productsWithSeo}`);
  console.log(`❗ 無GEO商品：    ${products.length - productsWithGeo}`);
  console.log("════════════════════════════════════════════════\n");

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); prisma.$disconnect(); process.exit(1); });
