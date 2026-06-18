import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";
import { organizationSchema, webSiteSchema } from "@/lib/schema-markup";
import AnalyticsScripts from "@/components/seo/AnalyticsScripts";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — 台灣匹克球拍專家`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }}
        />
        <AnalyticsScripts />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
