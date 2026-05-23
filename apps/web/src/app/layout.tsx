import type { Metadata } from "next";
import { Host_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";

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
      className={`${hostGrotesk.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-transparent">
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
