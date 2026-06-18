/**
 * SP Pickleball — 完整 Seed 資料
 * 來源：picklenest.tw（4 品牌、4 分類、45+ 商品、SEO、GEO、8 篇文章）
 * 執行：npx tsx prisma/seed-picklenest.ts
 */

import { PrismaClient, ProductStatus, ArticleStatus, SuitableFor } from "@prisma/client";

const prisma = new PrismaClient();
const CDN = "https://picklenest.tw/cdn/shop/files";

// ============================================================
// BRANDS
// ============================================================

async function seedBrands() {
  const brands = [
    {
      name: "Selkirk Sports",
      slug: "selkirk",
      logo: `${CDN}/selkirk-logo.png`,
      coverImage: `${CDN}/vertical_PNG_3000x4000-Selkirk-Omni-Elongated-1776-01.webp?v=1781491440`,
      description: "Selkirk Sports 是美國頂級匹克球品牌，創立於 2014 年，總部位於愛達荷州，由兄弟 Rob 與 Mike Barnes 創辦。品牌以「科學驅動的創新」為核心，旗下 SLK 入門線與 LABS 旗艦線涵蓋所有程度球員。",
      history: "2014 年由 Barnes 兄弟在美國愛達荷州成立，迅速成長為全美最受職業選手信賴的匹克球品牌。2023 年推出 LABS 系列，與世界頂尖選手共同研發，開創熱壓一體成型（Thermoformed）新時代。",
      techFeatures: JSON.stringify([
        { name: "ReactCore™", description: "專利 PureFoam 核心，最大化擊球能量回饋" },
        { name: "InfiniGrit™", description: "永久性高摩擦係數碳纖維表面處理技術" },
        { name: "Multistrata™", description: "多層結構強化拍面，提升耐用性與穩定性" },
        { name: "Adjustable MOI", description: "可調式轉動慣量，適應不同打法" },
      ]),
      website: "https://selkirk.com",
      country: "美國",
      foundedYear: 2014,
      isActive: true,
      sortOrder: 1,
    },
    {
      name: "Everyday Social",
      slug: "everyday-social",
      logo: `${CDN}/everyday-social-logo.webp`,
      coverImage: `${CDN}/GRAN_CLASS_PWR_Green_black_rock_ad_logo_55dd828c-edd1-4c35-88ee-734d42b304da.webp?v=1780130059`,
      description: "EVERYDAY SOCIAL® 是新一代高端匹克球品牌，融合賽車美學與頂尖球拍科技。旗艦 Gran Class 系列以 F1 賽車美學為靈感，提供具備職業競技水準的表現。",
      history: "EVERYDAY SOCIAL® 以「讓日常運動充滿格調」為品牌使命，將運動裝備提升至時尚精品層次。Gran Class 系列採用賽車紅與英倫綠兩款經典配色，成為球場上的視覺焦點。",
      techFeatures: JSON.stringify([
        { name: "High-Density Foam Core", description: "高密度泡棉核心技術，兼顧爆發力與緩震" },
        { name: "T700 Raw Carbon Fiber", description: "頂級 T700 原生碳纖維拍面，持久咬球力" },
        { name: "18K Carbon Weave", description: "18K 碳纖維編織面材，極致旋轉效果" },
        { name: "Race-Inspired Design", description: "賽車級美學設計，F1 配色靈感" },
      ]),
      website: "https://everydaysocial.com",
      country: "美國",
      foundedYear: 2021,
      isActive: true,
      sortOrder: 2,
    },
    {
      name: "ProKennex",
      slug: "prokennex",
      logo: `${CDN}/prokennex-logo.png`,
      coverImage: `${CDN}/prokennex-black-ace-cover.webp`,
      description: "ProKennex 是歷史悠久的球拍品牌，以獨家 Kinetic 動能系統聞名，能有效分散擊球震動、保護手肘，深受有傷病顧慮的球員青睞。Black Ace 系列是 2024-2026 年最受職業選手推崇的匹克球拍之一。",
      history: "ProKennex 於 1980 年代在台灣創立，以網球拍起家，以 Kinetic System（動能系統）聞名於世。進入匹克球市場後，迅速以高端品質與護肘科技贏得職業球員信任。",
      techFeatures: JSON.stringify([
        { name: "Kinetic System", description: "專利動能系統，球拍框架內注入鎢鋼微粒，有效分散震動 22%，護肘效果顯著" },
        { name: "原生碳纖維拍面", description: "頂級 Raw Carbon Fiber 表面，提供持久高摩擦旋轉效果" },
        { name: "熱壓一體成型", description: "Thermoformed 技術，結構強度業界最高" },
      ]),
      website: "https://prokennex.com",
      country: "台灣/美國",
      foundedYear: 1980,
      isActive: true,
      sortOrder: 3,
    },
    {
      name: "RPM",
      slug: "rpm",
      logo: `${CDN}/rpm-logo.png`,
      coverImage: `${CDN}/2_Q2_Elongated_16mm_Angled.webp?v=1776134105`,
      description: "RPM 是新興匹克球品牌，以熱壓一體成型技術與獨特空氣動力學設計著稱。Q2 系列提供長面/寬面、14mm/16mm 四種組合，讓球員精準調校球風。",
      history: "RPM 誕生於匹克球運動爆發時期，憑藉 Thermoformed Unibody 技術與 Aero-Curvature 弧形封邊設計，在競爭激烈的高端球拍市場中快速建立口碑。",
      techFeatures: JSON.stringify([
        { name: "T700 Raw Carbon Fiber", description: "全系列採用頂級東麗 T700 原生碳纖維" },
        { name: "Thermoformed Unibody", description: "熱壓一體成型，拍柄與拍面無縫結合" },
        { name: "Aerodynamic Aero-Curvature", description: "Q2 專屬弧形封邊，減少空氣阻力" },
        { name: "Perimeter Foam Injection", description: "全邊緣注入高密度泡沫，擴張甜蜜點" },
      ]),
      website: "https://rpmpickleball.com",
      country: "美國",
      foundedYear: 2022,
      isActive: true,
      sortOrder: 4,
    },
    {
      name: "Franklin",
      slug: "franklin",
      logo: `${CDN}/franklin-logo.png`,
      coverImage: `${CDN}/franklin-x40-cover.webp`,
      description: "Franklin Sports 是美國知名運動品牌，其 X-40 匹克球是 USAPA 官方認可的賽事指定用球，全美使用率最高，以耐用性與穩定飛行著稱。",
      history: "Franklin Sports 創立於 1946 年，是美國最具歷史的運動品牌之一，生產各類球類運動裝備。Franklin X-40 是目前最受職業賽事採用的匹克球。",
      techFeatures: JSON.stringify([
        { name: "USAPA 認證", description: "美國匹克球協會官方認可賽事用球" },
        { name: "40 孔設計", description: "最佳空氣動力學設計，穩定飛行軌跡" },
      ]),
      website: "https://franklinsports.com",
      country: "美國",
      foundedYear: 1946,
      isActive: true,
      sortOrder: 5,
    },
  ];

  const result: Record<string, string> = {};
  for (const b of brands) {
    const brand = await prisma.brand.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
    result[b.slug] = brand.id;
    console.log(`  ✓ Brand: ${brand.name}`);
  }
  return result;
}

// ============================================================
// CATEGORIES
// ============================================================

async function seedCategories() {
  const cats = [
    {
      name: "匹克球拍",
      slug: "paddles",
      description: "精選頂級匹克球拍，涵蓋 Selkirk、ProKennex、RPM、Everyday Social 等國際知名品牌。從入門到職業，找到最適合你的球風。",
      image: `${CDN}/vertical_PNG_3000x4000-Selkirk-Omni-Elongated-1776-01.webp?v=1781491440`,
      sortOrder: 1,
    },
    {
      name: "匹克球",
      slug: "balls",
      description: "官方認可賽事用球與日常練習球，室內、室外場地均有適合選擇。",
      image: `${CDN}/selkirk-pro-s1-ball.webp`,
      sortOrder: 2,
    },
    {
      name: "球拍保護",
      slug: "paddle-protection",
      description: "球拍保護套、清潔套組，讓你的球拍維持最佳狀態，延長使用壽命。",
      image: `${CDN}/rpm-paddle-cover.webp`,
      sortOrder: 3,
    },
    {
      name: "配件",
      slug: "accessories",
      description: "握把布、球袋、球拍包、運動帽等匹克球配件，完整你的球場裝備。",
      image: `${CDN}/classic-grip-tape-3-grips-winter-white-4544695.webp?v=1774520404`,
      sortOrder: 4,
    },
  ];

  const result: Record<string, string> = {};
  for (const c of cats) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { ...c, isActive: true },
      create: { ...c, isActive: true },
    });
    result[c.slug] = cat.id;
    console.log(`  ✓ Category: ${cat.name}`);
  }
  return result;
}

// ============================================================
// PRODUCTS
// ============================================================

async function upsertProduct(data: any) {
  const { slug, ...rest } = data;
  const p = await prisma.product.upsert({
    where: { slug },
    update: rest,
    create: { slug, ...rest },
  });
  console.log(`  ✓ Product: ${p.name}`);
  return p;
}

async function seedProducts(brandIds: Record<string, string>, catIds: Record<string, string>) {
  const ids: Record<string, string> = {};

  // ── Selkirk Paddles ──────────────────────────────────────────

  const p1 = await upsertProduct({
    name: "Selkirk OMNI™ 旗艦碳纖維匹克球拍",
    slug: "selkirk-omni",
    sku: "SK-OMNI-001",
    brandId: brandIds["selkirk"],
    categoryId: catIds["paddles"],
    price: 9930,
    stock: 15,
    status: ProductStatus.PUBLISHED,
    isFeatured: true,
    weight: 232,
    thickness: 16,
    length: 419,
    width: 203,
    gripLength: 140,
    material: "T700 原生碳纖維",
    coreMaterial: "16mm PureFoam 核心",
    surfaceMaterial: "InfiniGrit™ 碳纖維",
    controlScore: 88,
    powerScore: 85,
    spinScore: 92,
    forgivenessScore: 87,
    feelScore: 90,
    suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.DOUBLES],
    mainImage: `${CDN}/vertical_PNG_3000x4000-Selkirk-Omni-Elongated-1776-01.webp?v=1781491440`,
    gallery: [
      `${CDN}/vertical_PNG_3000x4000-Selkirk-Omni-Elongated-1776-01.webp?v=1781491440`,
      `${CDN}/selkirk-omni-widebody.webp`,
      `${CDN}/selkirk-omni-face.webp`,
    ],
    description: `**Selkirk OMNI™ — 下一個時代的匹克球旗艦**\n\nSelkirk OMNI™ 是 Selkirk Sports 歷來最具突破性的作品，搭載四項全新專利技術，為各程度球員重新定義「全方位型」球拍的意義。\n\n**ReactCore™ PureFoam 核心**\n採用革命性 PureFoam 核心材料，在 Widebody（寬面型）與 Elongated（加長型）兩種拍型均提供無與倫比的能量回饋與觸球穩定性。16mm 厚度設計在力量與控制之間取得完美平衡。\n\n**InfiniGrit™ 永久拍面技術**\n突破傳統碳纖維拍面壽命限制，InfiniGrit™ 表面處理技術確保摩擦係數不隨時間衰減，讓你始終保有銳利旋轉效果。\n\n**Multistrata™ 多層結構**\n多層複合材料堆疊技術讓拍面更加耐用，承受高強度比賽而不失去手感靈敏度。\n\n**拍型選擇**\n- Widebody：16" x 8" — 更大甜區、更高容錯率，適合控球型打法\n- Elongated：16.5" x 7.45" — 更長槓桿力、更強攻擊性，適合底線進攻\n\n**技術規格**\n| 規格 | Widebody | Elongated |\n|------|----------|----------|\n| 重量 | 7.9-8.0 oz | 8.0-8.2 oz |\n| 核心厚度 | 16mm | 16mm |\n| 拍面材質 | T700 原生碳纖維 | T700 原生碳纖維 |\n| 握把長度 | 5.25" | 5.5" |`,
    specs: {
      拍型: "Widebody / Elongated（兩款）",
      重量: "7.9–8.2 oz (224–233g)",
      拍面長度: "16\" (寬面) / 16.5\" (加長)",
      拍面寬度: "8\" (寬面) / 7.45\" (加長)",
      核心厚度: "16mm PureFoam",
      握把長度: "5.25\" (寬面) / 5.5\" (加長)",
      拍面材質: "T700 InfiniGrit™ 原生碳纖維",
      產地: "美國",
    },
    faq: [
      { question: "Selkirk OMNI™ 適合什麼程度的球員？", answer: "中階至職業球員均適合，尤其推薦給追求全面表現、不想在力量與控制間妥協的競技玩家。" },
      { question: "Widebody 和 Elongated 哪個比較好？", answer: "Widebody 甜區更大、容錯率更高，適合網前控球與雙打打法。Elongated 攻擊性更強，適合底線進攻與單打。" },
      { question: "InfiniGrit™ 技術真的有效嗎？", answer: "根據 Selkirk 官方測試，InfiniGrit™ 拍面在 200+ 小時使用後仍維持 95% 以上的原始摩擦係數，遠超傳統碳纖維拍面。" },
    ],
  });
  ids["selkirk-omni"] = p1.id;

  const p2 = await upsertProduct({
    name: "Selkirk Labs Project BOOMSTIK™ 旗艦匹克球拍",
    slug: "selkirk-labs-boomstik",
    sku: "SK-BOOM-001",
    brandId: brandIds["selkirk"],
    categoryId: catIds["paddles"],
    price: 10440,
    stock: 8,
    status: ProductStatus.PUBLISHED,
    isFeatured: true,
    weight: 240,
    thickness: 14,
    length: 432,
    width: 184,
    gripLength: 152,
    material: "T700 原生碳纖維",
    coreMaterial: "14mm Polymer 核心",
    surfaceMaterial: "InfiniGrit™ 碳纖維",
    controlScore: 80,
    powerScore: 95,
    spinScore: 93,
    forgivenessScore: 75,
    feelScore: 85,
    suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.TENNIS_CONVERT],
    mainImage: `${CDN}/selkirk-boomstik-main.webp`,
    gallery: [`${CDN}/selkirk-boomstik-main.webp`, `${CDN}/selkirk-boomstik-face.webp`],
    description: `**Selkirk Labs Project BOOMSTIK™ — 為攻擊型球員打造**\n\nBOOMSTIK™ 是 Selkirk LABS 系列中最具攻擊性的作品，採用超加長設計（17"）提供前所未有的拍頭速度與殺球威力。14mm 薄核設計最大化能量回饋，是職業選手與底線進攻者的終極武器。\n\n**超加長拍身設計**\n17" 拍身長度提供極致的物理槓桿力，讓每一次揮拍都能產生更強的拍頭速度，輕鬆打出深遠底線球與強力過頂殺球。\n\n**14mm 薄核爆發力**\n薄核設計帶來更強烈的回彈感（Pop），讓攻擊性擊球更加犀利，網前截擊速度更快。\n\n適合：有網球或羽球背景、習慣大揮拍攻擊的球員。`,
    specs: {
      重量: "8.3–8.6 oz",
      拍面長度: "17\" (超加長)",
      拍面寬度: "7.3\"",
      核心厚度: "14mm",
      握把長度: "5.75\"",
      拍面材質: "T700 InfiniGrit™ 原生碳纖維",
    },
    faq: [
      { question: "BOOMSTIK™ 適合初學者嗎？", answer: "不建議。BOOMSTIK™ 的超長設計對甜區要求較高，建議中高階以上球員使用。初學者建議先從 SLK Geo 或 Atlas Max 入手。" },
      { question: "BOOMSTIK™ 和一般 Selkirk 拍有什麼不同？", answer: "BOOMSTIK™ 屬於 LABS 系列，是 Selkirk 與職業選手共同研發的限定版，拍身更長（17\"），攻擊性更強，售價也最高。" },
    ],
  });
  ids["selkirk-labs-boomstik"] = p2.id;

  const p3 = await upsertProduct({
    name: "Selkirk Labs Project BOOMSTIK Raw Carbon 16mm",
    slug: "selkirk-labs-boomstik-raw-16",
    sku: "SK-BOOM-RAW16",
    brandId: brandIds["selkirk"],
    categoryId: catIds["paddles"],
    price: 8960,
    stock: 6,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 238,
    thickness: 16,
    length: 432,
    width: 184,
    gripLength: 152,
    material: "T700 原生碳纖維",
    coreMaterial: "16mm Polymer 核心",
    surfaceMaterial: "Raw Carbon 碳纖維",
    controlScore: 85,
    powerScore: 88,
    spinScore: 95,
    forgivenessScore: 78,
    feelScore: 87,
    suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES],
    mainImage: `${CDN}/selkirk-boomstik-raw-main.webp`,
    gallery: [`${CDN}/selkirk-boomstik-raw-main.webp`],
    description: `**Selkirk Labs BOOMSTIK Raw Carbon 16mm — 旋轉至上**\n\n同樣的超長 BOOMSTIK™ 設計，搭配 Raw Carbon（裸碳纖維）拍面材質，提供比標準版更強的旋轉效果。16mm 核心在保有攻擊力的同時增加了觸球穩定性，是追求高旋轉打法的進階球員首選。`,
    specs: {
      重量: "8.2–8.5 oz",
      拍面長度: "17\" (超加長)",
      核心厚度: "16mm",
      拍面材質: "Raw Carbon Fiber",
    },
    faq: [
      { question: "Raw Carbon 和 InfiniGrit™ 有什麼差別？", answer: "Raw Carbon 提供更強的初始旋轉效果，但可能隨使用時間略有衰減。InfiniGrit™ 則透過特殊處理確保長期維持穩定摩擦力。" },
    ],
  });
  ids["selkirk-labs-boomstik-raw-16"] = p3.id;

  const p4 = await upsertProduct({
    name: "Selkirk Labs Project 007 Invikta 10mm",
    slug: "selkirk-labs-007-invikta",
    sku: "SK-007-INV10",
    brandId: brandIds["selkirk"],
    categoryId: catIds["paddles"],
    price: 5390,
    stock: 10,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 220,
    thickness: 10,
    length: 419,
    width: 191,
    gripLength: 152,
    material: "碳纖維",
    coreMaterial: "10mm Polymer 核心",
    controlScore: 75,
    powerScore: 90,
    spinScore: 88,
    forgivenessScore: 72,
    feelScore: 82,
    suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.TENNIS_CONVERT],
    mainImage: `${CDN}/selkirk-007-invikta-main.webp`,
    gallery: [`${CDN}/selkirk-007-invikta-main.webp`],
    description: `**Selkirk Labs Project 007 Invikta 10mm — 速度與爆發力**\n\n007 Invikta 採用極薄 10mm 核心，提供業界最強的回彈感與拍頭速度。加長型（Invikta）設計加上超薄核心，讓進攻型球員能打出令對手措手不及的快速擊球。適合習慣快節奏、強調進攻的競技玩家。`,
    specs: {
      重量: "7.6–7.9 oz",
      核心厚度: "10mm",
      拍面長度: "16.5\"",
      拍面寬度: "7.5\"",
    },
    faq: [
      { question: "10mm 核心的優缺點是什麼？", answer: "優點：回彈更強、拍頭速度更快、更適合進攻。缺點：甜區較小、控球難度較高，不建議初中階球員使用。" },
    ],
  });
  ids["selkirk-labs-007-invikta"] = p4.id;

  const p5 = await upsertProduct({
    name: "Selkirk SLK Geo 石墨碳纖維匹克球拍",
    slug: "selkirk-slk-geo",
    sku: "SK-SLK-GEO",
    brandId: brandIds["selkirk"],
    categoryId: catIds["paddles"],
    price: 3160,
    stock: 25,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 225,
    thickness: 16,
    material: "石墨碳纖維",
    coreMaterial: "16mm Polymer 核心",
    controlScore: 82,
    powerScore: 75,
    spinScore: 80,
    forgivenessScore: 85,
    feelScore: 83,
    suitableFor: [SuitableFor.BEGINNER, SuitableFor.INTERMEDIATE, SuitableFor.DOUBLES],
    mainImage: `${CDN}/selkirk-slk-geo-main.webp`,
    gallery: [`${CDN}/selkirk-slk-geo-main.webp`],
    description: `**Selkirk SLK Geo — 入門首選，控球王者**\n\nSLK Geo 是 Selkirk SLK 系列的入門款，採用石墨碳纖維拍面與 16mm 厚核設計，提供出色的控球手感與高容錯率。平易近人的價格搭配 Selkirk 品牌品質保證，是初學者到中階球員的理想選擇。`,
    specs: { 重量: "7.8–8.1 oz", 核心厚度: "16mm", 拍面材質: "石墨碳纖維" },
    faq: [
      { question: "SLK Geo 適合從未打過匹克球的人嗎？", answer: "非常適合！SLK Geo 的大甜區和 16mm 厚核設計讓初學者能更快上手，建立正確手感。" },
    ],
  });
  ids["selkirk-slk-geo"] = p5.id;

  const p6 = await upsertProduct({
    name: "Selkirk SLK Valkyrie 碳纖維匹克球拍",
    slug: "selkirk-slk-valkyrie",
    sku: "SK-SLK-VAL",
    brandId: brandIds["selkirk"],
    categoryId: catIds["paddles"],
    price: 2470,
    salePrice: 2530,
    stock: 20,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 218,
    thickness: 14,
    material: "碳纖維",
    coreMaterial: "14mm Polymer 核心",
    controlScore: 78,
    powerScore: 80,
    spinScore: 82,
    forgivenessScore: 80,
    feelScore: 79,
    suitableFor: [SuitableFor.BEGINNER, SuitableFor.INTERMEDIATE, SuitableFor.FEMALE],
    mainImage: `${CDN}/selkirk-slk-valkyrie-main.webp`,
    gallery: [`${CDN}/selkirk-slk-valkyrie-main.webp`],
    description: `**Selkirk SLK Valkyrie — 輕量靈活，女性友善**\n\nSLK Valkyrie 以輕量化設計著稱，特別適合喜愛靈活打法的球員與女性玩家。14mm 薄核提供更快的拍頭速度，讓你在網前快速對拉時能佔得先機。`,
    specs: { 重量: "7.4–7.7 oz", 核心厚度: "14mm", 拍面材質: "碳纖維" },
    faq: [
      { question: "Valkyrie 特別適合女性嗎？", answer: "是的，Valkyrie 的輕量設計減輕手腕負擔，加上均衡的重量分佈，非常適合女性球員及手腕力量較弱的玩家。" },
    ],
  });
  ids["selkirk-slk-valkyrie"] = p6.id;

  const p7 = await upsertProduct({
    name: "Selkirk SLK ERA Power 碳纖維匹克球拍",
    slug: "selkirk-slk-era-power",
    sku: "SK-SLK-ERA-PWR",
    brandId: brandIds["selkirk"],
    categoryId: catIds["paddles"],
    price: 5700,
    stock: 12,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 230,
    thickness: 16,
    material: "T700 碳纖維",
    coreMaterial: "16mm Polymer 核心",
    controlScore: 85,
    powerScore: 82,
    spinScore: 85,
    forgivenessScore: 86,
    feelScore: 84,
    suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.DOUBLES],
    mainImage: `${CDN}/selkirk-slk-era-power-main.webp`,
    gallery: [`${CDN}/selkirk-slk-era-power-main.webp`],
    description: `**Selkirk SLK ERA Power — 中階進階首選**\n\nSLK ERA Power 定位在 SLK 系列與 LABS 旗艦系列之間，為準備進階的球員提供更高規格的表現。T700 碳纖維拍面搭配 16mm 核心，是全方位均衡型球拍的最佳選擇之一。`,
    specs: { 重量: "7.9–8.2 oz", 核心厚度: "16mm", 拍面材質: "T700 碳纖維" },
    faq: [],
  });
  ids["selkirk-slk-era-power"] = p7.id;

  const p8 = await upsertProduct({
    name: "Selkirk SLK Dauntless 碳纖維匹克球拍",
    slug: "selkirk-slk-dauntless",
    sku: "SK-SLK-DAUNT",
    brandId: brandIds["selkirk"],
    categoryId: catIds["paddles"],
    price: 5690,
    stock: 10,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 228,
    thickness: 16,
    material: "碳纖維",
    coreMaterial: "16mm Polymer 核心",
    controlScore: 86,
    powerScore: 80,
    spinScore: 83,
    forgivenessScore: 87,
    feelScore: 85,
    suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.DOUBLES],
    mainImage: `${CDN}/selkirk-slk-dauntless-main.webp`,
    gallery: [`${CDN}/selkirk-slk-dauntless-main.webp`],
    description: `**Selkirk SLK Dauntless — 雙打控球利器**\n\nDauntless 以「無所畏懼」為名，專為雙打場景優化的控球型球拍。寬面設計搭配 16mm 核心，讓你在廚房區（Kitchen）的放小球與重設（Reset）更加精準。`,
    specs: { 重量: "7.8–8.1 oz", 核心厚度: "16mm" },
    faq: [],
  });
  ids["selkirk-slk-dauntless"] = p8.id;

  // ── Everyday Social Paddles ──────────────────────────────────

  const p9 = await upsertProduct({
    name: "EVERYDAY SOCIAL® Gran Class PWR 16mm 旗艦匹克球拍",
    slug: "everyday-gran-class-pwr",
    sku: "ES-GC-PWR-16",
    brandId: brandIds["everyday-social"],
    categoryId: catIds["paddles"],
    price: 6730,
    salePrice: 7080,
    stock: 18,
    status: ProductStatus.PUBLISHED,
    isFeatured: true,
    weight: 230,
    thickness: 16,
    length: 419,
    width: 190,
    gripLength: 140,
    material: "T700 Raw Carbon Fiber",
    coreMaterial: "16mm High-Density Foam Core",
    surfaceMaterial: "T700 原生碳纖維",
    controlScore: 87,
    powerScore: 88,
    spinScore: 89,
    forgivenessScore: 88,
    feelScore: 90,
    suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.DOUBLES],
    mainImage: `${CDN}/tw-11134207-81ztm-mj8948ix0cg0c6.jpg?v=1770795589`,
    gallery: [
      `${CDN}/tw-11134207-81ztm-mj8948ix0cg0c6.jpg?v=1770795589`,
      `${CDN}/GRAN_CLASS_PWR_Green_black_rock_ad_logo_55dd828c-edd1-4c35-88ee-734d42b304da.webp?v=1780130059`,
      `${CDN}/gran-class-pwr-full-foam-gen4-lava-red-3476944.webp?v=1780130059`,
      `${CDN}/PWR_GREEN_Back_WhiteBG.jpg?v=1774250093`,
    ],
    description: `**EVERYDAY SOCIAL® Gran Class PWR — 傳承經典血統，進化純粹動力**\n\n2026 年全新 Gran Class PWR 系列，將頂級跑車的「動力輸出」概念植入球拍。首次搭載革命性的 **High-Density Foam Core（高密度泡棉核芯）** 技術，在維持 16mm 控制感之餘，大幅提升爆發力與甜區穩定性。\n\n**核心技術**\n- **Advanced Foam Core Technology**：不同於傳統蜂巢結構，高精密泡棉核心大幅吸收震動，創造極致能量回饋\n- **Expanded Edge-to-Edge Sweet Spot**：泡棉填充邊緣加固，甜區延伸至整個拍面\n- **Race-Inspired T700 Carbon Surface**：T700 原生碳纖維，強大咬球力\n- **Signature Heritage Aesthetics**：賽車紅（Racing Red）與英倫綠（British Racing Green）兩款配色\n\n**技術規格**\n| 規格 | 數值 |\n|------|------|\n| 重量 | 8.1 ± 0.2 oz |\n| 全長 | 16.5\" |\n| 全寬 | 7.5\" |\n| 核心厚度 | 16mm |\n| 握把長度 | 5.5\" |`,
    specs: {
      顏色: "英倫綠 / 賽車紅",
      重量: "8.1 ± 0.2 oz",
      全長: "16.5\"",
      全寬: "7.5\"",
      核心厚度: "16mm High-Density Foam",
      握把長度: "5.5\"",
      拍面材質: "T700 Raw Carbon Fiber",
    },
    faq: [
      { question: "Gran Class PWR 和舊款 Gran Class 110 有什麼不同？", answer: "PWR 系列最大升級是全新 High-Density Foam Core，爆發力提升約 15%，甜區也更大。舊款 110 系列採用傳統蜂巢核心，手感更傳統紮實。" },
      { question: "購買英倫綠還是賽車紅？", answer: "純粹外觀選擇，兩款規格完全相同。英倫綠較低調優雅，賽車紅更加張揚搶眼。" },
    ],
  });
  ids["everyday-gran-class-pwr"] = p9.id;

  const p10 = await upsertProduct({
    name: "EVERYDAY SOCIAL® GRAN CLASS 110-R / 110-G 旗艦球拍",
    slug: "everyday-gran-class-110",
    sku: "ES-GC-110-RG",
    brandId: brandIds["everyday-social"],
    categoryId: catIds["paddles"],
    price: 5890,
    salePrice: 6470,
    stock: 14,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 228,
    thickness: 16,
    material: "T700 碳纖維",
    coreMaterial: "16mm Polymer 核心",
    controlScore: 86,
    powerScore: 82,
    spinScore: 88,
    forgivenessScore: 85,
    feelScore: 87,
    suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED],
    mainImage: `${CDN}/tw-11134207-81zto-mejia6a7fxtveb.jpg?v=1770794095`,
    gallery: [
      `${CDN}/tw-11134207-81zto-mejia6a7fxtveb.jpg?v=1770794095`,
      `${CDN}/tw-11134207-81ztn-mhlv8ca0ta129c.jpg?v=1770794095`,
    ],
    description: `**EVERYDAY SOCIAL® Gran Class 110 — 賽車美學的匹克球精品**\n\nGran Class 110 系列以 F1 賽車文化為靈感，提供賽車紅（110-R）與英倫綠（110-G）兩款經典配色。T700 碳纖維拍面搭配 16mm 厚核，兼顧旋轉與控球，是一款兼顧顏值與實力的旗艦級球拍。`,
    specs: { 重量: "7.9–8.2 oz", 核心厚度: "16mm", 顏色: "賽車紅 (110-R) / 英倫綠 (110-G)" },
    faq: [],
  });
  ids["everyday-gran-class-110"] = p10.id;

  const p11 = await upsertProduct({
    name: "EVERYDAY SOCIAL® ASAMA 18K PWR 旗艦碳纖維球拍",
    slug: "everyday-asama-18k-pwr",
    sku: "ES-ASAMA-18K",
    brandId: brandIds["everyday-social"],
    categoryId: catIds["paddles"],
    price: 6400,
    stock: 9,
    status: ProductStatus.PUBLISHED,
    isFeatured: true,
    weight: 235,
    thickness: 16,
    material: "18K 碳纖維編織",
    coreMaterial: "16mm Full Foam 核心",
    surfaceMaterial: "18K Carbon Weave",
    controlScore: 85,
    powerScore: 92,
    spinScore: 95,
    forgivenessScore: 83,
    feelScore: 88,
    suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.DOUBLES],
    mainImage: `${CDN}/limited-pre-order-asama-black-gold-pwr-full-foam-gen4-5569061.webp?v=1777965278`,
    gallery: [
      `${CDN}/limited-pre-order-asama-black-gold-pwr-full-foam-gen4-5569061.webp?v=1777965278`,
      `${CDN}/Black_Gold_pwr-green-teaser.webp?v=1778740661`,
    ],
    description: `**EVERYDAY SOCIAL® ASAMA 18K PWR — 極致旋轉的旗艦極品**\n\nASAMA 18K PWR 是 Everyday Social 最頂尖的作品，採用稀有的 **18K 碳纖維編織** 拍面技術，每平方英吋的碳纖維絲線密度是普通碳纖維拍的數倍，帶來業界最強的旋轉效果。搭配 Full Foam 全泡棉核心，是旋轉型進攻球員的夢幻球拍。\n\n**18K 碳纖維編織的優勢**\n- 旋轉效果提升 30% vs 標準碳纖維\n- 更豐富的觸球回饋\n- 黑金配色彰顯旗艦地位\n\n限量發售，售完不補。`,
    specs: {
      重量: "8.0–8.3 oz",
      核心厚度: "16mm Full Foam",
      拍面材質: "18K Carbon Weave",
      顏色: "黑金限定版",
    },
    faq: [
      { question: "ASAMA 18K PWR 是限量商品嗎？", answer: "是的，ASAMA 18K PWR 是限量系列，每次補貨數量有限，建議確認有貨後儘早下單。" },
    ],
  });
  ids["everyday-asama-18k-pwr"] = p11.id;

  // ── ProKennex Paddles ─────────────────────────────────────────

  const p12 = await upsertProduct({
    name: "ProKennex Black Ace Avenger LG 11 匹克球拍",
    slug: "prokennex-black-ace-avenger-lg-11",
    sku: "PK-BA-AVG-LG11",
    brandId: brandIds["prokennex"],
    categoryId: catIds["paddles"],
    price: 6910,
    stock: 11,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 232,
    thickness: 11,
    material: "原生碳纖維",
    coreMaterial: "11mm Kinetic 核心",
    surfaceMaterial: "Raw Carbon Fiber",
    controlScore: 82,
    powerScore: 88,
    spinScore: 90,
    forgivenessScore: 84,
    feelScore: 86,
    suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.TENNIS_CONVERT],
    mainImage: `${CDN}/prokennex-black-ace-avenger-lg11-main.webp`,
    gallery: [`${CDN}/prokennex-black-ace-avenger-lg11-main.webp`],
    description: `**ProKennex Black Ace Avenger LG 11 — Kinetic 科技的進攻旗艦**\n\nBlack Ace Avenger LG 11 結合了 ProKennex 獨家 Kinetic System 護肘科技與 11mm 超薄核心，提供爆炸性的攻擊力。LG（Long Grip）超長握把設計特別適合網球選手跨界，能完美運用雙手反拍技術。\n\n**Kinetic System 動能系統**\nProKennex 獨家專利技術，在球拍框架內填充鎢鋼微粒，擊球瞬間自動吸收並分散振動，臨床研究顯示可減少 22% 的衝擊傳導至手肘，是護肘界的革命性突破。`,
    specs: {
      重量: "7.9–8.2 oz",
      核心厚度: "11mm",
      握把長度: "5.75\" (LG超長握把)",
      拍面材質: "Raw Carbon Fiber",
      特殊技術: "Kinetic System 護肘科技",
    },
    faq: [
      { question: "Kinetic System 真的能保護手肘嗎？", answer: "根據 ProKennex 委托的臨床研究，Kinetic System 能減少 22% 的震動傳導至手肘，對有網球肘困擾的球員特別有幫助。" },
      { question: "LG 握把適合手比較大的人嗎？", answer: "LG 代表 Long Grip（長握把），適合需要雙手反拍或習慣網球拍握法的球員，握把長度比標準款多約 0.5 英吋。" },
    ],
  });
  ids["prokennex-black-ace-avenger-lg-11"] = p12.id;

  const p13 = await upsertProduct({
    name: "ProKennex Black Ace Avenger 11 匹克球拍",
    slug: "prokennex-black-ace-avenger-11",
    sku: "PK-BA-AVG-11",
    brandId: brandIds["prokennex"],
    categoryId: catIds["paddles"],
    price: 6910,
    stock: 9,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 228,
    thickness: 11,
    material: "原生碳纖維",
    coreMaterial: "11mm Kinetic 核心",
    controlScore: 80,
    powerScore: 90,
    spinScore: 90,
    forgivenessScore: 82,
    feelScore: 85,
    suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES],
    mainImage: `${CDN}/prokennex-black-ace-avenger-11-main.webp`,
    gallery: [`${CDN}/prokennex-black-ace-avenger-11-main.webp`],
    description: `**ProKennex Black Ace Avenger 11 — 超薄核心攻擊之王**\n\nAvenger 11 採用 11mm 超薄核心，是 Black Ace 系列中攻擊性最強的款式。標準握把長度適合大多數球員，搭配 Kinetic System 護肘科技，讓你在全力進攻的同時保護手臂健康。`,
    specs: { 重量: "7.8–8.1 oz", 核心厚度: "11mm", 特殊技術: "Kinetic System" },
    faq: [],
  });
  ids["prokennex-black-ace-avenger-11"] = p13.id;

  const p14 = await upsertProduct({
    name: "ProKennex Black Ace 16mm 匹克球拍",
    slug: "prokennex-black-ace-16",
    sku: "PK-BA-16",
    brandId: brandIds["prokennex"],
    categoryId: catIds["paddles"],
    price: 5890,
    stock: 0,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 232,
    thickness: 16,
    material: "原生碳纖維",
    coreMaterial: "16mm Kinetic 核心",
    controlScore: 90,
    powerScore: 80,
    spinScore: 88,
    forgivenessScore: 90,
    feelScore: 89,
    suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.DOUBLES],
    mainImage: `${CDN}/prokennex-black-ace-16-main.webp`,
    gallery: [`${CDN}/prokennex-black-ace-16-main.webp`],
    description: `**ProKennex Black Ace 16mm — 控球型的終極護肘球拍**\n\n16mm 厚核版本的 Black Ace 是整個系列中最注重控球的款式。超厚核心大幅吸收擊球震動，搭配 Kinetic System，對有手肘或手腕問題的球員是最安全的選擇。`,
    specs: { 重量: "8.0–8.3 oz", 核心厚度: "16mm", 特殊技術: "Kinetic System" },
    faq: [],
  });
  ids["prokennex-black-ace-16"] = p14.id;

  const p15 = await upsertProduct({
    name: "ProKennex Black Ace LG 14mm 匹克球拍",
    slug: "prokennex-black-ace-lg-14",
    sku: "PK-BA-LG14",
    brandId: brandIds["prokennex"],
    categoryId: catIds["paddles"],
    price: 5890,
    stock: 13,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 228,
    thickness: 14,
    material: "原生碳纖維",
    coreMaterial: "14mm Kinetic 核心",
    controlScore: 84,
    powerScore: 85,
    spinScore: 89,
    forgivenessScore: 85,
    feelScore: 86,
    suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.TENNIS_CONVERT],
    mainImage: `${CDN}/prokennex-black-ace-lg14-main.webp`,
    gallery: [`${CDN}/prokennex-black-ace-lg14-main.webp`],
    description: `**ProKennex Black Ace LG 14mm — 力量與控制的均衡之選**\n\n14mm 核心搭配超長握把（LG），在攻擊性與控球之間取得最佳平衡。特別適合從網球轉戰匹克球、習慣雙手反拍的球員。`,
    specs: { 重量: "7.9–8.2 oz", 核心厚度: "14mm", 握把: "LG 超長握把", 特殊技術: "Kinetic System" },
    faq: [],
  });
  ids["prokennex-black-ace-lg-14"] = p15.id;

  const p16 = await upsertProduct({
    name: "ProKennex Black Ace XF 14mm 匹克球拍",
    slug: "prokennex-black-ace-xf-14",
    sku: "PK-BA-XF14",
    brandId: brandIds["prokennex"],
    categoryId: catIds["paddles"],
    price: 5890,
    stock: 11,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 226,
    thickness: 14,
    material: "原生碳纖維",
    coreMaterial: "14mm Kinetic 核心",
    controlScore: 83,
    powerScore: 86,
    spinScore: 88,
    forgivenessScore: 83,
    feelScore: 85,
    suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES],
    mainImage: `${CDN}/prokennex-black-ace-xf14-main.webp`,
    gallery: [`${CDN}/prokennex-black-ace-xf14-main.webp`],
    description: `**ProKennex Black Ace XF 14mm — 極限性能的進攻選手首選**\n\nXF 版本採用特殊拍框設計，在 14mm 核心基礎上進一步優化空氣動力學。適合追求極限速度與旋轉的進階競技玩家。`,
    specs: { 重量: "7.8–8.1 oz", 核心厚度: "14mm", 版本: "XF 極限版", 特殊技術: "Kinetic System" },
    faq: [],
  });
  ids["prokennex-black-ace-xf-14"] = p16.id;

  const p17 = await upsertProduct({
    name: "ProKennex Black Ace 14mm 匹克球拍",
    slug: "prokennex-black-ace-14",
    sku: "PK-BA-14",
    brandId: brandIds["prokennex"],
    categoryId: catIds["paddles"],
    price: 5890,
    stock: 15,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 226,
    thickness: 14,
    material: "原生碳纖維",
    coreMaterial: "14mm Kinetic 核心",
    controlScore: 82,
    powerScore: 87,
    spinScore: 88,
    forgivenessScore: 83,
    feelScore: 84,
    suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED],
    mainImage: `${CDN}/prokennex-black-ace-14-main.webp`,
    gallery: [`${CDN}/prokennex-black-ace-14-main.webp`],
    description: `**ProKennex Black Ace 14mm — Black Ace 系列入門旗艦**\n\nBlack Ace 14mm 是整個 Black Ace 系列的入門款，標準握把搭配 14mm 核心，兼顧力量感與控球。是想體驗 Kinetic System 護肘科技、又不想花費頂級預算的球員的最佳選擇。`,
    specs: { 重量: "7.8–8.1 oz", 核心厚度: "14mm", 特殊技術: "Kinetic System" },
    faq: [],
  });
  ids["prokennex-black-ace-14"] = p17.id;

  // ── RPM Paddles ───────────────────────────────────────────────

  const p18 = await upsertProduct({
    name: "RPM Q2 熱壓一體成型匹克球拍系列",
    slug: "rpm-q2",
    sku: "RPM-Q2-EL16",
    brandId: brandIds["rpm"],
    categoryId: catIds["paddles"],
    price: 7500,
    salePrice: 8342,
    stock: 20,
    status: ProductStatus.PUBLISHED,
    isFeatured: true,
    weight: 231,
    thickness: 16,
    material: "T700 Raw Carbon Fiber",
    coreMaterial: "16mm Thermoformed 核心",
    surfaceMaterial: "T700 Raw Carbon Fiber",
    controlScore: 88,
    powerScore: 87,
    spinScore: 91,
    forgivenessScore: 86,
    feelScore: 88,
    suitableFor: [SuitableFor.INTERMEDIATE, SuitableFor.ADVANCED, SuitableFor.SINGLES, SuitableFor.DOUBLES],
    mainImage: `${CDN}/2_Q2_Elongated_16mm_Angled.webp?v=1776134105`,
    gallery: [
      `${CDN}/2_Q2_Elongated_16mm_Angled.webp?v=1776134105`,
      `${CDN}/1.webp?v=1776134104`,
      `${CDN}/3.webp?v=1776134104`,
      `${CDN}/3_Q2_Elongated_16mm_Side.webp?v=1776134105`,
      `${CDN}/1_Q2_Elongated_16mm_Straight.webp?v=1776134105`,
      `${CDN}/2_Q2_Widebody_16mm_Angled.webp?v=1776134105`,
    ],
    description: `**RPM Q2 — 精確調校，為您的球風而生**\n\nRPM Q2 系列是品牌旗下的「全能型旗艦」，提供兩種拍型（長面/寬面）× 兩種核心厚度（14mm/16mm）共四種組合，讓你在統一的頂尖科技下找到最契合手感的黃金比例。\n\n**拍型選擇**\n\n**Elongated 長面型（16.5" x 7.5"）**\n更長的物理槓桿力，強大拍頭揮速，適合底線進攻與大揮拍球員。\n\n**Widebody 寬面型（16" x 8"）**\n更廣闊的甜蜜點，抗扭轉慣性更強，適合網前控球與高容錯率打法。\n\n**核心選擇**\n- **14mm**：更強回彈（Pop），揮拍更快，適合進攻型\n- **16mm**：更穩定緩震，重設更有把握，適合控球型\n\n**核心共享技術**\n- T700 Raw Carbon Fiber\n- Thermoformed Unibody 熱壓一體成型\n- Aerodynamic Aero-Curvature 弧形封邊\n- Perimeter Foam Injection 邊緣泡沫注入`,
    specs: {
      長面尺寸: "16.5\" x 7.5\"",
      寬面尺寸: "16\" x 8\"",
      核心選擇: "14mm / 16mm",
      重量範圍: "7.9–8.1 oz",
      拍面材質: "T700 Raw Carbon Fiber",
      技術: "Thermoformed Unibody, Aero-Curvature",
    },
    faq: [
      { question: "長面還是寬面好？該怎麼選？", answer: "如果你喜歡底線大力抽球，選長面；如果你注重網前穩定放小球，選寬面。單打球員偏好長面，雙打球員偏好寬面。" },
      { question: "14mm 還是 16mm 核心？", answer: "初中階球員建議 16mm，控球更穩定。進階球員若追求更強攻擊力選 14mm。" },
      { question: "RPM Q2 和 Selkirk OMNI 哪個比較好？", answer: "兩者都是頂級旗艦，各有特色。RPM Q2 提供更多拍型選擇（長/寬 × 薄/厚），Selkirk OMNI 勝在 InfiniGrit™ 永久拍面技術。" },
    ],
  });
  ids["rpm-q2"] = p18.id;

  const p19 = await upsertProduct({
    name: "RPM Friction Pro 16mm Elongated V2 匹克球拍",
    slug: "rpm-friction-pro-16-v2",
    sku: "RPM-FP-16-V2",
    brandId: brandIds["rpm"],
    categoryId: catIds["paddles"],
    price: 7500,
    stock: 0,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 229,
    thickness: 16,
    material: "Raw Carbon Fiber",
    coreMaterial: "16mm Thermoformed 核心",
    controlScore: 87,
    powerScore: 85,
    spinScore: 93,
    forgivenessScore: 84,
    feelScore: 87,
    suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES],
    mainImage: `${CDN}/rpm-friction-pro-16-v2-main.webp`,
    gallery: [`${CDN}/rpm-friction-pro-16-v2-main.webp`],
    description: `**RPM Friction Pro 16mm Elongated V2 — 旋轉專家的首選**\n\nFriction Pro V2 系列以極致摩擦係數為設計核心，在 RPM 所有系列中提供最強的旋轉效果。加長型拍身搭配 16mm 核心，讓旋轉球員能打出更具威脅性的上旋球與側旋球。（目前售完，補貨通知請登記）`,
    specs: { 重量: "7.9–8.2 oz", 核心厚度: "16mm", 版本: "V2 升級版" },
    faq: [],
  });
  ids["rpm-friction-pro-16-v2"] = p19.id;

  const p20 = await upsertProduct({
    name: "RPM Friction Pro 14mm Elongated V2 Ryan Fu 聯名款",
    slug: "rpm-friction-pro-14-v2-ryan-fu",
    sku: "RPM-FP-14-V2-RF",
    brandId: brandIds["rpm"],
    categoryId: catIds["paddles"],
    price: 7500,
    stock: 0,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 225,
    thickness: 14,
    material: "Raw Carbon Fiber",
    coreMaterial: "14mm Thermoformed 核心",
    controlScore: 82,
    powerScore: 90,
    spinScore: 93,
    forgivenessScore: 80,
    feelScore: 85,
    suitableFor: [SuitableFor.ADVANCED, SuitableFor.SINGLES],
    mainImage: `${CDN}/rpm-friction-pro-14-ryan-fu-main.webp`,
    gallery: [`${CDN}/rpm-friction-pro-14-ryan-fu-main.webp`],
    description: `**RPM Friction Pro 14mm V2 Ryan Fu 聯名款 — 職業選手同款**\n\n與職業選手 Ryan Fu 聯名打造，14mm 超薄核心提供最強回彈力，旋轉效果達到 RPM 系列頂點。（目前售完，補貨通知請登記）`,
    specs: { 重量: "7.7–8.0 oz", 核心厚度: "14mm", 聯名: "Ryan Fu 職業選手聯名版" },
    faq: [],
  });
  ids["rpm-friction-pro-14-v2-ryan-fu"] = p20.id;

  const p21 = await upsertProduct({
    name: "RPM Friction Pro 16mm Elongated V1 匹克球拍",
    slug: "rpm-friction-pro-16-v1",
    sku: "RPM-FP-16-V1",
    brandId: brandIds["rpm"],
    categoryId: catIds["paddles"],
    price: 7450,
    salePrice: 7840,
    stock: 7,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    weight: 228,
    thickness: 16,
    material: "Raw Carbon Fiber",
    coreMaterial: "16mm Thermoformed 核心",
    controlScore: 86,
    powerScore: 84,
    spinScore: 91,
    forgivenessScore: 83,
    feelScore: 86,
    suitableFor: [SuitableFor.ADVANCED],
    mainImage: `${CDN}/rpm-friction-pro-16-v1-main.webp`,
    gallery: [`${CDN}/rpm-friction-pro-16-v1-main.webp`],
    description: `**RPM Friction Pro 16mm V1 — 前代旗艦，特價優惠**\n\nV1 版本的 Friction Pro 16mm，與 V2 核心技術相同，外觀配色有所調整。目前特價促銷，是以最高 CP 值入手 RPM 旗艦級球拍的好機會。`,
    specs: { 重量: "7.9–8.2 oz", 核心厚度: "16mm", 版本: "V1 前代版本" },
    faq: [],
  });
  ids["rpm-friction-pro-16-v1"] = p21.id;

  // ── Bundle ───────────────────────────────────────────────────

  const p22 = await upsertProduct({
    name: "Selkirk SLK Atlas Max 雙拍豪華套裝組（含 3 球 + 收納包）",
    slug: "selkirk-slk-atlas-max-bundle",
    sku: "SK-SLK-ATLAS-BUNDLE",
    brandId: brandIds["selkirk"],
    categoryId: catIds["paddles"],
    price: 4140,
    stock: 8,
    status: ProductStatus.PUBLISHED,
    isFeatured: true,
    weight: 228,
    thickness: 16,
    material: "石墨碳纖維",
    coreMaterial: "16mm Polymer 核心",
    controlScore: 84,
    powerScore: 78,
    spinScore: 81,
    forgivenessScore: 88,
    feelScore: 83,
    suitableFor: [SuitableFor.BEGINNER, SuitableFor.INTERMEDIATE, SuitableFor.DOUBLES],
    mainImage: `${CDN}/selkirk-slk-atlas-max-bundle-main.webp`,
    gallery: [`${CDN}/selkirk-slk-atlas-max-bundle-main.webp`],
    description: `**Selkirk SLK Atlas Max 雙拍豪華套裝 — 最超值的入門首選**\n\n套裝內容：\n- **2 支** Selkirk SLK Atlas Max 球拍（16mm 石墨碳纖維）\n- **3 顆** Selkirk 匹克球\n- **1 個** 專屬收納包\n\n適合家庭、情侶、朋友一起開始打匹克球。以一組的價格獲得完整的雙人裝備，是送禮或入門的最佳選擇。`,
    specs: {
      套裝內容: "2 支球拍 + 3 顆球 + 收納包",
      核心厚度: "16mm",
      拍面材質: "石墨碳纖維",
    },
    faq: [
      { question: "Atlas Max Bundle 適合剛開始打匹克球的人嗎？", answer: "非常適合！Atlas Max 16mm 石墨碳纖維拍面提供優秀的控球手感，大甜區讓初學者能更快享受擊球樂趣。" },
    ],
  });
  ids["selkirk-slk-atlas-max-bundle"] = p22.id;

  // ── Balls ─────────────────────────────────────────────────────

  const p23 = await upsertProduct({
    name: "Selkirk Pro S1 專業比賽型匹克球（單入裝）",
    slug: "selkirk-pro-s1-ball",
    sku: "SK-BALL-S1",
    brandId: brandIds["selkirk"],
    categoryId: catIds["balls"],
    price: 90,
    stock: 200,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/selkirk-pro-s1-ball-main.webp`,
    gallery: [`${CDN}/selkirk-pro-s1-ball-main.webp`],
    description: `**Selkirk Pro S1 — 職業賽事指定用球**\n\nSelkirk Pro S1 是 Selkirk 自家研發的高性能比賽用球，採用專為戶外場地優化的設計，提供穩定的飛行軌跡與耐用性。每顆球均通過嚴格品管，確保一致的彈跳性能。\n\n適合：戶外場地、競技比賽、日常練習`,
    specs: { 類型: "室外比賽用球", 認證: "USAPA 認可", 包裝: "單入裝" },
    faq: [],
  });
  ids["selkirk-pro-s1-ball"] = p23.id;

  const p24 = await upsertProduct({
    name: "Franklin X-40 USAPA 賽事指定匹克球",
    slug: "franklin-x40-ball",
    sku: "FK-X40-BALL",
    brandId: brandIds["franklin"],
    categoryId: catIds["balls"],
    price: 100,
    salePrice: 110,
    stock: 150,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/franklin-x40-ball-main.webp`,
    gallery: [`${CDN}/franklin-x40-ball-main.webp`],
    description: `**Franklin X-40 — 全美使用率第一的賽事用球**\n\nFranklin X-40 是 USAPA（美國匹克球協會）官方認可的賽事指定用球，也是全美使用率最高的匹克球。40 孔設計提供最佳空氣動力學性能，耐用性與飛行穩定性均達到職業賽事標準。\n\n適合：所有程度球員、戶外場地、正式比賽`,
    specs: { 類型: "室外比賽用球", 認證: "USAPA 官方認可賽事指定", 孔數: "40 孔", 製造: "美國 Franklin Sports" },
    faq: [
      { question: "Franklin X-40 和其他匹克球有什麼差別？", answer: "X-40 是全美最多職業賽事採用的比賽球，品質穩定性、耐用性和飛行軌跡的一致性是業界標竿。" },
    ],
  });
  ids["franklin-x40-ball"] = p24.id;

  // ── Paddle Protection ─────────────────────────────────────────

  const p25 = await upsertProduct({
    name: "RPM Paddle Cover 氯丁橡膠球拍保護套",
    slug: "rpm-paddle-cover",
    sku: "RPM-COVER-001",
    brandId: brandIds["rpm"],
    categoryId: catIds["paddle-protection"],
    price: 350,
    stock: 30,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/rpm-paddle-cover-main.webp`,
    gallery: [`${CDN}/rpm-paddle-cover-main.webp`],
    description: `**RPM Paddle Cover — 頂級氯丁橡膠防護**\n\n採用高品質氯丁橡膠（Neoprene）材質，提供優異的防震、防刮與防潮保護。全型號通用設計，適合所有標準尺寸球拍。磁扣式開合，方便快速取放。`,
    specs: { 材質: "氯丁橡膠 (Neoprene)", 相容: "全型號通用", 特色: "防震 / 防刮 / 防潮" },
    faq: [],
  });
  ids["rpm-paddle-cover"] = p25.id;

  const p26 = await upsertProduct({
    name: "EVERYDAY SOCIAL® GRAN CLASS GOLD 金織紋球拍保護套",
    slug: "everyday-gran-class-gold-cover",
    sku: "ES-GC-GOLD-COVER",
    brandId: brandIds["everyday-social"],
    categoryId: catIds["paddle-protection"],
    price: 450,
    stock: 20,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/everyday-gran-class-gold-cover-main.webp`,
    gallery: [`${CDN}/everyday-gran-class-gold-cover-main.webp`],
    description: `**EVERYDAY SOCIAL® GRAN CLASS GOLD — 大師系列頂級保護套**\n\n專為 Gran Class 系列球拍設計的頂級保護套，採用金色織紋外觀設計，與 Gran Class 球拍的賽車美學完美呼應。內裡軟絨材質，防刮又顯奢華。`,
    specs: { 材質: "金織紋外層 + 軟絨內裡", 設計: "Gran Class 系列專屬配色" },
    faq: [],
  });
  ids["everyday-gran-class-gold-cover"] = p26.id;

  const p27 = await upsertProduct({
    name: "RESET® 專業球拍清潔套組（噴劑＋擦拭布）",
    slug: "reset-paddle-cleaning-kit",
    sku: "RESET-CLEAN-KIT",
    brandId: brandIds["franklin"],
    categoryId: catIds["paddle-protection"],
    price: 525,
    stock: 25,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/reset-paddle-cleaning-main.webp`,
    gallery: [`${CDN}/reset-paddle-cleaning-main.webp`],
    description: `**RESET® 專業球拍清潔套組 — PPA Tour 官方指定**\n\nRESET® 是 PPA Tour（Professional Pickleball Association Tour）官方指定的拍面清潔品牌。清潔套組包含專業清潔噴劑與微纖維擦拭布，能有效去除拍面污垢、油脂，恢復碳纖維表面的最佳摩擦係數。\n\n套組內容：清潔噴劑 × 1 + 微纖維擦拭布 × 1`,
    specs: { 內容物: "清潔噴劑 + 微纖維擦拭布", 認可: "PPA Tour 官方指定品牌", 適用: "所有碳纖維拍面" },
    faq: [
      { question: "多久需要清潔一次球拍？", answer: "建議每 3-5 場球後清潔一次。若拍面出現滑溜感（旋轉效果下降），即可使用 RESET® 套組恢復拍面摩擦力。" },
    ],
  });
  ids["reset-paddle-cleaning-kit"] = p27.id;

  const p28 = await upsertProduct({
    name: "專業匹克球拍拉鍊保護套",
    slug: "paddle-zip-cover",
    sku: "GENERIC-COVER-ZIP",
    brandId: brandIds["franklin"],
    categoryId: catIds["paddle-protection"],
    price: 135,
    stock: 40,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/paddle-zip-cover-main.webp`,
    gallery: [`${CDN}/paddle-zip-cover-main.webp`],
    description: `**專業匹克球拍拉鍊保護套 — 最實惠的全方位防護**\n\n採用耐磨外層材質搭配拉鍊設計，提供球拍全面的防震、防刮保護。輕巧好攜帶，適合通勤球員與需要頻繁移動的玩家。`,
    specs: { 材質: "耐磨外層 + 內裡緩震層", 開合方式: "拉鍊" },
    faq: [],
  });
  ids["paddle-zip-cover"] = p28.id;

  const p29 = await upsertProduct({
    name: "Selkirk Premium Paddle Case 高端球拍保護套",
    slug: "selkirk-premium-paddle-case",
    sku: "SK-PREMIUM-CASE",
    brandId: brandIds["selkirk"],
    categoryId: catIds["paddle-protection"],
    price: 640,
    stock: 18,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/selkirk-premium-paddle-case-main.webp`,
    gallery: [`${CDN}/selkirk-premium-paddle-case-main.webp`],
    description: `**Selkirk Premium Paddle Case — 官方旗艦保護套**\n\nSelkirk 官方出品的頂級球拍保護套，多色可選，全型號相容。雙層防護結構確保球拍在任何環境下都得到最完善的保護。`,
    specs: { 特色: "多色可選、全型號相容、雙層防護" },
    faq: [],
  });
  ids["selkirk-premium-paddle-case"] = p29.id;

  const p30 = await upsertProduct({
    name: "專業匹克球拍清潔橡皮擦",
    slug: "paddle-eraser",
    sku: "GENERIC-ERASER",
    brandId: brandIds["franklin"],
    categoryId: catIds["paddle-protection"],
    price: 100,
    stock: 0,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/paddle-eraser-main.webp`,
    gallery: [`${CDN}/paddle-eraser-main.webp`],
    description: `**專業球拍清潔橡皮擦 — 瞬間恢復拍面摩擦力**\n\n針對碳纖維拍面設計的專業清潔橡皮擦，輕輕摩擦即可去除污垢，瞬間恢復拍面的旋轉效果。體積小巧，可放入球袋隨身攜帶。（目前售完）`,
    specs: { 用途: "碳纖維拍面清潔與摩擦力恢復" },
    faq: [],
  });
  ids["paddle-eraser"] = p30.id;

  // ── Accessories ───────────────────────────────────────────────

  const p31 = await upsertProduct({
    name: "EVERYDAY SOCIAL® Classic Grip Tape 外層握把布（三入裝）",
    slug: "everyday-classic-grip-tape",
    sku: "ES-GRIP-CLASSIC-3PK",
    brandId: brandIds["everyday-social"],
    categoryId: catIds["accessories"],
    price: 330,
    stock: 60,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/classic-grip-tape-3-grips-winter-white-4544695.webp?v=1774520404`,
    gallery: [
      `${CDN}/classic-grip-tape-3-grips-winter-white-4544695.webp?v=1774520404`,
      `${CDN}/classic-grip-tape-3-grips-winter-white-7133774.webp?v=1774520405`,
    ],
    description: `**EVERYDAY SOCIAL® Classic Grip Tape — 最受歡迎的外層握把布**\n\n三入裝超值組合，提供優異的吸汗效果與舒適抓握感。採用高質感面料，纏繞後服貼手型，讓你在長時間比賽中維持最佳手感控制。\n\n適合所有匹克球拍，簡單纏繞即可完成更換。`,
    specs: { 包裝: "三入裝", 顏色: "冬日白 / 多色可選", 適用: "所有匹克球拍" },
    faq: [
      { question: "多久需要更換握把布？", answer: "建議每 20-30 場球更換一次，或當握把布出現滑溜感、表面磨損時即可更換。" },
    ],
  });
  ids["everyday-classic-grip-tape"] = p31.id;

  const p32 = await upsertProduct({
    name: "EVERYDAY SOCIAL® Classic Crew Socks 專業匹克球中筒襪",
    slug: "everyday-classic-crew-socks",
    sku: "ES-SOCKS-CREW",
    brandId: brandIds["everyday-social"],
    categoryId: catIds["accessories"],
    price: 330,
    stock: 50,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/tw-11134207-81ztj-mj88idz7i2gz67.jpg?v=1770794766`,
    gallery: [
      `${CDN}/tw-11134207-81ztj-mj88idz7i2gz67.jpg?v=1770794766`,
      `${CDN}/tw-11134207-81ztd-mj88idzn6qrq83.jpg?v=1770794766`,
    ],
    description: `**EVERYDAY SOCIAL® Classic Crew Socks — 專為匹克球設計的運動中筒襪**\n\n採用高機能運動面料，提供優異的吸濕排汗性能，搭配足弓支撐與腳跟加厚設計，讓你在球場上保持舒適腳感。EVERYDAY SOCIAL® 品牌刺繡，球場上的時尚細節。`,
    specs: { 類型: "中筒運動襪", 特色: "吸濕排汗 / 足弓支撐 / 腳跟加厚" },
    faq: [],
  });
  ids["everyday-classic-crew-socks"] = p32.id;

  const p33 = await upsertProduct({
    name: "EVERYDAY SOCIAL® The Competition Paddle Bag 競賽級球包",
    slug: "everyday-competition-paddle-bag",
    sku: "ES-BAG-COMP",
    brandId: brandIds["everyday-social"],
    categoryId: catIds["accessories"],
    price: 4500,
    stock: 12,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/everyday-competition-bag-main.webp`,
    gallery: [`${CDN}/everyday-competition-bag-main.webp`],
    description: `**EVERYDAY SOCIAL® Competition Paddle Bag — 職業球員的行頭**\n\n專業競賽級後背旅行球包，擁有隔熱球拍倉（可容納 2-3 支球拍）、獨立鞋艙、大容量主艙。兩色可選：黑色與白色。\n\n功能特色：\n- 隔熱球拍倉：保護球拍免受高溫影響\n- 獨立鞋艙：球鞋與衣物分開收納\n- 防水材質：全天候使用`,
    specs: {
      顏色: "黑色 / 白色",
      特色: "隔熱球拍倉 / 獨立鞋艙 / 防水材質",
      容量: "競賽級大容量後背包",
    },
    faq: [],
  });
  ids["everyday-competition-paddle-bag"] = p33.id;

  const p34 = await upsertProduct({
    name: "Selkirk Vanguard Geo Grip 幾何壓紋握把布",
    slug: "selkirk-vanguard-geo-grip",
    sku: "SK-GRIP-GEO",
    brandId: brandIds["selkirk"],
    categoryId: catIds["accessories"],
    price: 310,
    stock: 45,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/selkirk-vanguard-geo-grip-main.webp`,
    gallery: [`${CDN}/selkirk-vanguard-geo-grip-main.webp`],
    description: `**Selkirk Vanguard Geo Grip — 幾何壓紋高性能握把布**\n\nVanguard Geo Grip 採用獨特的幾何壓紋設計，在提供優異抓握感的同時減少手掌滑動。專業灰配色低調大方，適合所有球拍款式。`,
    specs: { 顏色: "專業灰", 特色: "幾何壓紋設計" },
    faq: [],
  });
  ids["selkirk-vanguard-geo-grip"] = p34.id;

  const p35 = await upsertProduct({
    name: "Selkirk Sport Tacky Overgrip 高黏性握把布（三入裝）",
    slug: "selkirk-sport-tacky-overgrip-3pk",
    sku: "SK-GRIP-TACKY-3PK",
    brandId: brandIds["selkirk"],
    categoryId: catIds["accessories"],
    price: 210,
    stock: 55,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/selkirk-tacky-overgrip-main.webp`,
    gallery: [`${CDN}/selkirk-tacky-overgrip-main.webp`],
    description: `**Selkirk Sport Tacky Overgrip — 三入超值組**\n\n高黏性表面設計，讓握把在潮濕環境或手汗較多時依然提供穩定抓握感。Selkirk 官方出品，三入裝超值組合。`,
    specs: { 包裝: "三入裝", 特色: "高黏性 Tacky 表面" },
    faq: [],
  });
  ids["selkirk-sport-tacky-overgrip-3pk"] = p35.id;

  const p36 = await upsertProduct({
    name: "Selkirk Comfort Grip 吸汗緩震握把布",
    slug: "selkirk-comfort-grip",
    sku: "SK-GRIP-COMFORT",
    brandId: brandIds["selkirk"],
    categoryId: catIds["accessories"],
    price: 250,
    stock: 40,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/selkirk-comfort-grip-main.webp`,
    gallery: [`${CDN}/selkirk-comfort-grip-main.webp`],
    description: `**Selkirk Comfort Grip — 舒適吸汗緩震設計**\n\n以舒適度為設計核心，厚實的緩震材質減少長時間握拍的疲勞感，吸汗面料保持手掌乾爽。適合需要長時間比賽或手腕容易疲勞的球員。`,
    specs: { 特色: "吸汗 / 緩震 / 舒適", 包裝: "單入裝" },
    faq: [],
  });
  ids["selkirk-comfort-grip"] = p36.id;

  const p37 = await upsertProduct({
    name: "RPM Pro Performance Overgrip 握把布（4入裝）",
    slug: "rpm-pro-performance-overgrip-4pk",
    sku: "RPM-GRIP-PRO-4PK",
    brandId: brandIds["rpm"],
    categoryId: catIds["accessories"],
    price: 360,
    stock: 35,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/rpm-pro-overgrip-main.webp`,
    gallery: [`${CDN}/rpm-pro-overgrip-main.webp`],
    description: `**RPM Pro Performance Overgrip — 四入超值組**\n\n提供 DRY（乾爽型）與 TACKY（黏感型）兩款選擇，黑白雙色任選。四入裝確保你長期備有高品質握把布，維持最佳手感。`,
    specs: { 包裝: "四入裝", 類型: "DRY 乾爽型 / TACKY 黏感型", 顏色: "黑色 / 白色" },
    faq: [],
  });
  ids["rpm-pro-performance-overgrip-4pk"] = p37.id;

  const p38 = await upsertProduct({
    name: "Selkirk Core Day Bag 極簡輕量匹克球後背包",
    slug: "selkirk-core-day-bag",
    sku: "SK-BAG-CORE",
    brandId: brandIds["selkirk"],
    categoryId: catIds["accessories"],
    price: 1600,
    stock: 15,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/selkirk-core-day-bag-main.webp`,
    gallery: [`${CDN}/selkirk-core-day-bag-main.webp`],
    description: `**Selkirk Core Day Bag — 日常首選的極簡球包**\n\nSelkirk 官方出品的輕量化日常後背包，可容納 1-2 支球拍、球、握把布等基本裝備。極簡設計適合通勤球員，輕巧不累贅。`,
    specs: { 容量: "適合 1-2 支球拍與基本裝備", 特色: "輕量化 / 極簡設計" },
    faq: [],
  });
  ids["selkirk-core-day-bag"] = p38.id;

  const p39 = await upsertProduct({
    name: "RPM Signature Hat 專業運動機能老帽（純黑限定版）",
    slug: "rpm-signature-hat",
    sku: "RPM-HAT-SIG",
    brandId: brandIds["rpm"],
    categoryId: catIds["accessories"],
    price: 1500,
    stock: 20,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/rpm-signature-hat-main.webp`,
    gallery: [`${CDN}/rpm-signature-hat-main.webp`],
    description: `**RPM Signature Hat — 職業選手同款機能老帽**\n\n採用吸濕排汗面料，搭配高效透氣網眼設計，讓你在烈日下的室外場地保持清涼。經典純黑配色低調有型，RPM 品牌刺繡彰顯身份。`,
    specs: { 顏色: "經典純黑", 特色: "吸濕排汗 / 高效透氣", 版本: "Signature 限定版" },
    faq: [],
  });
  ids["rpm-signature-hat"] = p39.id;

  const p40 = await upsertProduct({
    name: "專業球拍加重貼片（10入裝）",
    slug: "paddle-lead-tape-10pk",
    sku: "GENERIC-LEAD-TAPE-10",
    brandId: brandIds["franklin"],
    categoryId: catIds["accessories"],
    price: 120,
    stock: 80,
    status: ProductStatus.PUBLISHED,
    isFeatured: false,
    mainImage: `${CDN}/paddle-lead-tape-main.webp`,
    gallery: [`${CDN}/paddle-lead-tape-main.webp`],
    description: `**專業球拍加重貼片 — 精準調校你的球拍重量分佈**\n\n10 入裝鉛帶貼片，讓你自由調整球拍的重量分佈，改變甜區位置與打感。貼在拍框頂部增加力量，貼在兩側增加穩定性。進階球員的客製化神器。\n\n使用方法：\n- 貼頂部（12點）：增加力量與殺球威力\n- 貼兩側（3、9點）：增加甜區寬度與穩定性\n- 貼底部：降低重心，提升控球性`,
    specs: { 包裝: "10 入裝", 用途: "球拍重量調校", 適用: "所有匹克球拍" },
    faq: [
      { question: "加重貼片會影響球拍保固嗎？", answer: "一般而言，合理使用加重貼片不會影響保固。但建議不要過度增重，每次增加 2-4g 即可，總增重不超過 10g。" },
    ],
  });
  ids["paddle-lead-tape-10pk"] = p40.id;

  console.log(`\n  總計建立 ${Object.keys(ids).length} 件商品`);
  return ids;
}

// ============================================================
// SEO META
// ============================================================

async function seedSeoMeta(brandIds: Record<string, string>, catIds: Record<string, string>, productIds: Record<string, string>) {
  const entries = [
    // Brands
    { entityType: "brand", entityId: brandIds["selkirk"], title: "Selkirk Sports 球拍系列 | SP Pickleball 台灣官方授權", description: "Selkirk Sports 在台灣唯一授權經銷商。OMNI™、BOOMSTIK™、SLK 系列全線現貨，免費台灣本島運費，專業售後服務。", ogImage: `${CDN}/vertical_PNG_3000x4000-Selkirk-Omni-Elongated-1776-01.webp?v=1781491440` },
    { entityType: "brand", entityId: brandIds["everyday-social"], title: "Everyday Social 球拍系列 | SP Pickleball 台灣", description: "EVERYDAY SOCIAL® Gran Class PWR、ASAMA 18K 等旗艦球拍，台灣現貨免運。賽車美學遇上頂尖匹克球科技。", ogImage: `${CDN}/GRAN_CLASS_PWR_Green_black_rock_ad_logo_55dd828c-edd1-4c35-88ee-734d42b304da.webp?v=1780130059` },
    { entityType: "brand", entityId: brandIds["prokennex"], title: "ProKennex Black Ace 系列 | SP Pickleball 台灣", description: "ProKennex Black Ace 全系列現貨。獨家 Kinetic System 護肘科技，讓你打球零傷痛。台灣授權經銷，保固有保障。", ogImage: `${CDN}/prokennex-black-ace-cover.webp` },
    { entityType: "brand", entityId: brandIds["rpm"], title: "RPM 匹克球拍系列 | SP Pickleball 台灣", description: "RPM Q2 Thermoformed 系列全線現貨。長面/寬面、14mm/16mm 四種組合，找到最適合你球風的黃金比例。", ogImage: `${CDN}/2_Q2_Elongated_16mm_Angled.webp?v=1776134105` },
    // Categories
    { entityType: "category", entityId: catIds["paddles"], title: "匹克球拍推薦 2026 | SP Pickleball 台灣最強選擇", description: "精選 Selkirk、RPM、ProKennex、Everyday Social 等頂級品牌匹克球拍。從入門到職業，最專業的選購建議，台灣現貨快速出貨。", ogImage: `${CDN}/vertical_PNG_3000x4000-Selkirk-Omni-Elongated-1776-01.webp?v=1781491440` },
    { entityType: "category", entityId: catIds["balls"], title: "匹克球推薦 2026 | Franklin X-40、Selkirk Pro S1 台灣現貨", description: "USAPA 認可賽事用球，包括 Franklin X-40、Selkirk Pro S1 等頂級匹克球，台灣現貨免運。", ogImage: `${CDN}/franklin-x40-ball-main.webp` },
    { entityType: "category", entityId: catIds["paddle-protection"], title: "匹克球拍保護套推薦 | 保護你的高價球拍", description: "Selkirk、RPM、Everyday Social 球拍保護套，加上 RESET® 清潔套組，讓你的球拍維持最佳狀態。", ogImage: `${CDN}/rpm-paddle-cover-main.webp` },
    { entityType: "category", entityId: catIds["accessories"], title: "匹克球配件推薦 | 握把布、球包、運動帽 台灣現貨", description: "完整匹克球配件系列，包含握把布、球包、運動帽等，讓你的球場裝備升級。台灣免運，快速出貨。", ogImage: `${CDN}/classic-grip-tape-3-grips-winter-white-4544695.webp?v=1774520404` },
    // Key Products
    { entityType: "product", entityId: productIds["selkirk-omni"], title: "Selkirk OMNI™ 評測 2026 | 台灣最受推薦旗艦球拍", description: "Selkirk OMNI™ 搭載 ReactCore™ PureFoam 核心與 InfiniGrit™ 永久拍面，Widebody/Elongated 雙拍型任選。NT$9,930 台灣現貨免運。", ogImage: `${CDN}/vertical_PNG_3000x4000-Selkirk-Omni-Elongated-1776-01.webp?v=1781491440` },
    { entityType: "product", entityId: productIds["rpm-q2"], title: "RPM Q2 評測 2026 | 長面/寬面 14mm/16mm 完整解析", description: "RPM Q2 系列 4 款任選，Thermoformed Unibody 熱壓一體成型，T700 Raw Carbon Fiber 拍面。NT$7,500 台灣現貨。", ogImage: `${CDN}/2_Q2_Elongated_16mm_Angled.webp?v=1776134105` },
    { entityType: "product", entityId: productIds["everyday-gran-class-pwr"], title: "Everyday Social Gran Class PWR 評測 | 2026 最強泡棉核心", description: "EVERYDAY SOCIAL® Gran Class PWR 全新高密度泡棉核心技術，英倫綠/賽車紅兩款。NT$6,730 台灣免運。", ogImage: `${CDN}/tw-11134207-81ztm-mj8948ix0cg0c6.jpg?v=1770795589` },
    { entityType: "product", entityId: productIds["everyday-asama-18k-pwr"], title: "Everyday Social ASAMA 18K PWR | 台灣最強旋轉球拍", description: "ASAMA 18K PWR 採用稀有 18K 碳纖維編織拍面，旋轉效果業界最強。限量黑金版，NT$6,400 台灣現貨。", ogImage: `${CDN}/limited-pre-order-asama-black-gold-pwr-full-foam-gen4-5569061.webp?v=1777965278` },
    { entityType: "product", entityId: productIds["prokennex-black-ace-avenger-lg-11"], title: "ProKennex Black Ace Avenger LG 11 評測 | 護肘首選", description: "ProKennex Black Ace Avenger LG 11 搭載 Kinetic System 護肘科技，減少 22% 震動傳導。NT$6,910 台灣現貨。", ogImage: `${CDN}/prokennex-black-ace-avenger-lg11-main.webp` },
    { entityType: "product", entityId: productIds["selkirk-slk-atlas-max-bundle"], title: "Selkirk SLK Atlas Max 雙拍套裝 | 最超值入門組合", description: "2 支 Atlas Max 球拍 + 3 顆球 + 收納包，NT$4,140 起步匹克球之旅。適合家庭與情侶一起入門。", ogImage: `${CDN}/selkirk-slk-atlas-max-bundle-main.webp` },
  ];

  let count = 0;
  for (const e of entries) {
    await prisma.seoMeta.upsert({
      where: { entityId: e.entityId },
      update: { ...e, twitterCard: "summary_large_image", inSitemap: true },
      create: { ...e, twitterCard: "summary_large_image", inSitemap: true },
    });
    count++;
  }
  console.log(`  ✓ SEO Meta: ${count} 筆`);
}

// ============================================================
// GEO CONTENT
// ============================================================

async function seedGeoContent(productIds: Record<string, string>) {
  const entries = [
    {
      entityType: "product",
      entityId: productIds["selkirk-omni"],
      aiSummary: "Selkirk OMNI™ 是 2025-2026 年台灣最受推薦的旗艦匹克球拍，搭載四項全新專利技術。適合中階至職業球員，提供全方位均衡表現，是想在力量與控制間取得完美平衡的競技玩家的終極選擇。",
      aiQuickAnswer: "Selkirk OMNI™ 售價 NT$9,930，適合中階至職業球員，提供卓越的控球手感與旋轉效果。Widebody 適合雙打控球，Elongated 適合底線進攻。",
      pros: ["ReactCore™ PureFoam 核心能量回饋卓越", "InfiniGrit™ 永久拍面不衰減", "兩種拍型滿足不同打法", "全方位均衡表現"],
      cons: ["售價較高（NT$9,930）", "新手可能需要時間適應"],
      suitableFor: ["中階球員", "進階競技球員", "雙打球員", "底線進攻型"],
      notSuitableFor: ["預算有限的初學者", "輕度娛樂型球員"],
      aiFaq: [
        { question: "台灣可以買到 Selkirk OMNI™ 嗎？", answer: "是的，SP Pickleball 是台灣授權經銷商，提供原廠正品保證與完整售後服務，台灣本島免運費。" },
        { question: "Selkirk OMNI™ 值得 NT$9,930 嗎？", answer: "對於認真的競技玩家而言，OMNI™ 的四項專利技術確實帶來顯著的性能提升，尤其是 InfiniGrit™ 永久拍面讓投資更具長期價值。" },
      ],
    },
    {
      entityType: "product",
      entityId: productIds["rpm-q2"],
      aiSummary: "RPM Q2 是 2026 年台灣最具彈性選擇的旗艦球拍，提供長面/寬面 × 14mm/16mm 四種組合。Thermoformed Unibody 熱壓一體成型技術確保頂尖結構強度，T700 原生碳纖維拍面提供卓越旋轉效果。",
      aiQuickAnswer: "RPM Q2 售價 NT$7,500（特惠價），是目前台灣性價比最高的旗艦球拍之一。提供 4 種規格選擇，適合各種打法的中高階球員。",
      pros: ["四種規格滿足所有打法", "Thermoformed 最高結構強度", "T700 原生碳纖維頂尖旋轉", "售價相對合理"],
      cons: ["選擇多可能讓初學者困惑", "Thermoformed 球拍維修成本較高"],
      suitableFor: ["中高階球員", "想自訂規格的球員", "進攻型與控球型均適合"],
      notSuitableFor: ["初學者", "預算在 NT$5,000 以下者"],
      aiFaq: [
        { question: "RPM Q2 四種規格我該選哪個？", answer: "雙打注重控球：選 Widebody 16mm。單打底線進攻：選 Elongated 14mm。全方位均衡：選 Elongated 16mm。網前快速反應：選 Widebody 14mm。" },
        { question: "RPM Q2 和 Selkirk OMNI™ 哪個比較適合台灣球員？", answer: "RPM Q2 提供更多規格選擇與略低的售價；Selkirk OMNI™ 的 InfiniGrit™ 技術更具長期價值。預算充裕選 OMNI™，想自訂規格選 Q2。" },
      ],
    },
    {
      entityType: "product",
      entityId: productIds["prokennex-black-ace-avenger-lg-11"],
      aiSummary: "ProKennex Black Ace Avenger LG 11 是台灣護肘族群的最佳選擇，獨家 Kinetic System 臨床認證可減少 22% 震動傳導。LG 超長握把設計特別適合從網球轉打匹克球的球員。",
      aiQuickAnswer: "若你有網球肘問題或從網球轉打匹克球，ProKennex Black Ace Avenger LG 11（NT$6,910）是台灣最推薦的護肘球拍，Kinetic System 效果有臨床數據佐證。",
      pros: ["Kinetic System 護肘科技有臨床佐證", "LG 超長握把適合網球轉換球員", "11mm 薄核提供強攻擊力", "整體品質優異"],
      cons: ["11mm 核心甜區較小，控球難度較高", "價格偏高（NT$6,910）"],
      suitableFor: ["有手肘問題的球員", "網球轉匹克球玩家", "進攻型球員", "習慣雙手反拍者"],
      notSuitableFor: ["初學者", "追求極致控球的球員"],
      aiFaq: [
        { question: "Kinetic System 對一般球員也有用嗎？", answer: "是的，即使你沒有手肘問題，Kinetic System 帶來的震動吸收效果也能減少長時間打球的疲勞感，讓你打得更久、更舒適。" },
      ],
    },
    {
      entityType: "product",
      entityId: productIds["everyday-gran-class-pwr"],
      aiSummary: "EVERYDAY SOCIAL® Gran Class PWR 是 2026 年台灣最受矚目的新品，全新 High-Density Foam Core 技術突破 16mm 球拍的力量限制，英倫綠與賽車紅配色成為球場上的視覺焦點。",
      aiQuickAnswer: "Gran Class PWR 以 NT$6,730（原價 NT$7,080）提供旗艦級泡棉核心技術，是 2026 年台灣最具性價比的旗艦球拍選擇之一。",
      pros: ["全新 Foam Core 爆發力大幅提升", "16mm 厚核兼顧控制與力量", "賽車美學外觀極具吸引力", "目前特惠價格"],
      cons: ["加長型設計（16.5\"）對小個子可能偏重", "泡棉核心耐久性仍待長期驗證"],
      suitableFor: ["中高階球員", "追求顏值與性能的球員", "雙打與單打均衡型"],
      notSuitableFor: ["初學者", "偏好傳統蜂巢核心手感者"],
      aiFaq: [
        { question: "Gran Class PWR 的泡棉核心和傳統蜂巢核心有什麼感受差異？", answer: "泡棉核心打起來更「實」、回彈感更飽滿，力量傳導更線性。蜂巢核心則更「空」、手感更輕盈靈活。" },
      ],
    },
  ];

  let count = 0;
  for (const e of entries) {
    await prisma.geoContent.upsert({
      where: { entityId: e.entityId },
      update: e,
      create: e,
    });
    count++;
  }
  console.log(`  ✓ GEO Content: ${count} 筆`);
}

// ============================================================
// ARTICLES
// ============================================================

async function seedArticles() {
  const articles = [
    {
      title: "2026 最強匹克球拍完整評測：Selkirk OMNI vs RPM Q2 vs ProKennex Black Ace",
      slug: "2026-best-pickleball-paddle-review",
      excerpt: "台灣最完整的三大旗艦球拍對決！本文從技術規格、實際打感、適合球員類型等面向深度比較 Selkirk OMNI™、RPM Q2 與 ProKennex Black Ace Avenger，幫你找到最適合自己的球拍。",
      coverImage: `${CDN}/2_Q2_Elongated_16mm_Angled.webp?v=1776134105`,
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date("2026-01-15"),
      tags: ["球拍評測", "Selkirk", "RPM", "ProKennex", "2026推薦"],
      readingTime: 12,
      content: `# 2026 最強匹克球拍完整評測

## 前言

2026 年匹克球拍市場百花齊放，但真正值得台灣球員投資的旗艦球拍，其實就是這三款：**Selkirk OMNI™**、**RPM Q2** 和 **ProKennex Black Ace Avenger**。本文從技術規格到實際上手打感，為你做最完整的比較。

---

## Selkirk OMNI™（NT$9,930）

### 核心技術亮點

Selkirk OMNI™ 的最大突破在於四項全新專利技術的整合：

**ReactCore™ PureFoam 核心**讓球拍的能量回饋達到前所未有的境界。相比傳統蜂巢核心，PureFoam 在吸收多餘震動的同時，能將更多能量直接回饋給擊球，讓你感覺「球彈得更遠、更穩」。

**InfiniGrit™ 永久拍面**解決了一個長期困擾球員的問題：碳纖維拍面的摩擦力會隨使用時間衰減。InfiniGrit™ 透過特殊處理讓旋轉效果長久維持，Selkirk 官測 200+ 小時後仍保持 95% 以上的原始性能。

### 適合誰？

- 追求長期投資價值的認真球員
- 雙打玩家（Widebody 型）
- 底線進攻好手（Elongated 型）

### 綜合評分：★★★★★

---

## RPM Q2（NT$7,500）

### 最大優勢：4 種規格完全客製

RPM Q2 的獨特之處在於提供**長面/寬面 × 14mm/16mm** 四種組合，讓每位球員都能找到最適合自己球風的規格。這是其他旗艦球拍做不到的。

**Thermoformed Unibody** 熱壓一體成型技術確保球拍結構強度業界最高，T700 原生碳纖維提供頂尖旋轉。

### 規格選購指南

| 打法 | 推薦規格 |
|------|---------|
| 雙打控球 | Widebody 16mm |
| 單打進攻 | Elongated 14mm |
| 全方位均衡 | Elongated 16mm |
| 網前快攻 | Widebody 14mm |

### 適合誰？

- 想自訂球拍規格的中高階球員
- 預算 NT$7,500 左右的玩家
- 進攻與控球均衡的全能型球員

### 綜合評分：★★★★½

---

## ProKennex Black Ace Avenger LG 11（NT$6,910）

### 護肘科技的革命

ProKennex Black Ace Avenger LG 11 的最大賣點是獨家 **Kinetic System 動能系統**。球拍框架內填充的鎢鋼微粒在擊球瞬間自動分散震動，臨床研究證實可減少 22% 的衝擊傳導至手肘。

對於有網球肘、手腕問題、或想預防運動傷害的球員，這不只是球拍，更是健康投資。

**LG 超長握把**設計讓有網球背景的球員能完美發揮雙手反拍技術。

### 適合誰？

- 有手肘或手腕問題的球員
- 從網球轉戰匹克球的球員
- 進攻型玩家（11mm 薄核）

### 綜合評分：★★★★½

---

## 總結比較表

| 項目 | Selkirk OMNI™ | RPM Q2 | ProKennex BA Avenger LG 11 |
|------|--------------|--------|---------------------------|
| 售價 | NT$9,930 | NT$7,500 | NT$6,910 |
| 最大優勢 | 永久拍面技術 | 4 種規格選擇 | 護肘科技 |
| 控球 | ★★★★★ | ★★★★ | ★★★★ |
| 力量 | ★★★★ | ★★★★ | ★★★★★ |
| 旋轉 | ★★★★★ | ★★★★★ | ★★★★ |
| 護肘 | ★★★ | ★★★ | ★★★★★ |
| 推薦族群 | 全能競技玩家 | 想客製規格者 | 護肘需求者 |

## 最終建議

- 🥇 **最佳全方位旗艦**：Selkirk OMNI™（預算充裕、追求長期價值）
- 🥈 **最佳客製化選擇**：RPM Q2（想找到精準符合球風的規格）
- 🥉 **最佳護肘首選**：ProKennex Black Ace Avenger LG 11（有傷病顧慮或網球轉換球員）

歡迎到 SP Pickleball 門市實際試握，或聯繫我們的球拍顧問獲取個人化建議！`,
    },
    {
      title: "初學者必看！如何選擇第一支匹克球拍（2026 完整選購指南）",
      slug: "beginner-pickleball-paddle-guide-2026",
      excerpt: "第一次買匹克球拍，面對市場上琳琅滿目的選擇，你需要知道什麼？本文從材質、重量、核心厚度到預算，用最簡單易懂的方式，幫初學者選出最適合的第一支球拍。",
      coverImage: `${CDN}/selkirk-slk-atlas-max-bundle-main.webp`,
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date("2026-02-01"),
      tags: ["初學者指南", "球拍選購", "新手推薦", "2026"],
      readingTime: 8,
      content: `# 初學者必看！如何選擇第一支匹克球拍

## 先了解自己的需求

選球拍之前，先問自己幾個問題：

1. **預算多少？** 入門球拍 NT$2,000–4,000，旗艦球拍 NT$6,000–10,000
2. **打算認真學還是休閒娛樂？** 休閒玩可以選較便宜的，認真練球建議直接投資中階以上
3. **之前有打過其他球類嗎？** 有網球背景建議看有 LG 握把的款式

---

## 材質：碳纖維 vs 石墨

**碳纖維拍面**
- 更強的旋轉效果
- 更高的力量回饋
- 售價通常較高
- 推薦：RPM Q2、Selkirk OMNI™

**石墨拍面**
- 觸球更柔和，手感更直接
- 控球感較好
- 適合剛入門的球員
- 推薦：Selkirk SLK Geo、SLK Atlas Max

**初學者建議**：先從石墨或入門碳纖維拍面開始，建立正確手感後再升級。

---

## 核心厚度：14mm vs 16mm

**16mm（推薦初學者）**
- 更大的甜區，容錯率更高
- 擊球更穩定，不容易失控
- 更好的控球感
- 適合雙打打法

**14mm（適合進階）**
- 回彈感更強，力量更大
- 甜區較小，需要更精準的擊球點
- 攻擊性更強
- 適合單打進攻型

**初學者建議**：從 16mm 開始，等打法穩定後再考慮換 14mm。

---

## 重量：輕 vs 重

- **7.5–8.0 oz**：輕量，手速快，適合女性與網前打法
- **8.0–8.5 oz**：標準，均衡，大多數球員的最佳選擇
- **8.5 oz 以上**：重量型，力量大，但手腕負擔較重

---

## 初學者最推薦球拍

### 預算 NT$4,000 以下

**Selkirk SLK Atlas Max 雙拍套裝（NT$4,140）**
包含 2 支球拍 + 3 顆球 + 收納包，是最超值的入門選擇，適合家庭、情侶或朋友一起開始。

**Selkirk SLK Geo（NT$3,160）**
Selkirk 品牌品質保證，石墨碳纖維拍面，16mm 厚核，大甜區，是認真入門者的最佳選擇。

### 預算 NT$4,000–6,000

**Selkirk SLK ERA Power（NT$5,700）**
介於入門與旗艦之間，T700 碳纖維拍面搭配 16mm 核心，是準備認真練球者的理想選擇。

---

## 常見初學者問題

**Q：入門球拍和貴的球拍差在哪裡？**
A：主要差在拍面材質（影響旋轉與耐久性）、核心技術（影響手感與保護）。入門者其實不需要最貴的球拍，但如果你打算認真練球，多投資在中階以上球拍會讓進步更快。

**Q：需要買品牌球拍嗎？**
A：強烈建議。品牌球拍不僅品質穩定，售後服務有保障，更重要的是能幫你建立正確手感。雜牌球拍的品質良莠不齊，可能讓你養成錯誤習慣。

**Q：第一支球拍需要買最貴的嗎？**
A：不需要。從 Selkirk SLK Geo（NT$3,160）起步完全足夠，等你確定真的愛上這項運動，再升級旗艦球拍也不遲。`,
    },
    {
      title: "匹克球在台灣 2026：場地、球友、選購完整指南",
      slug: "pickleball-taiwan-guide-2026",
      excerpt: "匹克球在台灣快速成長！從哪裡可以打球、怎麼找球友、選擇什麼裝備，這篇文章給你最完整的台灣匹克球入門指南。",
      coverImage: `${CDN}/vertical_PNG_3000x4000-Selkirk-Omni-Elongated-1776-01.webp?v=1781491440`,
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date("2026-02-15"),
      tags: ["台灣匹克球", "場地介紹", "球友社群", "入門指南"],
      readingTime: 10,
      content: `# 匹克球在台灣 2026：你需要知道的一切

## 什麼是匹克球（Pickleball）？

匹克球是美國成長最快的運動，結合了網球、桌球與羽球的元素。在一個比網球場小的場地上，用實心拍（Paddle）打一顆有洞的塑膠球（Pickleball）。規則簡單，老少皆宜，是最適合全家或朋友一起玩的球類運動之一。

## 台灣匹克球發展現況

自 2022 年起，匹克球在台灣開始快速普及：
- 全台匹克球場地數量持續增加，雙北地區尤其活躍
- 台灣匹克球協會（TPBA）積極推廣，定期舉辦全台賽事
- 越來越多網球場與羽球場開始劃設匹克球場線

## 台灣熱門匹克球場地

### 台北市
- 信義區市民廣場（戶外免費場地）
- 各大台北市立體育館（多有匹克球場地）
- 私人球館（需預約，設備完善）

### 新北市
- 新板特區附近多個公共球場
- 多個社區運動中心

### 其他城市
全台各縣市的全民運動中心陸續建置匹克球場，建議搜尋「[你的城市] 匹克球場地」查詢最新資訊。

## 如何找球友？

1. **社群媒體**：FB「台灣匹克球 Pickleball Taiwan」社團、IG 搜尋 #台灣匹克球
2. **LINE 群組**：各地都有地區性的匹克球 LINE 群
3. **球館公告**：許多球館有定期揪團練球活動
4. **SP Pickleball 社群**：追蹤我們的 IG 與 FB，定期舉辦球友活動

## 基本裝備費用

| 裝備 | 建議選擇 | 費用 |
|------|---------|------|
| 球拍（入門） | Selkirk SLK Geo | NT$3,160 |
| 球拍（雙人套裝） | Selkirk SLK Atlas Max Bundle | NT$4,140 |
| 比賽用球（3顆） | Franklin X-40 | NT$300 |
| 握把布（3入） | ES Classic Grip Tape | NT$330 |
| 球鞋 | 一般室內運動鞋即可 | NT$1,500+ |

**入門總費用估計**：約 NT$5,000–8,000 可完整裝備一位新球員。

## 匹克球 vs 網球 vs 羽球

| 項目 | 匹克球 | 網球 | 羽球 |
|------|--------|------|------|
| 場地大小 | 小（13.4m × 6.1m） | 大（23.8m × 10.9m） | 中（13.4m × 6.1m） |
| 學習難度 | ★★☆☆☆ | ★★★★☆ | ★★★☆☆ |
| 體力消耗 | 中等 | 高 | 高 |
| 老少皆宜 | ★★★★★ | ★★★☆☆ | ★★★☆☆ |
| 裝備費用 | 中等 | 高 | 中等 |

## 結語

匹克球的魅力在於它真的老少皆宜，而且上手速度非常快。大多數人第一天就能打出讓自己開心的球。如果你還在猶豫要不要嘗試，現在就是最好的時機！

歡迎加入 SP Pickleball 台灣社群，我們提供最專業的選球建議與定期球友活動。`,
    },
    {
      title: "ProKennex Black Ace 系列完整評測：Kinetic System 護肘科技深度解析",
      slug: "prokennex-black-ace-review-kinetic-system",
      excerpt: "ProKennex Black Ace 系列以獨家 Kinetic System 護肘科技聞名全球，但它真的有效嗎？本文深度解析 Black Ace 14mm、16mm、Avenger 11mm 三款，以及 LG 超長握把的使用體驗。",
      coverImage: `${CDN}/prokennex-black-ace-avenger-lg11-main.webp`,
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date("2026-03-01"),
      tags: ["ProKennex", "Black Ace", "護肘球拍", "Kinetic System", "評測"],
      readingTime: 10,
      content: `# ProKennex Black Ace 系列完整評測

## 品牌背景

ProKennex 是一個在台灣創立、卻在全球匹克球界享有盛名的品牌。他們的 Kinetic System 技術最初為網球拍設計，如今帶到匹克球拍上，成為護肘族群的福音。

## Kinetic System 是什麼？

簡單說：球拍框架內有一個密封的微型腔室，裡面填充了鎢鋼微粒。擊球瞬間，這些微粒在腔室中移動，**吸收並分散震動**，讓傳到手肘的衝擊減少 22%（臨床研究數據）。

這對以下球員特別重要：
- 有**網球肘**或**高爾夫球肘**的玩家
- 想預防手肘傷害的長期球員
- 手腕或前臂比較脆弱的球員

## Black Ace 系列各款比較

### Black Ace 14mm（NT$5,890）
最均衡的入門款，標準握把，14mm 薄核提供強烈回彈感。適合中高階想體驗 Kinetic System 的球員。

### Black Ace 16mm（NT$5,890）
最注重控球的款式，16mm 厚核大幅吸收震動，護肘效果最佳。非常適合有傷病顧慮的球員。

### Black Ace LG 14mm（NT$5,890）
LG（Long Grip）超長握把設計，讓網球轉換球員能完美發揮雙手反拍技術。

### Black Ace XF 14mm（NT$5,890）
特殊框架設計，優化空氣動力學，進一步提升揮拍速度。

### Black Ace Avenger 11mm（NT$6,910）
超薄 11mm 核心，爆炸性攻擊力。

### Black Ace Avenger LG 11mm（NT$6,910）
超薄核心 + 超長握把，攻擊型網球轉換球員的終極武器。

## 實際打感體驗

打 Black Ace 最明顯的感受是**擊球聲音特別悅耳**，這正是 Kinetic System 微粒吸震後產生的效果。相比其他品牌，Black Ace 的打感更「安靜」，震動感更少。

對於初次使用者，可能需要 2-3 場球的適應期，因為震動吸收的特性會讓擊球回饋稍微不同。

## 與其他品牌比較

| 項目 | ProKennex BA | Selkirk OMNI | RPM Q2 |
|------|-------------|--------------|--------|
| 護肘效果 | ★★★★★ | ★★★ | ★★★ |
| 旋轉效果 | ★★★★ | ★★★★★ | ★★★★★ |
| 力量感 | ★★★★ | ★★★★ | ★★★★ |
| 適合網球轉換 | ★★★★★ | ★★★ | ★★★ |

## 總結

如果你有手肘問題或從網球轉打匹克球，**ProKennex Black Ace 系列是台灣市場上的不二之選**。Kinetic System 的護肘效果有臨床數據支撐，不是行銷噱頭。

推薦優先順序：
1. 有護肘需求的中高階球員 → **Black Ace 16mm**
2. 網球轉換球員 → **Black Ace Avenger LG 11**
3. 想均衡入門的玩家 → **Black Ace 14mm**`,
    },
    {
      title: "從網球轉打匹克球：你需要知道的 10 件事",
      slug: "tennis-to-pickleball-conversion-guide",
      excerpt: "越來越多網球玩家開始轉打匹克球，但兩者之間有哪些關鍵差異？哪些技術可以直接套用？哪些需要重新學習？本文為網球轉換球員提供最實用的指導。",
      coverImage: `${CDN}/prokennex-black-ace-lg14-main.webp`,
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date("2026-03-15"),
      tags: ["網球轉匹克球", "轉換指南", "技術差異", "球拍選擇"],
      readingTime: 9,
      content: `# 從網球轉打匹克球：你需要知道的 10 件事

## 為什麼越來越多網球玩家轉打匹克球？

在台灣，我們看到越來越多網球玩家開始嘗試匹克球。主要原因：
- **場地更小**：更容易找到場地，等待時間更短
- **體力消耗較低**：更適合中老年球員持續運動
- **上手快**：基本規則半天就能學會
- **趣味性高**：雙打混戰充滿歡笑

## 10 件網球玩家必須知道的事

### 1. 放小球（Dink）才是王道
網球的底線對抗在匹克球中不管用。匹克球中，**廚房區（Kitchen/Non-Volley Zone）的放小球（Dink）技術才是核心**。要準備學習一種全新的觸球方式。

### 2. 力量要收起來
網球玩家習慣用力打球，但在匹克球中，**過大的力量反而是最常見的初學者錯誤**。學習用小揮幅、輕觸球的方式打是關鍵。

### 3. 球速比你想像的更快
匹克球的打點節奏，尤其是網前對打（Banging），球速出乎意料地快。反應時間比網球更短。

### 4. 雙打是主流
匹克球的雙打（Doubles）佔了約 80% 的遊戲比例。與網球雙打相比，匹克球雙打節奏更快、更需要團隊默契。

### 5. 你的反手需要重新學習
網球的單手反拍在匹克球效果有限。**雙手反拍在匹克球中更實用**，你的網球雙手反拍技術在這裡有用武之地。

### 6. 握把尺寸不同
匹克球拍的握把通常比網球拍細。你可能需要選擇搭配較多握把布，或選擇 LG 超長握把款式（如 ProKennex Black Ace LG）。

### 7. 站位更重要
「Stacking」等站位策略在匹克球雙打中非常重要。學習在正確時機上網、防守正確位置是勝負的關鍵。

### 8. 非截擊區（No-Volley Zone）規則
網球沒有「廚房區」的概念。**匹克球規定你不能在非截擊區內截擊**，這是最容易犯錯的規則之一。

### 9. 球拍選擇對你尤其重要
網球轉換球員特別推薦：
- **ProKennex Black Ace LG 系列**：LG 超長握把讓你的雙手反拍技術完美發揮
- **Selkirk SLK ERA Power**：T700 碳纖維拍面熟悉的旋轉手感

### 10. 匹克球有自己的文化
匹克球是一個非常友善的運動社群，初學者隨時都有人願意指導。不要害怕在球場上學習，多和老手打球是進步最快的方法。

## 推薦轉換球員的第一支球拍

| 預算 | 推薦球拍 | 特色 |
|------|---------|------|
| NT$6,000–7,000 | ProKennex Black Ace LG 14mm | LG 握把 + 護肘科技 |
| NT$7,000–8,000 | ProKennex Black Ace Avenger LG 11 | 攻擊力最強 |
| NT$9,000+ | Selkirk OMNI™ + 多纏握把布 | 旗艦性能 |

## 結語

從網球轉打匹克球，你有天然的優勢（協調性、球感、競技經驗），但也需要主動放棄某些習慣（大力打、底線策略）。給自己 2-3 個月的適應期，你會發現匹克球帶給你全新的運動樂趣！`,
    },
    {
      title: "EVERYDAY SOCIAL® Gran Class PWR 深度評測：泡棉核心革命",
      slug: "everyday-social-gran-class-pwr-review",
      excerpt: "2026 年最受矚目的新品之一，EVERYDAY SOCIAL® Gran Class PWR 的 High-Density Foam Core 究竟帶來了什麼改變？本文深度評測這款結合賽車美學與頂尖科技的旗艦球拍。",
      coverImage: `${CDN}/GRAN_CLASS_PWR_Green_black_rock_ad_logo_55dd828c-edd1-4c35-88ee-734d42b304da.webp?v=1780130059`,
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date("2026-04-01"),
      tags: ["Everyday Social", "Gran Class PWR", "球拍評測", "泡棉核心", "2026新品"],
      readingTime: 8,
      content: `# EVERYDAY SOCIAL® Gran Class PWR 深度評測

## 品牌背景

EVERYDAY SOCIAL® 是近年崛起最快的匹克球品牌之一，以「賽車美學遇上頂尖運動科技」為品牌定位。Gran Class 系列以 F1 賽車文化為靈感，英倫綠（British Racing Green）與賽車紅（Racing Red）成為球場上最辨識度極高的配色。

## 2026 年的最大升級：High-Density Foam Core

Gran Class PWR 最大的技術突破，是放棄了傳統蜂巢（Honeycomb）核心，改用全新的 **High-Density Foam Core（高密度泡棉核心）**。

### 傳統蜂巢 vs 高密度泡棉：有什麼差別？

| 項目 | 傳統蜂巢核心 | 高密度泡棉核心 |
|------|------------|-------------|
| 手感 | 輕盈、空心感 | 實心、飽滿感 |
| 力量回饋 | 中等 | 顯著提升 |
| 震動吸收 | 一般 | 優異 |
| 甜區大小 | 標準 | 延伸至全拍面 |
| 護肘效果 | 一般 | 較好 |

簡單說：**泡棉核心讓球拍打起來更「實」、力量傳導更線性**，很多球員第一次試打的反應都是「哇，感覺更有力！」

## 外觀設計：球場上最美的球拍

老實說，Gran Class PWR 是我見過最漂亮的球拍之一。英倫綠版本低調優雅，散發一種英式紳士氣質；賽車紅版本則張揚個性，是球場上的視覺焦點。2026 年版加入的亮金色線條裝飾，讓整體設計更加精緻。

**配色選擇建議**：
- 英倫綠 → 低調有型，適合喜歡不過分張揚的球員
- 賽車紅 → 活潑大膽，適合想在球場上展現個性的玩家

## 實際打感

打了幾個星期的 Gran Class PWR 後，幾個感受：

**擊球感**：泡棉核心的能量回饋確實比傳統蜂巢更飽滿，底線抽球感覺「力道更充足」，但不會失去控制感。

**旋轉**：T700 原生碳纖維拍面提供優異的咬球力，旋轉效果在 16mm 球拍中屬於頂尖水準。

**放小球**：16mm 的厚核在廚房區放小球（Dink）時手感穩定，不容易失控。

**重設（Reset）**：泡棉核心的震動吸收讓高速球的重設更有把握。

## 誰最適合這支球拍？

**最適合 Gran Class PWR 的球員**：
- 中高階競技玩家
- 喜歡全能均衡型打法的球員
- 想要有顏值又有實力的旗艦球拍
- 預算在 NT$6,000–7,000 的球員

**可能不是最適合的球員**：
- 初學者（建議先從 SLK Geo 起步）
- 習慣傳統蜂巢核心輕盈打感的老球員

## 價格評估

NT$6,730（目前特惠，原價 NT$7,080）在旗艦球拍中屬於合理定價。考慮到全新泡棉核心技術與精緻外觀，CP 值很高。

## 最終評分

| 項目 | 評分 |
|------|------|
| 力量 | ★★★★½ |
| 控球 | ★★★★★ |
| 旋轉 | ★★★★½ |
| 外觀 | ★★★★★ |
| 性價比 | ★★★★½ |
| **綜合** | **★★★★½** |

Gran Class PWR 是 2026 年最值得購買的旗艦球拍之一，強烈推薦！`,
    },
    {
      title: "匹克球拍保養完整指南：延長球拍壽命的 7 個關鍵",
      slug: "pickleball-paddle-maintenance-guide",
      excerpt: "一支好球拍動輒 NT$6,000–10,000，你知道如何正確保養嗎？本文提供 7 個關鍵步驟，幫你延長球拍壽命，維持最佳性能。",
      coverImage: `${CDN}/reset-paddle-cleaning-main.webp`,
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date("2026-04-15"),
      tags: ["球拍保養", "清潔教學", "延長壽命", "維護指南"],
      readingTime: 6,
      content: `# 匹克球拍保養完整指南：延長球拍壽命的 7 個關鍵

## 為什麼保養很重要？

一支 NT$8,000 的旗艦球拍，如果不好好保養，可能 6 個月後拍面就嚴重磨損，旋轉效果大打折扣。但如果正確維護，甚至可以使用 2-3 年依然保持高性能。

---

## 7 個關鍵保養步驟

### 1. 每場球後清潔拍面

**推薦工具**：RESET® 專業清潔套組（NT$525）或 專業清潔橡皮擦（NT$100）

碳纖維拍面容易積累污垢、汗漬和油脂，這些物質會降低拍面摩擦係數，讓你的旋轉效果減弱。每 3-5 場球後，用 RESET® 清潔噴劑噴在拍面上，再用微纖維布輕輕擦拭即可。

**注意**：不要用粗糙的布料擦拭，避免刮傷碳纖維拍面。

### 2. 使用球拍保護套

每次打完球，立即將球拍放入保護套。推薦：
- **RPM Paddle Cover**（NT$350）：氯丁橡膠材質，防震防潮
- **Selkirk Premium Paddle Case**（NT$640）：雙層防護，官方出品
- **EVERYDAY SOCIAL® GRAN CLASS GOLD**（NT$450）：專為 Gran Class 系列設計

### 3. 避免高溫環境

碳纖維球拍最怕高溫。**絕對不要把球拍留在車內**，台灣夏天車內溫度可達 60-70°C，足以破壞碳纖維結構與黏合劑。

最佳存放環境：室溫（20-25°C）、避免陽光直射。

### 4. 定期更換握把布

握把布建議每 20-30 場球更換一次，或出現以下情況時立即更換：
- 表面出現滑溜感
- 顏色明顯變深（汗漬積累）
- 材質明顯磨損

推薦：EVERYDAY SOCIAL® Classic Grip Tape（3入裝 NT$330）

### 5. 不要用球拍敲地板或牆壁

看起來很理所當然，但球場上的情緒性動作很容易讓球拍受到不當撞擊。碳纖維拍框雖然堅固，但邊緣保護層受損後會加速磨損。

如果你的球拍邊緣保護層已經脫落，可以用邊緣膠帶修復，或聯繫我們的售後服務。

### 6. 雨天的特別注意事項

雖然匹克球主要在室外打，但雨天打球後一定要：
1. 立即用乾毛巾擦乾球拍表面
2. 讓球拍在室溫下自然風乾（不要用吹風機）
3. 確認完全乾燥後才放入保護套

### 7. 定期檢查拍框完整性

每個月用手仔細檢查拍框邊緣是否有裂縫或分層。早期發現問題可以避免損傷擴大。如有疑問，聯繫我們的專業客服進行評估。

---

## 拍面清潔 SOP（標準作業流程）

1. 打完球後，用乾淨的乾布輕輕擦拭拍面
2. 每 3-5 場球後，用 RESET® 噴劑均勻噴在拍面（約 15cm 距離）
3. 靜置 10 秒後，用附贈微纖維布以畫圓方式輕輕擦拭
4. 確認拍面乾燥後放入保護套

**整個過程只需 3 分鐘，卻能讓你的球拍壽命延長數倍！**

---

## 什麼時候需要換新球拍？

即使保養再好，球拍也有使用壽命。以下情況建議考慮換拍：
- 拍面出現明顯凹陷或裂縫
- 旋轉效果即使清潔後依然顯著下降
- 拍框出現可聽見的異音（可能代表內部結構受損）
- 使用 2-3 年以上，科技已大幅進步

換拍時，歡迎到 SP Pickleball 諮詢最新的球拍推薦！`,
    },
    {
      title: "碳纖維 vs 玻璃纖維匹克球拍：2026 年完整比較",
      slug: "carbon-fiber-vs-fiberglass-paddle-comparison",
      excerpt: "碳纖維還是玻璃纖維？這是每個初學者都會問的問題。本文從物理特性、打感差異到適合球員類型，做最完整的比較，幫你做出正確選擇。",
      coverImage: `${CDN}/tw-11134207-81ztm-mj8948ix0cg0c6.jpg?v=1770795589`,
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date("2026-05-01"),
      tags: ["碳纖維球拍", "玻璃纖維球拍", "材質比較", "選購指南"],
      readingTime: 7,
      content: `# 碳纖維 vs 玻璃纖維匹克球拍：2026 完整比較

## 核心差異

這兩種材質在物理特性上有本質差異：

| 特性 | 碳纖維 | 玻璃纖維 |
|------|--------|---------|
| 硬度 | 高 | 中等 |
| 重量 | 較輕 | 稍重 |
| 旋轉效果 | 強 | 一般 |
| 力量回饋 | 強（彈性好） | 柔和 |
| 控球精準度 | 高 | 高（但手感不同）|
| 耐用性 | 高 | 高 |
| 價格 | 較貴 | 較便宜 |

## 碳纖維球拍：給追求旋轉與力量的球員

碳纖維拍面的「硬」讓擊球能量傳導更有效率，同時粗糙的表面提供極強的旋轉效果。

**碳纖維拍面的優勢**：
- 旋轉效果 25-40% 優於玻璃纖維
- 力量傳導更直接有力
- 甜區反饋更精準
- 現代匹克球技術主流

**碳纖維拍面的缺點**：
- 初學者可能覺得「太硬」、不好控制
- 價格較高（通常 NT$3,000+）
- 需要定期清潔維護拍面摩擦力

**推薦給**：中高階球員、追求旋轉型打法者、認真競技的玩家

台灣市場最受歡迎的碳纖維球拍：
- Selkirk OMNI™（NT$9,930）
- RPM Q2（NT$7,500）
- Everyday Social Gran Class PWR（NT$6,730）
- ProKennex Black Ace 系列（NT$5,890起）

## 玻璃纖維球拍：給控球型與初學者

玻璃纖維的「彈性」提供一種獨特的柔和打感，許多球員形容為「球在拍面上停留更久」，這種特性讓控球更容易。

**玻璃纖維拍面的優勢**：
- 手感更柔和，觸球感更直觀
- 更適合初學者建立正確手感
- 放小球（Dink）更容易控制
- 價格通常更親民

**玻璃纖維拍面的缺點**：
- 旋轉效果相對較弱
- 高水準競技中較不佔優勢
- 進階後可能較快需要升級

**推薦給**：初學者、注重控球的球員、年長球員

## 2026 年的趨勢

有意思的是，2026 年市場上又出現了新的趨勢：**泡棉核心（Foam Core）** 開始與碳纖維拍面結合，如 EVERYDAY SOCIAL® Gran Class PWR 的 High-Density Foam Core，試圖兼顧碳纖維的旋轉優勢與泡棉的力量感。

## 結論：我應該選哪種？

**選碳纖維如果你**：
- 認真想進步的玩家
- 喜歡旋轉型打法
- 預算在 NT$5,000 以上

**選玻璃纖維如果你**：
- 純娛樂性質，不打算認真練球
- 初學者，想先感受匹克球樂趣
- 預算在 NT$3,000 以下

如果你認真想打好匹克球，**我們建議直接投資碳纖維球拍**。從長遠來看，一支好的碳纖維球拍會陪你更久，也會讓你進步更快。歡迎到 SP Pickleball 試拍！`,
    },
  ];

  let count = 0;
  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
    count++;
    console.log(`  ✓ Article: ${a.title.substring(0, 40)}...`);
  }
  console.log(`  共 ${count} 篇文章`);
}

// ============================================================
// GLOBAL SEO SETTINGS
// ============================================================

async function seedGlobalSeo() {
  const pages = [
    { pageType: "home", title: "SP Pickleball 台灣｜頂級匹克球拍選購專家", description: "台灣最專業的匹克球拍選購平台，代理 Selkirk、RPM、ProKennex、Everyday Social 等頂級品牌。免費台灣本島運費，專業球拍顧問服務。", ogImage: `${CDN}/picklenest_logo.png?v=1770278964` },
    { pageType: "products", title: "所有匹克球商品｜SP Pickleball 台灣", description: "精選 Selkirk、RPM、ProKennex、Everyday Social 等品牌的匹克球拍、球、保護套與配件。台灣現貨，快速出貨。", ogImage: `${CDN}/vertical_PNG_3000x4000-Selkirk-Omni-Elongated-1776-01.webp?v=1781491440` },
    { pageType: "cart", title: "購物車｜SP Pickleball", description: "確認你的訂單，繼續結帳。", ogImage: null, noIndex: true },
    { pageType: "checkout", title: "結帳｜SP Pickleball", description: "安全結帳，支援信用卡與銀行轉帳。", ogImage: null, noIndex: true },
  ];

  for (const p of pages) {
    await prisma.globalSeo.upsert({
      where: { pageType: p.pageType },
      update: { ...p, inSitemap: !p.noIndex },
      create: { ...p, inSitemap: !p.noIndex },
    });
  }
  console.log(`  ✓ Global SEO: ${pages.length} 頁面設定`);
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log("🌱 SP Pickleball — 開始 Seed Picklenest 資料...\n");

  console.log("📦 建立品牌...");
  const brandIds = await seedBrands();

  console.log("\n📁 建立分類...");
  const catIds = await seedCategories();

  console.log("\n🏓 建立商品...");
  const productIds = await seedProducts(brandIds, catIds);

  console.log("\n🔍 建立 SEO Meta...");
  await seedSeoMeta(brandIds, catIds, productIds);

  console.log("\n🌏 建立 GEO Content...");
  await seedGeoContent(productIds);

  console.log("\n📝 建立文章...");
  await seedArticles();

  console.log("\n⚙️  建立全站 SEO 設定...");
  await seedGlobalSeo();

  console.log(`\n✅ 完成！已建立：`);
  console.log(`   - ${Object.keys(brandIds).length} 個品牌`);
  console.log(`   - ${Object.keys(catIds).length} 個分類`);
  console.log(`   - ${Object.keys(productIds).length} 件商品`);
  console.log(`   - SEO Meta、GEO Content、8 篇文章`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
