import Link from "next/link";
import prisma from "@/lib/prisma";
import { ORDER_STATUS_LABELS, SHIPPING_METHOD_LABELS, formatPrice } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { items: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">訂單管理</h1>

      {/* Quick filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["ALL", "PENDING_PAYMENT", "TRANSFER_NOTIFIED", "PREPARING", "SHIPPED", "COMPLETED"].map((s) => (
          <a
            key={s}
            href={s === "ALL" ? "/admin/orders" : `/admin/orders?status=${s}`}
            className="text-xs px-3 py-1.5 border rounded-full hover:bg-gray-100 font-medium text-gray-600"
          >
            {s === "ALL" ? "全部" : ORDER_STATUS_LABELS[s] ?? s}
          </a>
        ))}
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">訂單編號</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">買家</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">商品數</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">合計</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">配送</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">狀態</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">日期</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-700">#{order.orderNumber.slice(-8)}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{order.buyerName}</p>
                  <p className="text-xs text-gray-500">{order.buyerPhone}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{order.items.length} 件</td>
                <td className="px-4 py-3 font-bold">NT${Number(order.total).toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{SHIPPING_METHOD_LABELS[order.shippingMethod] ?? order.shippingMethod}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {ORDER_STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(order.createdAt).toLocaleDateString("zh-TW")}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${order.id}`} className="text-xs text-brand-600 hover:underline font-medium">
                    處理
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
