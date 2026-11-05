"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Plus, X } from "lucide-react";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/components/motion-primitives/morphing-dialog";
import { useLanguage } from "@/context/LanguageContext";
import { projects, type Localized, type Project, type ProjectCategory } from "@/data/projects";

type FilterId = "featured" | "all" | ProjectCategory;

const DIALOG_TRANSITION = { type: "spring", bounce: 0.05, duration: 0.45 } as const;

export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterId>("featured");

  const filters = useMemo(() => {
    const count = (id: FilterId) =>
      id === "all"
        ? projects.length
        : id === "featured"
          ? projects.filter((p) => p.caseStudy).length
          : projects.filter((p) => p.category === id).length;

    return ([
      { id: "featured", label: t("Destacados", "Selected") },
      { id: "websites", label: t("Sitios web", "Websites") },
      { id: "saas", label: t("Plataformas", "Platforms") },
      { id: "agency", label: t("Agencia", "Agency") },
      { id: "other", label: t("Otros", "Other") },
      { id: "all", label: t("Todos", "All") },
    ] as const).map((f) => ({ ...f, count: count(f.id) }));
  }, [t]);

  const visible = useMemo(() => {
    if (filter === "featured") return projects.filter((p) => p.caseStudy);
    const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
    return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }, [filter]);

  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="mb-14 grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-end">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal">02 — {t("Trabajo", "Work")}</p>
        <h2 className="font-display text-5xl leading-[1.02] md:text-7xl">
          {t("Proyectos ", "Selected ")}
          <em className="text-muted">{t("en producción.", "work.")}</em>
        </h2>
      </div>

      <div role="tablist" aria-label={t("Filtrar proyectos", "Filter projects")} className="mb-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={`relative cursor-pointer pb-1 transition-colors ${active ? "text-bone" : "text-muted hover:text-bone"}`}
            >
              {f.label} <sup className="text-signal">{f.count}</sup>
              {active && <motion.span layoutId="filter-underline" className="absolute inset-x-0 -bottom-px h-px bg-signal" />}
            </button>
          );
        })}
      </div>

      <motion.ul
        key={filter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="border-t border-line"
      >
        {visible.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </motion.ul>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { t, lang } = useLanguage();
  const pick = (value: Localized) => (lang === "ES" ? value.es : value.en);
  const hasLink = project.link !== "#";
  const isGithub = project.link.includes("github.com");

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="border-b border-line"
    >
      <MorphingDialog transition={DIALOG_TRANSITION}>
        <MorphingDialogTrigger className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 text-left transition-colors hover:bg-ink-2/60 md:grid-cols-[3rem_1.2fr_1fr_auto] md:px-3">
          <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
          <div className="min-w-0">
            <MorphingDialogTitle className="font-display text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
              {project.title}
            </MorphingDialogTitle>
            {project.status && (
              <MorphingDialogSubtitle className="mt-1 font-mono text-[11px] uppercase tracking-widest text-signal">
                {pick(project.status)}
              </MorphingDialogSubtitle>
            )}
          </div>
          <p className="hidden truncate font-mono text-xs uppercase tracking-widest text-muted md:block">
            {project.tags.slice(0, 3).join(" · ")}
          </p>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:rotate-90 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
            <Plus className="h-4 w-4" />
          </span>
        </MorphingDialogTrigger>

        <MorphingDialogContainer>
          <MorphingDialogContent className="relative max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-ink-2 p-8 md:p-10">
            <MorphingDialogTitle className="pr-12 font-display text-5xl leading-none md:text-6xl">{project.title}</MorphingDialogTitle>
            {project.status && (
              <MorphingDialogSubtitle className="mt-3 font-mono text-xs uppercase tracking-widest text-signal">
                {pick(project.status)}
              </MorphingDialogSubtitle>
            )}
            <MorphingDialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0, transition: { delay: 0.15 } },
                exit: { opacity: 0, y: 16 },
              }}
            >
              <p className="mt-6 text-lg leading-relaxed text-bone/90">{pick(project.description)}</p>

              {project.caseStudy && (
                <dl className="mt-8 space-y-6 border-t border-line pt-8">
                  {[
                    { label: t("Reto", "Challenge"), value: project.caseStudy.challenge },
                    { label: t("Construcción", "Build"), value: project.caseStudy.build },
                    { label: t("Mi rol", "My role"), value: project.caseStudy.role },
                  ].map((item) => (
                    <div key={item.label} className="grid gap-2 md:grid-cols-[8rem_1fr]">
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted">{item.label}</dt>
                      <dd className="leading-relaxed text-bone/85">{pick(item.value)}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <ul className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                    {tag}
                  </li>
                ))}
              </ul>

              {hasLink && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3 font-medium text-ink transition-colors hover:bg-signal"
                >
                  {isGithub ? t("Ver código", "View code") : t("Visitar sitio", "Visit site")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </MorphingDialogDescription>
            <MorphingDialogClose className="top-5 right-5 cursor-pointer rounded-full p-2 text-muted transition-colors hover:text-bone">
              <X className="h-5 w-5" />
              <span className="sr-only">{t("Cerrar", "Close")}</span>
            </MorphingDialogClose>
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>
    </motion.li>
  );
}
