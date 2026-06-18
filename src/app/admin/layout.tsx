import Link from "next/link";
import { LayoutDashboard, Package, Tag, Layers, FileText, HelpCircle, GitCompare, ShoppingBag, Star, Image, Search, Globe, ShoppingCart, BarChart, Users, Settings } from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "儀表板" },
  { href: "/admin/products", icon: Package, label: "商品" },
  { href: "/admin/brands", icon: Tag, label: "品牌" },
  { href: "/admin/categories", icon: Layers, label: "分類" },
  { href: "/admin/articles", icon: FileText, label: "文章" },
  { href: "/admin/faqs", icon: HelpCircle, label: "FAQ" },
  { href: "/admin/compare", icon: GitCompare, label: "比較頁" },
  { href: "/admin/orders", icon: ShoppingBag, label: "訂單" },
  { href: "/admin/reviews", icon: Star, label: "評價" },
  { href: "/admin/media", icon: Image, label: "媒體庫" },
  { href: "/admin/seo", icon: Search, label: "SEO 管理" },
  { href: "/admin/geo", icon: Globe, label: "GEO 管理" },
  { href: "/admin/merchant-feed", icon: ShoppingCart, label: "商品 Feed" },
  { href: "/admin/analytics", icon: BarChart, label: "流量分析" },
  { href: "/admin/users", icon: Users, label: "用戶管理" },
  { href: "/admin/settings", icon: Settings, label: "系統設定" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 text-gray-300 flex flex-col shrink-0">
        <div className="px-4 py-5 border-b border-gray-800">
          <Link href="/admin" className="text-white font-bold text-lg flex items-center gap-2">
            <span>🏓</span> SP Admin
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-800 hover:text-white transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-gray-800">
          <Link href="/" className="text-xs text-gray-500 hover:text-white">← 前往前台</Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
