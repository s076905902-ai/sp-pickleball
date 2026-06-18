import prisma from "@/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { _count: { select: { orders: true, reviews: true } } },
  });

  const roleColors: Record<string, string> = {
    ADMIN: "bg-red-100 text-red-700",
    STAFF: "bg-blue-100 text-blue-700",
    CUSTOMER: "bg-gray-100 text-gray-600",
  };
  const roleLabels: Record<string, string> = { ADMIN: "管理員", STAFF: "員工", CUSTOMER: "一般用戶" };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">用戶管理</h1>
          <p className="text-sm text-gray-500 mt-1">共 {users.length} 位用戶</p>
        </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">用戶</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">角色</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">訂單數</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">評價數</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">註冊日期</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {u.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={u.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                        {(u.name ?? u.email ?? "?")[0].toUpperCase()}
                      </div>
                    )}
                    <span className="font-medium text-gray-900">{u.name ?? "（未設定）"}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{u.email ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${roleColors[u.role] ?? "bg-gray-100 text-gray-600"}`}>
                    {roleLabels[u.role] ?? u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{u._count.orders}</td>
                <td className="px-4 py-3 text-gray-600">{u._count.reviews}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{new Date(u.createdAt).toLocaleDateString("zh-TW")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <div className="text-center py-12 text-gray-400">尚無用戶</div>}
      </div>
    </div>
  );
}
