/**
 * Fix FAQ duplicates and update payment answer to reflect LINE flow
 * Run: npx tsx prisma/fix-faq.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Remove duplicate FAQs (keep lowest id per question)
  const faqs = await prisma.fAQ.findMany({
    orderBy: { id: "asc" },
  });

  const seen = new Map<string, string>(); // question → id
  const toDelete: string[] = [];

  for (const faq of faqs) {
    const key = faq.question.trim();
    if (seen.has(key)) {
      toDelete.push(faq.id);
      console.log(`🗑️  Duplicate: "${faq.question.slice(0, 50)}..."`);
    } else {
      seen.set(key, faq.id);
    }
  }

  if (toDelete.length > 0) {
    await prisma.fAQ.deleteMany({ where: { id: { in: toDelete } } });
    console.log(`✅ Deleted ${toDelete.length} duplicate FAQ(s)`);
  } else {
    console.log("No duplicates found");
  }

  // 2. Update payment answer to reflect LINE payment flow
  const paymentResult = await prisma.fAQ.updateMany({
    where: {
      category: "payment",
      question: { contains: "如何付款" },
    },
    data: {
      answer:
        "我們採用 LINE 通知付款流程：下單後請點擊成功頁面的 LINE 按鈕，提供訂單編號，我們的客服人員將於 30 分鐘內提供匯款帳號與付款指引。完成後回傳訂單編號與匯款末五碼即可確認。",
    },
  });
  console.log(`✅ Updated payment FAQ: ${paymentResult.count} row(s)`);

  // 3. Summary
  const total = await prisma.fAQ.count({ where: { isActive: true } });
  console.log(`\n📊 Total active FAQs: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
