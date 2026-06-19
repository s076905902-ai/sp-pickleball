import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, articleSchema } from "@/lib/schema-markup";
import JsonLd from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt ?? article.content.slice(0, 150).replace(/<[^>]*>/g, ""),
    canonical: `/blog/${slug}`,
    ogImage: article.coverImage ?? undefined,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      author: true,
      relatedProducts: { take: 4, include: { brand: true, category: true } },
    },
  });

  if (!article || article.status !== "PUBLISHED") notFound();

  const schemas = [
    breadcrumbSchema([
      { name: "首頁", url: "/" },
      { name: "知識庫", url: "/blog" },
      { name: article.title, url: `/blog/${slug}` },
    ]),
    articleSchema({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      authorName: article.author?.name,
    }),
  ];

  return (
    <>
      <JsonLd schema={schemas} />

      <div className="container-padded py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-600">首頁</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-brand-600">知識庫</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 line-clamp-1">{article.title}</span>
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs bg-brand-50 text-brand-600 font-medium px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
            {article.author?.name && (
              <span className="font-medium text-gray-700">{article.author.name}</span>
            )}
            {article.publishedAt && (
              <span>· {formatDate(article.publishedAt)}</span>
            )}
            {article.readingTime && (
              <span>· {article.readingTime} 分鐘閱讀</span>
            )}
          </div>

          {/* Cover image */}
          {article.coverImage && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg text-gray-600 leading-relaxed mb-6 font-medium border-l-4 border-[#1F6B4F] pl-4">
              {article.excerpt}
            </p>
          )}

          {/* Content */}
          <div
            className="prose prose-gray prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-sm
              prose-blockquote:border-[#1F6B4F] prose-blockquote:text-gray-600
              prose-code:text-brand-700 prose-code:bg-brand-50 prose-code:px-1 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* Related products */}
        {article.relatedProducts.length > 0 && (
          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t">
            <h2 className="text-xl font-bold text-gray-900 mb-6">文章推薦球拍</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {article.relatedProducts.map((p) => (
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

        {/* Back link */}
        <div className="max-w-3xl mx-auto mt-10">
          <Link href="/blog" className="text-brand-600 hover:text-brand-700 text-sm font-medium">
            ← 返回知識庫
          </Link>
        </div>
      </div>
    </>
  );
}
