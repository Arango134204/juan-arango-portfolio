"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-lg border border-line bg-ink px-4 py-3 text-bone placeholder:text-muted/60 transition-colors focus:border-signal focus:outline-none";

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
      track("Contact Form Sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-line bg-ink p-5" role="status">
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
        <p className="text-bone">
          {t("¡Mensaje enviado! Te respondo pronto a tu correo.", "Message sent! I'll reply to your email soon.")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">{t("Nombre", "Name")}</span>
          <input name="name" required maxLength={100} autoComplete="name" placeholder={t("Nombre", "Name")} className={fieldClass} />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="Email" className={fieldClass} />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">{t("Mensaje", "Message")}</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          placeholder={t("Cuéntame sobre tu proyecto…", "Tell me about your project…")}
          className={`${fieldClass} resize-none`}
        />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {status === "error" ? (
          <p className="text-sm text-signal" role="alert">
            {t("No se pudo enviar. Escríbeme por WhatsApp o correo.", "Couldn't send it. Reach me on WhatsApp or email.")}
          </p>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-signal px-6 py-3 font-medium text-ink transition-colors hover:bg-bone disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? t("Enviando…", "Sending…") : t("Enviar mensaje", "Send message")}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </form>
  );
}
