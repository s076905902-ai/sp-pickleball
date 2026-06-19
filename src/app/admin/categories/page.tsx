import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Edit } from "lucide-react";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } }, parent: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">分類管理</h1>
        <Link href="/admin/categories/new" className="bg-[#123524] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#1F6B4F]">
          <Plus className="w-4 h-4" /> 新增分類
        </Link>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">分類名稱</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">上層分類</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">商品數</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">狀態</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">排序</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-400">/categories/{c.slug}</p>
                </td>
                <td className="px-4 py-3 text-gray-500">{c.parent?.name ?? "（頂層）"}</td>
                <td className="px-4 py-3 text-gray-600">{c._count.products}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.isActive ? "bg-[#E0F0E8] text-[#0D2A1B]" : "bg-gray-100 text-gray-500"}`}>
                    {c.isActive ? "啟用" : "停用"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{c.sortOrder}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/categories/${c.id}`} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded inline-flex">
                    <Edit className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && <div className="text-center py-12 text-gray-400">尚無分類</div>}
      </div>
    </div>
  );
}
