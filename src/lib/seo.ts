import type { Metadata } from "next";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "SP Pickleball";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sportspoint.tw";
const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
  "台灣最完整的匹克球拍購物、評測、比較與教學平台。專業球拍推薦、品牌介紹、技術教學一站搞定。";
const OG_DEFAULT = `${SITE_URL}/images/og-default.jpg`;

export function buildMetadata({
  title,
  description,
  canonical,
  ogImage,
  noIndex = false,
  keywords,
  type = "website",
}: {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string;
  type?: "website" | "article" | "product";
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — 台灣匹克球拍專家`;
  const metaDesc = description ?? SITE_DESCRIPTION;
  const canonicalUrl = canonical ?? SITE_URL;
  const image = ogImage ?? OG_DEFAULT;

  return {
    title: fullTitle,
    description: metaDesc,
    keywords,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: canonicalUrl },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      title: fullTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "zh_TW",
      type: type === "article" ? "article" : type === "product" ? "website" : "website",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDesc,
      images: [image],
    },
  };
}

export function buildBreadcrumbItems(
  items: { name: string; url: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export { SITE_NAME, SITE_URL, SITE_DESCRIPTION, OG_DEFAULT };
