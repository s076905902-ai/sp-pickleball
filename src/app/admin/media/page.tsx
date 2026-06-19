import prisma from "@/lib/prisma";
import { Image as ImageIcon } from "lucide-react";
import MediaGrid from "./MediaGrid";

export default async function AdminMediaPage() {
  const [products, brands] = await Promise.all([
    prisma.product.findMany({ select: { id: true, name: true, mainImage: true, gallery: true }, where: { mainImage: { not: null } }, take: 100 }),
    prisma.brand.findMany({ select: { id: true, name: true, logo: true, coverImage: true }, take: 50 }),
  ]);

  const images: { src: string; label: string; type: string }[] = [];

  products.forEach(p => {
    if (p.mainImage) images.push({ src: p.mainImage, label: p.name, type: "商品主圖" });
    p.gallery.forEach((g, i) => images.push({ src: g, label: `${p.name} #${i + 1}`, type: "相簿" }));
  });
  brands.forEach(b => {
    if (b.logo) images.push({ src: b.logo, label: b.name, type: "品牌 Logo" });
    if (b.coverImage) images.push({ src: b.coverImage, label: b.name, type: "品牌封面" });
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">媒體庫</h1>
          <p className="text-sm text-gray-500 mt-1">共 {images.length} 張圖片（來自商品與品牌）</p>
        </div>
        <div className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
          💡 目前使用外部圖片網址，如需上傳功能請整合 Cloudinary 或 R2
        </div>
      </div>

      {images.length === 0 ? (
        <div className="bg-white border rounded-xl py-20 text-center">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400">尚無圖片，請先為商品或品牌設定圖片網址</p>
        </div>
      ) : (
        <MediaGrid images={images} />
      )}
    </div>
  );
}
