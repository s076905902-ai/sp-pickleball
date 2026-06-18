import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function getOrCreateCart(req: NextRequest) {
  const cartId = req.cookies.get("cartId")?.value;
  if (cartId) {
    const cart = await prisma.cart.findUnique({ where: { id: cartId } });
    if (cart) return cart;
  }
  return await prisma.cart.create({ data: {} });
}

export async function GET(req: NextRequest) {
  const cartId = req.cookies.get("cartId")?.value;
  if (!cartId) return NextResponse.json({ items: [] });

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: { product: { include: { brand: true } } },
      },
    },
  });

  const items = cart?.items.map((i) => ({
    id: i.id,
    productId: i.productId,
    quantity: i.quantity,
    product: {
      id: i.product.id,
      name: i.product.name,
      slug: i.product.slug,
      price: Number(i.product.price),
      salePrice: i.product.salePrice ? Number(i.product.salePrice) : null,
      mainImage: i.product.mainImage,
      brandName: i.product.brand.name,
      stock: i.product.stock,
    },
  })) ?? [];

  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const { productId, quantity = 1 } = await req.json();
  if (!productId) return NextResponse.json({ error: "Missing productId" }, { status: 400 });

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.stock < 1) {
    return NextResponse.json({ error: "商品不存在或已售完" }, { status: 400 });
  }

  const cart = await getOrCreateCart(req);

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("cartId", cart.id, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
  });
  return res;
}
