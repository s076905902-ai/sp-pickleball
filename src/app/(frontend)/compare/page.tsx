import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "球拍比較中心",
  description: "SP Pickleball 球拍詳細比較，讓你一眼看出差異，做出最佳選擇。",
  canonical: "/compare",
});

export default async function ComparePage() {
  const comparePages = await prisma.comparePage.findMany({
    where: { isActive: true, isIndexed: true },
    orderBy: { updatedAt: "desc" },
    take: 20,
  });

  return (
    <div className="container-padded py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">球拍比較中心</h1>
      <p className="text-gray-500 mb-8">深度比較熱門球拍，找出最適合你的選擇</p>

      {comparePages.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {comparePages.map((page) => (
            <Link key={page.id} href={`/compare/${page.slug}`}
              className="border rounded-xl p-5 hover:border-[#BCDECF] hover:shadow-sm transition-all group">
              <h2 className="font-bold text-gray-900 group-hover:text-brand-700">{page.title}</h2>
              {page.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{page.description}</p>}
              <span className="text-brand-600 text-sm font-medium mt-3 flex items-center gap-1">查看比較 →</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">⚖️</p>
          <p>比較頁面建置中，敬請期待</p>
        </div>
      )}
    </div>
  );
}
