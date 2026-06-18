import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const review = await prisma.review.update({
      where: { id: params.id },
      data: { isPublished: body.isPublished },
    });
    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: "更新失敗" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.review.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "刪除失敗" }, { status: 500 });
  }
}
