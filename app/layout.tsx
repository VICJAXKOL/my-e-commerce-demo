import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://my-e-commerce-demo.vercel.app"),
  title: {
    default: "MyShop | Modern E-Commerce Store",
    template: "%s | MyShop",
  },
  description:
    "MyShop is a curated e-commerce experience for apparel, electronics, home, fitness, and more.",
  openGraph: {
    title: "MyShop | Modern E-Commerce Store",
    description:
      "Shop curated products with fast browsing, trusted quality, and smooth checkout.",
    type: "website",
    url: "https://my-e-commerce-demo.vercel.app",
    siteName: "MyShop",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyShop | Modern E-Commerce Store",
    description:
      "Shop curated products with fast browsing, trusted quality, and smooth checkout.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
