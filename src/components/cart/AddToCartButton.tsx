"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    stock: number;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (product.stock === 0) {
    return (
      <div className="space-y-3">
        <button disabled className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl font-medium cursor-not-allowed">
          暫時缺貨
        </button>
        <StockNotifyForm productId={product.id} />
      </div>
    );
  }

  async function handleAddToCart() {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: qty }),
      });
      if (res.ok) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    } catch {
      console.error("Add to cart failed");
    }
  }

  return (
    <div className="space-y-3">
      {/* Quantity */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">數量</span>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 text-gray-700"
          >
            −
          </button>
          <span className="w-12 text-center text-sm font-medium">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 text-gray-700"
          >
            +
          </button>
        </div>
        <span className="text-xs text-gray-400">庫存 {product.stock} 件</span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleAddToCart}
          className={`flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-all ${
            added
              ? "bg-[#1F6B4F] text-white"
              : "bg-[#123524] hover:bg-[#1F6B4F] text-white"
          }`}
        >
          {added ? (
            <><Check className="w-4 h-4" /> 已加入</>
          ) : (
            <><ShoppingCart className="w-4 h-4" /> 加入購物車</>
          )}
        </button>
        <a
          href="/checkout"
          onClick={handleAddToCart}
          className="flex items-center justify-center py-3 rounded-full font-semibold border border-[#C8A45D] text-[#C8A45D] hover:bg-[#C8A45D]/10 transition-colors"
        >
          立即購買
        </a>
      </div>
    </div>
  );
}

function StockNotifyForm({ productId }: { productId: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/stock-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, email }),
    });
    setSubmitted(true);
  }

  if (submitted) return <p className="text-sm text-[#1F6B4F]">✓ 到貨時將通知您</p>;

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="輸入 Email，到貨通知我"
        required
        className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1F6B4F]"
      />
      <button type="submit" className="bg-[#123524] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0D2A1B] transition-colors">
        通知
      </button>
    </form>
  );
}
