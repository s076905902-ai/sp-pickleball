import type { Metadata } from "next";
import Link from "next/link";
import { User, ShoppingBag, Heart, Settings, LogIn } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "我的帳戶 — SP Pickleball",
  description: "管理你的 SP Pickleball 帳戶、查看訂單紀錄與願望清單。",
  canonical: "/account",
});

export default function AccountPage() {
  return (
    <div className="container-padded py-16 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-[#F2F8F5] rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-[#123524]" />
        </div>
        <h1 className="text-2xl font-bold text-[#111111]">我的帳戶</h1>
        <p className="text-[#4B5563] mt-2 text-sm">登入後即可查看訂單與管理個人資料</p>
      </div>

      {/* Login prompt */}
      <div className="bg-white border border-[#E5E2D8] rounded-2xl p-8 mb-6 text-center"
           style={{ boxShadow: "0 18px 45px rgba(17,17,17,0.07)" }}>
        <h2 className="font-bold text-[#111111] mb-2">尚未登入</h2>
        <p className="text-sm text-[#4B5563] mb-6">
          登入以查看你的訂單、願望清單及個人設定
        </p>
        <Link
          href="/api/auth/signin"
          className="inline-flex items-center gap-2 bg-[#123524] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#1F6B4F] transition-colors"
        >
          <LogIn className="w-4 h-4" /> 登入帳戶
        </Link>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { href: "/orders", icon: ShoppingBag, label: "我的訂單" },
          { href: "/wishlist", icon: Heart, label: "願望清單" },
          { href: "/contact", icon: Settings, label: "聯絡客服" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white border border-[#E5E2D8] rounded-2xl p-5 flex flex-col items-center gap-2 text-sm font-medium text-[#111111] hover:border-[#123524] transition-colors"
          >
            <item.icon className="w-6 h-6 text-[#1F6B4F]" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
