"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  mainImage: string | null;
  gallery: string[];
  productName: string;
}

export default function ProductImageGallery({ mainImage, gallery, productName }: Props) {
  const allImages = [
    ...(mainImage ? [mainImage] : []),
    ...gallery.filter((img) => img !== mainImage),
  ].slice(0, 6);

  const [selected, setSelected] = useState(allImages[0] ?? null);

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-3">
        {selected ? (
          <Image
            src={selected}
            alt={`${productName} 匹克球拍`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-8"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full text-8xl">🏓</div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(img)}
              className={`relative w-16 h-16 flex-shrink-0 border-2 rounded-lg overflow-hidden bg-gray-50 transition-all ${
                selected === img
                  ? "border-[#123524] shadow-sm"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} 圖片 ${i + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
