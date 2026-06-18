"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Brand { id: string; name: string; slug: string }
interface Category { id: string; name: string; slug: string }

interface ProductFiltersProps {
  brands: Brand[];
  categories: Category[];
  params: Record<string, string | undefined>;
}

const suitableOptions = [
  { value: "BEGINNER", label: "新手" },
  { value: "INTERMEDIATE", label: "中階" },
  { value: "ADVANCED", label: "高階" },
  { value: "TENNIS_CONVERT", label: "網球轉換" },
  { value: "FEMALE", label: "女性" },
  { value: "DOUBLES", label: "雙打" },
  { value: "SINGLES", label: "單打" },
];

export default function ProductFilters({ brands, categories, params }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function applyFilter(key: string, value: string | null) {
    const sp = new URLSearchParams(searchParams.toString());
    if (value) sp.set(key, value);
    else sp.delete(key);
    sp.delete("page");
    router.push(`/products?${sp.toString()}`);
  }

  return (
    <div className="space-y-6">
      {/* Price */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">價格區間</h3>
        <div className="space-y-1">
          {[
            { label: "3,000 以下", min: "", max: "3000" },
            { label: "3,000 – 6,000", min: "3000", max: "6000" },
            { label: "6,000 以上", min: "6000", max: "" },
          ].map((range) => (
            <button
              key={range.label}
              onClick={() => {
                const sp = new URLSearchParams(searchParams.toString());
                if (range.min) sp.set("minPrice", range.min); else sp.delete("minPrice");
                if (range.max) sp.set("maxPrice", range.max); else sp.delete("maxPrice");
                sp.delete("page");
                router.push(`/products?${sp.toString()}`);
              }}
              className={`block w-full text-left text-sm px-3 py-1.5 rounded ${
                params.maxPrice === range.max && params.minPrice === range.min
                  ? "bg-brand-50 text-brand-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">品牌</h3>
        <div className="space-y-1">
          <button
            onClick={() => applyFilter("brand", null)}
            className={`block w-full text-left text-sm px-3 py-1.5 rounded ${
              !params.brand ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            全部
          </button>
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => applyFilter("brand", b.slug)}
              className={`block w-full text-left text-sm px-3 py-1.5 rounded ${
                params.brand === b.slug ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">分類</h3>
        <div className="space-y-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => applyFilter("category", c.slug)}
              className={`block w-full text-left text-sm px-3 py-1.5 rounded ${
                params.category === c.slug ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Suitable For */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">適合族群</h3>
        <div className="space-y-1">
          {suitableOptions.map((o) => (
            <button
              key={o.value}
              onClick={() =>
                applyFilter("suitableFor", params.suitableFor === o.value ? null : o.value)
              }
              className={`block w-full text-left text-sm px-3 py-1.5 rounded ${
                params.suitableFor === o.value
                  ? "bg-brand-50 text-brand-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={() => router.push("/products")}
        className="text-xs text-gray-400 hover:text-gray-700 underline"
      >
        清除所有篩選
      </button>
    </div>
  );
}
