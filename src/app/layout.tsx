import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { seo } from "@/lib/content";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const siteTitle = seo.title;
const siteDescription = seo.description;

export const metadata: Metadata = {
  metadataBase: new URL("https://mindbodyandsoul.lk"),
  title: {
    default: siteTitle,
    template: "%s | Mind Body & Soul",
  },
  description: siteDescription,
  keywords: [
    "Mind Body & Soul",
    "Mind Body & Soul by T-Villa",
    "luxury retirement living",
    "Dambulla Sri Lanka",
    "private villas",
    "personalised elderly care",
    "wellness programmes",
    "independent living with support",
    "retirement resort Sri Lanka",
    "elderly care Dambulla",
    "Ayurveda",
    "Sigiriya Lion Rock",
    "Dambulla Cave Temple",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://mindbodyandsoul.lk",
    siteName: "Mind Body & Soul",
    locale: "en_LK",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Mind Body & Soul luxury retirement living villas and gardens in Dambulla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    ],
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
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
