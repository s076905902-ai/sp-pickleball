import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        sku: body.sku,
        brandId: body.brandId,
        categoryId: body.categoryId,
        price: body.price,
        salePrice: body.salePrice ?? null,
        stock: body.stock ?? 0,
        status: body.status,
        isFeatured: body.isFeatured ?? false,
        description: body.description || null,
        mainImage: body.mainImage || null,
        weight: body.weight ?? null,
        thickness: body.thickness ?? null,
        material: body.material || null,
        coreMaterial: body.coreMaterial || null,
        controlScore: body.controlScore ?? null,
        powerScore: body.powerScore ?? null,
        spinScore: body.spinScore ?? null,
      },
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
