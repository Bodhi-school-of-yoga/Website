import type { Metadata } from "next";
import {
  Host_Grotesk,
  DM_Sans,
  Noto_Sans_Devanagari,
  Fraunces,
} from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";
import { PromoBannerBar } from "@/components/ui/promo-banner-bar";

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

// Used for the hero "बोधि" watermark + eyebrow Devanagari glyph. Matches the
// Figma type spec (Noto Sans Devanagari Bold).
const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "700"],
});

// Serif display face for the "Bodhi" wordmark (footer brand, hero accents).
// Variable font so any weight resolves via CSS font-weight. Figma spec uses
// Fraunces Light Italic.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bodhi Yoga Studio",
    template: "%s | Bodhi Yoga",
  },
  description:
    "Find your inner balance at Bodhi Yoga Studio. Offering Hatha, Vinyasa, Yin yoga and meditation classes for all levels.",
  keywords: ["yoga", "meditation", "wellness", "yoga studio", "mindfulness"],
};

export default function RootLayout({
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
        <Providers>
          <div className="mb-4">

          <PromoBannerBar />
          </div>
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
