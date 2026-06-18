import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.cloudinary.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // serverComponentsExternalPackages handled via serverExternalPackages in Next 15
  },
  serverExternalPackages: ["@prisma/client"],
  async headers() {
    return [
      {
        source: "/feeds/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
  async redirects() {
    return [];
  },
};

export default nextConfig;
