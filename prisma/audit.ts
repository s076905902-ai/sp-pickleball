/**
 * audit.ts — 全站資料健康檢查
 * npx tsx prisma/audit.ts
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("=== SP Pickleball 全站資料審核 ===\n");

  const products = await prisma.product.findMany({
    include: { brand: true, category: true },
    orderBy: { name: "asc" },
  });

  const seoMetas = await prisma.seoMeta.findMany();
  const geoData  = await prisma.geoContent.findMany();

  const seoByEntity  = new Map(seoMetas.map(s => [s.entityId, s]));
  const geoByEntity  = new Map(geoData.map(g => [g.entityId, g]));

  // ── 1. 圖片 ─────────────────────────────────────────────
  console.log("【圖片】");
  const noImg = products.filter(p => !p.mainImage);
  if (noImg.length === 0) {
    console.log("✅ 所有商品都有主圖\n");
  } else {
    console.log(`❌ 缺少主圖 (${noImg.length} 個):`);
    noImg.forEach(p => console.log(`   - ${p.name}  [${p.slug}]`));
    console.log();
  }

  // ── 2. 價格 ─────────────────────────────────────────────
  console.log("【價格】");
  const badPrice = products.filter(p => p.salePrice && Number(p.salePrice) >= Number(p.price));
  if (badPrice.length === 0) {
    console.log("✅ 所有商品價格正確（特價 < 原價）\n");
  } else {
    console.log(`❌ 價格異常（特價 ≥ 原價）(${badPrice.length} 個):`);
    badPrice.forEach(p => console.log(`   - ${p.name}  price=${p.price}  salePrice=${p.salePrice}`));
    console.log();
  }

  const zeroPrice = products.filter(p => Number(p.price) === 0);
  if (zeroPrice.length) {
    console.log(`⚠  售價為 0 的商品 (${zeroPrice.length} 個):`);
    zeroPrice.forEach(p => console.log(`   - ${p.name}`));
    console.log();
  }

  // ── 3. SEO Meta ─────────────────────────────────────────
  console.log("【SEO Meta】");
  const noSeo = products.filter(p => !seoByEntity.has(p.id));
  if (noSeo.length === 0) {
    console.log("✅ 所有商品都有 SEO Meta\n");
  } else {
    console.log(`❌ 缺少 SEO Meta (${noSeo.length} 個):`);
    noSeo.forEach(p => console.log(`   - ${p.name}  [${p.slug}]`));
    console.log();
  }

  // Check SEO completeness for existing ones
  const incompleteSeo = products.filter(p => {
    const s = seoByEntity.get(p.id);
    return s && (!s.title || !s.description);
  });
  if (incompleteSeo.length) {
    console.log(`⚠  SEO Meta 不完整（缺 title 或 description）(${incompleteSeo.length} 個):`);
    incompleteSeo.forEach(p => {
      const s = seoByEntity.get(p.id)!;
      console.log(`   - ${p.name}  title=${!!s.title}  desc=${!!s.description}`);
    });
    console.log();
  }

  // ── 4. GEO 優化 ─────────────────────────────────────────
  console.log("【GEO 優化】");
  const noGeo = products.filter(p => !geoByEntity.has(p.id));
  if (noGeo.length === 0) {
    console.log("✅ 所有商品都有 GEO 資料\n");
  } else {
    console.log(`❌ 缺少 GEO 資料 (${noGeo.length} 個):`);
    noGeo.forEach(p => console.log(`   - ${p.name}  [${p.slug}]`));
    console.log();
  }

  // ── 6. 描述 ─────────────────────────────────────────────
  console.log("【商品描述】");
  const noDesc = products.filter(p => !p.description || p.description.trim().length < 20);
  if (noDesc.length === 0) {
    console.log("✅ 所有商品都有描述\n");
  } else {
    console.log(`❌ 缺少或過短描述 (${noDesc.length} 個):`);
    noDesc.forEach(p => console.log(`   - ${p.name}  [${p.slug}]  len=${p.description?.length ?? 0}`));
    console.log();
  }

  // ── 7. 庫存狀態 ─────────────────────────────────────────
  console.log("【庫存 & 狀態】");
  const published = products.filter(p => p.status === "PUBLISHED");
  const draft     = products.filter(p => p.status === "DRAFT");
  const archived  = products.filter(p => p.status === "ARCHIVED");
  const outOfStock = products.filter(p => p.stock === 0 && p.status === "PUBLISHED");
  console.log(`   已上架: ${published.length}  草稿: ${draft.length}  下架: ${archived.length}`);
  if (outOfStock.length) {
    console.log(`⚠  已上架但庫存 0 (${outOfStock.length} 個):`);
    outOfStock.forEach(p => console.log(`   - ${p.name}`));
  }
  console.log();

  // ── 8. 總覽 ─────────────────────────────────────────────
  console.log("=== 總覽 ===");
  console.log(`商品總數: ${products.length}`);
  console.log(`有圖片:   ${products.length - noImg.length} / ${products.length}`);
  console.log(`有SEO:    ${products.length - noSeo.length} / ${products.length}`);
  console.log(`有GEO:    ${products.length - noGeo.length} / ${products.length}`);
  console.log(`有描述:   ${products.length - noDesc.length} / ${products.length}`);

  await prisma.$disconnect();
}

main().catch(console.error);
