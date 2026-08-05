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
    "caring retirement living",
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
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Lush garden grounds across 28 acres at Mind Body & Soul in Dambulla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/og.jpg"],
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
      <head>
        {/* Before paint: reload → /?r=ts (kills scroll restore); ?r= → strip + pin top */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{history.scrollRestoration="manual"}catch(e){}try{var path=location.pathname;var home=path==="/"||path==="";var hasR=false;try{hasR=new URLSearchParams(location.search).has("r")}catch(e){hasR=location.search.indexOf("r=")!==-1}if(hasR&&home){try{sessionStorage.removeItem("mbs-home-redirect");sessionStorage.setItem("mbs-force-home-top","1")}catch(e){}history.replaceState(null,"","/");scrollTo(0,0);if(document.documentElement)document.documentElement.scrollTop=0;if(document.body)document.body.scrollTop=0;return}var nav=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];var isReload=(nav&&nav.type==="reload")||(performance.navigation&&performance.navigation.type===1);var redirecting=false;try{redirecting=sessionStorage.getItem("mbs-home-redirect")==="1"}catch(e){}if(isReload&&!redirecting){try{sessionStorage.setItem("mbs-home-redirect","1")}catch(e){}location.replace("/?r="+Date.now());return}try{sessionStorage.removeItem("mbs-home-redirect")}catch(e){}if(location.hash){history.replaceState(null,"",path+location.search)}scrollTo(0,0);if(document.documentElement)document.documentElement.scrollTop=0;if(document.body)document.body.scrollTop=0}catch(e){}})();`,
          }}
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero/garden-grounds.avif"
          type="image/avif"
          {...{ fetchPriority: "high" }}
        />
        {/* Next-section heroes — warm early so fast scroll stays sharp */}
        <link
          rel="preload"
          as="image"
          href="/images/about/pavilion-grounds.avif"
          type="image/avif"
        />
        <link
          rel="preload"
          as="image"
          href="/images/about/forest-balcony.avif"
          type="image/avif"
        />
        <link
          rel="preload"
          as="image"
          href="/images/villas/veranda-dining.avif"
          type="image/avif"
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
