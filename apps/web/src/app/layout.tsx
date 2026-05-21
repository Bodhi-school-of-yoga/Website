import type { Metadata } from "next";
import { Host_Grotesk, DM_Sans, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Providers from "@/lib/providers";

const hostGrotesk = Host_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${hostGrotesk.variable} ${dmSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-transparent">
        <Providers>
        
          <main className="flex-1">{children}</main>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
