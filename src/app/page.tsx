"use client";

import Link from "next/link";
import IDCard from "@/components/IDCard";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Quoter from "@/components/Quoter";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage(); // Traemos la función de traducción

  return (
    <main className="min-h-screen">
      
      <section id="home" className="min-h-screen max-w-7xl mx-auto px-6 pt-32 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="flex flex-col items-start text-left relative z-10">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-sm font-medium text-teal-300">
              {t("Disponible para trabajar & freelance", "Open to work & freelance")}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
            {t("Ingeniería de ", "Engineering digital ")}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-600">
              {t("experiencias digitales", "experiences")}
            </span>
            <br />
            {t(" que impulsan el crecimiento.", " that drive growth.")}
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 font-light max-w-xl mb-10 leading-relaxed">
            {t(
              "Ingeniero de Software y Desarrollador Web. Me especializo en crear experiencias digitales rápidas, escalables y visualmente impactantes usando ecosistemas modernos.",
              "Software Engineer & Web Developer. I specialize in crafting fast, scalable, and visually stunning digital experiences using modern ecosystems."
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="#projects" className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors text-center">
              {t("Ver Proyectos", "View Projects")}
            </Link>
            <Link href="/cv-software-engineering.pdf" target="_blank" className="px-8 py-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-semibold hover:border-neutral-600 transition-all text-center">
              {t("Descargar CV", "Download CV")}
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center lg:justify-end">
          <IDCard />
        </div>

      </section>

      <TechStack />
      <Projects />
      <Quoter />
      <Footer />

    </main>
  );
}