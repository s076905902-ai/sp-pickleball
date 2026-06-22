import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data: any = {};

    const nullableStringFields = [
      "description", "mainImage", "material", "coreMaterial", "surfaceMaterial",
      "certification", "youtubeUrl", "reelsUrl", "gtin", "mpn",
    ];
    const nullableNumberFields = [
      "weight", "thickness", "length", "width", "gripLength", "gripCircumference",
      "controlScore", "powerScore", "spinScore", "forgivenessScore", "feelScore",
    ];
    const scalarFields = ["name", "slug", "sku", "brandId", "categoryId", "status"];

    for (const field of scalarFields) {
      if (field in body) data[field] = body[field];
    }
    for (const field of nullableStringFields) {
      if (field in body) data[field] = body[field] || null;
    }
    for (const field of nullableNumberFields) {
      if (field in body) data[field] = body[field] ?? null;
    }
    if ("price" in body) data.price = body.price;
    if ("salePrice" in body) data.salePrice = body.salePrice ?? null;
    if ("stock" in body) data.stock = body.stock ?? 0;
    if ("isFeatured" in body) data.isFeatured = body.isFeatured ?? false;
    if ("suitableFor" in body) data.suitableFor = Array.isArray(body.suitableFor) ? body.suitableFor : [];
    if ("gallery" in body) data.gallery = Array.isArray(body.gallery) ? body.gallery : [];
    if ("specs" in body) data.specs = body.specs ?? null;
    if ("faq" in body) data.faq = body.faq ?? null;

    const product = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json(product);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "更新失敗" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "刪除失敗" }, { status: 500 });
  }
}
