import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const perPage = parseInt(searchParams.get("perPage") ?? "24");
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  const where: Record<string, unknown> = { status: "PUBLISHED" };
  if (brand) where.brand = { slug: brand };
  if (category) where.category = { slug: category };
  if (q) where.OR = [
    { name: { contains: q, mode: "insensitive" } },
    { description: { contains: q, mode: "insensitive" } },
  ];

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { isFeatured: "desc" },
      include: { brand: true, category: true },
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ products, total, page, perPage });
}
