import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PRODUCTS_TO_UPDATE = [
  "ProKennex Black Ace 16mm 匹克球拍",
  "RPM Friction Pro 14mm Elongated V2 Ryan Fu 聯名款",
  "RPM Friction Pro 16mm Elongated V2 匹克球拍",
  "專業匹克球拍清潔橡皮擦",
];

async function main() {
  for (const name of PRODUCTS_TO_UPDATE) {
    const updated = await prisma.product.updateMany({
      where: { name },
      data: { stock: 10 },
    });
    if (updated.count > 0) {
      console.log(`✅ ${name} → stock=10`);
    } else {
      console.log(`❌ 找不到: ${name}`);
    }
  }
  console.log("\n完成！");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
