import prisma from "@/lib/prisma";
import { BarChart2, TrendingUp, ShoppingBag, Package } from "lucide-react";

export default async function AdminAnalyticsPage() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalOrders,
    ordersThisMonth,
    ordersThisWeek,
    completedOrders,
    revenueResult,
    topProducts,
    ordersByStatus,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.order.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.order.count({ where: { status: "COMPLETED" } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: ["COMPLETED", "SHIPPED", "PREPARING"] } } }),
    prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    }),
    prisma.order.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const totalRevenue = Number(revenueResult._sum.total ?? 0);

  const productIds = topProducts.map(t => t.productId);
  const productNames = await prisma.product.findMany({ where: { id: { in: productIds } }, select: { id: true, name: true } });
  const nameMap = Object.fromEntries(productNames.map(p => [p.id, p.name]));

  const statusLabels: Record<string, string> = {
    PENDING_PAYMENT: "待付款", TRANSFER_NOTIFIED: "已通知匯款", PENDING_CONFIRM: "待確認",
    PREPARING: "備貨中", SHIPPED: "已出貨", COMPLETED: "已完成",
    CANCELLED: "已取消", RETURNING: "退貨中", REFUNDED: "已退款",
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <BarChart2 className="w-6 h-6 text-gray-700" />
        <h1 className="text-2xl font-bold text-gray-900">流量分析</h1>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 mb-6 text-sm text-blue-700">
        📊 如需 GA4 / Google Search Console 數據，請在 <code className="bg-blue-100 px-1 rounded">.env.local</code> 設定 <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_GA_ID</code>。以下為資料庫訂單統計。
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "本週訂單", value: ordersThisWeek, icon: ShoppingBag, color: "bg-blue-500" },
          { label: "本月訂單", value: ordersThisMonth, icon: TrendingUp, color: "bg-indigo-500" },
          { label: "完成訂單", value: completedOrders, icon: Package, color: "bg-green-500" },
          { label: "累積營收", value: `NT$${totalRevenue.toLocaleString()}`, icon: BarChart2, color: "bg-yellow-500" },
        ].map(s => (
          <div key={s.label} className="bg-white border rounded-xl p-5">
            <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Top products */}
        <div className="bg-white border rounded-xl">
          <div className="px-6 py-4 border-b"><h2 className="font-bold text-gray-900">熱銷商品 Top 5</h2></div>
          <div className="divide-y">
            {topProducts.map((t, i) => (
              <div key={t.productId} className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gray-100 text-xs font-bold text-gray-600 flex items-center justify-center">{i + 1}</span>
                  <span className="text-sm text-gray-900">{nameMap[t.productId] ?? t.productId}</span>
                </div>
                <span className="text-sm font-medium text-gray-600">{t._sum.quantity} 件</span>
              </div>
            ))}
            {topProducts.length === 0 && <div className="px-6 py-8 text-center text-gray-400 text-sm">尚無銷售資料</div>}
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="bg-white border rounded-xl">
          <div className="px-6 py-4 border-b"><h2 className="font-bold text-gray-900">訂單狀態分佈</h2></div>
          <div className="divide-y">
            {ordersByStatus.map(s => (
              <div key={s.status} className="px-6 py-3 flex items-center justify-between">
                <span className="text-sm text-gray-700">{statusLabels[s.status] ?? s.status}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min(100, (s._count._all / totalOrders) * 100)}%` }} />
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-8 text-right">{s._count._all}</span>
                </div>
              </div>
            ))}
            {ordersByStatus.length === 0 && <div className="px-6 py-8 text-center text-gray-400 text-sm">尚無訂單資料</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
