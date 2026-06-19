/**
 * fix-prices.ts
 * 修正 price/salePrice 填反的問題：
 * 當 salePrice > price 時，兩者對調（原價應 > 特價）
 *
 * npx tsx prisma/fix-prices.ts
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: { id: true, name: true, price: true, salePrice: true },
  });

  let fixed = 0;
  for (const p of products) {
    if (!p.salePrice) continue;
    const price = Number(p.price);
    const sale = Number(p.salePrice);
    // 如果特價 > 原價，代表填反了，對調
    if (sale > price) {
      await prisma.product.update({
        where: { id: p.id },
        data: { price: sale, salePrice: price },
      });
      console.log(`✅ Fixed: ${p.name}  price ${price}→${sale}  salePrice ${sale}→${price}`);
      fixed++;
    }
  }
  console.log(`\nFixed ${fixed} products`);
  await prisma.$disconnect();
}

main().catch(console.error);
