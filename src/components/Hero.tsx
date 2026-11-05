"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import IDCard from "@/components/IDCard";
import { useIntroDone } from "@/components/Intro";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";

const liveCount = projects.filter((p) => p.link !== "#" && !p.link.includes("github.com")).length;
const saasCount = projects.filter((p) => p.category === "saas").length;

export default function Hero() {
  const { t, lang } = useLanguage();
  const ready = useIntroDone();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="home" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/bg/hero-blur.svg')] bg-cover bg-center opacity-80"
      />

      <div className="relative mx-auto grid min-h-svh max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-28 pb-20 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <motion.p {...fadeUp(0)} className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal" />
            {t("Pereira, CO — disponible para proyectos", "Pereira, CO — available for projects")}
          </motion.p>

          <h1 className="min-h-[1.9em] font-display text-[clamp(3rem,8vw,6.75rem)] leading-[0.95] tracking-tight">
            <span className="sr-only">
              {t("Ingeniería de experiencias que se mueven.", "Engineering digital experiences that move.")}
            </span>
            <span aria-hidden>
              <TextEffect key={`a-${lang}`} as="span" per="word" preset="fade-in-blur" trigger={ready} className="block">
                {t("Ingeniería de experiencias", "Engineering digital experiences")}
              </TextEffect>
              <TextEffect
                key={`b-${lang}`}
                as="span"
                per="word"
                preset="fade-in-blur"
                delay={0.35}
                trigger={ready}
                className="block italic text-signal"
              >
                {t("que se mueven.", "that move.")}
              </TextEffect>
            </span>
          </h1>

          <motion.p {...fadeUp(0.6)} className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            {t(
              "Soy Juan José, ingeniero de software. Construyo plataformas web, SaaS y productos full-stack, con motion design en SVG y flujos de trabajo con agentes de IA.",
              "I'm Juan José, a software engineer. I build web platforms, SaaS and full-stack products — with SVG motion design and AI-agent workflows in the loop.",
            )}
          </motion.p>

          <motion.div {...fadeUp(0.75)} className="mt-10 flex flex-wrap items-center gap-6">
            <Magnetic intensity={0.25} range={120}>
              <Link
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full bg-signal px-7 py-4 font-medium text-ink transition-colors hover:bg-bone"
              >
                {t("Ver trabajo", "See the work")}
                <ArrowDownRight className="h-5 w-5 transition-transform group-hover:rotate-[-45deg]" />
              </Link>
            </Magnetic>
            <Link
              href="/CV_JuanJoseArango_EN_2026.pdf"
              target="_blank"
              className="font-mono text-sm uppercase tracking-widest text-bone underline decoration-line underline-offset-8 transition-colors hover:decoration-signal"
            >
              {t("Descargar CV", "Download CV")}
            </Link>
          </motion.div>

          <motion.dl
            {...fadeUp(0.9)}
            className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6 font-mono text-xs uppercase tracking-widest text-muted"
          >
            {[
              { value: `${liveCount}+`, label: t("en producción", "shipped live") },
              { value: `${saasCount}`, label: t("plataformas", "platforms") },
              { value: "EN/ES", label: t("bilingüe", "bilingual") },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl normal-case tracking-normal text-bone">{stat.value}</dd>
                <dd className="mt-1">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="flex justify-center lg:justify-end">{ready && <IDCard />}</div>
      </div>

      <img src="/bg/waves.svg" alt="" aria-hidden className="relative block h-24 w-full md:h-36" />
    </section>
  );
}
