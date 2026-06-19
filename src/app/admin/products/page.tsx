import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Edit, Eye } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
    include: { brand: true, category: true },
    take: 100,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">商品管理</h1>
        <Link href="/admin/products/new" className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-brand-700">
          <Plus className="w-4 h-4" /> 新增商品
        </Link>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">商品名稱</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">品牌</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">分類</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">售價</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">庫存</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">狀態</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                <td className="px-4 py-3 text-gray-500">{p.brand.name}</td>
                <td className="px-4 py-3 text-gray-500">{p.category.name}</td>
                <td className="px-4 py-3">
                  {p.salePrice ? (
                    <span>
                      <span className="font-medium text-red-600">NT${Number(p.salePrice).toLocaleString()}</span>
                      <span className="text-gray-400 text-xs line-through ml-1">NT${Number(p.price).toLocaleString()}</span>
                    </span>
                  ) : (
                    <span className="font-medium">NT${Number(p.price).toLocaleString()}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${p.stock === 0 ? "text-red-600" : p.stock < 5 ? "text-orange-500" : "text-gray-700"}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/admin/products/${p.id}`} className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <Link href={`/products/${p.slug}`} target="_blank" className="p-1.5 text-gray-500 hover:text-[#123524] hover:bg-[#F2F8F5] rounded">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PUBLISHED: "bg-[#E0F0E8] text-[#0D2A1B]",
    DRAFT: "bg-gray-100 text-gray-600",
    ARCHIVED: "bg-red-100 text-red-600",
  };
  const label: Record<string, string> = {
    PUBLISHED: "上架", DRAFT: "草稿", ARCHIVED: "下架",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {label[status] ?? status}
    </span>
  );
}
