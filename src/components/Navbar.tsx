"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext"; // Importamos el hook

export default function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { lang, setLang, t } = useLanguage(); // Traemos el estado global

  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isContactOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="#home" className="text-xl font-bold tracking-tighter text-white">
            arango<span className="text-teal-400">.dev</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <Link href="#home" className="hover:text-white transition-colors">{t("Inicio", "Home")}</Link>
            <Link href="#stack" className="hover:text-white transition-colors">Tech Stack</Link>
            <Link href="#projects" className="hover:text-white transition-colors">{t("Proyectos", "Projects")}</Link>
            
            <button 
              onClick={() => setIsContactOpen(true)} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t("Contacto", "Contact")}
            </button>

            {/* Toggle de Idioma Real */}
            <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800 ml-4">
              <button 
                onClick={() => setLang("EN")}
                className={`px-3 py-1 rounded-md transition-all font-bold ${lang === "EN" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang("ES")}
                className={`px-3 py-1 rounded-md transition-all font-bold ${lang === "ES" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsContactOpen(false)}
                className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors p-2 rounded-full hover:bg-neutral-900"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-white mb-2">{t("¡Conectemos!", "Let's connect!")}</h3>
              <p className="text-neutral-400 mb-8 text-sm">
                {t("Escoge tu medio favorito. Siempre estoy abierto a discutir nuevos proyectos y oportunidades.", 
                   "Choose your favorite channel. I'm always open to discussing new projects and opportunities.")}
              </p>

              <div className="flex flex-col gap-3">
                <a href="https://wa.me/573114005275" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#25D366]/50 hover:bg-[#25D366]/10 text-neutral-300 hover:text-[#25D366] transition-all group">
                  <FaWhatsapp className="w-6 h-6" />
                  <span className="font-medium">WhatsApp (+57 311 400 5275)</span>
                </a>
                
                <a href="mailto:arangojuanjoseweb@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-teal-500/50 hover:bg-teal-500/10 text-neutral-300 hover:text-teal-400 transition-all">
                  <FaEnvelope className="w-6 h-6" />
                  <span className="font-medium">{t("Enviar Correo", "Send Email")}</span>
                </a>

                <a href="https://www.linkedin.com/in/juan-josé-arango-54924a36a" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 text-neutral-300 hover:text-[#0a66c2] transition-all">
                  <FaLinkedin className="w-6 h-6" />
                  <span className="font-medium">LinkedIn Profile</span>
                </a>
                <a href="https://github.com/Arango134204" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-white/50 hover:bg-white/10 text-neutral-300 hover:text-white transition-all">
                  <FaGithub className="w-6 h-6" />
                  <span className="font-medium">GitHub Projects</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}