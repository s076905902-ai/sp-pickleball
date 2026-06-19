import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "SP Pickleball Academy — 匹克球教學課程",
  description: "SP Pickleball Academy 提供專業教練一對一指導、團體課、場地租借服務，適合新手入門到進階球員。",
  canonical: "/academy",
});

export default function AcademyPage() {
  return (
    <div className="container-padded py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-xs text-[#C8A45D] font-semibold tracking-widest uppercase mb-3">SP Pickleball Academy</p>
        <h1 className="text-3xl font-bold text-[#111111] mb-4">從零到高手，一站式學習</h1>
        <p className="text-[#4B5563] leading-relaxed">
          不論你是第一次拿起球拍的新手，或是想要突破瓶頸的進階球員，我們的認證教練都能幫你快速進步。
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {[
          {
            emoji: "🎓",
            title: "專業教練",
            desc: "認證 USAPA 教練，結合球拍知識與技術訓練，量身打造課程計畫。",
            href: "/academy/coaches",
            cta: "認識教練 →",
          },
          {
            emoji: "🏟️",
            title: "場地資訊",
            desc: "全台合作場地查詢，室內室外均有，隨時預約享受專業環境。",
            href: "/academy/venues",
            cta: "查看場地 →",
          },
          {
            emoji: "💬",
            title: "LINE 預約",
            desc: "加入 LINE 即可直接與客服預約課程、詢問場地時段，快速確認。",
            href: "https://line.me/ti/p/QfXjVSMKha",
            cta: "LINE 預約 →",
            external: true,
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="bg-[#F9F8F5] border border-[#E5E2D8] rounded-2xl p-8 text-center hover:shadow-md transition-shadow group"
          >
            <div className="text-4xl mb-4">{item.emoji}</div>
            <h2 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-[#123524] transition-colors">
              {item.title}
            </h2>
            <p className="text-sm text-[#4B5563] leading-relaxed mb-4">{item.desc}</p>
            <span className="text-sm font-semibold text-[#123524]">{item.cta}</span>
          </Link>
        ))}
      </div>

      <div className="bg-[#111111] rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-[#FAFAF8] mb-3">課程說明</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-left mt-6">
          {[
            { label: "新手入門班", desc: "2 小時，涵蓋規則、握拍、發球、接球，適合完全零基礎" },
            { label: "技術提升班", desc: "4 小時，針對 Dink、Third Shot Drop、截擊等進階技術" },
            { label: "一對一私教", desc: "客製化訓練計畫，直接改善弱點，快速突破瓶頸" },
          ].map((c) => (
            <div key={c.label} className="bg-white/5 rounded-xl p-4">
              <h3 className="font-semibold text-[#C8A45D] mb-2">{c.label}</h3>
              <p className="text-sm text-[#FAFAF8]/70">{c.desc}</p>
            </div>
          ))}
        </div>
        <a
          href="https://line.me/ti/p/QfXjVSMKha"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 bg-[#C8A45D] text-[#111111] font-bold px-8 py-3 rounded-full hover:bg-[#B89245] transition-colors"
        >
          💬 LINE 立即預約課程
        </a>
      </div>
    </div>
  );
}
