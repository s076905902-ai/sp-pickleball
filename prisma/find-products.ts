import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 找所有庫存 0 的商品
  const zeroStock = await prisma.product.findMany({
    where: { stock: 0 },
    select: { id: true, name: true, stock: true },
    orderBy: { name: "asc" },
  });
  console.log(`\n庫存 0 的商品 (共 ${zeroStock.length} 件):`);
  zeroStock.forEach((p) => console.log(`  "${p.name}"`));

  // 模糊搜尋 ProKennex
  const prokennex = await prisma.product.findMany({
    where: { name: { contains: "ProKennex", mode: "insensitive" } },
    select: { id: true, name: true, stock: true },
  });
  console.log(`\nProKennex 商品:`);
  prokennex.forEach((p) => console.log(`  "${p.name}" stock=${p.stock}`));

  // 模糊搜尋 RPM
  const rpm = await prisma.product.findMany({
    where: { name: { contains: "RPM", mode: "insensitive" } },
    select: { id: true, name: true, stock: true },
  });
  console.log(`\nRPM 商品:`);
  rpm.forEach((p) => console.log(`  "${p.name}" stock=${p.stock}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
