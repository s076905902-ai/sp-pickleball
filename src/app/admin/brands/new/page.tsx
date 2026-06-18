"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewBrandPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", slug: "", logo: "", coverImage: "", description: "",
    history: "", techFeatures: "", website: "", country: "",
    foundedYear: "", isActive: true, sortOrder: "0",
  });

  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.slug) { setError("名稱和 Slug 為必填"); return; }
    startTransition(async () => {
      const res = await fetch("/api/admin/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, foundedYear: form.foundedYear ? parseInt(form.foundedYear) : null, sortOrder: parseInt(form.sortOrder) }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error ?? "建立失敗"); return; }
      router.push("/admin/brands"); router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/brands" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-2xl font-bold text-gray-900">新增品牌</h1>
        </div>
        <button type="submit" disabled={isPending} className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-700 disabled:opacity-60">
          <Save className="w-4 h-4" />{isPending ? "儲存中..." : "儲存品牌"}
        </button>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[["name","品牌名稱","JOOLA","text",true],["slug","Slug（網址）","joola","text",true],["logo","Logo 網址","https://...","text",false],["coverImage","封面圖網址","https://...","text",false],["website","官方網站","https://","text",false],["country","國家","USA","text",false],["foundedYear","成立年份","2000","number",false],["sortOrder","排序權重","0","number",false]].map(([k,label,ph,type,required]) => (
            <div key={k as string}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label as string}{required && <span className="text-red-500"> *</span>}</label>
              <input type={type as string} value={(form as any)[k as string]} onChange={e => set(k as string, e.target.value)} placeholder={ph as string}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          ))}
        </div>
        {[["description","品牌簡介"],["techFeatures","技術特色"],["history","品牌歷史"]].map(([k,label]) => (
          <div key={k}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea rows={3} value={(form as any)[k]} onChange={e => set(k, e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
        ))}
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isActive} onChange={e => set("isActive", e.target.checked)} className="rounded" />
          <span className="text-sm text-gray-700">啟用品牌</span>
        </label>
      </div>
    </form>
  );
}
