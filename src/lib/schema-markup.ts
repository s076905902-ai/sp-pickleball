/**
 * JSON-LD Schema Markup Builders
 * Supports: Product, Offer, Review, FAQPage, Article, BreadcrumbList,
 *           Organization, WebSite, SearchAction, LocalBusiness, Person
 */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sportspoint.tw").replace(
  "https://sportspoint.tw",
  "https://www.sportspoint.tw"
);
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "SP Pickleball";

// ─── Organization ────────────────────────────────────────────────────────────
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 300,
      height: 60,
    },
    sameAs: [
      "https://www.facebook.com/sppickleball",
      "https://www.instagram.com/sppickleball",
      "https://line.me/ti/p/@sppickleball",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Chinese",
    },
  };
}

// ─── WebSite + SearchAction ──────────────────────────────────────────────────
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Product ─────────────────────────────────────────────────────────────────
export function productSchema(product: {
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  salePrice?: number | null;
  stock: number;
  sku: string;
  gtin?: string | null;
  mpn?: string | null;
  brandName: string;
  mainImage?: string | null;
  gallery?: string[];
  reviews?: { rating: number; author: string; body: string; date: string }[];
  aggregateRating?: { ratingValue: number; reviewCount: number };
}) {
  const url = `${SITE_URL}/products/${product.slug}`;
  const price = product.salePrice ?? product.price;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.description ?? undefined,
    url,
    sku: product.sku,
    gtin: product.gtin ?? undefined,
    mpn: product.mpn ?? undefined,
    brand: {
      "@type": "Brand",
      name: product.brandName,
    },
    image: [product.mainImage, ...(product.gallery ?? [])].filter(Boolean),
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "TWD",
      price: price.toString(),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
    ...(product.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.aggregateRating.ratingValue,
        reviewCount: product.aggregateRating.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(product.reviews?.length && {
      review: product.reviews.map((r) => ({
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
        },
        author: { "@type": "Person", name: r.author },
        reviewBody: r.body,
        datePublished: r.date,
      })),
    }),
  };
}

// ─── FAQ Page ────────────────────────────────────────────────────────────────
export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── Article ─────────────────────────────────────────────────────────────────
export function articleSchema(article: {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  authorName?: string | null;
  publishedAt?: Date | null;
  updatedAt: Date;
}) {
  const url = `${SITE_URL}/blog/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.excerpt ?? undefined,
    url,
    image: article.coverImage ? [article.coverImage] : undefined,
    author: article.authorName
      ? { "@type": "Person", name: article.authorName }
      : { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ─── LocalBusiness ────────────────────────────────────────────────────────────
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: "",          // Fill in real phone
    address: {
      "@type": "PostalAddress",
      addressLocality: "台北市",
      addressCountry: "TW",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:00",
    },
    priceRange: "$$",
  };
}
