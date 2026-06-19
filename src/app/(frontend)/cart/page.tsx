"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice?: number | null;
    mainImage?: string | null;
    brandName: string;
    stock: number;
  };
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cart")
      .then((r) => r.json())
      .then((data) => setItems(data.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function removeItem(cartItemId: string) {
    await fetch(`/api/cart/${cartItemId}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== cartItemId));
  }

  async function updateQty(cartItemId: string, quantity: number) {
    if (quantity < 1) return removeItem(cartItemId);
    await fetch(`/api/cart/${cartItemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    setItems((prev) => prev.map((i) => i.id === cartItemId ? { ...i, quantity } : i));
  }

  const subtotal = items.reduce((sum, i) => {
    const price = i.product.salePrice ?? i.product.price;
    return sum + price * i.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="container-padded py-20 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-padded py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-700 mb-2">購物車是空的</h1>
        <p className="text-gray-500 mb-6">快去挑選適合的球拍吧！</p>
        <Link href="/products" className="bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors">
          瀏覽球拍
        </Link>
      </div>
    );
  }

  return (
    <div className="container-padded py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">購物車</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => {
            const price = item.product.salePrice ?? item.product.price;
            return (
              <div key={item.id} className="flex gap-4 bg-white border rounded-xl p-4">
                <Link href={`/products/${item.product.slug}`} className="shrink-0">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
                    {item.product.mainImage ? (
                      <Image
                        src={item.product.mainImage}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="object-contain p-1"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-2xl">🏓</div>
                    )}
                  </div>
                </Link>

                <div className="flex-1">
                  <p className="text-xs text-gray-500">{item.product.brandName}</p>
                  <Link href={`/products/${item.product.slug}`} className="font-medium text-sm text-gray-900 hover:text-brand-700">
                    {item.product.name}
                  </Link>
                  <p className="font-bold text-brand-700 mt-1">{formatPrice(price)}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-sm">−</button>
                    <span className="w-10 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-sm">+</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:w-80">
          <div className="bg-white border rounded-xl p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-4">訂單摘要</h2>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">小計</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">運費</span>
                <span className="text-[#1F6B4F] font-medium">免費</span>
              </div>
            </div>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>合計</span>
                <span className="text-brand-700">{formatPrice(subtotal)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              前往結帳 <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-center text-gray-400 mt-3">通知匯款 · 7天退換 · 免運費</p>
          </div>
        </div>
      </div>
    </div>
  );
}
