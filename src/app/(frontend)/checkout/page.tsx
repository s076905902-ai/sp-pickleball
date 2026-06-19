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
        <h1 className="text-2xl font-bold text-[#111111] mb-3">訂單建立成功！</h1>
        <p className="text-[#4B5563] mb-2">
          謝謝您的訂購！
        </p>
        <p className="text-sm text-[#4B5563] mb-8 leading-relaxed">
          請點擊下方按鈕加入 LINE，並提供您的訂單編號，
          <br />我們將由專人提供匯款帳號與後續付款流程。
        </p>

        {/* LINE CTA */}
        <a
          href="https://line.me/ti/p/QfXjVSMKha"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#123524] text-white font-bold px-8 py-4 rounded-full hover:bg-[#1F6B4F] transition-colors text-base mb-6"
        >
          前往 LINE 通知付款
        </a>

        {/* Order ID */}
        <div className="bg-[#F2F8F5] border border-[#BCDECF] rounded-xl p-4 mb-6 text-sm">
          <p className="text-[#4B5563]">您的訂單編號</p>
          <p className="font-mono font-bold text-[#123524] mt-1 text-lg">{orderId}</p>
        </div>

        {/* Security notice */}
        <p className="text-xs text-[#4B5563]/60 mb-8 leading-relaxed px-4">
          為保障您的交易安全，請勿將款項匯入非官方提供之帳號。
          <br />完成匯款後，請回傳訂單編號與匯款末五碼，以利我們確認訂單。
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`/orders/${orderId}`}
            className="bg-[#123524] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1F6B4F] transition-colors"
          >
            查看訂單
          </a>
          <a
            href="/products"
            className="border border-[#E5E2D8] px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors text-[#4B5563]"
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
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
