"use client";

import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import Mark from "@/components/Mark";
import { CONTACT_EVENT } from "@/components/Navbar";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import { useLanguage } from "@/context/LanguageContext";

const socials = [
  { label: "GitHub", href: "https://github.com/Arango134204", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/juan-josé-arango-54924a36a", icon: FaLinkedin },
  { label: "YouTube", href: "https://youtube.com/@JuanJoseArangoDev", icon: FaYoutube },
  { label: "Instagram", href: "https://instagram.com/juan_arango_dev", icon: FaInstagram },
  { label: "WhatsApp", href: "https://wa.me/573006030655", icon: FaWhatsapp },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full bg-[url('/bg/waves.svg')] bg-size-[100%_100%] opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-10 md:pt-32">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal">05 — {t("Contacto", "Contact")}</p>
        <h2 className="mt-6 max-w-4xl font-display text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-tight">
          {t("Construyamos algo ", "Let's build something ")}
          <em className="text-signal">{t("que se mueva.", "that moves.")}</em>
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Magnetic intensity={0.25} range={140}>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(CONTACT_EVENT))}
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-bone px-8 py-5 text-lg font-medium text-ink transition-colors hover:bg-signal"
            >
              {t("Escríbeme", "Get in touch")}
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
          <a
            href="mailto:arangojuanjoseweb@gmail.com"
            className="font-mono text-sm text-muted underline decoration-line underline-offset-8 transition-colors hover:text-bone hover:decoration-signal"
          >
            arangojuanjoseweb@gmail.com
          </a>
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
            <Mark className="h-4 text-bone" />© {new Date().getFullYear()} Juan José Arango
          </div>
          <ul className="flex gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-signal hover:text-signal"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
