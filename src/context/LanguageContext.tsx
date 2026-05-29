"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ES" | "EN";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  // Función mágica de traducción: recibe el texto en español y en inglés
  t: (es: string, en: string) => string; 
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("EN"); // Inglés por defecto

  // Recuperar el idioma guardado al recargar la página
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang) setLang(savedLang);
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  // Esta función decide qué texto mostrar según el estado actual
  const t = (es: string, en: string) => (lang === "ES" ? es : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};