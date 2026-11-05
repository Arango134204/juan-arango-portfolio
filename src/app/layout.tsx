import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { INTRO_SCRIPT } from "@/components/Intro";
import { SpeedInsights } from "@vercel/speed-insights/next";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://juan-arango-portfolio.vercel.app"),
  title: "Juan José Arango — Software Engineer & Creative Developer",
  description:
    "Portfolio of Juan José Arango: full-stack web platforms, SaaS, motion design in SVG and AI-assisted workflows. Based in Pereira, Colombia.",
  openGraph: {
    title: "Juan José Arango — Software Engineer & Creative Developer",
    description: "Full-stack web platforms, SaaS, motion design and AI-assisted workflows.",
    url: "/",
    siteName: "arango.dev",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body className="antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
