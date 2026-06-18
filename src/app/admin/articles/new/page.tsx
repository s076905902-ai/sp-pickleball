"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewArticlePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", coverImage: "", status: "DRAFT", readingTime: "" });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (!form.title || !form.slug || !form.content) { setError("標題、Slug、內容為必填"); return; }
    startTransition(async () => {
      const res = await fetch("/api/admin/articles", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, readingTime: form.readingTime ? parseInt(form.readingTime) : null, publishedAt: form.status === "PUBLISHED" ? new Date().toISOString() : null }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error ?? "建立失敗"); return; }
      router.push("/admin/articles"); router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/articles" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-2xl font-bold text-gray-900">新增文章</h1>
        </div>
        <button type="submit" disabled={isPending} className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-700 disabled:opacity-60">
          <Save className="w-4 h-4" />{isPending ? "儲存中..." : "儲存文章"}
        </button>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">標題 <span className="text-red-500">*</span></label>
              <input type="text" value={form.title} onChange={e => { set("title", e.target.value); set("slug", e.target.value.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")); }}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug <span className="text-red-500">*</span></label>
                <input type="text" value={form.slug} onChange={e => set("slug", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">封面圖網址</label>
                <input type="text" value={form.coverImage} onChange={e => set("coverImage", e.target.value)} placeholder="https://..."
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
              <textarea rows={2} value={form.excerpt} onChange={e => set("excerpt", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">內容（Markdown）<span className="text-red-500"> *</span></label>
              <textarea rows={16} value={form.content} onChange={e => set("content", e.target.value)}
                placeholder="## 標題&#10;&#10;內容..."
                className="w-full border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">發布設定</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">狀態</label>
              <select value={form.status} onChange={e => set("status", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="DRAFT">草稿</option>
                <option value="PUBLISHED">立即發布</option>
                <option value="ARCHIVED">封存</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">預估閱讀時間（分鐘）</label>
              <input type="number" value={form.readingTime} onChange={e => set("readingTime", e.target.value)} placeholder="5"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
