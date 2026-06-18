import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema-markup";
import JsonLd from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "球拍評測與教學",
  description: "SP Pickleball 球拍評測、新手教學、技術提升文章，幫助你更快進步。",
  canonical: "/blog",
});

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 24,
    include: { author: true },
  });

  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "首頁", url: "/" }, { name: "知識庫", url: "/blog" }])} />
      <div className="container-padded py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">球拍評測與教學</h1>
        <p className="text-gray-500 mb-8">專業球拍評測、新手入門、技術提升，一站學習匹克球。</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className="group bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              {article.coverImage && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={article.coverImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="p-4">
                {article.tags.length > 0 && (
                  <span className="text-xs text-brand-600 font-medium">{article.tags[0]}</span>
                )}
                <h2 className="font-bold text-gray-900 mt-1 mb-2 line-clamp-2 group-hover:text-brand-700">{article.title}</h2>
                {article.excerpt && <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>}
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                  {article.author?.name && <span>{article.author.name}</span>}
                  {article.publishedAt && <span>· {formatDate(article.publishedAt)}</span>}
                  {article.readingTime && <span>· {article.readingTime} 分鐘閱讀</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
