import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import EditProductForm from "./EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, brands, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  // Serialize Decimal → number so EditProductForm receives plain JS numbers
  const serialized = {
    ...product,
    price: Number(product.price),
    salePrice: product.salePrice ? Number(product.salePrice) : null,
    status: product.status as string,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <EditProductForm product={serialized} brands={brands} categories={categories} />
    </div>
  );
}
