import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateMerchantFeedXml, productToMerchantItem } from "@/lib/merchant-feed";

export const revalidate = 3600;

export async function GET() {
  const products = await prisma.product.findMany({
    where: { status: "PUBLISHED" },
    include: { brand: true, category: true },
  });

  const merchantItems = products.map((p) =>
    productToMerchantItem({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: Number(p.price),
      salePrice: p.salePrice ? Number(p.salePrice) : null,
      stock: p.stock,
      sku: p.sku,
      gtin: p.gtin,
      mpn: p.mpn,
      brandName: p.brand.name,
      categoryName: p.category.name,
      mainImage: p.mainImage,
      gallery: p.gallery,
    })
  );

  const xml = generateMerchantFeedXml(merchantItems);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
