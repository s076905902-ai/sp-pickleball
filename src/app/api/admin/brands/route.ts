import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const brands = await prisma.brand.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(brands);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, logo, coverImage, description, history, techFeatures, website, country, foundedYear, isActive, sortOrder } = body;
    if (!name || !slug) return NextResponse.json({ error: "名稱和 Slug 為必填" }, { status: 400 });
    const brand = await prisma.brand.create({
      data: { name, slug, logo: logo || null, coverImage: coverImage || null, description: description || null, history: history || null, techFeatures: techFeatures || null, website: website || null, country: country || null, foundedYear: foundedYear ?? null, isActive: isActive ?? true, sortOrder: sortOrder ?? 0 },
    });
    return NextResponse.json(brand, { status: 201 });
  } catch (err: any) {
    if (err?.code === "P2002") return NextResponse.json({ error: "品牌名稱或 Slug 已存在" }, { status: 409 });
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}
