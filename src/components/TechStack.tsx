"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

export default function TechStack() {
  const { t } = useLanguage();

  const groups = [
    {
      label: "Frontend",
      items: ["TypeScript", "React", "Next.js", "Angular", "Tailwind CSS", "shadcn/ui", "HTML5 / CSS3"],
    },
    {
      label: t("Motion & IA", "Motion & AI"),
      items: ["Motion (Framer)", t("Animación SVG", "SVG animation"), "Cursor agents", "OpenAI API", "Figma"],
    },
    {
      label: t("Backend & datos", "Backend & data"),
      items: ["Node.js", "Express", "Python / Flask", "PHP / Laravel", "Prisma", "Zod", "PostgreSQL", "MySQL", "MongoDB"],
    },
    {
      label: t("Cloud & operaciones", "Cloud & ops"),
      items: ["Vercel", "Firebase", "Google Cloud", "Docker", "Cloudinary", "Git CI/CD", "Hostinger", "Email DNS (SPF/DKIM/DMARC)"],
    },
    {
      label: t("Integraciones & CMS", "Integrations & CMS"),
      items: ["GoHighLevel", "Resend", "Leaflet", "Shopify", "WordPress", "Elementor", "Webflow", "HubSpot"],
    },
    {
      label: t("Móvil & hardware", "Mobile & hardware"),
      items: ["Kotlin", "Android Studio", "Xcode", "C++", "Arduino", "ESP32"],
    },
  ];

  return (
    <section id="stack" className="mx-auto max-w-7xl border-t border-line px-6 py-24 md:py-32">
      <div className="mb-16 grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-end">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal">03 — Stack</p>
        <div>
          <h2 className="font-display text-5xl leading-[1.02] md:text-7xl">
            {t("Herramientas que ", "Tools I ")}
            <em className="text-muted">{t("domino.", "work with.")}</em>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {t(
              "Del prototipo al despliegue: web, móvil, hardware y automatizaciones.",
              "From prototype to production: web, mobile, hardware and automations.",
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: (gi % 3) * 0.08 }}
            className="border-t border-line pt-5"
          >
            <h3 className="mb-4 flex items-baseline justify-between font-mono text-xs uppercase tracking-widest text-muted">
              {group.label}
              <span className="text-signal">{String(group.items.length).padStart(2, "0")}</span>
            </h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-1 font-display text-2xl leading-snug">
              {group.items.map((item, i) => (
                <li key={item} className="text-bone transition-colors hover:text-signal">
                  {item}
                  {i < group.items.length - 1 && <span className="ml-3 text-line">/</span>}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
