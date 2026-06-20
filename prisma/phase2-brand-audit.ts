/**
 * SP Pickleball — Phase 2: 品牌資料完整性審查與修正
 * 執行：npx tsx prisma/phase2-brand-audit.ts
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 品牌補充資料（若 DB 已有則跳過）
const BRAND_FIXES: Record<string, {
  description?: string;
  history?: string;
  techFeatures?: string;
  country?: string;
  foundedYear?: number;
  website?: string;
}> = {
  "joola": {
    description: "JOOLA 是德國百年桌球品牌，以 Ben Johns、Anna Leigh Waters 等世界第一選手為代言，旗下 Perseus、Scorpeus 系列是目前美國最熱銷的匹克球拍之一。",
    history: "JOOLA 創立於 1952 年德國達姆施塔特，為奧運桌球指定品牌。2022 年跨足匹克球，首年即憑藉 Ben Johns 代言的 Ben Johns Hyperion 系列震撼市場，迅速躋升全美最受歡迎品牌。",
    techFeatures: JSON.stringify([
      { name: "Carbon Friction Surface (CFS)", description: "碳纖維摩擦表面，提供持久旋轉咬球力" },
      { name: "Aero Curve Frame", description: "弧形框架設計，減少揮拍阻力" },
      { name: "Response Polymer Core", description: "高彈性聚合物芯材，最佳化擊球手感" },
      { name: "Charged Surface Technology", description: "帶電表面技術，強化旋轉能力" },
    ]),
    country: "德國/美國",
    foundedYear: 1952,
    website: "https://joolausa.com",
  },
  "paddletek": {
    description: "Paddletek 是美國匹克球先驅品牌，以 Tempest 系列廣受入門至中階球員喜愛，強調品質穩定與平易近人的價格。",
    history: "Paddletek 於 2009 年在美國成立，是最早專注於匹克球拍研發的品牌之一。以碳纖維複合材料技術起家，長期耕耘中價位市場，建立穩固口碑。",
    techFeatures: JSON.stringify([
      { name: "Smart Response Technology (SRT)", description: "智慧響應科技，提升擊球精準度" },
      { name: "Carbon Fiber Face", description: "碳纖維拍面，耐用且提供良好摩擦力" },
    ]),
    country: "美國",
    foundedYear: 2009,
    website: "https://paddletek.com",
  },
  "selkirk": {
    country: "美國",
    foundedYear: 2014,
    website: "https://selkirk.com",
  },
  "everyday-social": {
    country: "美國",
    foundedYear: 2021,
    website: "https://everydaysocial.com",
  },
  "prokennex": {
    country: "台灣/美國",
    foundedYear: 1980,
    website: "https://prokennex.com",
  },
  "rpm": {
    country: "美國",
    foundedYear: 2022,
    website: "https://rpmpickleball.com",
  },
  "franklin": {
    country: "美國",
    foundedYear: 1946,
    website: "https://franklinsports.com",
  },
};

async function main() {
  console.log("\n════════════════════════════════════════");
  console.log("  Phase 2 — 品牌資料審查與修正");
  console.log("════════════════════════════════════════\n");

  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });

  console.log(`資料庫品牌總計：${brands.length} 個\n`);

  // 1. 列出現況
  for (const b of brands) {
    const issues: string[] = [];
    if (!b.logo) issues.push("無logo");
    if (!b.description) issues.push("無description");
    if (!b.coverImage) issues.push("無coverImage");
    if (!b.history) issues.push("無history");
    if (!b.techFeatures) issues.push("無techFeatures");
    if (!b.country) issues.push("無country");
    if (!b.website) issues.push("無website");
    const icon = issues.length === 0 ? "✅" : "⚠️ ";
    console.log(`${icon} ${b.name.padEnd(30)} slug:${b.slug}`);
    if (issues.length) console.log(`     缺：${issues.join(", ")}`);
  }

  // 2. 修正
  console.log("\n─── 開始修正 ───\n");
  let updated = 0;

  for (const b of brands) {
    const fix = BRAND_FIXES[b.slug];
    if (!fix) {
      console.log(`  ⏭  ${b.slug}：無補充資料`);
      continue;
    }

    const updateData: Record<string, unknown> = {};
    if (fix.description && !b.description) updateData.description = fix.description;
    if (fix.history && !b.history) updateData.history = fix.history;
    if (fix.techFeatures && !b.techFeatures) updateData.techFeatures = fix.techFeatures;
    if (fix.country && !b.country) updateData.country = fix.country;
    if (fix.foundedYear && !b.foundedYear) updateData.foundedYear = fix.foundedYear;
    if (fix.website && !b.website) updateData.website = fix.website;

    if (Object.keys(updateData).length > 0) {
      await prisma.brand.update({ where: { slug: b.slug }, data: updateData });
      console.log(`  ✅ ${b.slug}：已補齊 [${Object.keys(updateData).join(", ")}]`);
      updated++;
    } else {
      console.log(`  ⏭  ${b.slug}：資料已完整`);
    }
  }

  // 3. 最終結果
  const finalBrands = await prisma.brand.findMany({ orderBy: { sortOrder: "asc" } });
  console.log(`\n════════════════════════════════════════`);
  console.log(`已修正：${updated} 個品牌`);
  console.log(`\n最終品牌清單（按 sortOrder）：`);
  for (const b of finalBrands) {
    const pct = [b.logo, b.description, b.coverImage, b.history, b.techFeatures, b.country, b.website]
      .filter(Boolean).length;
    console.log(`  ${b.name.padEnd(30)} 完整度: ${pct}/7  isActive: ${b.isActive}`);
  }

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); prisma.$disconnect(); process.exit(1); });
