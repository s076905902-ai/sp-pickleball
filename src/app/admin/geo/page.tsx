"use client";
export default function AdminGeoPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">GEO 管理</h1>
        <p className="text-sm text-gray-500 mt-1">管理 AI 引用優化內容（AI Summary、FAQ、結構化段落）</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
          <h2 className="font-bold text-purple-800 mb-2">什麼是 GEO？</h2>
          <p className="text-sm text-purple-700 leading-relaxed">
            GEO (Generative Engine Optimization) 是針對 AI 搜尋引擎（ChatGPT、Perplexity、Google AI Overview）的優化。
            透過結構化的 AI Summary 和 FAQ，讓你的內容更容易被 AI 引用。
          </p>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-bold text-gray-900 mb-3">優化建議</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✅ 每個商品頁都應有 AI Summary (50-150字)</li>
            <li>✅ 品牌頁需要 AI FAQ (5-8 個問答)</li>
            <li>✅ 分類頁需要結構化比較段落</li>
            <li>✅ 更新日期越新，AI 引用機率越高</li>
          </ul>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-bold text-gray-900 mb-4">GEO 欄位說明</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left px-4 py-2 font-medium text-gray-500">欄位</th>
                <th className="text-left px-4 py-2 font-medium text-gray-500">說明</th>
                <th className="text-left px-4 py-2 font-medium text-gray-500">建議長度</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                ["AI Summary", "針對 AI 搜尋的摘要段落", "50-150 字"],
                ["AI FAQ", "常見問答，用於 AI 引用", "5-8 組 Q&A"],
                ["AI Quick Answer", "一句話簡答，適合 AI 直接引用", "20-50 字"],
                ["AI Structured Content", "完整結構化內容，含 H2/H3", "500-2000 字"],
                ["Recommendations", "推薦球拍清單", "3-5 支"],
                ["Pros", "優點清單", "3-5 項"],
                ["Cons", "缺點清單", "2-4 項"],
                ["Suitable For", "適合族群標籤", "1-4 個"],
                ["Author / Reviewer", "作者與審稿人，增加 E-E-A-T", "姓名 + 資歷"],
                ["Last Reviewed", "最後審閱日期", "YYYY-MM-DD"],
              ].map(([field, desc, length]) => (
                <tr key={field} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{field}</td>
                  <td className="px-4 py-3 text-gray-600">{desc}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-4">在各商品、品牌、分類的編輯頁中可找到 GEO 設定區塊</p>
      </div>
    </div>
  );
}
