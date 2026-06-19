import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "願望清單 — SP Pickleball",
  description: "你的 SP Pickleball 球拍願望清單。",
  canonical: "/wishlist",
});

export default function WishlistPage() {
  return (
    <div className="container-padded py-20 max-w-lg mx-auto text-center">
      <div className="w-20 h-20 bg-[#F2F8F5] rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="w-10 h-10 text-[#123524]" />
      </div>
      <h1 className="text-2xl font-bold text-[#111111] mb-3">願望清單</h1>
      <p className="text-[#4B5563] mb-8 text-sm leading-relaxed">
        願望清單功能即將推出。<br />
        目前你可以直接瀏覽球拍並加入購物車。
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-[#123524] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#1F6B4F] transition-colors"
      >
        瀏覽所有球拍 <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
