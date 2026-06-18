import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
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

  return (
    <article className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all duration-200">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {product.mainImage ? (
            <Image
              src={product.mainImage}
              alt={`${product.name} 匹克球拍`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <span className="text-5xl">🏓</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discountPct && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                -{discountPct}%
              </span>
            )}
            {product.stock === 0 && (
              <span className="bg-gray-500 text-white text-xs font-medium px-2 py-0.5 rounded">
                售完
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            aria-label="加入願望清單"
            className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-red-500"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-gray-500 mb-0.5">{product.brandName}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm text-gray-900 leading-tight line-clamp-2 hover:text-brand-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.averageRating && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">
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
                className="text-[10px] bg-brand-50 text-brand-700 px-1.5 py-0.5 rounded"
              >
                {SUITABLE_FOR_LABELS[tag] ?? tag}
              </span>
            ))}
          </div>
        )}

        {/* Scores */}
        {showScores && (
          <div className="mt-2 space-y-1">
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
          <span className="font-bold text-base text-gray-900">
            {formatPrice(product.salePrice ?? product.price)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <Link
          href={`/products/${product.slug}`}
          className="mt-3 block w-full text-center bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
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
      <span className="text-[10px] text-gray-500 w-8 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-500 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[10px] text-gray-600 w-6 text-right">{value}</span>
    </div>
  );
}
