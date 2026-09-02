"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";
import { projects, type ProjectCategory } from "@/data/projects";

type FilterId = "all" | ProjectCategory;

export default function Projects() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<FilterId>("websites");

  const filters: { id: FilterId; label: string; count: number }[] = useMemo(() => {
    const count = (id: FilterId) =>
      id === "all" ? projects.length : projects.filter((p) => p.category === id).length;

    return [
      { id: "websites", label: t("Sitios web", "Websites"), count: count("websites") },
      { id: "saas", label: "SaaS", count: count("saas") },
      { id: "agency", label: t("Agencia", "Agency"), count: count("agency") },
      { id: "other", label: t("Otros", "Other"), count: count("other") },
      { id: "all", label: t("Todos", "All"), count: count("all") },
    ];
  }, [t]);

  const visible = useMemo(() => {
    const list =
      filter === "all" ? projects : projects.filter((p) => p.category === filter);
    return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }, [filter]);

  const liveCount = projects.filter((p) => p.link !== "#" && !p.link.includes("github.com")).length;

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-white/5">
      <div className="mb-10 md:mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t("Proyectos ", "Selected ")}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-600">
              {t("en producción", "work")}
            </span>
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            {t(
              `${liveCount}+ sitios y plataformas entregados: quick builds de clientes, SaaS de agencia y productos propios. Filtra por tipo.`,
              `${liveCount}+ shipped sites and platforms — client quick builds, agency SaaS, and personal products. Filter by type.`
            )}
          </p>
        </div>
      </div>

      <div
        className="mb-10 flex flex-wrap gap-2"
        role="tablist"
        aria-label={t("Filtrar proyectos", "Filter projects")}
      >
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-teal-500/50 bg-teal-500/15 text-teal-200"
                  : "border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] tabular-nums ${
                  active ? "bg-teal-500/20 text-teal-300" : "bg-neutral-900 text-neutral-500"
                }`}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5"
        >
          {visible.map((project, i) => {
            const description =
              lang === "ES" ? project.description.es : project.description.en;
            const status = project.status
              ? lang === "ES"
                ? project.status.es
                : project.status.en
              : null;
            const hasLink = project.link !== "#";
            const isGithub = project.link.includes("github.com");

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.28) }}
                className={`group relative flex flex-col rounded-2xl border p-6 transition-colors ${
                  project.featured
                    ? "border-teal-500/25 bg-neutral-900/70 hover:border-teal-500/45"
                    : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-600 hover:bg-neutral-900/70"
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white leading-snug group-hover:text-teal-300 transition-colors">
                      {project.title}
                    </h3>
                    {status && (
                      <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-2.5 py-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                        <span className="text-[11px] font-medium text-teal-300">{status}</span>
                      </div>
                    )}
                  </div>
                  {hasLink && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(`Abrir ${project.title}`, `Open ${project.title}`)}
                      className="shrink-0 rounded-full bg-neutral-950 p-2 text-neutral-400 transition-all hover:scale-110 hover:text-teal-400"
                    >
                      {isGithub ? (
                        <SiGithub className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </a>
                  )}
                </div>

                <p className="mb-5 flex-1 text-sm leading-relaxed text-neutral-400">
                  {description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[11px] text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
