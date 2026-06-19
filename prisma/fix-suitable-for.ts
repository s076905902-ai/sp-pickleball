/**
 * 修正所有商品的 suitableFor 欄位
 * 依據 seed-picklenest.ts 裡定義的對應表
 * 執行：npx tsx prisma/fix-suitable-for.ts
 */

import { PrismaClient, SuitableFor } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG_SUITABLE: Record<string, SuitableFor[]> = {
  "selkirk-omni": [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.DOUBLES],
  "selkirk-labs-boomstik": [SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.TENNIS_CONVERT],
  "selkirk-labs-boomstik-raw-16": [SuitableFor.ADVANCED, SuitableFor.SINGLES],
  "selkirk-labs-007-invikta": [SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.TENNIS_CONVERT],
  "selkirk-slk-geo": [SuitableFor.BEGINNER, SuitableFor.INTERMEDIATE, SuitableFor.DOUBLES],
  "selkirk-slk-valkyrie": [SuitableFor.BEGINNER, SuitableFor.INTERMEDIATE, SuitableFor.FEMALE],
  "selkirk-slk-era-power": [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.DOUBLES],
  "selkirk-slk-dauntless": [SuitableFor.INTERMEDIATE, SuitableFor.DOUBLES],
  "everyday-gran-class-pwr": [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.DOUBLES],
  "everyday-gran-class-110": [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED],
  "everyday-asama-18k-pwr": [SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.DOUBLES],
  "prokennex-black-ace-avenger-lg-11": [SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.TENNIS_CONVERT],
  "prokennex-black-ace-avenger-11": [SuitableFor.ADVANCED, SuitableFor.SINGLES],
  "prokennex-black-ace-16": [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.DOUBLES],
  "prokennex-black-ace-lg-14": [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.TENNIS_CONVERT],
  "prokennex-black-ace-xf-14": [SuitableFor.ADVANCED, SuitableFor.SINGLES],
  "prokennex-black-ace-14": [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED],
  "rpm-q2": [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.DOUBLES],
  "rpm-friction-pro-16-v2": [SuitableFor.ADVANCED, SuitableFor.SINGLES],
  "rpm-friction-pro-14-v2-ryan-fu": [SuitableFor.ADVANCED, SuitableFor.SINGLES],
  "rpm-friction-pro-16-v1": [SuitableFor.ADVANCED],
  "selkirk-slk-atlas-max-bundle": [SuitableFor.BEGINNER, SuitableFor.INTERMEDIATE, SuitableFor.DOUBLES],
};

async function main() {
  console.log("=== fix-suitable-for ===\n");

  let updated = 0;
  let skipped = 0;
  let notFound = 0;

  for (const [slug, suitableFor] of Object.entries(SLUG_SUITABLE)) {
    const product = await prisma.product.findUnique({ where: { slug }, select: { id: true, suitableFor: true } });
    if (!product) {
      console.log(`  ❌ 未找到: ${slug}`);
      notFound++;
      continue;
    }

    const current = JSON.stringify([...product.suitableFor].sort());
    const target = JSON.stringify([...suitableFor].sort());
    if (current === target) {
      console.log(`  ⏭  已正確: ${slug} → ${suitableFor.join(", ")}`);
      skipped++;
      continue;
    }

    await prisma.product.update({
      where: { slug },
      data: { suitableFor },
    });
    console.log(`  ✅ 已更新: ${slug} → ${suitableFor.join(", ")}`);
    updated++;
  }

  console.log(`\n總計：更新 ${updated} 件，已正確 ${skipped} 件，未找到 ${notFound} 件`);

  // 驗證：列出每個 suitableFor 值有幾件商品
  console.log("\n=== 驗證結果 ===");
  const values = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "FEMALE", "TENNIS_CONVERT", "DOUBLES", "SINGLES"] as SuitableFor[];
  for (const v of values) {
    const count = await prisma.product.count({
      where: { suitableFor: { has: v }, status: "PUBLISHED" },
    });
    console.log(`  ${v}: ${count} 件`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
