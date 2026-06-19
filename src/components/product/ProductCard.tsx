import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { formatPrice, SUITABLE_FOR_LABELS } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice?: number | null;
    stock: number;
    mainImage?: string | null;
    brandName: string;
    categoryName?: string;
    suitableFor?: string[];
    controlScore?: number | null;
    powerScore?: number | null;
    spinScore?: number | null;
    averageRating?: number;
    reviewCount?: number;
  };
  showScores?: boolean;
}

export default function ProductCard({ product, showScores = false }: ProductCardProps) {
  const discountPct =
    product.salePrice && product.price > product.salePrice
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : null;

  const displayPrice = product.salePrice ?? product.price;
  const isOnSale = !!product.salePrice;

  return (
    <article
      className="group relative bg-white border border-[#E5E2D8] rounded-[20px] overflow-hidden transition-all duration-300 ease-out"
      style={{
        boxShadow: "0 18px 45px rgba(17,17,17,0.07)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 60px rgba(17,17,17,0.13)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 18px 45px rgba(17,17,17,0.07)";
      }}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square bg-[#FAFAF8] overflow-hidden">
          {product.mainImage ? (
            <Image
              src={product.mainImage}
              alt={`${product.name} 匹克球拍`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#E5E2D8]">
              <span className="text-5xl">🏓</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discountPct && (
              <span className="bg-[#C8A45D] text-[#111111] text-xs font-bold px-2.5 py-1 rounded-full">
                -{discountPct}%
              </span>
            )}
            {product.stock === 0 && (
              <span className="bg-[#111111] text-[#FAFAF8] text-xs font-medium px-2.5 py-1 rounded-full">
                售完
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-[#4B5563] mb-1 font-medium tracking-wide uppercase">
          {product.brandName}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm text-[#111111] leading-tight line-clamp-2 hover:text-[#123524] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.averageRating && (
          <div className="flex items-center gap-1 mt-1.5">
            <Star className="w-3.5 h-3.5 fill-[#C8A45D] text-[#C8A45D]" />
            <span className="text-xs text-[#4B5563]">
              {product.averageRating.toFixed(1)} ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Suitable for tags */}
        {product.suitableFor && product.suitableFor.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.suitableFor.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-[#F2F8F5] text-[#123524] px-2 py-0.5 rounded-full border border-[#BCDECF]"
              >
                {SUITABLE_FOR_LABELS[tag] ?? tag}
              </span>
            ))}
          </div>
        )}

        {/* Scores */}
        {showScores && (
          <div className="mt-3 space-y-1.5">
            {product.controlScore != null && (
              <ScoreRow label="控制" value={product.controlScore} />
            )}
            {product.powerScore != null && (
              <ScoreRow label="力量" value={product.powerScore} />
            )}
            {product.spinScore != null && (
              <ScoreRow label="旋轉" value={product.spinScore} />
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-bold text-base text-[#123524]">
            {formatPrice(displayPrice)}
          </span>
          {isOnSale && (
            <span className="text-xs text-[#4B5563] line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/products/${product.slug}`}
          className="mt-3 block w-full text-center bg-[#123524] hover:bg-[#1F6B4F] text-white text-sm font-semibold py-2.5 rounded-full transition-colors duration-200"
        >
          {product.stock > 0 ? "立即選購" : "查看詳情"}
        </Link>
      </div>
    </article>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-[#4B5563] w-8 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-[#E5E2D8] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#123524] rounded-full"
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
      <span className="text-[10px] text-[#4B5563] w-5 text-right">{value}</span>
    </div>
  );
}
