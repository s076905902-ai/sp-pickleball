import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name, slug, sku, brandId, categoryId,
      price, salePrice, stock, status, isFeatured,
      description, mainImage,
      weight, thickness, length, width, gripLength, gripCircumference,
      material, coreMaterial, surfaceMaterial, certification,
      controlScore, powerScore, spinScore, forgivenessScore, feelScore,
      suitableFor, gallery, youtubeUrl, reelsUrl, specs, faq, gtin, mpn,
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
        length: length ?? null,
        width: width ?? null,
        gripLength: gripLength ?? null,
        gripCircumference: gripCircumference ?? null,
        material: material || null,
        coreMaterial: coreMaterial || null,
        surfaceMaterial: surfaceMaterial || null,
        certification: certification || null,
        controlScore: controlScore ?? null,
        powerScore: powerScore ?? null,
        spinScore: spinScore ?? null,
        forgivenessScore: forgivenessScore ?? null,
        feelScore: feelScore ?? null,
        suitableFor: Array.isArray(suitableFor) ? suitableFor : [],
        gallery: Array.isArray(gallery) ? gallery : [],
        youtubeUrl: youtubeUrl || null,
        reelsUrl: reelsUrl || null,
        specs: specs ?? null,
        faq: faq ?? null,
        gtin: gtin || null,
        mpn: mpn || null,
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
