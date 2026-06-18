import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, description, image, parentId, isActive, sortOrder } = body;
    if (!name || !slug) return NextResponse.json({ error: "名稱和 Slug 為必填" }, { status: 400 });
    const category = await prisma.category.create({
      data: { name, slug, description: description || null, image: image || null, parentId: parentId || null, isActive: isActive ?? true, sortOrder: sortOrder ?? 0 },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (err: any) {
    if (err?.code === "P2002") return NextResponse.json({ error: "分類名稱或 Slug 已存在" }, { status: 409 });
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}
