"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

interface Brand { id: string; name: string; }
interface Category { id: string; name: string; }

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function NewProductForm({
  brands,
  categories,
}: {
  brands: Brand[];
  categories: Category[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    sku: "",
    brandId: "",
    categoryId: "",
    price: "",
    salePrice: "",
    stock: "0",
    status: "DRAFT",
    isFeatured: false,
    description: "",
    mainImage: "",
    weight: "",
    thickness: "",
    material: "",
    coreMaterial: "",
    controlScore: "",
    powerScore: "",
    spinScore: "",
  });

  const set = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleNameChange = (v: string) => {
    setForm((prev) => ({ ...prev, name: v, slug: slugify(v) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.sku || !form.brandId || !form.categoryId || !form.price) {
      setError("請填寫必填欄位（名稱、SKU、品牌、分類、售價）");
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          salePrice: form.salePrice ? parseFloat(form.salePrice) : null,
          stock: parseInt(form.stock),
          weight: form.weight ? parseFloat(form.weight) : null,
          thickness: form.thickness ? parseFloat(form.thickness) : null,
          controlScore: form.controlScore ? parseInt(form.controlScore) : null,
          powerScore: form.powerScore ? parseInt(form.powerScore) : null,
          spinScore: form.spinScore ? parseInt(form.spinScore) : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "建立失敗，請再試一次");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">新增商品</h1>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-700 disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {isPending ? "儲存中..." : "儲存商品"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left: main info */}
        <div className="col-span-2 space-y-6">
          {/* Basic info */}
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">基本資訊</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                商品名稱 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="例：JOOLA Hyperion CFS 16"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug（網址）</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.sku}
                  onChange={(e) => set("sku", e.target.value)}
                  placeholder="例：JL-HYP-CFS16"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">商品描述</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="詳細描述這款球拍的特色..."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">價格與庫存</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  售價（NT$）<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="4500"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">特價（NT$）</label>
                <input
                  type="number"
                  value={form.salePrice}
                  onChange={(e) => set("salePrice", e.target.value)}
                  placeholder="選填"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">庫存數量</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => set("stock", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">規格</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">重量（g）</label>
                <input type="number" value={form.weight} onChange={(e) => set("weight", e.target.value)}
                  placeholder="225" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">厚度（mm）</label>
                <input type="number" step="0.1" value={form.thickness} onChange={(e) => set("thickness", e.target.value)}
                  placeholder="16" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">面板材質</label>
                <input type="text" value={form.material} onChange={(e) => set("material", e.target.value)}
                  placeholder="Carbon Fiber" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">芯材</label>
                <input type="text" value={form.coreMaterial} onChange={(e) => set("coreMaterial", e.target.value)}
                  placeholder="Polymer Honeycomb" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>

            <h3 className="text-sm font-medium text-gray-700 pt-2">評分（0–100）</h3>
            <div className="grid grid-cols-3 gap-4">
              {(["controlScore", "powerScore", "spinScore"] as const).map((field) => {
                const labels: Record<string, string> = { controlScore: "控球", powerScore: "力量", spinScore: "旋轉" };
                return (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{labels[field]}</label>
                    <input type="number" min="0" max="100" value={form[field]}
                      onChange={(e) => set(field, e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Media */}
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">主圖網址</h2>
            <input type="text" value={form.mainImage} onChange={(e) => set("mainImage", e.target.value)}
              placeholder="https://..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            {form.mainImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.mainImage} alt="preview" className="h-40 object-contain border rounded-lg" />
            )}
          </div>
        </div>

        {/* Right: sidebar */}
        <div className="space-y-6">
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">發布設定</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">狀態</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="DRAFT">草稿</option>
                <option value="PUBLISHED">上架</option>
                <option value="ARCHIVED">下架</option>
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured}
                onChange={(e) => set("isFeatured", e.target.checked)}
                className="rounded" />
              <span className="text-sm text-gray-700">設為精選商品</span>
            </label>
          </div>

          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">分類</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                品牌 <span className="text-red-500">*</span>
              </label>
              <select value={form.brandId} onChange={(e) => set("brandId", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">選擇品牌</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                商品分類 <span className="text-red-500">*</span>
              </label>
              <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">選擇分類</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
