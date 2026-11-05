"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, ReactNode } from "react";

type Language = "ES" | "EN";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  // Función mágica de traducción: recibe el texto en español y en inglés
  t: (es: string, en: string) => string;
}

const STORAGE_KEY = "lang";
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// Sin idioma guardado, la primera visita usa el idioma del navegador.
const getSnapshot = (): Language => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "ES" || saved === "EN") return saved;
  return navigator.language.toLowerCase().startsWith("es") ? "ES" : "EN";
};

// El HTML del servidor siempre sale en inglés.
const getServerSnapshot = (): Language => "EN";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const setLang = useCallback((newLang: Language) => {
    localStorage.setItem(STORAGE_KEY, newLang);
    listeners.forEach((listener) => listener());
  }, []);

  const t = useCallback((es: string, en: string) => (lang === "ES" ? es : en), [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
