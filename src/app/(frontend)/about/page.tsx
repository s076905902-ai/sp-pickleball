import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "關於 SP Pickleball", canonical: "/about" });

export default function AboutPage() {
  return (
    <div className="container-padded py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">關於 SP Pickleball</h1>
      <div className="prose prose-sm max-w-none text-gray-600">
        <p>SP Pickleball 是台灣專注於匹克球拍的電商與知識平台。我們致力於提供最專業的球拍評測、選購建議與教學內容，幫助每一位球員找到最適合自己的球拍。</p>
        <h2>我們的使命</h2>
        <p>用數據說話，用專業服務每一位球員。不論你是剛接觸匹克球的新手，還是追求頂尖性能的競賽玩家，我們都能幫你找到完美的球拍。</p>
        <h2>為什麼選擇我們</h2>
        <ul>
          <li>每支球拍經過系統化評分（控制力、爆發力、旋轉、容錯率、手感）</li>
          <li>與專業認證教練合作，內容有深度保障</li>
          <li>AI 選拍顧問，30 秒找到最適合你的球拍</li>
          <li>完整的售後服務，7 天退換貨，LINE 即時客服</li>
        </ul>
        <h2>聯絡我們</h2>
        <p>如有任何問題，歡迎透過 <a href="/contact">聯絡頁面</a> 或 LINE 客服與我們聯繫。</p>
      </div>
    </div>
  );
}
