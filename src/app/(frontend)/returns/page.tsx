import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "退換貨政策", canonical: "/returns" });

export default function ReturnsPage() {
  return (
    <div className="container-padded py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">退換貨政策</h1>
      <div className="prose prose-sm max-w-none text-gray-600">
        <h2>7 天鑑賞期</h2>
        <p>依據消費者保護法，商品到貨後 7 天內（含假日）可申請退貨，商品需保持全新、未使用、包裝完整狀態。</p>
        <h2>退換貨流程</h2>
        <ol>
          <li>聯絡客服（LINE 或 Email）說明退換貨原因</li>
          <li>客服確認後提供退貨地址</li>
          <li>以掛號或有追蹤號碼的方式寄回</li>
          <li>收到商品確認狀態後，3-5 個工作天辦理退款</li>
        </ol>
        <h2>不適用退換貨情形</h2>
        <ul>
          <li>商品已使用、損壞或缺少配件</li>
          <li>超過 7 天鑑賞期</li>
          <li>客製化商品</li>
        </ul>
        <h2>退款方式</h2>
        <p>退款將以原付款方式（匯款至你提供的銀行帳號）辦理，約 3-5 個工作天入帳。</p>
      </div>
    </div>
  );
}
