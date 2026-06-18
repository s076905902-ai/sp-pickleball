import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { faqPageSchema, breadcrumbSchema } from "@/lib/schema-markup";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "常見問題 FAQ",
  description: "SP Pickleball 常見問題解答，包含球拍選購、運費說明、退換貨政策、下訂流程等。",
  canonical: "/faq",
});

export default async function FaqPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const grouped = faqs.reduce<Record<string, typeof faqs>>((acc, faq) => {
    const key = faq.category ?? "general";
    if (!acc[key]) acc[key] = [];
    acc[key].push(faq);
    return acc;
  }, {});

  const faqItems = faqs.map((f) => ({ question: f.question, answer: f.answer }));

  return (
    <>
      <JsonLd schema={[
        faqPageSchema(faqItems),
        breadcrumbSchema([{ name: "首頁", url: "/" }, { name: "常見問題", url: "/faq" }]),
      ]} />
      <div className="container-padded py-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">常見問題</h1>
        <p className="text-gray-500 mb-8">找不到答案？<a href="/contact" className="text-brand-600 hover:underline">聯絡我們</a></p>

        {Object.entries(grouped).map(([category, items]) => (
          <section key={category} className="mb-8">
            <h2 className="font-bold text-lg text-gray-800 mb-4 capitalize">{categoryLabel(category)}</h2>
            <div className="space-y-3">
              {items.map((faq) => (
                <details key={faq.id} className="border rounded-xl group">
                  <summary className="px-5 py-4 font-medium text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-brand-600 text-xl group-open:rotate-45 transition-transform shrink-0 ml-2">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t mt-0">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function categoryLabel(slug: string) {
  const map: Record<string, string> = {
    general: "一般問題",
    shipping: "運費 & 配送",
    returns: "退換貨政策",
    product: "球拍相關",
    payment: "付款方式",
    academy: "Academy 課程",
  };
  return map[slug] ?? slug;
}
