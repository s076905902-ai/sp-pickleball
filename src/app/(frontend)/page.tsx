import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, RefreshCw, MessageCircle } from "lucide-react";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema-markup";

export const metadata: Metadata = buildMetadata({
  title: "SP Pickleball — 台灣最完整匹克球拍平台",
  description:
    "專業匹克球拍購物、評測、比較、教學。新手入門、中高階球拍、品牌精選，找到最適合你的球拍。全台免運，LINE 即時客服。",
  canonical: "/",
});

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { status: "PUBLISHED", isFeatured: true },
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { brand: true, category: true },
    });
  } catch {
    return [];
  }
}

async function getBrands() {
  try {
    return await prisma.brand.findMany({
      where: { isActive: true },
      take: 8,
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

const CATEGORIES = [
  { href: "/categories/beginner",       label: "新手入門",   desc: "輕鬆上手，容錯率高",     icon: "🌱" },
  { href: "/categories/intermediate",   label: "中階進化",   desc: "提升技術的好夥伴",         icon: "📈" },
  { href: "/categories/advanced",       label: "高階競技",   desc: "競賽級性能，極致手感",     icon: "🏆" },
  { href: "/categories/tennis-convert", label: "網球轉換",   desc: "熟悉手感，快速適應",       icon: "🎾" },
  { href: "/categories/female",         label: "女性球拍",   desc: "輕量設計，優雅有力",       icon: "💪" },
  { href: "/categories/doubles",        label: "雙打專用",   desc: "強化網前，制霸雙打",       icon: "🤝" },
];

export default async function HomePage() {
  const [featuredProducts, brands] = await Promise.all([
    getFeaturedProducts(),
    getBrands(),
  ]);

  return (
    <>
      <JsonLd schema={localBusinessSchema()} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #111111 0%, #123524 65%, #1F6B4F 100%)",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#FAFAF8 1px, transparent 1px), linear-gradient(90deg, #FAFAF8 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container-padded py-24 md:py-32 relative">
          <div className="max-w-2xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-[#C8A45D] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] animate-pulse" />
              台灣匹克球拍頂級專賣
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[#FAFAF8] mb-6">
              找到最適合你的
              <br />
              <span className="text-[#C8A45D]">匹克球拍</span>
            </h1>

            <p className="text-lg text-[#FAFAF8]/60 mb-10 leading-relaxed max-w-xl">
              專業評測 × AI 選拍顧問 × 完整品牌資料庫
              <br className="hidden sm:block" />
              不論你是新手或老手，我們幫你找到完美球拍。
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#C8A45D] text-[#111111] font-bold px-7 py-3.5 rounded-full hover:bg-[#B89245] transition-colors text-base"
              >
                瀏覽所有球拍 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ai"
                className="inline-flex items-center gap-2 border border-white/30 text-[#FAFAF8] font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors text-base"
              >
                AI 幫我選拍
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ───────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E5E2D8]">
        <div className="container-padded py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Truck className="w-4 h-4" />, text: "全台免運費" },
              { icon: <RefreshCw className="w-4 h-4" />, text: "7 天退換貨" },
              { icon: <Shield className="w-4 h-4" />, text: "原廠品質保固" },
              { icon: <MessageCircle className="w-4 h-4" />, text: "LINE 即時客服" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center justify-center gap-2 text-sm text-[#4B5563] font-medium py-1"
              >
                <span className="text-[#1F6B4F]">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────── */}
      <section className="section-gap bg-[#FAFAF8]">
        <div className="container-padded">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-[#1F6B4F] font-semibold tracking-widest uppercase mb-2">
                精選推薦
              </p>
              <h2 className="text-3xl font-bold text-[#111111]">頂級球拍系列</h2>
            </div>
            <Link
              href="/products"
              className="text-[#123524] font-medium text-sm flex items-center gap-1.5 hover:text-[#1F6B4F] transition-colors group"
            >
              查看全部{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {featuredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    name: p.name,
                    slug: p.slug,
                    price: Number(p.price),
                    salePrice: p.salePrice ? Number(p.salePrice) : null,
                    stock: p.stock,
                    mainImage: p.mainImage,
                    brandName: p.brand.name,
                    categoryName: p.category.name,
                    suitableFor: p.suitableFor,
                    controlScore: p.controlScore,
                    powerScore: p.powerScore,
                    spinScore: p.spinScore,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-white border border-[#E5E2D8] rounded-[20px] animate-pulse"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────── */}
      <section className="section-gap bg-white">
        <div className="container-padded">
          <div className="text-center mb-12">
            <p className="text-xs text-[#1F6B4F] font-semibold tracking-widest uppercase mb-2">
              適合所有球手
            </p>
            <h2 className="text-3xl font-bold text-[#111111]">依需求找球拍</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group bg-[#FAFAF8] border border-[#E5E2D8] rounded-2xl p-6 hover:border-[#123524] hover:shadow-[0_8px_32px_rgba(18,53,36,0.1)] transition-all duration-200"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-[#111111] mb-1">{cat.label}</h3>
                <p className="text-sm text-[#4B5563] mb-3">{cat.desc}</p>
                <span className="inline-flex items-center gap-1 text-[#123524] text-sm font-semibold group-hover:gap-2 transition-all">
                  查看球拍 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brands ────────────────────────────────────────────── */}
      {brands.length > 0 && (
        <section className="section-gap bg-[#FAFAF8]">
          <div className="container-padded">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs text-[#1F6B4F] font-semibold tracking-widest uppercase mb-2">
                  頂級代理
                </p>
                <h2 className="text-2xl font-bold text-[#111111]">精選品牌</h2>
              </div>
              <Link
                href="/brands"
                className="text-[#123524] text-sm font-medium flex items-center gap-1.5 hover:text-[#1F6B4F] transition-colors group"
              >
                所有品牌{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {brands.map((b) => (
                <Link
                  key={b.id}
                  href={`/brands/${b.slug}`}
                  className="bg-white border border-[#E5E2D8] rounded-2xl p-4 flex items-center justify-center aspect-square hover:border-[#123524] hover:shadow-[0_8px_24px_rgba(18,53,36,0.1)] transition-all"
                >
                  {b.logo ? (
                    <Image
                      src={b.logo}
                      alt={`${b.name} 品牌`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  ) : (
                    <span className="font-bold text-sm text-[#111111] text-center leading-tight">
                      {b.name}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── AI Advisor CTA ────────────────────────────────────── */}
      <section className="section-gap bg-[#111111]">
        <div className="container-padded text-center">
          <p className="text-xs text-[#C8A45D] font-semibold tracking-widest uppercase mb-4">
            Powered by AI
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#FAFAF8] mb-4">
            AI 球拍選購顧問
          </h2>
          <p className="text-[#FAFAF8]/50 text-lg max-w-md mx-auto mb-10">
            回答 4 個問題，30 秒找到最適合你的球拍
          </p>
          <Link
            href="/ai"
            className="inline-flex items-center gap-2 bg-[#C8A45D] text-[#111111] font-bold px-10 py-4 rounded-full hover:bg-[#B89245] transition-colors text-base"
          >
            開始選拍 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── Why SP ────────────────────────────────────────────── */}
      <section className="section-gap bg-white">
        <div className="container-padded">
          <div className="text-center mb-14">
            <p className="text-xs text-[#1F6B4F] font-semibold tracking-widest uppercase mb-2">
              我們的承諾
            </p>
            <h2 className="text-3xl font-bold text-[#111111]">為什麼選擇 SP Pickleball</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "🔬",
                title: "專業評測標準",
                desc: "每支球拍經過控制力、爆發力、旋轉、容錯率等五項專業評分，不是靠感覺是靠數據。",
              },
              {
                icon: "📚",
                title: "完整知識庫",
                desc: "從新手入門到高階技巧，涵蓋球拍選購、規則介紹、揮拍教學，一站式學習資源。",
              },
              {
                icon: "🎓",
                title: "Academy 培訓",
                desc: "與專業認證教練合作，提供試打體驗、個人課程、團體訓練，加速你的進步曲線。",
              },
            ].map((item) => (
              <div key={item.title} className="text-center px-4">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg text-[#111111] mb-3">{item.title}</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
