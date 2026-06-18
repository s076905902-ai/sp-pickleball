import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { productId, email } = await req.json();
  if (!productId || !email) {
    return NextResponse.json({ error: "缺少欄位" }, { status: 400 });
  }

  await prisma.stockNotification.create({
    data: { productId, email, type: "restock" },
  });

  return NextResponse.json({ success: true });
}
