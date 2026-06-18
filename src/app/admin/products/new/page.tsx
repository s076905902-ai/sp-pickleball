import prisma from "@/lib/prisma";
import ProductForm from "./ProductForm";

export default async function NewProductPage() {
  const [brands, categories] = await Promise.all([
    prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return <ProductForm brands={brands} categories={categories} />;
}
