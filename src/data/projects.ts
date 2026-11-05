export type ProjectCategory = "websites" | "saas" | "agency" | "other";

export type Localized = { es: string; en: string };

export type CaseStudy = {
  challenge: Localized;
  build: Localized;
  role: Localized;
};

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
  caseStudy?: CaseStudy;
  /** Screenshot of the live site, 1440×900, under /public/projects. */
  image?: string;
};

export const projects: Project[] = [
  // —— Recent client websites (Cluster / freelance delivery) ——
  {
    id: "solis-painting",
    title: "Solis Painting Services",
    image: "/projects/solis-painting.jpg",
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
    image: "/projects/vicas-investments.jpg",
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
    image: "/projects/art-constructions.jpg",
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
    image: "/projects/glass-mirror-tx.jpg",
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
    image: "/projects/listas.jpg",
    description: {
      es: "Plataforma inmobiliaria en producción (Pereira / Eje Cafetero): catálogo compra/arriendo, mapa Leaflet 300 m, panel admin, Cloudinary y WhatsApp.",
      en: "Live real-estate platform (Pereira / Coffee Region) — buy/rent catalog, Leaflet 300 m map, admin panel, Cloudinary, and WhatsApp.",
    },
    tags: ["Angular", "Node.js", "MySQL", "Cloudinary", "Leaflet"],
    link: "https://listasbienesraices.com/",
    category: "websites",
    featured: true,
    status: { es: "Cliente · En producción", en: "Client · Live" },
    caseStudy: {
      challenge: {
        es: "Una inmobiliaria del Eje Cafetero necesitaba publicar y administrar su catálogo de compra y arriendo sin depender de portales externos.",
        en: "A Coffee Region real-estate agency needed to publish and manage its buy/rent catalog without relying on third-party portals.",
      },
      build: {
        es: "Frontend en Angular con API en Node.js y MySQL, imágenes en Cloudinary, mapa Leaflet con radio de 300 m alrededor de cada inmueble, panel de administración y contacto directo por WhatsApp.",
        en: "Angular frontend with a Node.js + MySQL API, Cloudinary images, a Leaflet map with a 300 m radius around each property, an admin panel, and direct WhatsApp contact.",
      },
      role: {
        es: "Desarrollo full-stack y despliegue a producción.",
        en: "Full-stack development and production deployment.",
      },
    },
  },
  {
    id: "valux",
    title: "Valux.hn",
    image: "/projects/valux.jpg",
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
    image: "/projects/ga3.jpg",
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
    image: "/projects/rapido-furiosos.jpg",
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
    image: "/projects/cluster-media-web.jpg",
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
    image: "/projects/clusterag.jpg",
    description: {
      es: "SaaS interno de productividad y auditoría para producción audiovisual (Podcast Room / Production), integrado a la operación de Cluster Media.",
      en: "Internal productivity & audit SaaS for media production (Podcast Room / Production), wired into Cluster Media operations.",
    },
    tags: ["Next.js", "TypeScript", "Vercel", "Workflow"],
    link: "https://clusterag.vercel.app/",
    category: "saas",
    featured: true,
    status: { es: "Cluster Media SaaS", en: "Cluster Media SaaS" },
    caseStudy: {
      challenge: {
        es: "La producción audiovisual de Cluster Media (Podcast Room y Production) se coordinaba sin un registro auditable del trabajo.",
        en: "Cluster Media's audiovisual production (Podcast Room and Production) ran without an auditable record of the work.",
      },
      build: {
        es: "SaaS interno en Next.js y TypeScript con módulos por área de producción, desplegado en Vercel e integrado a la operación diaria de la agencia.",
        en: "Internal Next.js + TypeScript SaaS with modules per production area, deployed on Vercel and wired into the agency's daily operations.",
      },
      role: {
        es: "Arquitectura y desarrollo del producto.",
        en: "Product architecture and development.",
      },
    },
  },
  {
    id: "lead-forge",
    title: "Lead-Forge",
    image: "/projects/lead-forge.jpg",
    description: {
      es: "Prospección y outreach: webhooks CI/CD en Vercel, GoHighLevel y endurecimiento DNS (SPF, DKIM, DMARC) para email outreach.",
      en: "Prospecting & outreach — Vercel CI/CD webhooks, GoHighLevel, and DNS hardening (SPF, DKIM, DMARC) for email pipelines.",
    },
    tags: ["Next.js", "GoHighLevel", "CI/CD", "Email DNS"],
    link: "https://lead-forge-tau.vercel.app/",
    category: "saas",
    featured: true,
    status: { es: "Cluster Media SaaS", en: "Cluster Media SaaS" },
    caseStudy: {
      challenge: {
        es: "La agencia necesitaba prospectar y hacer outreach por email sin caer en spam ni depender de procesos manuales.",
        en: "The agency needed to prospect and run email outreach without landing in spam or relying on manual work.",
      },
      build: {
        es: "Plataforma en Next.js conectada a GoHighLevel, con webhooks de CI/CD en Vercel y dominios endurecidos con SPF, DKIM y DMARC.",
        en: "Next.js platform connected to GoHighLevel, with Vercel CI/CD webhooks and domains hardened with SPF, DKIM and DMARC.",
      },
      role: {
        es: "Desarrollo, automatizaciones e infraestructura de email.",
        en: "Development, automations, and email infrastructure.",
      },
    },
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
    caseStudy: {
      challenge: {
        es: "Los usuarios de Megabús (AMCO) no tienen información confiable en tiempo real sobre ocupación y llegadas.",
        en: "Megabús (AMCO) riders lack reliable real-time information about crowding and arrivals.",
      },
      build: {
        es: "App en Kotlin sobre Firebase donde los reportes de los usuarios se combinan con un algoritmo de consenso ponderado y se validan con geofencing por fórmula de Haversine.",
        en: "Kotlin app on Firebase where rider reports are combined through a weighted consensus algorithm and validated with Haversine geofencing.",
      },
      role: {
        es: "Arquitectura, UX/UI y desarrollo móvil.",
        en: "Architecture, UX/UI, and mobile development.",
      },
    },
  },
  {
    id: "sigba",
    title: "SIGBA",
    description: {
      es: "Sistema de gestión de beneficiarios para el Banco de Alimentos de Pereira y sus parroquias: sesión por parroquia, CRUD validado y panel de accesibilidad.",
      en: "Beneficiary management system for the Pereira Food Bank and its parishes: per-parish sessions, validated CRUD, and an accessibility panel.",
    },
    tags: ["Next.js", "shadcn/ui", "Accessibility"],
    link: "https://github.com/Arango134204/interfaz-crud-beneficiarios",
    category: "saas",
    status: { es: "Proyecto en desarrollo actual", en: "Current project in development" },
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
