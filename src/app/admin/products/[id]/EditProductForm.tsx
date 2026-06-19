"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, Trash2 } from "lucide-react";

interface Brand { id: string; name: string; }
interface Category { id: string; name: string; }
interface Product {
  id: string; name: string; slug: string; sku: string;
  brandId: string; categoryId: string;
  price: number; salePrice: number | null; stock: number;
  status: string; isFeatured: boolean; description: string | null;
  mainImage: string | null;
  weight: number | null; thickness: number | null;
  material: string | null; coreMaterial: string | null;
  controlScore: number | null; powerScore: number | null; spinScore: number | null;
}

export default function EditProductForm({ product, brands, categories }: {
  product: Product; brands: Brand[]; categories: Category[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    brandId: product.brandId,
    categoryId: product.categoryId,
    price: String(product.price),
    salePrice: product.salePrice ? String(product.salePrice) : "",
    stock: String(product.stock),
    status: product.status,
    isFeatured: product.isFeatured,
    description: product.description ?? "",
    mainImage: product.mainImage ?? "",
    weight: product.weight ? String(product.weight) : "",
    thickness: product.thickness ? String(product.thickness) : "",
    material: product.material ?? "",
    coreMaterial: product.coreMaterial ?? "",
    controlScore: product.controlScore ? String(product.controlScore) : "",
    powerScore: product.powerScore ? String(product.powerScore) : "",
    spinScore: product.spinScore ? String(product.spinScore) : "",
  });

  const set = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) set("mainImage", data.url);
    } catch {
      setError("圖片上傳失敗");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
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
        setError(data.error ?? "儲存失敗");
        return;
      }
      router.push("/admin/products");
      router.refresh();
    });
  };

  const handleDelete = async () => {
    if (!confirm("確定要刪除這個商品嗎？此操作無法復原。")) return;
    const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">編輯商品</h1>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={handleDelete}
            className="border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-red-50">
            <Trash2 className="w-4 h-4" /> 刪除
          </button>
          <button type="submit" disabled={isPending}
            className="bg-[#123524] text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#1F6B4F] disabled:opacity-60">
            <Save className="w-4 h-4" />
            {isPending ? "儲存中..." : "儲存變更"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">基本資訊</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">商品名稱</label>
              <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input type="text" value={form.sku} onChange={(e) => set("sku", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">商品描述</label>
              <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">價格與庫存</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">售價（NT$）</label>
                <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">特價（NT$）</label>
                <input type="number" value={form.salePrice} onChange={(e) => set("salePrice", e.target.value)}
                  placeholder="選填" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">庫存</label>
                <input type="number" value={form.stock} onChange={(e) => set("stock", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">主圖</h2>
            <div className="flex gap-2">
              <input type="text" value={form.mainImage} onChange={(e) => set("mainImage", e.target.value)}
                placeholder="貼上圖片網址，或點右側上傳"
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 border rounded-lg text-sm font-medium disabled:opacity-60">
                <Upload className="w-4 h-4" />
                {uploading ? "上傳中..." : "上傳圖片"}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
            {form.mainImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.mainImage} alt="preview" className="h-40 object-contain border rounded-lg" />
            )}
          </div>

          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">規格</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">重量（g）</label>
                <input type="number" value={form.weight} onChange={(e) => set("weight", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">厚度（mm）</label>
                <input type="number" step="0.1" value={form.thickness} onChange={(e) => set("thickness", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">面板材質</label>
                <input type="text" value={form.material} onChange={(e) => set("material", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">芯材</label>
                <input type="text" value={form.coreMaterial} onChange={(e) => set("coreMaterial", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
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
        </div>

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
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} className="rounded" />
              <span className="text-sm text-gray-700">設為精選商品</span>
            </label>
          </div>

          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">分類</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">品牌</label>
              <select value={form.brandId} onChange={(e) => set("brandId", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">商品分類</label>
              <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
