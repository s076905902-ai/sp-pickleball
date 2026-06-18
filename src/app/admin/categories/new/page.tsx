import prisma from "@/lib/prisma";
import NewCategoryForm from "./CategoryForm";

export default async function NewCategoryPage() {
  const parents = await prisma.category.findMany({ where: { parentId: null }, orderBy: { name: "asc" }, select: { id: true, name: true } });
  return <NewCategoryForm parents={parents} />;
}
