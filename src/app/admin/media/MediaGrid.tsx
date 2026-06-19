"use client";

interface MediaImage {
  src: string;
  label: string;
  type: string;
}

export default function MediaGrid({ images }: { images: MediaImage[] }) {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
      {images.map((img, i) => (
        <div key={i} className="bg-white border rounded-xl overflow-hidden group">
          <div className="aspect-square bg-gray-50 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-contain p-2"
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <div className="p-2">
            <p className="text-xs font-medium text-gray-700 truncate">{img.label}</p>
            <p className="text-xs text-gray-400">{img.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
