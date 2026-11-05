"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import MarkLoop from "@/components/MarkLoop";
import { useLanguage } from "@/context/LanguageContext";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Now() {
  const { t } = useLanguage();

  const agentLog = [
    { prompt: true, text: t("agente planea la funcionalidad", "agent plans the feature") },
    { prompt: false, text: t("revisa el código existente", "reads the existing code") },
    { prompt: false, text: t("implementa + respeta reduced-motion", "implements + respects reduced-motion") },
    { prompt: false, text: t("lint, build, verificación en navegador", "lint, build, browser check") },
    { prompt: true, text: "git push → vercel" },
  ];

  return (
    <section id="now" className="bg-ink-2">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <motion.div {...reveal} className="mb-16 grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-end">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal">01 — {t("Ahora", "Now")}</p>
          <h2 className="font-display text-5xl leading-[1.02] md:text-7xl">
            {t("Lo que he estado ", "What I've been ")}
            <em className="text-muted">{t("aprendiendo.", "learning.")}</em>
          </h2>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-[1.5fr_1fr]">
          <motion.article {...reveal} className="flex flex-col bg-ink-2 p-8 md:p-10 lg:row-span-2">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Motion design · SVG</p>
            <h3 className="mt-4 font-display text-4xl leading-tight">
              {t("Logos que se ", "Logos that ")}
              <em>{t("construyen solos.", "build themselves.")}</em>
            </h3>
            <p className="mt-4 max-w-lg leading-relaxed text-muted">
              {t(
                "Estoy aprendiendo motion design con SVG: cada letra es un path de curvas cúbicas con la misma estructura que la pieza final, así que puede transformarse sin saltos. Así nació el logo de este sitio, donde J·A se convierte en un prompt de terminal.",
                "I'm learning SVG motion design: every letter is a cubic-curve path with the same structure as its final piece, so it can morph without jumps. That's how this site's logo was made, with J·A turning into a terminal prompt.",
              )}
            </p>
            <div className="mt-10 flex flex-1 items-center justify-center rounded-xl border border-line bg-ink px-6 py-10 text-bone">
              <MarkLoop className="w-full max-w-sm" />
            </div>
          </motion.article>

          <motion.article {...reveal} className="bg-ink-2 p-8 md:p-10">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">{t("IA · Agentes", "AI · Agents")}</p>
            <h3 className="mt-4 font-display text-3xl leading-tight">
              {t("Construyo con agentes ", "Shipping with agents ")}
              <em>{t("en el ciclo.", "in the loop.")}</em>
            </h3>
            <p className="mt-4 leading-relaxed text-muted">
              {t(
                "Uso agentes de IA (Cursor, OpenAI API) para planear, implementar y verificar, y automatizo pipelines de outreach con webhooks y GoHighLevel.",
                "I use AI agents (Cursor, OpenAI API) to plan, implement and verify, and I automate outreach pipelines with webhooks and GoHighLevel.",
              )}
            </p>
            <ol className="mt-6 space-y-1.5 rounded-xl border border-line bg-ink p-4 font-mono text-xs">
              {agentLog.map((line, i) => (
                <motion.li
                  key={line.text}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.25, duration: 0.4 }}
                  className={line.prompt ? "text-bone" : "text-muted"}
                >
                  <span className={line.prompt ? "text-signal" : "text-muted/60"}>{line.prompt ? ">" : "✓"}</span> {line.text}
                </motion.li>
              ))}
            </ol>
          </motion.article>

          <motion.article {...reveal} className="flex flex-col bg-ink-2 p-8 md:p-10">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal" />
              {t("Proyecto en desarrollo actual", "Current project in development")}
            </p>
            <h3 className="mt-4 font-display text-2xl leading-tight">SIGBA</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t(
                "Gestión de beneficiarios para el Banco de Alimentos de Pereira y sus parroquias, en Next.js.",
                "Beneficiary management for the Pereira Food Bank and its parishes, built with Next.js.",
              )}
            </p>
            <a
              href="https://github.com/Arango134204/interfaz-crud-beneficiarios"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-widest text-bone underline decoration-line underline-offset-8 transition-colors hover:decoration-signal"
            >
              {t("Ver repositorio", "View repository")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.article>
        </div>
      </div>
      <div aria-hidden className="h-24 w-full rotate-180 bg-ink bg-[url('/bg/waves.svg')] bg-size-[100%_100%] md:h-36" />
    </section>
  );
}
