"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import Mark from "@/components/Mark";
import { useLanguage } from "@/context/LanguageContext";

export const CONTACT_EVENT = "open-contact";

export default function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = isContactOpen ? "hidden" : "";
  }, [isContactOpen]);

  useEffect(() => {
    const open = () => setIsContactOpen(true);
    const close = (e: KeyboardEvent) => e.key === "Escape" && setIsContactOpen(false);
    window.addEventListener(CONTACT_EVENT, open);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener(CONTACT_EVENT, open);
      window.removeEventListener("keydown", close);
    };
  }, []);

  const links = [
    { href: "#now", label: t("Ahora", "Now") },
    { href: "#work", label: t("Trabajo", "Work") },
    { href: "#stack", label: "Stack" },
    { href: "#quote", label: t("Cotizar", "Quote") },
  ];

  const channels = [
    { label: "WhatsApp", detail: "+57 300 603 0655", href: "https://wa.me/573006030655" },
    { label: "Email", detail: "arangojuanjoseweb@gmail.com", href: "mailto:arangojuanjoseweb@gmail.com" },
    { label: "LinkedIn", detail: "Juan José Arango", href: "https://www.linkedin.com/in/juan-josé-arango-54924a36a" },
    { label: "GitHub", detail: "@Arango134204", href: "https://github.com/Arango134204" },
  ];

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-line bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="#home" className="flex items-center gap-3 text-bone" aria-label="Juan José Arango">
            <Mark className="h-5" />
            <span className="font-mono text-sm tracking-tight">arango.dev</span>
          </Link>

          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted">
            <div className="hidden items-center gap-6 md:flex">
              {links.map((link, i) => (
                <Link key={link.href} href={link.href} className="group transition-colors hover:text-bone">
                  <span aria-hidden className="text-signal/70 group-hover:text-signal">0{i + 1}</span> {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1" role="group" aria-label={t("Idioma", "Language")}>
              {(["EN", "ES"] as const).map((code, i) => (
                <span key={code} className="flex items-center gap-1">
                  {i > 0 && <span aria-hidden>/</span>}
                  <button
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                    className={`cursor-pointer transition-colors ${lang === code ? "text-bone" : "hover:text-bone"}`}
                  >
                    {code}
                  </button>
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="cursor-pointer rounded-full bg-bone px-4 py-2 text-ink transition-colors hover:bg-signal"
            >
              {t("Contacto", "Contact")}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-100 flex items-end justify-center p-4 sm:items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="relative w-full max-w-lg rounded-2xl border border-line bg-ink-2 p-8"
            >
              <button
                type="button"
                onClick={() => setIsContactOpen(false)}
                aria-label={t("Cerrar", "Close")}
                className="absolute top-5 right-5 cursor-pointer rounded-full p-2 text-muted transition-colors hover:text-bone"
              >
                <X className="h-5 w-5" />
              </button>

              <p className="font-mono text-xs uppercase tracking-widest text-signal">{t("Contacto", "Contact")}</p>
              <h3 id="contact-title" className="mt-3 font-display text-4xl leading-tight">
                {t("Hablemos de tu ", "Let's talk about your ")}
                <em>{t("próximo proyecto.", "next project.")}</em>
              </h3>

              <ul className="mt-8 divide-y divide-line border-y border-line">
                {channels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="font-mono text-xs uppercase tracking-widest text-muted">{channel.label}</span>
                      <span className="flex items-center gap-2 truncate text-bone transition-colors group-hover:text-signal">
                        {channel.detail}
                        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
