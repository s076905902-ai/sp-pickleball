import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
export const metadata: Metadata = buildMetadata({ title: "服務條款", canonical: "/terms" });
export default function TermsPage() {
  return (
    <div className="container-padded py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">服務條款</h1>
      <div className="prose prose-sm max-w-none text-gray-600">
        <p>使用 SP Pickleball 服務即表示您同意以下條款。</p>
        <h2>服務說明</h2>
        <p>SP Pickleball 提供匹克球拍電商購物、評測內容及 Academy 課程服務。</p>
        <h2>訂購規則</h2>
        <p>下單即視為確認訂單內容，如需取消請在付款前聯絡客服。</p>
        <h2>知識產權</h2>
        <p>本站所有內容（文章、圖片、評分數據）均受著作權保護，未經授權不得轉載。</p>
        <h2>免責聲明</h2>
        <p>球拍評分與推薦建議僅供參考，最終購買決定由使用者自行負責。</p>
      </div>
    </div>
  );
}
