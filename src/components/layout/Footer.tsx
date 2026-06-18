import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-padded py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <span>🏓</span> SP Pickleball
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              台灣最完整的匹克球拍購物與知識平台。專業評測，幫你找到最適合的球拍。
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://line.me/ti/p/@sppickleball" target="_blank" rel="noopener noreferrer"
                className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-medium hover:bg-green-600 transition-colors">
                LINE 客服
              </a>
              <a href="https://www.instagram.com/sppickleball" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors">
                Instagram
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">球拍分類</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/categories/beginner", label: "新手入門" },
                { href: "/categories/intermediate", label: "中階球拍" },
                { href: "/categories/advanced", label: "高階競技" },
                { href: "/categories/female", label: "女性球拍" },
                { href: "/brands", label: "品牌介紹" },
                { href: "/compare", label: "球拍比較" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Knowledge */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">知識資源</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/blog", label: "球拍評測" },
                { href: "/faq", label: "常見問題" },
                { href: "/ai", label: "AI 選拍顧問" },
                { href: "/academy", label: "Academy 課程" },
                { href: "/academy/coaches", label: "專業教練" },
                { href: "/academy/venues", label: "場地資訊" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">購物服務</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/shipping", label: "運費說明" },
                { href: "/returns", label: "退換貨政策" },
                { href: "/about", label: "關於我們" },
                { href: "/contact", label: "聯絡我們" },
                { href: "/privacy", label: "隱私權政策" },
                { href: "/terms", label: "服務條款" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-padded py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SP Pickleball. All rights reserved.</p>
          <p>匹克球拍 | Pickleball Paddle Taiwan</p>
        </div>
      </div>
    </footer>
  );
}
