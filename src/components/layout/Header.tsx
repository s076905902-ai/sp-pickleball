"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, Heart, Search, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    label: "球拍",
    href: "/products",
    children: [
      { label: "所有球拍", href: "/products" },
      { label: "新手推薦", href: "/categories/beginner" },
      { label: "中高階球拍", href: "/categories/advanced" },
      { label: "女性球拍", href: "/categories/female" },
      { label: "特賣優惠", href: "/products?sale=1" },
    ],
  },
  {
    label: "品牌",
    href: "/brands",
    children: [
      { label: "所有品牌", href: "/brands" },
    ],
  },
  {
    label: "比較",
    href: "/compare",
  },
  {
    label: "知識庫",
    href: "/blog",
    children: [
      { label: "球拍評測", href: "/blog?tag=review" },
      { label: "新手教學", href: "/blog?tag=beginner" },
      { label: "技術提升", href: "/blog?tag=technique" },
    ],
  },
  {
    label: "AI 顧問",
    href: "/ai",
  },
  {
    label: "Academy",
    href: "/academy",
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      {/* Announcement bar */}
      <div className="bg-brand-600 text-white text-xs text-center py-1.5 px-4">
        🏓 全台免運 | 訂單滿 $2,000 送球手套 | LINE 客服即時回覆
      </div>

      <div className="container-padded">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-700">
            <span className="text-2xl">🏓</span>
            <span>SP Pickleball</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-48 rounded-lg shadow-lg border bg-white py-1 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/products?search=1" aria-label="搜尋" className="p-2 text-gray-600 hover:text-brand-600 transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            <Link href="/wishlist" aria-label="願望清單" className="p-2 text-gray-600 hover:text-brand-600 transition-colors hidden sm:block">
              <Heart className="w-5 h-5" />
            </Link>
            <Link href="/cart" aria-label="購物車" className="relative p-2 text-gray-600 hover:text-brand-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold cart-count hidden">
                0
              </span>
            </Link>
            <Link href="/account" aria-label="會員" className="p-2 text-gray-600 hover:text-brand-600 transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="選單"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white px-4 pb-4">
          {navigation.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between py-3 text-sm font-medium text-gray-800 border-b border-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 text-sm text-gray-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
