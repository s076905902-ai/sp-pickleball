import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
export const metadata: Metadata = buildMetadata({ title: "隱私權政策", canonical: "/privacy" });
export default function PrivacyPage() {
  return (
    <div className="container-padded py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">隱私權政策</h1>
      <div className="prose prose-sm max-w-none text-gray-600">
        <p>SP Pickleball 重視您的隱私權，本政策說明我們如何收集、使用及保護您的個人資訊。</p>
        <h2>資料收集</h2>
        <p>我們僅收集提供服務所必要的資訊，包含姓名、Email、電話、配送地址等訂購資訊。</p>
        <h2>資料使用</h2>
        <p>收集的資料僅用於訂單處理、客服溝通及服務改善，不會出售或提供給第三方。</p>
        <h2>Cookie</h2>
        <p>我們使用 Cookie 改善使用者體驗及統計分析（Google Analytics）。</p>
        <h2>聯絡我們</h2>
        <p>如有任何隱私相關問題，請透過 <a href="/contact">聯絡頁面</a> 與我們聯繫。</p>
      </div>
    </div>
  );
}
