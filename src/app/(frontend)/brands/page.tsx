import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "品牌總覽 — SP Pickleball",
  description: "探索 SP Pickleball 代理的頂級匹克球品牌，包含 Selkirk Sports、Everyday Social、ProKennex、RPM 等國際知名品牌。",
  canonical: "/brands",
});

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: { where: { status: "PUBLISHED" } } } },
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">品牌總覽</h1>
        <p className="text-gray-500">精選國際頂級匹克球品牌，每一個都代表著卓越品質與創新科技。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="group bg-white rounded-2xl border hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            {brand.coverImage ? (
              <div className="relative h-48 bg-gray-50">
                <Image
                  src={brand.coverImage}
                  alt={brand.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                <span className="text-4xl font-bold text-[#123524] opacity-30">
                  {brand.name.charAt(0)}
                </span>
              </div>
            )}

            <div className="p-5">
              {brand.logo && (
                <div className="relative h-8 w-24 mb-3">
                  <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-contain object-left" />
                </div>
              )}
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#123524] transition-colors mb-1">
                {brand.name}
              </h2>
              {brand.country && (
                <p className="text-xs text-gray-400 mb-2">🌍 {brand.country}{brand.foundedYear ? ` · 成立於 ${brand.foundedYear}` : ""}</p>
              )}
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">{brand.description}</p>
              <span className="text-xs font-medium text-[#123524] bg-[#F2F8F5] px-2.5 py-1 rounded-full">
                {brand._count.products} 個商品
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
