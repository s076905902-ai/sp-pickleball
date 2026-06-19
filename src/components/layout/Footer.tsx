import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#FAFAF8]/70">
      <div className="container-padded pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-[#C8A45D] text-2xl font-black">SP</span>
              <span className="text-[#FAFAF8] font-semibold text-lg">Pickleball</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#FAFAF8]/50 mb-5">
              台灣最專業的匹克球拍購物與知識平台。頂級品牌、專業評測、AI 選拍顧問，為你找到完美球拍。
            </p>
            <div className="flex gap-3">
              <a
                href="https://line.me/ti/p/@sppickleball"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#C8A45D] text-[#111111] text-xs px-4 py-2 rounded-full font-semibold hover:bg-[#B89245] transition-colors"
              >
                LINE 客服
              </a>
              <a
                href="https://www.instagram.com/sppickleball"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAFAF8]/40 hover:text-[#C8A45D] text-sm transition-colors flex items-center"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-[#FAFAF8] font-semibold text-xs uppercase tracking-widest mb-5">
              球拍分類
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/categories/beginner", label: "新手入門" },
                { href: "/categories/intermediate", label: "中階球拍" },
                { href: "/categories/advanced", label: "高階競技" },
                { href: "/categories/female", label: "女性球拍" },
                { href: "/brands", label: "品牌介紹" },
                { href: "/compare", label: "球拍比較" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#C8A45D] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Knowledge */}
          <div>
            <h3 className="text-[#FAFAF8] font-semibold text-xs uppercase tracking-widest mb-5">
              知識資源
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/blog", label: "球拍評測" },
                { href: "/faq", label: "常見問題" },
                { href: "/ai", label: "AI 選拍顧問" },
                { href: "/academy", label: "Academy 課程" },
                { href: "/academy/coaches", label: "專業教練" },
                { href: "/academy/venues", label: "場地資訊" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#C8A45D] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[#FAFAF8] font-semibold text-xs uppercase tracking-widest mb-5">
              購物服務
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/shipping", label: "運費說明" },
                { href: "/returns", label: "退換貨政策" },
                { href: "/about", label: "關於我們" },
                { href: "/contact", label: "聯絡我們" },
                { href: "/privacy", label: "隱私權政策" },
                { href: "/terms", label: "服務條款" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#C8A45D] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAFAF8]/40">
          <p>© 2025 SP Pickleball. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#C8A45D] transition-colors">隱私政策</Link>
            <Link href="/terms" className="hover:text-[#C8A45D] transition-colors">服務條款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
