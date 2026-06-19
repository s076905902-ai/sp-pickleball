import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema-markup";
import JsonLd from "@/components/seo/JsonLd";
import ProductCard from "@/components/product/ProductCard";

interface PageProps { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const brands = await prisma.brand.findMany({ select: { slug: true } });
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await prisma.brand.findUnique({ where: { slug } });
  if (!brand) return {};
  const seoMeta = await prisma.seoMeta.findUnique({ where: { entityId: brand.id } });
  return buildMetadata({
    title: seoMeta?.title ?? `${brand.name} 球拍 — 品牌介紹與完整商品`,
    description: seoMeta?.description ?? `${brand.name} 匹克球拍完整介紹、品牌歷史、技術特色、熱門商品評測。`,
    canonical: `/brands/${slug}`,
    ogImage: seoMeta?.ogImage ?? brand.coverImage ?? undefined,
  });
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const [brand, ] = await Promise.all([
    prisma.brand.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: "PUBLISHED" },
          take: 12,
          orderBy: { isFeatured: "desc" },
          include: { brand: true, category: true },
        },
      },
    }),
  ]);

  if (!brand) notFound();

  const geoContent = await prisma.geoContent.findUnique({ where: { entityId: brand.id } });
  const faqItems = geoContent?.aiFaq as { question: string; answer: string }[] | null;
  const schemas = [
    breadcrumbSchema([
      { name: "首頁", url: "/" },
      { name: "品牌", url: "/brands" },
      { name: brand.name, url: `/brands/${slug}` },
    ]),
    ...(faqItems?.length ? [faqPageSchema(faqItems)] : []),
  ];

  return (
    <>
      <JsonLd schema={schemas} />
      <div className="container-padded py-8">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-600">首頁</Link>
          <span className="mx-2">/</span>
          <Link href="/brands" className="hover:text-brand-600">品牌</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{brand.name}</span>
        </nav>

        {/* Brand header */}
        <div className="flex flex-col sm:flex-row gap-6 items-start mb-10">
          {brand.logo && (
            <div className="w-24 h-24 bg-white border rounded-xl flex items-center justify-center p-3 shrink-0">
              <Image src={brand.logo} alt={`${brand.name} logo`} width={80} height={80} className="object-contain" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{brand.name}</h1>
            {brand.country && <p className="text-sm text-gray-500 mb-2">🌏 {brand.country}{brand.foundedYear ? ` · 創立於 ${brand.foundedYear}` : ""}</p>}
            {brand.description && <p className="text-gray-600 leading-relaxed max-w-2xl">{brand.description}</p>}
          </div>
        </div>

        {/* Cover */}
        {brand.coverImage && (
          <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden mb-10">
            <Image src={brand.coverImage} alt={`${brand.name} 品牌形象`} fill className="object-cover" />
          </div>
        )}

        {/* History */}
        {brand.history && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">品牌歷史</h2>
            <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: brand.history }} />
          </section>
        )}

        {/* Tech */}
        {brand.techFeatures && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">技術特色</h2>
            <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: brand.techFeatures }} />
          </section>
        )}

        {/* GEO AI summary */}
        {geoContent?.aiSummary && (
          <section className="mb-10 bg-brand-50 rounded-2xl p-6 border border-brand-100">
            <h2 className="text-lg font-bold text-[#0D2A1B] mb-2">SP Pickleball 總結</h2>
            <p className="text-brand-700 text-sm leading-relaxed">{geoContent.aiSummary}</p>
          </section>
        )}

        {/* Products */}
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">{brand.name} 全部球拍</h2>
            <Link href={`/products?brand=${brand.slug}`} className="text-brand-600 text-sm hover:underline">
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {brand.products.map((p) => (
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
                  controlScore: p.controlScore,
                }}
              />
            ))}
          </div>
        </section>

        {/* GEO FAQ */}
        {faqItems && faqItems.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">常見問題</h2>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <details key={i} className="border rounded-xl">
                  <summary className="px-4 py-3 font-medium cursor-pointer">{item.question}</summary>
                  <div className="px-4 pb-4 text-sm text-gray-600">{item.answer}</div>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
