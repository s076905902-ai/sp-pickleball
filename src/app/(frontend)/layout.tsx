import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import prisma from "@/lib/prisma";

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const brands = await prisma.brand.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: { name: true, slug: true },
  });

  return (
    <>
      <Header brands={brands} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
