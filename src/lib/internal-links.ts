/**
 * Internal Link Engine
 * Generates contextual internal links for product and article pages
 */

export interface InternalLink {
  href: string;
  label: string;
  type: "product" | "brand" | "category" | "article" | "compare" | "faq";
}

/**
 * Get related internal links for a product page
 */
export async function getProductInternalLinks(productId: string) {
  // Import prisma lazily to avoid edge runtime issues
  const { default: prisma } = await import("@/lib/prisma");

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { brand: true, category: true },
  });

  if (!product) return [];

  const links: InternalLink[] = [];

  // Same brand
  links.push({
    href: `/brands/${product.brand.slug}`,
    label: `更多 ${product.brand.name} 球拍`,
    type: "brand",
  });

  // Same category
  links.push({
    href: `/categories/${product.category.slug}`,
    label: `瀏覽所有${product.category.name}`,
    type: "category",
  });

  // Similar price range products
  const priceNum = Number(product.price);
  const samePriceProducts = await prisma.product.findMany({
    where: {
      id: { not: productId },
      status: "PUBLISHED",
      price: {
        gte: priceNum * 0.8,
        lte: priceNum * 1.2,
      },
    },
    take: 3,
    select: { name: true, slug: true },
  });

  samePriceProducts.forEach((p) => {
    links.push({
      href: `/products/${p.slug}`,
      label: p.name,
      type: "product",
    });
  });

  // Compare pages mentioning this product
  const comparePages = await prisma.comparePage.findMany({
    where: {
      isActive: true,
      productIds: { has: productId },
    },
    take: 2,
    select: { slug: true, title: true },
  });

  comparePages.forEach((c) => {
    links.push({
      href: `/compare/${c.slug}`,
      label: c.title,
      type: "compare",
    });
  });

  return links;
}

/**
 * Get internal links for an article
 */
export async function getArticleInternalLinks(articleId: string) {
  const { default: prisma } = await import("@/lib/prisma");

  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: { relatedProducts: { include: { brand: true, category: true } } },
  });

  if (!article) return [];

  const links: InternalLink[] = [];

  // Related products
  article.relatedProducts.forEach((p) => {
    links.push({
      href: `/products/${p.slug}`,
      label: `${p.name} 評測`,
      type: "product",
    });
    links.push({
      href: `/brands/${p.brand.slug}`,
      label: `${p.brand.name} 品牌介紹`,
      type: "brand",
    });
  });

  return links;
}
