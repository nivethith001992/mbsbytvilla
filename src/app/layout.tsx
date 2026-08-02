import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://mindbodyandsoul.lk"),
  title: {
    default:
      "Mind Body & Soul | Luxury Adult Care Retirement Living in Dambulla",
    template: "%s | Mind Body & Soul",
  },
  description:
    "Mind Body & Soul by T-Villa — a luxury adult care retirement facility in Dambulla, Sri Lanka. Independent living with care and close care, villa homes, on-site nursing, and 28 acres of gardens and lake.",
  keywords: [
    "Mind Body & Soul",
    "Mind Body & Soul by T-Villa",
    "Dambulla retirement care",
    "Sri Lanka adult care",
    "independent living with care",
    "luxury retirement villa Sri Lanka",
    "elderly care Dambulla",
    "memory care Sri Lanka",
  ],
  openGraph: {
    title: "Mind Body & Soul | Luxury Adult Care in Dambulla",
    description:
      "Live the life you still deserve — with nature. Independent living with care and close care in villa homes across 28 acres in Dambulla, Sri Lanka.",
    url: "https://mindbodyandsoul.lk",
    siteName: "Mind Body & Soul",
    locale: "en_LK",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Mind Body & Soul luxury adult care villas and gardens in Dambulla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mind Body & Soul | Luxury Adult Care in Dambulla",
    description:
      "Independence with care — villa living, on-site nursing, and dignified retirement life in Dambulla, Sri Lanka.",
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
