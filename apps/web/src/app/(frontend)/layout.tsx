import type { Metadata } from "next";
import {
  Host_Grotesk,
  DM_Sans,
  Noto_Sans_Devanagari,
  Fraunces,
} from "next/font/google";
import Script from "next/script";
import Providers from "@/lib/providers";
import { PromoBannerBar } from "@/components/ui/promo-banner-bar";
import { StickyEnquiryButton } from "@/components/ui/sticky-enquiry-button";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const GTM_ID = "GTM-NW4D5W7J";
const hostGrotesk = Host_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://bodhischoolofyoga.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bodhi School of Yoga | Yoga Classes, Teacher Training & Wellness",
    template: "%s | Bodhi School of Yoga",
  },
  description:
    "Bodhi School of Yoga offers Hatha, Vinyasa & Yin yoga classes, meditation sessions, and certified teacher training programs for all levels. Begin your wellness journey today.",
  keywords: [
    "yoga classes",
    "yoga studio",
    "meditation",
    "wellness",
    "hatha yoga",
    "vinyasa yoga",
    "yin yoga",
    "yoga teacher training",
    "mindfulness",
    "bodhi yoga",
  ],
  authors: [{ name: "Bodhi School of Yoga" }],
  creator: "Bodhi School of Yoga",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Bodhi School of Yoga",
    title: "Bodhi School of Yoga | Yoga Classes, Teacher Training & Wellness",
    description:
      "Offering Hatha, Vinyasa & Yin yoga classes, meditation sessions, and certified teacher training programs for all levels.",
    images: [
      {
        url: "/OG.jpg",
        width: 1200,
        height: 630,
        alt: "Bodhi School of Yoga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bodhi School of Yoga | Yoga Classes, Teacher Training & Wellness",
    description:
      "Offering Hatha, Vinyasa & Yin yoga classes, meditation sessions, and certified teacher training programs for all levels.",
    images: ["/OG.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hostGrotesk.variable} ${dmSans.variable} ${notoDevanagari.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-transparent">
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>
          <Analytics />
          <SpeedInsights />

          <PromoBannerBar />

          <main className="flex-1">{children}</main>

          <StickyEnquiryButton />
        </Providers>
      </body>
    </html>
  );
}
