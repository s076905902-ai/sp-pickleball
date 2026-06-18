import prisma from "@/lib/prisma";
import { ExternalLink } from "lucide-react";

export default async function AdminMerchantFeedPage() {
  const products = await prisma.product.findMany({
    where: { status: "PUBLISHED" },
    select: { id: true, name: true, sku: true, price: true, salePrice: true, mainImage: true, gtin: true, mpn: true, brand: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
    take: 20,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sportspoint.tw";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">商品 Feed</h1>
          <p className="text-sm text-gray-500 mt-1">Google Merchant Center 商品資料</p>
        </div>
        <div className="flex gap-3">
          <a href="/api/feed/google" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <ExternalLink className="w-4 h-4" /> XML Feed
          </a>
          <a href="/api/feed/meta" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <ExternalLink className="w-4 h-4" /> Meta CSV
          </a>
        </div>
      </div>

      {/* Feed URLs */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: "Google Merchant XML", url: `${siteUrl}/api/feed/google`, desc: "每日更新，適合 Google Shopping" },
          { label: "Meta/Facebook CSV", url: `${siteUrl}/api/feed/meta`, desc: "適合 Facebook & Instagram 廣告" },
        ].map(f => (
          <div key={f.label} className="bg-white border rounded-xl p-5">
            <p className="font-semibold text-gray-900 mb-1">{f.label}</p>
            <p className="text-xs text-gray-500 mb-3">{f.desc}</p>
            <code className="block bg-gray-50 border rounded px-3 py-2 text-xs text-gray-700 break-all">{f.url}</code>
          </div>
        ))}
      </div>

      {/* Product preview */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="font-semibold text-gray-900">已上架商品預覽（{products.length} 件）</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">商品</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">品牌</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">SKU / MPN</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">GTIN</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">價格</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">圖片</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{p.name}</td>
                <td className="px-4 py-3 text-gray-500">{p.brand.name}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{p.sku}</td>
                <td className="px-4 py-3">
                  {p.gtin ? (
                    <span className="text-green-600 font-mono text-xs">{p.gtin}</span>
                  ) : (
                    <span className="text-red-400 text-xs">未設定</span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium">
                  {p.salePrice ? (
                    <span className="text-red-600">NT${Number(p.salePrice).toLocaleString()}</span>
                  ) : (
                    <span>NT${Number(p.price).toLocaleString()}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {p.mainImage ? (
                    <span className="text-green-600 text-xs">✓</span>
                  ) : (
                    <span className="text-red-400 text-xs">缺圖</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
