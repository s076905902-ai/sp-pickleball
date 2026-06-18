export default function AdminSettingsPage() {
  const settings = [
    {
      section: "網站資訊",
      items: [
        { key: "NEXT_PUBLIC_SITE_NAME", label: "網站名稱", value: process.env.NEXT_PUBLIC_SITE_NAME ?? "SP Pickleball" },
        { key: "NEXT_PUBLIC_SITE_URL", label: "網站網址", value: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sportspoint.tw" },
        { key: "NEXTAUTH_URL", label: "Auth URL", value: process.env.NEXTAUTH_URL ?? "http://localhost:3000" },
      ],
    },
    {
      section: "資料庫",
      items: [
        { key: "DATABASE_URL", label: "資料庫連線", value: process.env.DATABASE_URL ? "✓ 已設定（Neon PostgreSQL）" : "❌ 未設定" },
      ],
    },
    {
      section: "第三方整合",
      items: [
        { key: "GOOGLE_CLIENT_ID", label: "Google OAuth", value: process.env.GOOGLE_CLIENT_ID ? "✓ 已設定" : "❌ 未設定" },
        { key: "NEXT_PUBLIC_GA_ID", label: "Google Analytics 4", value: process.env.NEXT_PUBLIC_GA_ID ?? "❌ 未設定" },
        { key: "NEXT_PUBLIC_GTM_ID", label: "Google Tag Manager", value: process.env.NEXT_PUBLIC_GTM_ID ?? "❌ 未設定" },
        { key: "NEXT_PUBLIC_GSC_VERIFICATION", label: "GSC 驗證碼", value: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? "✓ 已設定" : "❌ 未設定" },
        { key: "NEXT_PUBLIC_LINE_OA_URL", label: "LINE OA 網址", value: process.env.NEXT_PUBLIC_LINE_OA_URL ?? "❌ 未設定" },
        { key: "SMTP_HOST", label: "SMTP 信箱", value: process.env.SMTP_HOST ? "✓ 已設定" : "❌ 未設定" },
      ],
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">系統設定</h1>
        <p className="text-sm text-gray-500 mt-1">環境變數設定狀態（修改請編輯 .env.local 並重啟伺服器）</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-3 mb-6 text-sm text-yellow-800">
        ⚠️ 敏感資料（密碼、金鑰）不會顯示實際值，僅顯示是否已設定。
      </div>

      <div className="space-y-6">
        {settings.map(section => (
          <div key={section.section} className="bg-white border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="font-semibold text-gray-900">{section.section}</h2>
            </div>
            <div className="divide-y">
              {section.items.map(item => (
                <div key={item.key} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                    <code className="text-xs text-gray-400">{item.key}</code>
                  </div>
                  <span className={`text-sm font-mono ${item.value.startsWith("❌") ? "text-red-500" : "text-gray-700"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white border rounded-xl p-6">
        <h2 className="font-semibold text-gray-900 mb-4">常用操作</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "查看前台", href: "/", desc: "開啟網站首頁" },
            { label: "Google XML Feed", href: "/api/feed/google", desc: "下載商品 Feed" },
            { label: "Sitemap", href: "/sitemap.xml", desc: "查看網站地圖" },
          ].map(a => (
            <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer"
              className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-900 text-sm">{a.label}</p>
              <p className="text-xs text-gray-500 mt-1">{a.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
