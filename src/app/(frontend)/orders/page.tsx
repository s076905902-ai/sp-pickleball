import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "我的訂單 — SP Pickleball",
  description: "查看你的 SP Pickleball 訂單紀錄。",
  canonical: "/orders",
});

export default function OrdersPage() {
  return (
    <div className="container-padded py-20 max-w-lg mx-auto text-center">
      <div className="w-20 h-20 bg-[#F2F8F5] rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingBag className="w-10 h-10 text-[#123524]" />
      </div>
      <h1 className="text-2xl font-bold text-[#111111] mb-3">我的訂單</h1>
      <p className="text-[#4B5563] mb-2 text-sm leading-relaxed">
        若您已下單，請在訂單確認信中找到訂單連結，
        <br />或直接聯絡 LINE 客服查詢訂單狀態。
      </p>
      <p className="text-xs text-[#4B5563]/60 mb-8">
        會員登入後可在此查看所有訂單紀錄（功能持續開發中）
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#123524] text-white font-semibold px-7 py-3 rounded-full hover:bg-[#1F6B4F] transition-colors"
        >
          繼續購物 <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border border-[#C8A45D] text-[#C8A45D] font-semibold px-7 py-3 rounded-full hover:bg-[#C8A45D]/10 transition-colors"
        >
          聯絡客服
        </Link>
      </div>
    </div>
  );
}
