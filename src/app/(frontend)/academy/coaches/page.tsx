import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "專業教練 — SP Pickleball Academy",
  description: "SP Pickleball Academy 認證教練團隊，提供新手入門到進階技術的一對一與團體課程。",
  canonical: "/academy/coaches",
});

const COACHES = [
  {
    name: "Coach Wilson",
    title: "USAPA 認證教練 · 前職業球員",
    specialty: "競技技術 / 比賽戰術",
    desc: "10 年職業匹克球資歷，曾代表台灣出賽多項國際邀請賽。擅長分析球員弱點並快速改善。",
    emoji: "🏆",
    available: "週一至週五 09:00–18:00",
  },
  {
    name: "Coach Mei",
    title: "USAPA 認證教練 · 女子組專家",
    specialty: "新手入門 / 女性球員",
    desc: "專注於幫助完全零基礎的新手快速建立正確手感與觀念，課程輕鬆有趣。",
    emoji: "🎾",
    available: "週二、四、六 10:00–17:00",
  },
  {
    name: "Coach Alex",
    title: "USAPA 認證教練 · 雙打專家",
    specialty: "雙打策略 / 隊形訓練",
    desc: "雙打戰術大師，帶領多支業餘隊伍在全台賽事中獲得佳績。",
    emoji: "🤝",
    available: "週末 09:00–15:00",
  },
];

export default function CoachesPage() {
  return (
    <div className="container-padded py-12 max-w-4xl mx-auto">
      <nav className="text-sm text-[#4B5563] mb-6">
        <Link href="/" className="hover:text-[#123524]">首頁</Link>
        <span className="mx-2">/</span>
        <Link href="/academy" className="hover:text-[#123524]">Academy</Link>
        <span className="mx-2">/</span>
        <span className="text-[#111111]">專業教練</span>
      </nav>

      <h1 className="text-3xl font-bold text-[#111111] mb-3">專業教練團隊</h1>
      <p className="text-[#4B5563] mb-10">每位教練均持有 USAPA 認證，結合豐富實戰經驗，為你提供最有效的進步路徑。</p>

      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {COACHES.map((coach) => (
          <div key={coach.name} className="bg-[#F9F8F5] border border-[#E5E2D8] rounded-2xl p-6">
            <div className="text-4xl mb-4">{coach.emoji}</div>
            <h2 className="font-bold text-[#111111] text-lg mb-1">{coach.name}</h2>
            <p className="text-xs text-[#123524] font-medium mb-1">{coach.title}</p>
            <p className="text-xs text-[#C8A45D] font-semibold mb-3">{coach.specialty}</p>
            <p className="text-sm text-[#4B5563] leading-relaxed mb-4">{coach.desc}</p>
            <p className="text-xs text-[#4B5563]/70">📅 {coach.available}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#F2F8F5] border border-[#BCDECF] rounded-2xl p-6 text-center">
        <p className="text-[#123524] font-medium mb-3">想預約課程或了解詳細收費？</p>
        <a
          href="https://line.me/ti/p/QfXjVSMKha"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#123524] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0D2A1B] transition-colors text-sm"
        >
          💬 LINE 預約教練課程
        </a>
      </div>
    </div>
  );
}
