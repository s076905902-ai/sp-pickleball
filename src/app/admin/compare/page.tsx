import prisma from "@/lib/prisma";
import { GitCompare } from "lucide-react";

export default async function AdminComparePage() {
  const compareItems = await prisma.compareItem.findMany({
    orderBy: { createdAt: "desc" },
    include: { product: { select: { name: true, slug: true, price: true, mainImage: true } } },
    take: 50,
  });

  // Group by session/user
  const grouped = compareItems.reduce<Record<string, typeof compareItems>>((acc, item) => {
    const key = item.sessionId ?? item.userId ?? "unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <GitCompare className="w-6 h-6 text-gray-700" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">比較頁管理</h1>
          <p className="text-sm text-gray-500">目前用戶比較清單（即時資料）</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-5">
          <p className="text-2xl font-bold text-gray-900">{compareItems.length}</p>
          <p className="text-sm text-gray-500">比較項目總數</p>
        </div>
        <div className="bg-white border rounded-xl p-5">
          <p className="text-2xl font-bold text-gray-900">{Object.keys(grouped).length}</p>
          <p className="text-sm text-gray-500">活躍比較會話</p>
        </div>
        <div className="bg-white border rounded-xl p-5">
          <p className="text-2xl font-bold text-gray-900">
            {[...new Set(compareItems.map(i => i.productId))].length}
          </p>
          <p className="text-sm text-gray-500">被比較商品種類</p>
        </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="font-semibold text-gray-900">最近比較項目</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">商品</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">會話 / 用戶</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">加入時間</th>
            </tr>
          </thead>
          <tbody>
            {compareItems.map(item => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {item.product.mainImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.product.mainImage} alt="" className="w-8 h-8 object-contain rounded" />
                    )}
                    <span className="font-medium text-gray-900">{item.product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{(item.sessionId ?? item.userId ?? "—").slice(-8)}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(item.createdAt).toLocaleString("zh-TW")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {compareItems.length === 0 && <div className="text-center py-12 text-gray-400">目前無用戶在比較商品</div>}
      </div>
    </div>
  );
}
