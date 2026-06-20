"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, ChevronDown } from "lucide-react";

const staticNavigation = [
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
  // brands injected dynamically via props
  { label: "比較", href: "/compare" },
  {
    label: "知識庫",
    href: "/blog",
    children: [
      { label: "球拍評測", href: "/blog?tag=review" },
      { label: "新手教學", href: "/blog?tag=beginner" },
      { label: "技術提升", href: "/blog?tag=technique" },
    ],
  },
  { label: "AI 顧問", href: "/ai" },
  { label: "Academy", href: "/academy" },
];

interface BrandItem { name: string; slug: string }

export default function Header({ brands = [] }: { brands?: BrandItem[] }) {
  const navigation = [
    staticNavigation[0], // 球拍
    {
      label: "品牌",
      href: "/brands",
      children: [
        { label: "所有品牌", href: "/brands" },
        ...brands.map((b) => ({ label: b.name, href: `/brands/${b.slug}` })),
      ],
    },
    ...staticNavigation.slice(1), // 比較, 知識庫, AI顧問, Academy
  ];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement bar */}
      <div className="bg-[#0D2A1B] text-[#C8A45D] text-xs text-center py-2 px-4 font-medium tracking-wide">
        全台免運 &nbsp;·&nbsp; 訂單滿 $2,000 贈球手套 &nbsp;·&nbsp; LINE 客服即時回覆
      </div>

      {/* Main bar */}
      <div
        className={`bg-[#111111] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.4)]" : ""
        }`}
        style={{ backdropFilter: "blur(12px)" }}
      >
        <div className="container-padded">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl tracking-tight"
            >
              <span className="text-[#C8A45D] text-2xl font-black">SP</span>
              <span className="text-[#FAFAF8] font-semibold">Pickleball</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navigation.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-[#FAFAF8]/80 hover:text-[#C8A45D] rounded-md transition-colors duration-150"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    )}
                  </Link>

                  {item.children && openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-48 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 bg-[#1A1A1A] py-2 z-50 overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-[#FAFAF8]/70 hover:text-[#C8A45D] hover:bg-white/5 transition-colors"
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
            <div className="flex items-center gap-1">
              <Link
                href="/products?search=1"
                aria-label="搜尋"
                className="p-2 text-[#FAFAF8]/60 hover:text-[#C8A45D] transition-colors"
              >
                <Search className="w-5 h-5" />
              </Link>
              <Link
                href="/cart"
                aria-label="購物車"
                className="relative p-2 text-[#FAFAF8]/60 hover:text-[#C8A45D] transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C8A45D] text-[#111111] text-[10px] rounded-full flex items-center justify-center font-bold cart-count hidden">
                  0
                </span>
              </Link>
              {/* Shop CTA */}
              <Link
                href="/products"
                className="hidden md:inline-flex items-center gap-1.5 ml-3 bg-[#C8A45D] text-[#111111] text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#B89245] transition-colors"
              >
                立即選購
              </Link>

              {/* Mobile toggle */}
              <button
                className="lg:hidden p-2 text-[#FAFAF8]/60 hover:text-[#C8A45D] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="選單"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#1A1A1A] border-t border-white/10">
          <div className="container-padded py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2.5 text-sm font-medium text-[#FAFAF8]/80 hover:text-[#C8A45D] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-1.5 text-sm text-[#FAFAF8]/50 hover:text-[#C8A45D] transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="/products"
                className="block text-center bg-[#C8A45D] text-[#111111] text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-[#B89245] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                立即選購
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
