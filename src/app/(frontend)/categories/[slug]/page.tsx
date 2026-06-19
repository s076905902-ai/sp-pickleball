import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SuitableFor } from "@prisma/client";
import prisma from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema-markup";
import JsonLd from "@/components/seo/JsonLd";
import ProductCard from "@/components/product/ProductCard";
import SortSelect from "@/components/product/SortSelect";
import { renderContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = await prisma.category.findUnique({ where: { slug } });
  if (!cat) return {};
  const seoMeta = await prisma.seoMeta.findUnique({ where: { entityId: cat.id } });
  return buildMetadata({
    title: seoMeta?.title ?? `${cat.name} 匹克球拍 — 完整推薦`,
    description: seoMeta?.description ?? `瀏覽所有${cat.name}匹克球拍，附評分、規格比較與購買建議。`,
    canonical: `/categories/${slug}`,
  });
}

// Skill-level category slugs map to SuitableFor enum values
const SLUG_TO_SUITABLE: Record<string, SuitableFor> = {
  beginner: SuitableFor.BEGINNER,
  intermediate: SuitableFor.INTERMEDIATE,
  advanced: SuitableFor.ADVANCED,
  female: SuitableFor.FEMALE,
  "tennis-convert": SuitableFor.TENNIS_CONVERT,
  doubles: SuitableFor.DOUBLES,
  singles: SuitableFor.SINGLES,
};

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page ?? "1");
  const perPage = 24;

  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) notFound();

  // For skill-level slugs use suitableFor filter; otherwise use categoryId
  const suitableForValue = SLUG_TO_SUITABLE[slug];
  const productWhere = suitableForValue
    ? { suitableFor: { has: suitableForValue }, status: "PUBLISHED" as const }
    : { categoryId: category.id, status: "PUBLISHED" as const };

  const [products, total, geoContent] = await Promise.all([
    prisma.product.findMany({
      where: productWhere,
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: sp.sort === "price_asc" ? { price: "asc" }
             : sp.sort === "price_desc" ? { price: "desc" }
             : { isFeatured: "desc" },
      include: { brand: true, category: true },
    }),
    prisma.product.count({ where: productWhere }),
    prisma.geoContent.findUnique({ where: { entityId: category.id } }),
  ]);

  const faqItems = geoContent?.aiFaq as { question: string; answer: string }[] | null;

  const schemas = [
    breadcrumbSchema([
      { name: "首頁", url: "/" },
      { name: category.name, url: `/categories/${slug}` },
    ]),
    ...(faqItems?.length ? [faqPageSchema(faqItems)] : []),
  ];

  return (
    <>
      <JsonLd schema={schemas} />
      <div className="container-padded py-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-brand-600">首頁</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 text-sm max-w-2xl leading-relaxed">{category.description}</p>
          )}
        </div>

        {/* GEO summary */}
        {geoContent?.aiSummary && (
          <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 mb-8 text-sm text-brand-700 leading-relaxed">
            {geoContent.aiSummary}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">共 {total} 件</p>
          <SortSelect current={sp.sort} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
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
                suitableFor: p.suitableFor,
              }}
            />
          ))}
        </div>

        {/* GEO content */}
        {geoContent?.aiStructuredContent && (
          <section className="prose prose-sm max-w-none text-gray-600 mb-8">
            <div dangerouslySetInnerHTML={{ __html: renderContent(String(geoContent.aiStructuredContent)) }} />
          </section>
        )}

        {/* FAQ */}
        {faqItems && faqItems.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{category.name} 常見問題</h2>
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