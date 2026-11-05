# Juan José Arango | Creative Software Engineer Portfolio
 
Welcome to the repository of my professional portfolio. It is built with **Next.js 16**, **Tailwind CSS 4** and **Motion**, with an editorial design and SVG motion work, and showcases full-stack web development, SaaS platforms, e-commerce, IoT systems and software auditing.
 
🌐 **Live:** [juan-arango-portfolio.vercel.app](https://juan-arango-portfolio.vercel.app/)
 
---
 
## ✨ Key Features
 
- **J·A intro animation:** the initials draw themselves and morph into the `[>_]` mark. Every letter is a cubic-curve SVG path that shares its structure with a logo piece. It plays once per session, can be skipped and respects `prefers-reduced-motion` (append `?intro` to replay it).
- **Selected work with case studies:** an editorial project list with a cursor-following screenshot preview; each row morphs into a case study (Motion Primitives `MorphingDialog`).
- **Bilingual EN/ES:** a `LanguageContext` that remembers the choice and defaults to the browser language on the first visit.
- **Project quoter:** a multi-step estimator with COP/USD pricing and a pre-filled WhatsApp message.
- **Contact form:** sends email through the Resend API from `/api/contact`, with validation and a honeypot field.
- **Interactive ID card:** 3D tilt, spring physics and drag gestures.
- **Monitoring:** Vercel Web Analytics (with custom events) and Speed Insights.
 
---
 
## 🛠 Technical Stack
 
### Frontend & UI
- Next.js (App Router) & React 19
- TypeScript
- Tailwind CSS 4
- Motion & Motion Primitives
- Instrument Serif, Instrument Sans & JetBrains Mono
- Lucide React & React Icons
### Backend, E-Commerce & CMS
- Node.js & Express
- Python (Flask)
- PHP & Laravel
- Shopify (Storefront & E-commerce Architecture)
- WordPress, Elementor & Webflow
- Prisma ORM & XAMPP
### Cloud, DevOps & Infrastructure
- Vercel & Vercel Speed Insights (CI/CD)
- Hostinger (DNS, Web Hosting & Email Security)
- GoHighLevel (Automations & Outreach Pipelines)
- Email Security (SPF, DKIM, DMARC Protocols)
- Firebase & Google Cloud Platform
- MongoDB & PostgreSQL
- Docker
### Hardware & Mobile
- Android Studio (Kotlin) & Jetpack Compose
- Xcode
- C++, Arduino, ESP32 (Telemetry & IoT Integrations)
---
 
## 🏗 Featured Projects
 
- **CLUSTERAG:** Internal SaaS workflow platform for media production audit (Podcast & Production modules) engineered for Cluster Media.
- **Lead-Forge:** Client prospecting & automation platform featuring Vercel CI/CD webhooks, GoHighLevel outreach, and DNS security hardening.
- **Valux.hn:** High-performance, conversion-oriented web platform built within the Cluster Media client ecosystem.
- **MegaFlujo AI:** Real-time crowdsourcing platform for urban transit optimization using weighted consensus algorithms and Firebase.
- **BarberSaaS:** Multi-tenant platform built with Angular, Node.js, and Prisma for comprehensive barbershop administration.
- **IoT Biomedical Simulator:** 3D printed brain model integrating photoresistors, telemetry, and ESP32 boards to emulate precise surgical navigation.
- **GA3 Energy Sostenible & Logistics E-Commerce:** High-conversion platforms utilizing modern e-commerce and CMS solutions (Shopify / WordPress / Hostinger).
- **ISO/IEC 12207:2017 Audit:** Software audit management and deep architecture resolution in task modules for Crater Invoice.
- **MongoBites:** Scalable RESTful API and CRUD management system built with Python and Flask.
---
 
## 🚀 Getting Started (Local Development)
 
1. **Clone the repository:**
```bash
git clone https://github.com/Arango134204/juan-arango-portfolio.git
cd juan-arango-portfolio
```
 
2. **Install dependencies:**
```bash
npm install
# or yarn install / pnpm install
```
 
3. **Run the development server:**
```bash
npm run dev
# or yarn dev / pnpm dev
```
 
4. **Open the application:** Navigate to `http://localhost:3000` in your browser. The application will auto-update as you edit the files.
---
 
## 🌍 Deployment
 
This application is continuously deployed on the Vercel platform. Every push to the `main` branch triggers an automated build and deployment process, ensuring the production environment is always up to date.
 
### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for the contact form | Resend API key used by `/api/contact`. Without it the form shows an error and points visitors to WhatsApp/email. |
| `CONTACT_TO_EMAIL` | No | Inbox that receives messages (defaults to `arangojuanjoseweb@gmail.com`). |
| `CONTACT_FROM_EMAIL` | No | Sender address on a domain verified in Resend (defaults to `onboarding@resend.dev`, which can only deliver to the Resend account owner). |

Web Analytics must be enabled in the Vercel project (Analytics tab) for page views and custom events to be collected.

For more details, check out the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment).
 
---
 
## 📫 Let's Connect
 
I am always open to discussing new projects, freelance opportunities, and software architecture challenges.
 
- 💼 **LinkedIn:** [Juan José Arango](https://linkedin.com/in/juan-jose-arango)
- 🐙 **GitHub:** [@Arango134204](https://github.com/Arango134204)
- 📧 **Email:** arangojuanjoseweb@gmail.com
- 💬 **WhatsApp:** +57 300 603 0655
 
