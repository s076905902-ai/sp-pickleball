import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Edit, Globe } from "lucide-react";

export default async function AdminBrandsPage() {
  const brands = await prisma.brand.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">品牌管理</h1>
        <Link href="/admin/brands/new" className="bg-[#123524] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#1F6B4F]">
          <Plus className="w-4 h-4" /> 新增品牌
        </Link>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">品牌名稱</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">國家</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">成立年份</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">狀態</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">排序</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {b.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.logo} alt={b.name} className="w-8 h-8 object-contain rounded" />
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No</div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{b.name}</p>
                      <p className="text-xs text-gray-400">/brands/{b.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{b.country ?? "—"}</td>
                <td className="px-4 py-3 text-gray-600">{b.foundedYear ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${b.isActive ? "bg-[#E0F0E8] text-[#0D2A1B]" : "bg-gray-100 text-gray-500"}`}>
                    {b.isActive ? "啟用" : "停用"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{b.sortOrder}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/admin/brands/${b.id}`} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                      <Edit className="w-4 h-4" />
                    </Link>
                    {b.website && (
                      <a href={b.website} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 hover:text-[#123524] hover:bg-[#F2F8F5] rounded">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {brands.length === 0 && (
          <div className="text-center py-12 text-gray-400">尚無品牌，點擊「新增品牌」開始</div>
        )}
      </div>
    </div>
  );
}
