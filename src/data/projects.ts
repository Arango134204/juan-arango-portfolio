export type ProjectCategory = "websites" | "saas" | "agency" | "other";

export type Localized = { es: string; en: string };

export type Project = {
  id: string;
  title: string;
  description: Localized;
  tags: string[];
  link: string;
  category: ProjectCategory;
  /** Shown first within its filter and with a live/priority badge. */
  featured?: boolean;
  status?: Localized;
};

export const projects: Project[] = [
  // —— Recent client websites (Cluster / freelance delivery) ——
  {
    id: "solis-painting",
    title: "Solis Painting Services",
    description: {
      es: "Sitio local de pintura residencial y comercial en Waukegan / Lake County (IL): SEO local, CTAs de estimación, galería de trabajos y contacto bilingüe.",
      en: "Local residential & commercial painting site for Waukegan / Lake County, IL — local SEO, estimate CTAs, project gallery, and bilingual contact.",
    },
    tags: ["Next.js", "Tailwind", "Local SEO", "Vercel"],
    link: "https://solis-painting.vercel.app",
    category: "websites",
    featured: true,
    status: { es: "Cliente · En producción", en: "Client · Live" },
  },
  {
    id: "vicas-investments",
    title: "VICAS Investments",
    description: {
      es: "Plataforma web para creative finance en Southern California: Subject-To, co-living, fix & flip. Calendly, WhatsApp e Instagram integrados.",
      en: "Creative-finance web platform for Southern California — Subject-To, co-living, fix & flip. Calendly, WhatsApp, and Instagram integrated.",
    },
    tags: ["Next.js", "Conversion", "Calendly", "Vercel"],
    link: "https://vicas-investments.vercel.app",
    category: "websites",
    featured: true,
    status: { es: "Cliente · En producción", en: "Client · Live" },
  },
  {
    id: "art-constructions",
    title: "ART Constructions LLC",
    description: {
      es: "Sitio de construcción en Utah: metal buildings, remodelaciones y compra de casas as-is. Estimación gratuita y WhatsApp como canal principal.",
      en: "Utah construction site — metal buildings, remodels, and as-is home purchases. Free estimates with WhatsApp as the primary channel.",
    },
    tags: ["Next.js", "Local Business", "WhatsApp", "Vercel"],
    link: "https://art-constructions-llc.vercel.app",
    category: "websites",
    featured: true,
    status: { es: "Cliente · En producción", en: "Client · Live" },
  },
  {
    id: "quickfix",
    title: "QuickFix Home Services",
    description: {
      es: "Sitio de plomería y reparaciones en Las Vegas: servicios, precios transparentes, schema LocalBusiness y flujo de contacto mismo día.",
      en: "Las Vegas plumbing & home repairs site — services, upfront pricing, LocalBusiness schema, and same-day contact flow.",
    },
    tags: ["Next.js", "Local SEO", "Schema", "Vercel"],
    link: "https://quick-fix.vercel.app",
    category: "websites",
    featured: true,
    status: { es: "Cliente · En producción", en: "Client · Live" },
  },
  {
    id: "glass-mirror-tx",
    title: "Martinez Orlyn Glass & Mirror",
    description: {
      es: "Sitio corporativo en Houston para vidrio y espejos: galería de trabajos reales, CTAs móviles sticky y tracking de conversiones.",
      en: "Houston glass & mirror corporate site — real job gallery, sticky mobile CTAs, and conversion tracking.",
    },
    tags: ["Next.js", "Houston", "Conversion", "Tracking"],
    link: "https://glassmirrortx.us",
    category: "websites",
    featured: true,
    status: { es: "Cliente · En producción", en: "Client · Live" },
  },
  {
    id: "ursa-cleaning",
    title: "URSA Critical Facilities Cleaning",
    description: {
      es: "Web para limpieza de instalaciones críticas (data centers, cleanrooms, medical) en Ohio y Los Ángeles. Enfoque B2B y respuesta 24/7.",
      en: "Critical-facilities cleaning site (data centers, cleanrooms, medical) for Ohio & Los Angeles — B2B focus with 24/7 response.",
    },
    tags: ["Next.js", "B2B", "Local SEO"],
    link: "https://www.ursacleaning.com",
    category: "websites",
    featured: true,
    status: { es: "Cliente · En producción", en: "Client · Live" },
  },
  {
    id: "any-budget-mattresses",
    title: "Any Budget Mattresses",
    description: {
      es: "Showroom familiar en Jacksonville, TX: colchones, muebles y electrodomésticos. Financiamiento, delivery y CTA de visita al piso.",
      en: "Family showroom in Jacksonville, TX — mattresses, furniture & appliances. Financing, delivery, and visit-the-floor CTAs.",
    },
    tags: ["Next.js", "Retail", "Local SEO", "Vercel"],
    link: "https://anybudgetmattresses.com",
    category: "websites",
    featured: true,
    status: { es: "Cliente · En producción", en: "Client · Live" },
  },
  {
    id: "listas",
    title: "LISTAS Bienes Raíces",
    description: {
      es: "Plataforma inmobiliaria en producción (Pereira / Eje Cafetero): catálogo compra/arriendo, mapa Leaflet 300 m, panel admin, Cloudinary y WhatsApp.",
      en: "Live real-estate platform (Pereira / Coffee Region) — buy/rent catalog, Leaflet 300 m map, admin panel, Cloudinary, and WhatsApp.",
    },
    tags: ["Angular", "Node.js", "MySQL", "Cloudinary", "Leaflet"],
    link: "https://listasbienesraices.com/",
    category: "websites",
    featured: true,
    status: { es: "Cliente · En producción", en: "Client · Live" },
  },
  {
    id: "valux",
    title: "Valux.hn",
    description: {
      es: "Plataforma web de alto rendimiento orientada a conversión, del ecosistema de clientes de Cluster Media.",
      en: "High-performance, conversion-oriented web platform built for the Cluster Media client ecosystem.",
    },
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    link: "https://valux-hn.vercel.app/",
    category: "websites",
    featured: true,
    status: { es: "Cluster Media Client", en: "Cluster Media Client" },
  },
  {
    id: "ga3",
    title: "GA3 Energy Sostenible",
    description: {
      es: "Plataforma corporativa de alta conversión y credibilidad para el sector de energía renovable.",
      en: "Corporate platform engineered for conversion and credibility in the renewable energy sector.",
    },
    tags: ["WordPress", "UI/UX", "SEO"],
    link: "https://ga3energysostenible.com",
    category: "websites",
  },
  {
    id: "rapido-furiosos",
    title: "Rápido y Furiosos Mensajería",
    description: {
      es: "Marketplace de logística y mensajería con notificaciones automáticas de pedidos por WhatsApp.",
      en: "Logistics marketplace with automated WhatsApp order notifications and custom vendor flows.",
    },
    tags: ["E-commerce", "Logística", "WhatsApp"],
    link: "http://rapidoyfuriososmensajeriarentsas.com",
    category: "websites",
  },

  // —— Agency ——
  {
    id: "cluster-media-web",
    title: "Cluster Media",
    description: {
      es: "Website principal de la agencia: marketing digital, desarrollo web y automatización para negocios hispanos. Landing premium y funnels de captura.",
      en: "Agency flagship site — digital marketing, web development, and automation for Hispanic businesses. Premium landing + lead funnels.",
    },
    tags: ["Next.js", "Agency", "Funnels", "Vercel"],
    link: "https://cluster-media-web.vercel.app",
    category: "agency",
    featured: true,
    status: { es: "Cluster Media", en: "Cluster Media" },
  },
  {
    id: "clusterag",
    title: "CLUSTERAG",
    description: {
      es: "SaaS interno de productividad y auditoría para producción audiovisual (Podcast Room / Production), integrado a la operación de Cluster Media.",
      en: "Internal productivity & audit SaaS for media production (Podcast Room / Production), wired into Cluster Media operations.",
    },
    tags: ["Next.js", "TypeScript", "Vercel", "Workflow"],
    link: "https://clusterag.vercel.app/",
    category: "saas",
    featured: true,
    status: { es: "Cluster Media SaaS", en: "Cluster Media SaaS" },
  },
  {
    id: "lead-forge",
    title: "Lead-Forge",
    description: {
      es: "Prospección y outreach: webhooks CI/CD en Vercel, GoHighLevel y endurecimiento DNS (SPF, DKIM, DMARC) para email outreach.",
      en: "Prospecting & outreach — Vercel CI/CD webhooks, GoHighLevel, and DNS hardening (SPF, DKIM, DMARC) for email pipelines.",
    },
    tags: ["Next.js", "GoHighLevel", "CI/CD", "Email DNS"],
    link: "https://lead-forge-tau.vercel.app/",
    category: "saas",
    featured: true,
    status: { es: "Cluster Media SaaS", en: "Cluster Media SaaS" },
  },

  // —— Products / personal ——
  {
    id: "megaflujo",
    title: "MegaFlujo AI",
    description: {
      es: "Crowdsourcing en tiempo real para Megabús (AMCO) con algoritmo de consenso ponderado y geofencing Haversine.",
      en: "Real-time crowdsourcing for Megabús (AMCO) with a weighted consensus algorithm and Haversine geofencing.",
    },
    tags: ["Firebase", "Kotlin", "UX/UI", "Arquitectura"],
    link: "#",
    category: "saas",
    status: { es: "Desarrollo activo", en: "In active development" },
  },
  {
    id: "barbersaas",
    title: "BarberSaaS",
    description: {
      es: "SaaS multi-tenant para barberías: roles, reservas en tiempo real y panel administrativo modular.",
      en: "Multi-tenant barbershop SaaS — roles, real-time booking, and a modular admin panel.",
    },
    tags: ["Angular", "Node.js", "Prisma", "PostgreSQL"],
    link: "#",
    category: "saas",
  },
  {
    id: "iot-biomedico",
    title: "Simulador Biomédico IoT",
    description: {
      es: "Modelo 3D cerebral con fotorresistencias y ESP32/Arduino para emular navegación quirúrgica con telemetría en tiempo real.",
      en: "3D brain model with photoresistors and ESP32/Arduino to emulate surgical navigation with live telemetry.",
    },
    tags: ["C++", "ESP32", "Arduino", "IoT"],
    link: "#",
    category: "other",
    status: { es: "Hardware & Software", en: "Hardware & Software" },
  },
  {
    id: "labfast",
    title: "LabFast",
    description: {
      es: "Propuesta de innovación para logística de salud de última milla y entrega rápida de resultados de laboratorio.",
      en: "Social-tech proposal for last-mile health logistics and fast lab-result delivery.",
    },
    tags: ["Innovación", "HealthTech", "Logística"],
    link: "#",
    category: "other",
  },
  {
    id: "iso-audit",
    title: "Auditoría ISO 12207:2017",
    description: {
      es: "Auditoría formal de Crater Invoice bajo ISO/IEC 12207 e ISO 25010: arquitectura, pruebas y documentación V&V.",
      en: "Formal Crater Invoice audit under ISO/IEC 12207 & ISO 25010 — architecture, tests, and V&V documentation.",
    },
    tags: ["QA", "ISO 12207", "Backend"],
    link: "#",
    category: "other",
  },
  {
    id: "mongobites",
    title: "MongoBites",
    description: {
      es: "API RESTful escalable con CRUD, filtrado y pipelines de agregación en MongoDB (Flask).",
      en: "Scalable RESTful API with CRUD, filtering, and MongoDB aggregation pipelines (Flask).",
    },
    tags: ["Python", "Flask", "MongoDB"],
    link: "https://github.com/Arango134204/MongoBites",
    category: "other",
  },
];
