import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Edit, Eye } from "lucide-react";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { author: { select: { name: true } } },
  });

  const statusMap: Record<string, string> = { PUBLISHED: "bg-green-100 text-green-700", DRAFT: "bg-gray-100 text-gray-600", ARCHIVED: "bg-red-100 text-red-600" };
  const statusLabel: Record<string, string> = { PUBLISHED: "已發布", DRAFT: "草稿", ARCHIVED: "已封存" };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">文章管理</h1>
        <Link href="/admin/articles/new" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-700">
          <Plus className="w-4 h-4" /> 新增文章
        </Link>
      </div>
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">標題</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">作者</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">閱讀時間</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">狀態</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">日期</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900 line-clamp-1">{a.title}</p>
                  <p className="text-xs text-gray-400">/articles/{a.slug}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{a.author?.name ?? "匿名"}</td>
                <td className="px-4 py-3 text-gray-500">{a.readingTime ? `${a.readingTime} 分鐘` : "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusMap[a.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {statusLabel[a.status] ?? a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(a.createdAt).toLocaleDateString("zh-TW")}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/admin/articles/${a.id}`} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></Link>
                    <Link href={`/articles/${a.slug}`} target="_blank" className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded"><Eye className="w-4 h-4" /></Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && <div className="text-center py-12 text-gray-400">尚無文章</div>}
      </div>
    </div>
  );
}
