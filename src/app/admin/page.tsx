import { ShoppingBag, Package, Users, Star, TrendingUp, AlertCircle } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const [
    productCount,
    orderCount,
    pendingOrders,
    pendingReviews,
    recentOrders,
  ] = await Promise.all([
    prisma.product.count({ where: { status: "PUBLISHED" } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING_PAYMENT" } }),
    prisma.review.count({ where: { isPublished: false } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: { include: { product: true } } },
    }),
  ]);

  const stats = [
    { label: "上架商品", value: productCount, icon: Package, color: "bg-blue-500" },
    { label: "全部訂單", value: orderCount, icon: ShoppingBag, color: "bg-[#1F6B4F]" },
    { label: "待付款", value: pendingOrders, icon: AlertCircle, color: "bg-yellow-500" },
    { label: "待審評價", value: pendingReviews, icon: Star, color: "bg-purple-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">儀表板</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border">
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border rounded-xl">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="font-bold text-gray-900">最新訂單</h2>
          <a href="/admin/orders" className="text-sm text-brand-600 hover:underline">查看全部</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left px-6 py-3 font-medium text-gray-500">訂單編號</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">買家</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">金額</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">狀態</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">日期</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <a href={`/admin/orders/${order.id}`} className="text-brand-600 hover:underline font-medium">
                      #{order.orderNumber.slice(-8)}
                    </a>
                  </td>
                  <td className="px-6 py-3 text-gray-700">{order.buyerName}</td>
                  <td className="px-6 py-3 font-medium">NT${Number(order.total).toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("zh-TW")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const statusColors: Record<string, string> = {
  PENDING_PAYMENT: "bg-yellow-100 text-yellow-700",
  TRANSFER_NOTIFIED: "bg-blue-100 text-blue-700",
  PENDING_CONFIRM: "bg-blue-100 text-blue-700",
  PREPARING: "bg-indigo-100 text-indigo-700",
  SHIPPED: "bg-cyan-100 text-cyan-700",
  COMPLETED: "bg-[#E0F0E8] text-[#0D2A1B]",
  CANCELLED: "bg-red-100 text-red-700",
  RETURNING: "bg-orange-100 text-orange-700",
  REFUNDED: "bg-gray-100 text-gray-700",
};

const statusLabels: Record<string, string> = {
  PENDING_PAYMENT: "待付款",
  TRANSFER_NOTIFIED: "已通知匯款",
  PENDING_CONFIRM: "待確認",
  PREPARING: "備貨中",
  SHIPPED: "已出貨",
  COMPLETED: "已完成",
  CANCELLED: "已取消",
  RETURNING: "退貨中",
  REFUNDED: "已退款",
};

function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[status] ?? "bg-gray-100 text-gray-700"}`}>
      {statusLabels[status] ?? status}
    </span>
  );
}
