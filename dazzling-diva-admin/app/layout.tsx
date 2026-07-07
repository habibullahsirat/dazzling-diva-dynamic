import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "sonner";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium Clothing Website",
  description:
    "Leading clothing company with quality products, efficient delivery, and global network.",
  generator: "habibullah.sirat.001@gmail.com",
  keywords: "best clothing website, clothing site, quality cloth store",
  authors: [{ name: "Habibullah Sirat" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourcompany.com",
    title: "Premium Clothing Website",
    description:
      "Leading clothing company with quality products, efficient delivery, and global network.",
    siteName: "Dazzling Diva",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
