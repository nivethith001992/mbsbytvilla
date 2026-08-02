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
    default: "Mind Body & Soul | Private Luxury Villa Retreat in Dambulla",
    template: "%s | Mind Body & Soul",
  },
  description:
    "Leave the busy world behind at Mind Body & Soul — a peaceful private escape in Dambulla, Sri Lanka. Four chakra-inspired chalets, yoga, meditation, and authentic hospitality.",
  keywords: [
    "Mind Body & Soul",
    "Dambulla villa",
    "Sri Lanka luxury retreat",
    "private chalet",
    "wellness villa",
    "Sigiriya stay",
    "yoga retreat Sri Lanka",
  ],
  openGraph: {
    title: "Mind Body & Soul | Private Luxury Villa Retreat",
    description:
      "Reconnect with nature. Experience peace, privacy & luxury in a secret garden in Dambulla, Sri Lanka.",
    url: "https://mindbodyandsoul.lk",
    siteName: "Mind Body & Soul",
    locale: "en_LK",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Mind Body & Soul private villa garden retreat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mind Body & Soul | Private Luxury Villa Retreat",
    description:
      "A peaceful private escape in Dambulla — four unique chalets surrounded by nature.",
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
