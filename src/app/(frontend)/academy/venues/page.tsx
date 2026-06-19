import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "場地資訊 — SP Pickleball Academy",
  description: "SP Pickleball 合作場地一覽，台北、新北、台中均有室內外場地，隨時預約練球。",
  canonical: "/academy/venues",
});

const VENUES = [
  {
    city: "台北市",
    name: "SP Pickleball 信義館",
    address: "台北市信義區（詳細地址請加 LINE 詢問）",
    courts: 4,
    type: "室內",
    hours: "週一至週日 08:00–22:00",
    emoji: "🏙️",
  },
  {
    city: "新北市",
    name: "SP Pickleball 板橋場",
    address: "新北市板橋區（詳細地址請加 LINE 詢問）",
    courts: 6,
    type: "室外（燈光夜場）",
    hours: "週一至週日 07:00–21:00",
    emoji: "🌆",
  },
  {
    city: "台中市",
    name: "SP Pickleball 台中館",
    address: "台中市西屯區（詳細地址請加 LINE 詢問）",
    courts: 3,
    type: "室內",
    hours: "週二至週日 09:00–20:00",
    emoji: "🏢",
  },
];

export default function VenuesPage() {
  return (
    <div className="container-padded py-12 max-w-4xl mx-auto">
      <nav className="text-sm text-[#4B5563] mb-6">
        <Link href="/" className="hover:text-[#123524]">首頁</Link>
        <span className="mx-2">/</span>
        <Link href="/academy" className="hover:text-[#123524]">Academy</Link>
        <span className="mx-2">/</span>
        <span className="text-[#111111]">場地資訊</span>
      </nav>

      <h1 className="text-3xl font-bold text-[#111111] mb-3">場地資訊</h1>
      <p className="text-[#4B5563] mb-10">全台合作場地一覽，含室內、室外、燈光夜場，預約請加 LINE 客服。</p>

      <div className="space-y-4 mb-12">
        {VENUES.map((v) => (
          <div key={v.name} className="bg-[#F9F8F5] border border-[#E5E2D8] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">{v.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-[#123524] text-white px-2 py-0.5 rounded-full">{v.city}</span>
                  <span className="text-xs bg-[#E5E2D8] text-[#4B5563] px-2 py-0.5 rounded-full">{v.type}</span>
                </div>
                <h2 className="font-bold text-[#111111] text-lg mb-1">{v.name}</h2>
                <p className="text-sm text-[#4B5563] mb-1">📍 {v.address}</p>
                <p className="text-sm text-[#4B5563] mb-1">🎾 {v.courts} 片場地</p>
                <p className="text-sm text-[#4B5563]">⏰ {v.hours}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#F2F8F5] border border-[#BCDECF] rounded-2xl p-6 text-center">
        <p className="text-[#123524] font-medium mb-1">場地詳細位置、租借費用與可預約時段</p>
        <p className="text-sm text-[#4B5563] mb-4">請加 LINE 客服取得最新資訊</p>
        <a
          href="https://line.me/ti/p/QfXjVSMKha"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#123524] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0D2A1B] transition-colors text-sm"
        >
          💬 LINE 預約場地
        </a>
      </div>
    </div>
  );
}
