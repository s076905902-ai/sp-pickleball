import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "運費說明", canonical: "/shipping" });

export default function ShippingPage() {
  return (
    <div className="container-padded py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">運費說明</h1>
      <div className="space-y-6">
        {[
          { title: "全台免運費", desc: "SP Pickleball 所有商品均提供全台灣（含離島）免運費服務，不設最低消費門檻。" },
          { title: "配送方式", desc: "提供宅配、7-ELEVEN、全家 FamilyMart、郵局包裹等四種配送方式，結帳時自行選擇。" },
          { title: "出貨時間", desc: "付款確認後 1-2 個工作日出貨，特殊節慶期間可能延長，將另行通知。" },
          { title: "到貨時間", desc: "宅配約 2-3 工作天，超商取貨約 2-4 工作天。離島地區可能需要額外 1-2 天。" },
          { title: "物流追蹤", desc: "出貨後將以 Email 或 LINE 通知物流追蹤號碼。" },
        ].map((item) => (
          <div key={item.title} className="border rounded-xl p-5">
            <h2 className="font-bold text-gray-900 mb-2">{item.title}</h2>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
