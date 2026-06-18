import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name, slug, sku, brandId, categoryId,
      price, salePrice, stock, status, isFeatured,
      description, mainImage,
      weight, thickness, material, coreMaterial,
      controlScore, powerScore, spinScore,
    } = body;

    if (!name || !sku || !brandId || !categoryId || !price) {
      return NextResponse.json({ error: "缺少必填欄位" }, { status: 400 });
    }

    const finalSlug = slug || name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        sku,
        brandId,
        categoryId,
        price,
        salePrice: salePrice ?? null,
        stock: stock ?? 0,
        status: status ?? "DRAFT",
        isFeatured: isFeatured ?? false,
        description: description || null,
        mainImage: mainImage || null,
        weight: weight ?? null,
        thickness: thickness ?? null,
        material: material || null,
        coreMaterial: coreMaterial || null,
        controlScore: controlScore ?? null,
        powerScore: powerScore ?? null,
        spinScore: spinScore ?? null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json({ error: "SKU 或 Slug 已存在，請使用不同的值" }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}
