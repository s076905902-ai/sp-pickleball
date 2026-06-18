import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import AiAdvisor from "@/components/ai/AiAdvisor";
import { faqPageSchema, breadcrumbSchema } from "@/lib/schema-markup";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "AI 球拍選購顧問 — 30 秒找到最適合你的球拍",
  description:
    "回答 4 個問題，SP Pickleball AI 顧問立刻為你推薦最適合的匹克球拍，依據你的程度、預算、打法量身推薦。",
  canonical: "/ai",
});

const faqItems = [
  { question: "AI 顧問推薦的球拍可靠嗎？", answer: "我們的推薦基於每支球拍的詳細評分數據（控制力、爆發力、旋轉等），結合你的程度與打法需求，提供最合適的建議。" },
  { question: "推薦的球拍可以試打嗎？", answer: "是的！可以到我們的 Academy 場地預約試打，或聯絡 LINE 客服安排。" },
  { question: "如果推薦的球拍賣完了怎麼辦？", answer: "你可以加入到貨通知，或聯絡我們詢問到貨時間，我們也會推薦替代選項。" },
];

const schemas = [
  breadcrumbSchema([
    { name: "首頁", url: "/" },
    { name: "AI 選拍顧問", url: "/ai" },
  ]),
  faqPageSchema(faqItems),
];

export default function AiPage() {
  return (
    <>
      <JsonLd schema={schemas} />
      <div className="container-padded py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-5xl mb-3">🤖</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">AI 球拍選購顧問</h1>
            <p className="text-gray-500">回答 4 個問題，30 秒找到最適合你的球拍</p>
          </div>

          <AiAdvisor />

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-lg font-bold text-gray-900 mb-4">常見問題</h2>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <details key={i} className="border rounded-xl">
                  <summary className="px-4 py-3 font-medium cursor-pointer text-sm">{item.question}</summary>
                  <div className="px-4 pb-4 text-sm text-gray-600">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
