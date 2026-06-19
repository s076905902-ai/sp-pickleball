import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendOrderEmails } from "@/lib/email";

export async function POST(req: NextRequest) {
  const session = await auth();
  const body = await req.json();

  const { buyerName, buyerEmail, buyerPhone, shippingAddress, shippingMethod, note } = body;

  if (!buyerName || !buyerPhone) {
    return NextResponse.json({ error: "缺少必要欄位" }, { status: 400 });
  }

  // Get cart items
  const cartId = req.cookies.get("cartId")?.value;
  let cartItems: { productId: string; productName: string; quantity: number; unitPrice: number }[] = [];

  if (cartId) {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    });
    if (cart?.items.length) {
      cartItems = cart.items.map((i) => ({
        productId: i.productId,
        productName: i.product.name,
        quantity: i.quantity,
        unitPrice: Number(i.product.salePrice ?? i.product.price),
      }));
    }
  }

  if (cartItems.length === 0) {
    return NextResponse.json({ error: "購物車是空的" }, { status: 400 });
  }

  const subtotal = cartItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const total = subtotal; // Free shipping

  const order = await prisma.order.create({
    data: {
      userId: session?.user?.id ?? null,
      status: "PENDING_PAYMENT",
      shippingMethod: shippingMethod ?? "HOME_DELIVERY",
      subtotal,
      shippingFee: 0,
      total,
      buyerName,
      buyerEmail: buyerEmail ?? "",
      buyerPhone,
      shippingAddress: shippingAddress ?? null,
      note: note ?? null,
      items: {
        create: cartItems.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          total: i.unitPrice * i.quantity,
        })),
      },
      statusHistory: {
        create: { status: "PENDING_PAYMENT", note: "訂單建立" },
      },
    },
  });

  // Clear cart
  if (cartId) {
    await prisma.cart.delete({ where: { id: cartId } }).catch(() => {});
  }

  // Send emails (non-blocking — email 失敗不影響訂單)
  sendOrderEmails({
    orderNumber: order.orderNumber,
    buyerName,
    buyerEmail: buyerEmail ?? "",
    buyerPhone,
    total,
    items: cartItems.map((i) => ({
      productName: i.productName,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      total: i.unitPrice * i.quantity,
    })),
    createdAt: order.createdAt,
  }).catch((e) => console.error("[order] email 寄送失敗:", e));

  return NextResponse.json({ orderId: order.id, orderNumber: order.orderNumber });
}
