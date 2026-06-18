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

export default async function HomePage() {
  const [featuredProducts, brands] = await Promise.all([
    getFeaturedProducts(),
    getBrands(),
  ]);

  return (
    <>
      <JsonLd schema={localBusinessSchema()} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-700 via-brand-600 to-court-teal overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/court-pattern.svg')] opacity-10" />
        <div className="container-padded py-20 md:py-28 relative">
          <div className="max-w-2xl text-white">
            <span className="inline-block bg-white/20 backdrop-blur text-sm font-medium px-3 py-1 rounded-full mb-4">
              🏆 台灣匹克球拍專家
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              找到最適合你的<br />
              <span className="text-brand-200">匹克球拍</span>
            </h1>
            <p className="text-lg text-brand-100 mb-8 leading-relaxed">
              專業評測 × AI 選拍顧問 × 完整品牌資料庫
              <br className="hidden sm:block" />
              不論你是新手或老手，我們幫你找到完美球拍。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors flex items-center gap-2"
              >
                瀏覽所有球拍 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ai"
                className="bg-white/10 backdrop-blur border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                🤖 AI 幫我選拍
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b bg-white">
        <div className="container-padded py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Truck className="w-5 h-5" />, text: "全台免運費" },
              { icon: <RefreshCw className="w-5 h-5" />, text: "7 天退換貨" },
              { icon: <Shield className="w-5 h-5" />, text: "原廠保固" },
              { icon: <MessageCircle className="w-5 h-5" />, text: "LINE 即時客服" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 justify-center text-sm text-gray-600 font-medium">
                <span className="text-brand-600">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-gap bg-gray-50">
        <div className="container-padded">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">精選球拍</h2>
              <p className="text-gray-500 mt-1">編輯精選推薦，品質保證</p>
            </div>
            <Link href="/products" className="text-brand-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-white border rounded-xl animate-pulse" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="section-gap bg-white">
        <div className="container-padded">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">依需求找球拍</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/categories/beginner", label: "新手入門", desc: "輕鬆上手，容錯率高", emoji: "🌱", bg: "bg-green-50 border-green-200" },
              { href: "/categories/intermediate", label: "中階進化", desc: "提升技術的好夥伴", emoji: "📈", bg: "bg-blue-50 border-blue-200" },
              { href: "/categories/advanced", label: "高階競技", desc: "競賽級性能", emoji: "🏆", bg: "bg-yellow-50 border-yellow-200" },
              { href: "/categories/tennis-convert", label: "網球轉換", desc: "熟悉手感快速適應", emoji: "🎾", bg: "bg-orange-50 border-orange-200" },
              { href: "/categories/female", label: "女性球拍", desc: "輕量設計，優雅有力", emoji: "💪", bg: "bg-pink-50 border-pink-200" },
              { href: "/categories/doubles", label: "雙打專用", desc: "強化網前控球", emoji: "🤝", bg: "bg-purple-50 border-purple-200" },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`border rounded-xl p-5 ${cat.bg} hover:shadow-md transition-shadow group`}
              >
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <h3 className="font-bold text-gray-900">{cat.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
                <span className="text-brand-600 text-sm font-medium mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                  查看球拍 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      {brands.length > 0 && (
        <section className="section-gap bg-gray-50">
          <div className="container-padded">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">精選品牌</h2>
              <Link href="/brands" className="text-brand-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                所有品牌 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {brands.map((b) => (
                <Link
                  key={b.id}
                  href={`/brands/${b.slug}`}
                  className="bg-white border rounded-xl p-4 flex items-center justify-center aspect-square hover:border-brand-300 hover:shadow-sm transition-all"
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
                    <span className="font-bold text-sm text-gray-700 text-center">{b.name}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AI Advisor CTA */}
      <section className="section-gap bg-gradient-to-r from-brand-700 to-court-teal text-white">
        <div className="container-padded text-center">
          <div className="text-5xl mb-4">🤖</div>
          <h2 className="text-3xl font-bold mb-3">AI 球拍選購顧問</h2>
          <p className="text-brand-100 text-lg max-w-md mx-auto mb-8">
            回答 4 個問題，30 秒找到最適合你的球拍
          </p>
          <Link
            href="/ai"
            className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-colors text-lg"
          >
            開始選拍 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Trust section */}
      <section className="section-gap bg-white">
        <div className="container-padded">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">為什麼選擇 SP Pickleball</h2>
          <div className="grid md:grid-cols-3 gap-8">
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
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
