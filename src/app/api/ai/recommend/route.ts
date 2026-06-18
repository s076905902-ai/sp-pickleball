import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { budget, level, style, background } = await req.json();

  // Build query filters based on answers
  const where: Record<string, unknown> = { status: "PUBLISHED" };

  // Price filter
  if (budget === "under3k") where.price = { lte: 3000 };
  else if (budget === "3kto6k") where.price = { gte: 3000, lte: 6000 };
  else if (budget === "over6k") where.price = { gte: 6000 };

  // Level / suitableFor
  const suitableFor: string[] = [];
  if (level === "beginner") suitableFor.push("BEGINNER");
  else if (level === "intermediate") suitableFor.push("INTERMEDIATE");
  else if (level === "advanced") suitableFor.push("ADVANCED");

  if (background === "tennis") suitableFor.push("TENNIS_CONVERT");

  // Style: sort by score
  const orderBy: Record<string, string>[] = [];
  if (style === "control") orderBy.push({ controlScore: "desc" });
  else if (style === "power") orderBy.push({ powerScore: "desc" });
  else orderBy.push({ isFeatured: "desc" });

  let products = await prisma.product.findMany({
    where: suitableFor.length > 0
      ? { ...where, suitableFor: { hasSome: suitableFor } }
      : where,
    take: 6,
    orderBy,
    include: { brand: true },
  });

  // Fallback: if no results with suitableFor, try without
  if (products.length === 0) {
    products = await prisma.product.findMany({
      where,
      take: 3,
      orderBy,
      include: { brand: true },
    });
  }

  const recommendations = products.slice(0, 3).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.price),
    salePrice: p.salePrice ? Number(p.salePrice) : null,
    mainImage: p.mainImage,
    brandName: p.brand.name,
    suitableFor: p.suitableFor,
    controlScore: p.controlScore,
    powerScore: p.powerScore,
    reason: generateReason(p, style),
  }));

  return NextResponse.json({ recommendations });
}

function generateReason(
  p: { name: string; controlScore?: number | null; powerScore?: number | null; thickness?: number | null },
  style: string
): string {
  if (style === "control") {
    return `${p.name} 控制分數${p.controlScore ? ` ${p.controlScore} 分` : ""}，適合需要精準落點的控制型打法，${p.thickness ? `${p.thickness}mm 厚度` : ""}提供出色手感回饋。`;
  } else if (style === "power") {
    return `${p.name} 爆發力${p.powerScore ? ` ${p.powerScore} 分` : ""}，適合喜歡積極進攻的力量型玩家，能輕鬆打出高速球。`;
  }
  return `${p.name} 是攻守均衡的全方位球拍，不論控制或力量都有良好表現，非常適合全面提升球技。`;
}
