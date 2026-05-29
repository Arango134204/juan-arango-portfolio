"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { 
  SiReact, SiNextdotjs, SiAngular, SiTailwindcss, SiTypescript, 
  SiJavascript, SiNodedotjs, SiFirebase, SiMongodb, SiPostgresql, 
  SiFigma, SiWordpress, SiHtml5, SiCss, SiAndroidstudio, SiXcode, 
  SiKotlin, SiPython, SiPhp, SiLaravel, SiDocker, SiGooglecloud, 
  SiArduino, SiPrisma, SiWebflow, SiXampp, SiElementor, SiHubspot, 
  SiJetbrains, SiOpenai
} from "react-icons/si";

export default function TechStack() {
  const { t } = useLanguage();

  const technologies = [
    // Core Web
    { name: "HTML5", icon: SiHtml5, color: "group-hover:text-orange-500" },
    { name: "CSS3", icon: SiCss, color: "group-hover:text-blue-500" },
    { name: "JavaScript", icon: SiJavascript, color: "group-hover:text-yellow-400" },
    { name: "TypeScript", icon: SiTypescript, color: "group-hover:text-blue-400" },
    
    // Frontend Frameworks & Styling
    { name: "React", icon: SiReact, color: "group-hover:text-cyan-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "group-hover:text-white" },
    { name: "Angular", icon: SiAngular, color: "group-hover:text-red-500" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "group-hover:text-teal-400" },
    
    // Backend & Database
    { name: "Node.js", icon: SiNodedotjs, color: "group-hover:text-green-500" },
    { name: "Python", icon: SiPython, color: "group-hover:text-blue-300" },
    { name: "PHP", icon: SiPhp, color: "group-hover:text-indigo-400" },
    { name: "Laravel", icon: SiLaravel, color: "group-hover:text-red-500" },
    { name: "XAMPP", icon: SiXampp, color: "group-hover:text-orange-600" },
    { name: "Prisma", icon: SiPrisma, color: "group-hover:text-white" },
    { name: "MongoDB", icon: SiMongodb, color: "group-hover:text-green-400" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "group-hover:text-blue-300" },
    
    // Mobile Development
    { name: "Android Studio", icon: SiAndroidstudio, color: "group-hover:text-green-400" },
    { name: "Kotlin", icon: SiKotlin, color: "group-hover:text-purple-400" },
    { name: "Xcode", icon: SiXcode, color: "group-hover:text-blue-400" },
    
    // AI, Cloud, Tools & CMS
    { name: "OpenAI API", icon: SiOpenai, color: "group-hover:text-white" },
    { name: "Firebase", icon: SiFirebase, color: "group-hover:text-yellow-500" },
    { name: "Google Cloud", icon: SiGooglecloud, color: "group-hover:text-blue-400" },
    { name: "Docker", icon: SiDocker, color: "group-hover:text-blue-500" },
    { name: "Arduino", icon: SiArduino, color: "group-hover:text-teal-500" },
    { name: "JetBrains", icon: SiJetbrains, color: "group-hover:text-white" },
    { name: "HubSpot", icon: SiHubspot, color: "group-hover:text-orange-500" },
    { name: "WordPress", icon: SiWordpress, color: "group-hover:text-blue-400" },
    { name: "Elementor", icon: SiElementor, color: "group-hover:text-pink-500" },
    { name: "Webflow", icon: SiWebflow, color: "group-hover:text-blue-500" },
    { name: "Figma", icon: SiFigma, color: "group-hover:text-pink-400" },
  ];

return (
    <section id="stack" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 py-24 relative z-10 border-t border-white/5">
      
      <div className="mb-16 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {t("Mi ", "My ")} <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-600">Tech Stack</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl text-lg md:text-xl">
          {t(
            "Las herramientas, lenguajes y frameworks que uso para construir experiencias digitales escalables y de alto rendimiento en web, móvil y hardware.",
            "The tools, languages, and frameworks I use to build scalable, high-performance digital experiences across web, mobile, and hardware."
          )}
        </p>
      </div>

      {/* Cuadrícula de Logos - Ajustada para acomodar los 30 elementos */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-4 md:gap-6">
        {technologies.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.02 }} 
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-3 hover:bg-neutral-800/80 hover:border-teal-500/50 transition-all cursor-pointer shadow-lg hover:shadow-teal-500/10"
            >
              <Icon className={`w-10 h-10 md:w-12 md:h-12 text-neutral-400 transition-colors duration-300 ${tech.color}`} />
              <span className="text-xs md:text-sm font-medium text-neutral-300 group-hover:text-white transition-colors text-center">
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}