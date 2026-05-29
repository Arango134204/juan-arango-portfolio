"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      title: "MegaFlujo AI",
      description: t(
        "Plataforma de crowdsourcing en tiempo real para el sistema Megabús. Utiliza un algoritmo de consenso para optimizar la movilidad urbana.",
        "Real-time crowdsourcing platform for the Megabús transit system. Uses a consensus algorithm to optimize urban mobility."
      ),
      tags: ["Firebase", "Arquitectura", "UX/UI", "Clean Code"],
      link: "#",
      featured: true,
      status: t("Desarrollo Activo", "In Active Development"),
    },
    {
      title: "Simulador Biomédico IoT",
      description: t(
        "Modelo 3D de cerebro con meningioma simulado. Integración de fotorresistencias, telemetría y placas ESP32/Arduino para emular navegación quirúrgica precisa.",
        "3D brain model with simulated meningioma. Integration of photoresistors, telemetry, and ESP32/Arduino boards to emulate precise surgical navigation."
      ),
      tags: ["C++", "ESP32", "Arduino", "IoT", "Biomedicina"],
      link: "#",
      featured: true,
      status: "Hardware & Software",
    },
    {
      title: "BarberSaaS",
      description: t(
        "Plataforma multi-tenant diseñada para la gestión integral de barberías. Sistema robusto de control de acceso, reservas y administración.",
        "Multi-tenant platform designed for comprehensive barbershop management. Robust access control, booking, and administration system."
      ),
      tags: ["Angular", "Node.js", "Prisma", "PostgreSQL"],
      link: "#",
    },
    {
      title: "GA3 Energy Sostenible",
      description: t(
        "Plataforma corporativa diseñada para alta conversión y credibilidad en el sector renovable.",
        "Corporate platform engineered for high conversion and credibility in the renewable sector."
      ),
      tags: ["WordPress", "UI/UX", "SEO"],
      link: "https://ga3energysostenible.com",
    },
    {
      title: "Rápido y Furiosos Mensajería",
      description: t(
        "Marketplace de logística y mensajería. Incluye notificaciones automáticas de pedidos por WhatsApp y ecosistemas personalizados para vendedores.",
        "Logistics marketplace and delivery platform. Features automated WhatsApp order notifications and custom vendor ecosystems."
      ),
      tags: ["E-commerce", "Logística", "Automatización"],
      link: "http://rapidoyfuriososmensajeriarentsas.com",
    },
    {
      title: "LabFast",
      description: t(
        "Propuesta de innovación social y tecnológica enfocada en optimizar la logística de salud de última milla para entrega rápida de resultados.",
        "Social and technological innovation proposal focused on optimizing last-mile health logistics for rapid delivery of results."
      ),
      tags: ["Innovación", "HealthTech", "Logística"],
      link: "#",
    },
    {
      title: "Auditoría ISO 12207:2017 & Logística",
      description: t(
        "Gestión de auditoría de software basada en el estándar internacional y resolución profunda de arquitectura en módulos de tareas para producción de eventos (Crater Invoice).",
        "Software audit management based on the international standard and deep architecture resolution in task modules for event production (Crater Invoice)."
      ),
      tags: ["QA", "ISO 12207", "Backend"],
      link: "#",
    },
    {
      title: "MongoBites",
      description: t(
        "API RESTful escalable y sistema de gestión CRUD construido con Flask.",
        "Scalable RESTful API and CRUD management system built with Flask."
      ),
      tags: ["Python", "Flask", "MongoDB"],
      link: "https://github.com/Arango134204/MongoBites",
    }
  ];

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-white/5">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {t("Proyectos ", "Featured ")} <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-600">{t("Destacados", "Projects")}</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl text-lg">
          {t(
            "Una selección de mi trabajo reciente, abarcando desde plataformas SaaS y sitios corporativos hasta integración de hardware IoT y auditoría de software.",
            "A selection of my recent work, ranging from SaaS platforms and corporate sites to IoT hardware integration and software auditing."
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`group relative p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-800/50 hover:border-teal-500/30 transition-colors flex flex-col justify-between ${project.featured ? 'lg:col-span-2' : ''}`}
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-teal-300 transition-colors">
                  {project.title}
                </h3>
                {project.link !== "#" && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-950 rounded-full text-neutral-400 hover:text-teal-400 hover:scale-110 transition-all">
                    {project.link.includes('github.com') ? <SiGithub className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </a>
                )}
              </div>
              
              {project.status && (
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  <span className="text-xs font-medium text-teal-300">{project.status}</span>
                </div>
              )}

              <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}