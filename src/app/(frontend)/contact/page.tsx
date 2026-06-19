import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
export const metadata: Metadata = buildMetadata({ title: "聯絡我們", canonical: "/contact" });
export default function ContactPage() {
  return (
    <div className="container-padded py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">聯絡我們</h1>
      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <a href="https://line.me/ti/p/QfXjVSMKha" target="_blank" rel="noopener noreferrer"
          className="bg-[#F2F8F5] border border-[#BCDECF] rounded-xl p-6 text-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-2">💬</div>
          <h2 className="font-bold text-[#0D2A1B]">LINE 客服</h2>
          <p className="text-sm text-[#123524] mt-1">點此加入 LINE</p>
          <p className="text-xs text-gray-500 mt-2">最快回覆，平日 10:00-18:00</p>
        </a>
        <a href="mailto:service@sportspoint.tw"
          className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-2">📧</div>
          <h2 className="font-bold text-blue-800">Email 客服</h2>
          <p className="text-sm text-blue-700 mt-1">service@sportspoint.tw</p>
          <p className="text-xs text-gray-500 mt-2">1-2 個工作天回覆</p>
        </a>
      </div>
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="font-bold text-gray-900 mb-4">常見問題</h2>
        <p className="text-sm text-gray-600">聯絡前，歡迎先查閱 <a href="/faq" className="text-brand-600 hover:underline">常見問題頁面</a>，可能已有你需要的答案。</p>
      </div>
    </div>
  );
}
