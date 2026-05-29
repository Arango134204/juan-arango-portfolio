"use client";

import { FaGithub, FaLinkedin, FaYoutube, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-md mt-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <p className="text-white font-bold text-lg">
            arango<span className="text-teal-400">.dev</span>
          </p>
          <p className="text-neutral-500 text-sm mt-1">
            © {currentYear} Juan José Arango. {t("Ingeniería con precisión.", "Engineered with precision.")}
          </p>
        </div>

        <div className="flex gap-4">
          <a href="https://github.com/Arango134204" target="_blank" rel="noopener noreferrer" className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-all">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/juan-josé-arango-54924a36a" target="_blank" rel="noopener noreferrer" className="p-2 text-neutral-400 hover:text-[#0a66c2] hover:bg-neutral-800 rounded-full transition-all">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="https://youtube.com/@JuanJoseArangoDev" target="_blank" rel="noopener noreferrer" className="p-2 text-neutral-400 hover:text-[#ff0000] hover:bg-neutral-800 rounded-full transition-all">
            <FaYoutube className="w-5 h-5" />
          </a>
          <a href="https://instagram.com/juan_arango_dev" target="_blank" rel="noopener noreferrer" className="p-2 text-neutral-400 hover:text-[#e1306c] hover:bg-neutral-800 rounded-full transition-all">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="https://wa.me/573006030655" target="_blank" rel="noopener noreferrer" className="p-2 text-neutral-400 hover:text-[#25D366] hover:bg-neutral-800 rounded-full transition-all">
            <FaWhatsapp className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}