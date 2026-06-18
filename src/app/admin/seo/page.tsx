"use client";
import { useState, useEffect } from "react";

interface SeoEntry {
  id: string;
  entityType: string;
  entityId: string;
  title?: string | null;
  description?: string | null;
  noIndex: boolean;
  inSitemap: boolean;
}

export default function AdminSeoPage() {
  const [entries, setEntries] = useState<SeoEntry[]>([]);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((r) => r.json())
      .then((d) => setEntries(d.items ?? []));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO 管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理所有頁面的 Title、Description、Canonical、noIndex、Sitemap</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {[
          { label: "已設定 SEO", value: entries.length, color: "text-green-600" },
          { label: "noIndex 頁面", value: entries.filter(e => e.noIndex).length, color: "text-red-600" },
          { label: "排除 Sitemap", value: entries.filter(e => !e.inSitemap).length, color: "text-orange-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border rounded-xl p-5">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <p className="font-medium text-gray-700">已設定 SEO 欄位的頁面</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">類型</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">SEO Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">noIndex</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Sitemap</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">{e.entityType}</span>
                </td>
                <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{e.title ?? <span className="text-gray-300">—</span>}</td>
                <td className="px-4 py-3">{e.noIndex ? <span className="text-red-500 text-xs">是</span> : <span className="text-green-600 text-xs">否</span>}</td>
                <td className="px-4 py-3">{e.inSitemap ? <span className="text-green-600 text-xs">包含</span> : <span className="text-gray-400 text-xs">排除</span>}</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-brand-600 hover:underline">編輯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="font-bold text-blue-800 mb-3">SEO 設定說明</h2>
        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
          <li>每個商品頁、品牌頁、分類頁都可在對應編輯頁面中設定 SEO 欄位</li>
          <li>noIndex 設為「是」的頁面不會被 Google 收錄</li>
          <li>排除 Sitemap 的頁面不會出現在 /sitemap.xml</li>
          <li>Canonical URL 建議只在有重複內容時設定</li>
        </ul>
      </div>
    </div>
  );
}
