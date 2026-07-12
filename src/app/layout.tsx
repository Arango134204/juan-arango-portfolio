import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext"; // Importamos el motor
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Juan José Arango | Frontend Developer",
  description: "Portafolio profesional de Juan José Arango, Ingeniero de Software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {/* Envolvemos todo con el LanguageProvider */}
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
        {/* Agregamos SpeedInsights antes de cerrar el body */}
        <SpeedInsights />
      </body>
    </html>
  );
}