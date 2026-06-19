"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

const SHIPPING_METHODS = [
  { value: "HOME_DELIVERY", label: "宅配", fee: 0 },
  { value: "SEVEN_ELEVEN", label: "7-ELEVEN 取貨", fee: 0 },
  { value: "FAMILY_MART", label: "全家 FamilyMart", fee: 0 },
  { value: "POST_OFFICE", label: "郵局包裹", fee: 0 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<"info" | "shipping" | "confirm" | "success">("info");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [form, setForm] = useState({
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    shippingAddress: "",
    shippingMethod: "HOME_DELIVERY",
    note: "",
  });

  function updateForm(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "建立訂單失敗，請重試");
        return;
      }
      if (data.orderId) {
        setOrderId(data.orderId);
        setStep("success");
      } else {
        alert("建立訂單失敗，請重試");
      }
    } catch {
      alert("建立訂單失敗，請重試");
    } finally {
      setLoading(false);
    }
  }

  if (step === "success" && orderId) {
    return (
      <div className="container-padded py-20 text-center max-w-lg mx-auto">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">訂單建立成功！</h1>
        <p className="text-gray-600 mb-6">
          請在 24 小時內完成匯款，匯款後請至訂單頁面通知我們。
        </p>
        <div className="bg-brand-50 border border-[#E0F0E8] rounded-xl p-6 mb-6 text-left">
          <h2 className="font-bold text-[#0D2A1B] mb-3">匯款資訊</h2>
          <div className="space-y-1 text-sm text-brand-700">
            <p>銀行：○○銀行（代碼：XXX）</p>
            <p>帳號：XXXX-XXXX-XXXX-XXXX</p>
            <p>戶名：SP Pickleball 有限公司</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`/orders/${orderId}`}
            className="bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors"
          >
            查看訂單
          </a>
          <a
            href="/products"
            className="border px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            繼續購物
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container-padded py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">結帳</h1>

      <form onSubmit={handleSubmit} className="max-w-lg">
        {/* Buyer info */}
        <section className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">收件人資訊</h2>
          <div className="space-y-4">
            <Field label="姓名" required>
              <input
                type="text"
                required
                value={form.buyerName}
                onChange={(e) => updateForm("buyerName", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500"
                placeholder="收件人姓名"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.buyerEmail}
                onChange={(e) => updateForm("buyerEmail", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500"
                placeholder="yourname@example.com"
              />
            </Field>
            <Field label="手機" required>
              <input
                type="tel"
                required
                value={form.buyerPhone}
                onChange={(e) => updateForm("buyerPhone", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500"
                placeholder="09XXXXXXXX"
              />
            </Field>
          </div>
        </section>

        {/* Shipping */}
        <section className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">配送方式</h2>
          <div className="space-y-3">
            {SHIPPING_METHODS.map((m) => (
              <label key={m.value} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${form.shippingMethod === m.value ? "border-brand-500 bg-brand-50" : "hover:bg-gray-50"}`}>
                <input
                  type="radio"
                  name="shippingMethod"
                  value={m.value}
                  checked={form.shippingMethod === m.value}
                  onChange={(e) => updateForm("shippingMethod", e.target.value)}
                  className="text-brand-600"
                />
                <span className="text-sm font-medium text-gray-900">{m.label}</span>
                <span className="ml-auto text-sm text-[#1F6B4F] font-medium">免運</span>
              </label>
            ))}
          </div>

          {form.shippingMethod === "HOME_DELIVERY" && (
            <div className="mt-4">
              <Field label="送貨地址" required>
                <input
                  type="text"
                  required
                  value={form.shippingAddress}
                  onChange={(e) => updateForm("shippingAddress", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500"
                  placeholder="縣市 + 區 + 完整地址"
                />
              </Field>
            </div>
          )}
        </section>

        {/* Note */}
        <section className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-3">訂單備註（選填）</h2>
          <textarea
            value={form.note}
            onChange={(e) => updateForm("note", e.target.value)}
            rows={3}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500"
            placeholder="如有特殊需求請填寫..."
          />
        </section>

        {/* Payment notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-yellow-800 font-medium">💳 付款方式：通知匯款</p>
          <p className="text-xs text-yellow-700 mt-1">
            下單後系統將顯示匯款帳號，請在 24 小時內完成匯款並通知我們。
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? "處理中..." : "確認送出訂單"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="b