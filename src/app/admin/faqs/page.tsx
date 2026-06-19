import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";

export default async function AdminFaqsPage() {
  // FAQ is stored as JSON in Product.faq — show a simple editor interface
  const products = await prisma.product.findMany({
    where: { faq: { not: undefined } },
    select: { id: true, name: true, faq: true },
    orderBy: { name: "asc" },
    take: 50,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ 管理</h1>
          <p className="text-sm text-gray-500 mt-1">各商品的常見問題儲存於商品編輯頁</p>
        </div>
        <Link href="/admin/products" className="bg-[#123524] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#1F6B4F]">
          <Plus className="w-4 h-4" /> 前往商品編輯
        </Link>
      </div>

      <div className="space-y-4">
        {products.filter(p => p.faq && Array.isArray(p.faq) && (p.faq as any[]).length > 0).map(p => {
          const faqs = p.faq as { question: string; answer: string }[];
          return (
            <div key={p.id} className="bg-white border rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">{p.name}</h2>
                <Link href={`/admin/products/${p.id}`} className="text-xs text-blue-600 hover:underline">編輯商品</Link>
              </div>
              <div className="divide-y">
                {faqs.map((faq, i) => (
                  <div key={i} className="px-6 py-4">
                    <p className="font-medium text-gray-900 text-sm mb-1">Q: {faq.question}</p>
                    <p className="text-gray-600 text-sm">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {products.filter(p => p.faq && Array.isArray(p.faq) && (p.faq as any[]).length > 0).length === 0 && (
          <div className="bg-white border rounded-xl py-16 text-center text-gray-400">
            <p className="mb-2">尚無商品設定 FAQ</p>
            <p className="text-sm">請前往商品編輯頁面的「FAQ」欄位新增</p>
          </div>
        )}
      </div>
    </div>
  );
}
