/**
 * Google Merchant Center Feed Generator
 * Outputs XML conforming to Google Shopping feed spec
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sportspoint.tw";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "SP Pickleball";

export interface MerchantProduct {
  id: string;
  title: string;
  description: string;
  link: string;
  imageLink: string;
  additionalImageLinks?: string[];
  price: number;
  salePrice?: number | null;
  availability: "in stock" | "out of stock" | "preorder";
  brand: string;
  gtin?: string | null;
  mpn?: string | null;
  condition: "new" | "used" | "refurbished";
  productType?: string;
  googleProductCategory?: string;
  sku: string;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function priceStr(amount: number): string {
  return `${amount.toFixed(2)} TWD`;
}

export function generateMerchantFeedXml(products: MerchantProduct[]): string {
  const now = new Date().toISOString();
  const items = products
    .map(
      (p) => `    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <g:title>${escapeXml(p.title)}</g:title>
      <g:description>${escapeXml(p.description)}</g:description>
      <g:link>${escapeXml(p.link)}</g:link>
      <g:image_link>${escapeXml(p.imageLink)}</g:image_link>
      ${(p.additionalImageLinks ?? [])
        .map((img) => `<g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`)
        .join("\n      ")}
      <g:price>${escapeXml(priceStr(p.price))}</g:price>
      ${p.salePrice ? `<g:sale_price>${escapeXml(priceStr(p.salePrice))}</g:sale_price>` : ""}
      <g:availability>${escapeXml(p.availability)}</g:availability>
      <g:brand>${escapeXml(p.brand)}</g:brand>
      ${p.gtin ? `<g:gtin>${escapeXml(p.gtin)}</g:gtin>` : ""}
      ${p.mpn ? `<g:mpn>${escapeXml(p.mpn)}</g:mpn>` : ""}
      <g:condition>${escapeXml(p.condition)}</g:condition>
      <g:identifier_exists>${p.gtin || p.mpn ? "yes" : "no"}</g:identifier_exists>
      ${p.productType ? `<g:product_type>${escapeXml(p.productType)}</g:product_type>` : ""}
      ${p.googleProductCategory ? `<g:google_product_category>${escapeXml(p.googleProductCategory)}</g:google_product_category>` : ""}
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>匹克球拍商品資料</description>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>`;
}

export function productToMerchantItem(p: {
  id: string;
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
  categoryName?: string;
  mainImage?: string | null;
  gallery?: string[];
}): MerchantProduct {
  return {
    id: p.sku || p.id,
    title: p.name,
    description: (p.description ?? p.name).slice(0, 5000),
    link: `${SITE_URL}/products/${p.slug}`,
    imageLink: p.mainImage ?? `${SITE_URL}/images/placeholder-paddle.jpg`,
    additionalImageLinks: p.gallery?.slice(0, 10),
    price: p.price,
    salePrice: p.salePrice,
    availability: p.stock > 0 ? "in stock" : "out of stock",
    brand: p.brandName,
    gtin: p.gtin,
    mpn: p.mpn,
    condition: "new",
    productType: p.categoryName ? `Pickleball > ${p.categoryName}` : "Pickleball > 球拍",
    googleProductCategory: "990",  // Sporting Goods > Racquet Sports
    sku: p.sku,
  };
}
