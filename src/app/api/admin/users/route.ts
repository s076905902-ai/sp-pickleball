import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: { id: true, name: true, email: true, role: true, createdAt: true, image: true },
  });
  return NextResponse.json(users);
}
