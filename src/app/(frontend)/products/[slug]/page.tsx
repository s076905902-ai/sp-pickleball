import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { productSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema-markup";
import JsonLd from "@/components/seo/JsonLd";
import ProductCard from "@/components/product/ProductCard";
import AddToCartButton from "@/components/cart/AddToCartButton";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import { SUITABLE_FOR_LABELS, formatPrice, scoreColor, scoreLabel } from "@/lib/utils";
import { Star, Shield, Truck, ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { brand: true, category: true },
  });
  if (!product) return {};
  const seoMeta = await prisma.seoMeta.findUnique({ where: { entityId: product.id } });
  return buildMetadata({
    title: seoMeta?.title ?? `${product.name} — ${product.brand.name} 匹克球拍`,
    description:
      seoMeta?.description ??
      `${product.name} 評測規格：重量 ${product.weight ?? "—"}g、厚度 ${product.thickness ?? "—"}mm。${product.description?.slice(0, 100) ?? ""}`,
    canonical: `/products/${slug}`,
    ogImage: seoMeta?.ogImage ?? product.mainImage ?? undefined,
    type: "product",
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
      reviews: {
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      relatedProducts: { take: 4, include: { brand: true, category: true } },
    },
  });

  if (!product || product.status !== "PUBLISHED") notFound();

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : null;

  const faqItems = Array.isArray(product.faq)
    ? (product.faq as { question: string; answer: string }[])
    : [];

  const schemas = [
    productSchema({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: Number(product.price),
      salePrice: product.salePrice ? Number(product.salePrice) : null,
      stock: product.stock,
      sku: product.sku,
      gtin: product.gtin,
      mpn: product.mpn,
      brandName: product.brand.name,
      mainImage: product.mainImage,
      gallery: product.gallery,
      aggregateRating: avgRating
        ? { ratingValue: avgRating, reviewCount: product.reviews.length }
        : undefined,
    }),
    breadcrumbSchema([
      { name: "首頁", url: "/" },
      { name: "所有球拍", url: "/products" },
      { name: product.category.name, url: `/categories/${product.category.slug}` },
      { name: product.name, url: `/products/${product.slug}` },
    ]),
    ...(faqItems.length > 0 ? [faqPageSchema(faqItems)] : []),
  ];

  const scores = [
    { label: "控制力", value: product.controlScore },
    { label: "爆發力", value: product.powerScore },
    { label: "旋轉", value: product.spinScore },
    { label: "容錯率", value: product.forgivenessScore },
    { label: "手感", value: product.feelScore },
  ].filter((s) => s.value != null) as { label: string; value: number }[];

  return (
    <>
      <JsonLd schema={schemas} />

      <div className="container-padded py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-600">首頁</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-brand-600">所有球拍</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/categories/${product.category.slug}`} className="hover:text-brand-600">
            {product.category.name}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Images */}
          <ProductImageGallery
            mainImage={product.mainImage}
            gallery={product.gallery as string[]}
            productName={product.name}
          />

          {/* Info */}
          <div>
            <Link href={`/brands/${product.brand.slug}`} className="text-sm text-brand-600 font-medium hover:underline">
              {product.brand.name}
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1 mb-2">{product.name}</h1>

            {/* Rating */}
            {avgRating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {avgRating.toFixed(1)} ({product.reviews.length} 評價)
                </span>
              </div>
            )}

            {/* Suitable for */}
            {product.suitableFor.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.suitableFor.map((tag) => (
                  <span key={tag} className="bg-brand-50 text-brand-700 text-xs px-2 py-1 rounded-full font-medium">
                    {SUITABLE_FOR_LABELS[tag] ?? tag}
                  </span>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(Number(product.salePrice ?? product.price))}
              </span>
              {product.salePrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(Number(product.price))}
                </span>
              )}
            </div>

            {/* Scores */}
            {scores.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">SP 評分</h3>
                <div className="space-y-2.5">
                  {scores.map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-14 shrink-0">{s.label}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-500 rounded-full transition-all"
                          style={{ width: `${s.value}%` }}
                        />
                      </div>
                      <span className={`text-xs font-semibold w-12 text-right ${scoreColor(s.value)}`}>
                        {s.value} ({scoreLabel(s.value)})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <AddToCartButton product={{ id: product.id, name: product.name, stock: product.stock }} />

            {/* Trust */}
            <div className="mt-5 flex flex-col gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-brand-500" /> 全台免運費</div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-brand-500" /> 原廠保固，品質保證</div>
            </div>

            {/* SKU */}
            <p className="text-xs text-gray-400 mt-4">SKU：{product.sku}</p>
          </div>
        </div>

        {/* Tabs: Description / Specs / FAQ / Reviews */}
        <div className="mt-12">
          <ProductTabs product={product} faqItems={faqItems} />
        </div>

        {/* Related products */}
        {product.relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">你可能也喜歡</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {product.relatedProducts.map((p) => (
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
                    suitableFor: p.suitableFor,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Inline tabs component (avoids extra file for brevity)
function ProductTabs({
  product,
  faqItems,
}: {
  product: {
    description?: string | null;
    specs?: unknown;
    weight?: number | null;
    thickness?: number | null;
    length?: number | null;
    width?: number | null;
    gripLength?: number | null;
    gripCircumference?: number | null;
    material?: string | null;
    coreMaterial?: string | null;
    surfaceMaterial?: string | null;
    certification?: string | null;
    reviews: {
      id: string;
      rating: number;
      authorName: string;
      title?: string | null;
      content: string;
    }[];
  };
  faqItems: { question: string; answer: string }[];
}) {
  const specs = [
    { label: "重量", value: product.weight ? `${product.weight}g` : null },
    { label: "厚度", value: product.thickness ? `${product.thickness}mm` : null },
    { label: "拍面長度", value: product.length ? `${product.length}mm` : null },
    { label: "拍面寬度", value: product.width ? `${product.width}mm` : null },
    { label: "握把長度", value: product.gripLength ? `${product.gripLength}mm` : null },
    { label: "握把周長", value: product.gripCircumference ? `${product.gripCircumference}mm` : null },
    { label: "拍體材質", value: product.material },
    { label: "芯材", value: product.coreMaterial },
    { label: "面板材質", value: product.surfaceMaterial },
    { label: "認證", value: product.certification },
  ].filter((s) => s.value);

  return (
    <div>
      {/* Description */}
      {product.description && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">商品介紹</h2>
          <div
            className="prose prose-sm max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>
      )}

      {/* Specs */}
      {specs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">詳細規格</h2>
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {specs.map((s, i) => (
                  <tr key={s.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium text-gray-500 w-1/3 border-b">{s.label}</td>
                    <td className="px-4 py-3 text-gray-900 border-b">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">常見問題</h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <details key={i} className="border rounded-xl group">
                <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {item.question}
                  <span className="text-brand-600 text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">{item.answer}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">使用者評價</h2>
          <div className="space-y-4">
            {product.reviews.map((r) => (
              <div key={r.id} className="border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-gray-900">{r.authorName}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}`} />
                    ))}
                  </div>
                </div>
                {r.title && <p className="font-medium text-sm text-gray-800 mb-1">{r.title}</p>}
                <p className="text-sm text-gray-600 leading-relaxed">{r.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
