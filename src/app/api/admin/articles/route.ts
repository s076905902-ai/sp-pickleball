import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, status, readingTime, publishedAt } = body;
    if (!title || !slug || !content) return NextResponse.json({ error: "標題、Slug、內容為必填" }, { status: 400 });
    const article = await prisma.article.create({
      data: {
        title, slug, content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        status: status ?? "DRAFT",
        readingTime: readingTime ?? null,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    });
    return NextResponse.json(article, { status: 201 });
  } catch (err: any) {
    if (err?.code === "P2002") return NextResponse.json({ error: "Slug 已存在" }, { status: 409 });
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}
