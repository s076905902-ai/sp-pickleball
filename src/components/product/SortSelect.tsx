"use client";

export default function SortSelect({ current }: { current?: string }) {
  const options = [
    { value: "", label: "推薦排序" },
    { value: "price_asc", label: "價格低至高" },
    { value: "price_desc", label: "價格高至低" },
    { value: "newest", label: "最新上架" },
  ];
  return (
    <select
      defaultValue={current ?? ""}
      className="text-sm border rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:ring-2 focus:ring-brand-500"
      onChange={(e) => {
        const url = new URL(window.location.href);
        url.searchParams.set("sort", e.target.value);
        window.location.href = url.toString();
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
