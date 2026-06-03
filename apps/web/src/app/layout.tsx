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

          {/* WhatsApp floating button */}
          <a
            href="https://wa.me/919133281555"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            <svg viewBox="0 0 32 32" className="h-7 w-7 text-white" fill="currentColor">
              <path d="M16.004 2.002c-7.731 0-14.002 6.271-14.002 14.002 0 2.469.657 4.878 1.904 6.99L2 30l7.189-1.867A13.94 13.94 0 0 0 16.004 30c7.731 0 14.002-6.271 14.002-14.002S23.735 2.002 16.004 2.002Zm0 25.603a11.6 11.6 0 0 1-5.924-1.622l-.425-.252-4.262 1.107 1.136-4.13-.278-.44A11.57 11.57 0 0 1 4.4 16.004c0-6.401 5.2-11.601 11.604-11.601 6.4 0 11.6 5.2 11.6 11.601 0 6.4-5.2 11.601-11.6 11.601Zm6.363-8.686c-.348-.174-2.062-1.018-2.382-1.134-.32-.116-.553-.174-.786.174-.232.348-.901 1.134-1.104 1.366-.204.232-.407.261-.755.087-.348-.174-1.47-.542-2.8-1.727-1.035-.922-1.733-2.062-1.937-2.41-.204-.348-.022-.536.153-.71.157-.156.348-.407.522-.61.174-.204.232-.349.348-.581.116-.232.058-.435-.029-.61-.087-.174-.786-1.893-1.076-2.593-.283-.68-.572-.589-.786-.6-.203-.01-.436-.012-.668-.012s-.61.087-.93.435c-.32.348-1.221 1.192-1.221 2.91 0 1.717 1.25 3.376 1.424 3.61.174.232 2.46 3.753 5.96 5.264.833.36 1.483.574 1.99.735.836.266 1.597.229 2.198.139.67-.1 2.062-.843 2.353-1.657.29-.815.29-1.514.203-1.66-.087-.145-.32-.232-.668-.406Z" />
            </svg>
          </a>
        </Providers>
      </body>
    </html>
  );
}
