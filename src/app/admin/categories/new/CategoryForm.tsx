"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewCategoryForm({ parents }: { parents: { id: string; name: string }[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", slug: "", description: "", image: "", parentId: "", isActive: true, sortOrder: "0" });

  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (!form.name || !form.slug) { setError("名稱和 Slug 為必填"); return; }
    startTransition(async () => {
      const res = await fetch("/api/admin/categories", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, parentId: form.parentId || null, sortOrder: parseInt(form.sortOrder) }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error ?? "建立失敗"); return; }
      router.push("/admin/categories"); router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/categories" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-2xl font-bold text-gray-900">新增分類</h1>
        </div>
        <button type="submit" disabled={isPending} className="bg-[#123524] text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#1F6B4F] disabled:opacity-60">
          <Save className="w-4 h-4" />{isPending ? "儲存中..." : "儲存"}
        </button>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分類名稱 <span className="text-red-500">*</span></label>
            <input type="text" value={form.name} onChange={e => { set("name", e.target.value); set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-")); }}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug <span className="text-red-500">*</span></label>
            <input type="text" value={form.slug} onChange={e => set("slug", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">上層分類</label>
          <select value={form.parentId} onChange={e => set("parentId", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">（頂層分類）</option>
            {parents.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
          <textarea rows={3} value={form.description} onChange={e => set("description", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">封面圖網址</label>
            <input type="text" value={form.image} onChange={e => set("image", e.target.value)} placeholder="https://..."
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
            <input type="number" value={form.sortOrder} onChange={e => set("sortOrder", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isActive} onChange={e => set("isActive", e.target.checked)} className="rounded" />
          <span className="text-sm text-gray-700">啟用分類</span>
        </label>
      </div>
    </form>
  );
}
