/**
 * SP Pickleball — 修正缺失資料
 * 1. 列出所有缺 weight / suitableFor 的商品
 * 2. 依 slug 補齊已知資料
 * 執行：npx tsx prisma/fix-missing-data.ts
 */

import { PrismaClient, SuitableFor } from "@prisma/client";
const prisma = new PrismaClient();

// ── 已知補充資料（依 slug） ────────────────────────────────
// 格式：slug → { weight(g), suitableFor[] }
// 只需補尚未有資料的欄位
const PADDLE_DATA: Record<string, { weight?: number; suitableFor?: SuitableFor[] }> = {
  // Selkirk
  "selkirk-omni":                  { weight: 220, suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.DOUBLES] },
  "selkirk-labs-boomstik":         { weight: 215, suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.TENNIS_CONVERT] },
  "selkirk-labs-boomstik-raw-16":  { weight: 218, suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES] },
  "selkirk-labs-007-invikta":      { weight: 212, suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.TENNIS_CONVERT] },
  "selkirk-slk-geo":               { weight: 210, suitableFor: [SuitableFor.BEGINNER, SuitableFor.INTERMEDIATE, SuitableFor.DOUBLES] },
  "selkirk-slk-valkyrie":          { weight: 198, suitableFor: [SuitableFor.BEGINNER, SuitableFor.INTERMEDIATE, SuitableFor.FEMALE] },
  "selkirk-slk-era-power":         { weight: 215, suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.DOUBLES] },
  "selkirk-slk-dauntless":         { weight: 210, suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.DOUBLES] },
  "selkirk-slk-atlas-max-bundle":  { weight: 228, suitableFor: [SuitableFor.BEGINNER, SuitableFor.INTERMEDIATE, SuitableFor.DOUBLES] },
  // Everyday Social
  "everyday-gran-class-pwr":       { weight: 220, suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.DOUBLES] },
  "everyday-gran-class-110":       { weight: 215, suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED] },
  "everyday-asama-18k-pwr":        { weight: 218, suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.DOUBLES] },
  // ProKennex
  "prokennex-black-ace-avenger-lg-11": { weight: 208, suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.TENNIS_CONVERT] },
  "prokennex-black-ace-avenger-11":    { weight: 205, suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES] },
  "prokennex-black-ace-16":            { weight: 222, suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.DOUBLES] },
  "prokennex-black-ace-lg-14":         { weight: 218, suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.TENNIS_CONVERT] },
  "prokennex-black-ace-xf-14":         { weight: 215, suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES] },
  "prokennex-black-ace-14":            { weight: 210, suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED] },
  // RPM
  "rpm-q2":                        { weight: 218, suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.DOUBLES] },
  "rpm-friction-pro-16-v2":        { weight: 220, suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES] },
  "rpm-friction-pro-14-v2-ryan-fu":{ weight: 215, suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES] },
  "rpm-friction-pro-16-v1":        { weight: 218, suitableFor: [SuitableFor.ADVANCED] },
};

async function main() {
  console.log("=== fix-missing-data ===\n");

  // 1. 列出所有問題商品
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  const noWeight = products.filter(p => !p.weight);
  const noSuitable = products.filter(p => !p.suitableFor || p.suitableFor.length === 0);

  console.log(`缺重量：${noWeight.length} 件`);
  for (const p of noWeight) console.log(`  - ${p.slug}`);

  console.log(`\n缺 suitableFor：${noSuitable.length} 件`);
  for (const p of noSuitable) console.log(`  - ${p.slug}`);

  // 2. 補齊
  console.log("\n=== 開始修正 ===\n");
  let updated = 0;

  for (const [slug, data] of Object.entries(PADDLE_DATA)) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      console.log(`  ❌ 未找到: ${slug}`);
      continue;
    }

    const updateData: Record<string, unknown> = {};

    if (data.weight && !product.weight) {
      updateData.weight = data.weight;
    }
    if (data.suitableFor && (!product.suitableFor || product.suitableFor.length === 0)) {
      updateData.suitableFor = data.suitableFor;
    }

    if (Object.keys(updateData).length > 0) {
      await prisma.product.update({ where: { slug }, data: updateData });
      console.log(`  ✅ ${slug}: ${JSON.stringify(updateData)}`);
      updated++;
    } else {
      console.log(`  ⏭  ${slug}: 已完整`);
    }
  }

  // 3. 最終統計
  const remaining = await prisma.product.findMany({
    where: { OR: [{ weight: null }, { suitableFor: { isEmpty: true } }] },
    select: { slug: true, weight: true, suitableFor: true },
  });

  console.log(`\n=== 結果 ===`);
  console.log(`已修正：${updated} 件`);
  console.log(`仍有問題：${remaining.length} 件（通常是球或配件，無需 weight/suitableFor）`);
  for (const p of remaining) {
    console.log(`  - ${p.slug}  weight:${p.weight ?? "null"}  suitableFor:${JSON.stringify(p.suitableFor)}`);
  }

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); prisma.$disconnect(); process.exit(1); });
