import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding SP Pickleball database...");

  // Brands
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: "joola" },
      update: {},
      create: {
        name: "JOOLA",
        slug: "joola",
        description: "JOOLA 是全球頂尖的桌球與匹克球品牌，以高品質碳纖維球拍聞名。",
        country: "美國",
        foundedYear: 1952,
        isActive: true,
      },
    }),
    prisma.brand.upsert({
      where: { slug: "selkirk" },
      update: {},
      create: {
        name: "Selkirk",
        slug: "selkirk",
        description: "Selkirk Sport 是美國本土最具代表性的匹克球品牌，創立於愛達荷州。",
        country: "美國",
        foundedYear: 2014,
        isActive: true,
      },
    }),
    prisma.brand.upsert({
      where: { slug: "paddletek" },
      update: {},
      create: {
        name: "Paddletek",
        slug: "paddletek",
        description: "Paddletek 以科技創新聞名，是業界首先採用碳纖維面板的品牌之一。",
        country: "美國",
        foundedYear: 2009,
        isActive: true,
      },
    }),
  ]);

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "beginner" },
      update: {},
      create: { name: "新手入門", slug: "beginner", description: "適合初學者，容錯率高，輕鬆上手", isActive: true },
    }),
    prisma.category.upsert({
      where: { slug: "intermediate" },
      update: {},
      create: { name: "中階球拍", slug: "intermediate", description: "適合有一定基礎的玩家，性能均衡", isActive: true },
    }),
    prisma.category.upsert({
      where: { slug: "advanced" },
      update: {},
      create: { name: "高階競技", slug: "advanced", description: "競賽級球拍，頂尖性能", isActive: true },
    }),
    prisma.category.upsert({
      where: { slug: "female" },
      update: {},
      create: { name: "女性球拍", slug: "female", description: "輕量設計，適合女性玩家", isActive: true },
    }),
    prisma.category.upsert({
      where: { slug: "tennis-convert" },
      update: {},
      create: { name: "網球轉換", slug: "tennis-convert", description: "適合有網球背景的玩家", isActive: true },
    }),
    prisma.category.upsert({
      where: { slug: "doubles" },
      update: {},
      create: { name: "雙打專用", slug: "doubles", description: "強化網前控球，雙打利器", isActive: true },
    }),
  ]);

  // Sample products
  await prisma.product.upsert({
    where: { slug: "joola-ben-johns-perseus-16mm" },
    update: {},
    create: {
      name: "JOOLA Ben Johns Perseus 16mm",
      slug: "joola-ben-johns-perseus-16mm",
      sku: "JLA-BJP16",
      brandId: brands[0].id,
      categoryId: categories[2].id, // advanced
      price: 8990,
      stock: 15,
      status: "PUBLISHED",
      isFeatured: true,
      weight: 227,
      thickness: 16,
      material: "碳纖維",
      coreMaterial: "聚合物蜂巢",
      surfaceMaterial: "T700 碳纖維",
      controlScore: 88,
      powerScore: 82,
      spinScore: 90,
      forgivenessScore: 75,
      feelScore: 85,
      suitableFor: ["ADVANCED", "DOUBLES"],
      description: "<p>JOOLA Ben Johns Perseus 16mm 是世界排名第一球員 Ben Johns 的簽名款球拍，採用 T700 碳纖維面板，提供卓越的旋轉控制能力。16mm 厚度芯體在力量與控制之間取得完美平衡。</p>",
      specs: {
        "球拍尺寸": "15.85\" x 7.9\"",
        "握把長度": "5.5\"",
        "握把尺寸": "4.25\"",
        "平均重量": "8.0 oz",
        "面板材質": "T700 碳纖維",
        "芯體": "聚合物蜂巢 16mm",
        "認證": "USA Pickleball 認證",
      },
      faq: [
        { question: "這支球拍適合新手嗎？", answer: "Perseus 16mm 是高階球拍，更適合有基礎的中高階玩家。新手建議從容錯率較高的入門款開始。" },
        { question: "16mm 和 14mm 版本有什麼差異？", answer: "16mm 版本控制感更佳，適合 dink 戰術；14mm 版本爆發力更強，適合喜歡大力扣殺的玩家。" },
      ],
    },
  });

  // FAQs
  await prisma.fAQ.createMany({
    skipDuplicates: true,
    data: [
      { question: "如何選擇適合自己的球拍？", answer: "建議考慮自己的程度（新手/中階/高階）、打法偏好（控制/平衡/力量）和預算。可以使用我們的 AI 選拍顧問快速找到推薦球拍。", category: "general", sortOrder: 1 },
      { question: "球拍有保固嗎？", answer: "所有球拍均附原廠保固（通常 6-12 個月，各品牌不同）。若有製造瑕疵，請於購買後 30 天內聯絡客服處理。", category: "product", sortOrder: 2 },
      { question: "可以試打嗎？", answer: "是的！可以聯絡我們預約 Academy 場地試打，或詢問客服安排試拍服務。", category: "product", sortOrder: 3 },
      { question: "運費多少錢？", answer: "SP Pickleball 所有訂單均提供全台灣免運費服務，無最低消費門檻。", category: "shipping", sortOrder: 4 },
      { question: "如何付款？", answer: "目前提供「通知匯款」方式，下單後系統顯示匯款帳號，請在 24 小時內完成匯款並通知我們確認。", category: "payment", sortOrder: 5 },
      { question: "可以退貨嗎？", answer: "依消費者保護法，商品到貨 7 天內可申請退貨（商品需保持全新未使用狀態）。請聯絡客服辦理。", category: "returns", sortOrder: 6 },
    ],
  });

  // Site settings
  await prisma.siteSetting.createMany({
    skipDuplicates: true,
    data: [
      { key: "site_name", value: "SP Pickleball", type: "string", group: "general", label: "網站名稱" },
      { key: "contact_email", value: "service@sportspoint.tw", type: "string", group: "general", label: "客服 Email" },
      { key: "contact_line", value: "@sppickleball", type: "string", group: "general", label: "LINE ID" },
      { key: "bank_name", value: "○○銀行", type: "string", group: "payment", label: "銀行名稱" },
      { key: "bank_account", value: "XXXX-XXXX-XXXX-XXXX", type: "string", group: "payment", label: "銀行帳號" },
      { key: "bank_holder", value: "SP Pickleball 有限公司", type: "string", group: "payment", label: "戶名" },
    ],
  });

  console.log("✅ Seed completed!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
