import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema-markup";
import JsonLd from "@/components/seo/JsonLd";
import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import SortSelect from "@/components/product/SortSelect";

export const metadata: Metadata = buildMetadata({
  title: "所有球拍",
  description:
    "瀏覽 SP Pickleball 精選匹克球拍，涵蓋新手、中階、高階、女性、網球轉換等各類型球拍，附完整評分與詳細規格。",
  canonical: "/products",
});

interface PageProps {
  searchParams: Promise<{
    q?: string;
    brand?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
    sale?: string;
    suitableFor?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1");
  const perPage = 24;
  const skip = (page - 1) * perPage;

  const where: Record<string, unknown> = { status: "PUBLISHED" };

  if (params.q) {
    where.OR = [
      { name: { contains: params.q, mode: "insensitive" } },
      { description: { contains: params.q, mode: "insensitive" } },
    ];
  }
  if (params.brand) where.brand = { slug: params.brand };
  if (params.category) where.category = { slug: params.category };
  if (params.sale === "1") where.salePrice = { not: null };
  if (params.minPrice || params.maxPrice) {
    where.price = {};
    if (params.minPrice) (where.price as Record<string, number>).gte = parseFloat(params.minPrice);
    if (params.maxPrice) (where.price as Record<string, number>).lte = parseFloat(params.maxPrice);
  }
  if (params.suitableFor) {
    where.suitableFor = { has: params.suitableFor };
  }

  const orderBy: Record<string, string> = {};
  switch (params.sort) {
    case "price_asc":  orderBy.price = "asc";  break;
    case "price_desc": orderBy.price = "desc"; break;
    case "newest":     orderBy.createdAt = "desc"; break;
    default:           orderBy.isFeatured = "desc"; break;
  }

  const [products, total, brands, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: perPage,
      orderBy,
      include: { brand: true, category: true },
    }),
    prisma.product.count({ where }),
    prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  const breadcrumb = breadcrumbSchema([
    { name: "首頁", url: "/" },
    { name: "所有球拍", url: "/products" },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumb} />

      <div className="container-padded py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-brand-600">首頁</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">所有球拍</span>
        </nav>

        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">所有球拍</h1>
          <p className="text-sm text-gray-500">共 {total} 件商品</p>
        </div>

        <div className="flex gap-6">
          {/* Filters sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <ProductFilters brands={brands} categories={categories} params={params} />
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {/* Sort */}
            <div className="flex justify-end mb-4">
              <SortSelect current={params.sort} />
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((p) => (
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
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-medium">找不到符合的球拍</p>
                <p className="text-sm mt-1">試試移除篩選條件</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination current={page} total={totalPages} params={params} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Pagination({
  current,
  total,
  params,
}: {
  current: number;
  total: number;
  params: Record<string, string | undefined>;
}) {
  function buildUrl(p: number) {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => v && sp.set(k, v));
    sp.set("page", String(p));
    return `/products?${sp.toString()}`;
  }

  return (
    <div className="flex justify-center gap-2 mt-10">
      {current > 1 && (
        <a href={buildUrl(current - 1)} className="px-3 py-1.5 border rounded text-sm hover:bg-gray-50">
          上一頁
        </a>
      )}
      {Array.from({ length: Math.min(total, 7) }, (_, i) => {
        const p = i + 1;
        return (
          <a
            key={p}
            href={buildUrl(p)}
            className={`px-3 py-1.5 border rounded text-sm ${
              p === current ? "bg-brand-600 text-white border-brand-600" : "hover:bg-gray-50"
            }`}
          >
            {p}
          </a>
        );
      })}
      {current < total && (
        <a href={buildUrl(current + 1)} className="px-3 py-1.5 border rounded text-sm hover:bg-gray-50">
          下一頁
        </a>
      )}
    </div>
  );
}
