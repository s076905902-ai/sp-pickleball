import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const brands = await prisma.brand.findMany({
    select: { id: true, name: true, slug: true, logo: true },
    orderBy: { name: "asc" },
  });

  console.log("\n品牌 Logo 狀態：");
  brands.forEach((b) => {
    const status = b.logo ? "✅" : "❌";
    console.log(`${status} ${b.name} (${b.slug}) → ${b.logo ?? "無圖"}`);
  });

  const missing = brands.filter((b) => !b.logo);
  console.log(`\n缺圖品牌：${missing.length} 個`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
