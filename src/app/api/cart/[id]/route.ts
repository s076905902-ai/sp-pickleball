import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { quantity } = await req.json();
  await prisma.cartItem.update({ where: { id }, data: { quantity } });
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.cartItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
