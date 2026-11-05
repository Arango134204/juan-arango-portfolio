"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Send, Plus, Minus, Check } from "lucide-react";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/context/LanguageContext";

type Currency = "COP" | "USD";

// Prices are defined in COP; USD totals use this fixed rate and round up to the nearest $5.
const COP_PER_USD = 4000;

export default function Quoter() {
  const { t, lang } = useLanguage();

  const TIPO_SITIO = [
    { id: "landing", title: "Landing Page", desc: t("1 página enfocada en ventas o campañas", "1 page focused on sales or campaigns"), price: 450000 },
    { id: "corp", title: t("Sitio Corporativo", "Corporate Site"), desc: t("Hasta 5 secciones informativas", "Up to 5 informative sections"), price: 800000 },
    { id: "store", title: t("Tienda Online", "Online Store"), desc: t("Carrito, productos y pagos", "Cart, products, and payments"), price: 1500000 },
  ];

  const FUNCIONES_EXTRA = [
    { id: "form", title: t("Formulario", "Contact Form"), desc: t("Contacto directo desde la web", "Direct contact from the web"), price: 80000 },
    { id: "wpp", title: "WhatsApp", desc: t("Chat directo con clientes", "Direct chat with clients"), price: 50000 },
    { id: "seo", title: t("SEO Básico", "Basic SEO"), desc: t("Optimización para Google", "Google search optimization"), price: 150000 },
  ];

  const TIPO_DISENO = [
    { id: "base", title: t("Plantilla Base", "Base Template"), desc: t("Diseño profesional predefinido", "Professional predefined design"), price: 0 },
    { id: "custom", title: t("Diseño Personalizado", "Custom Design"), desc: t("Diseño único y exclusivo UI/UX", "Unique and exclusive UI/UX"), price: 300000 },
  ];

  const TIEMPO_ENTREGA = [
    { id: "urgente", title: t("Urgente (1 sem)", "Urgent (1 week)"), desc: t("Prioridad máxima (+20%)", "Max priority (+20%)"), multiplier: 1.2 },
    { id: "normal", title: t("Base (2 sem)", "Standard (2 weeks)"), desc: t("Precio estándar", "Standard price"), multiplier: 1 },
    { id: "extendido", title: t("Extendida (4 sem)", "Extended (4 weeks)"), desc: t("Mejor precio (-10%)", "Best price (-10%)"), multiplier: 0.9 },
  ];

  const [step, setStep] = useState(0);
  const [tipoId, setTipoId] = useState("landing");
  const [paginas, setPaginas] = useState(1);
  const [funciones, setFunciones] = useState<string[]>([]);
  const [disenoId, setDisenoId] = useState("base");
  const [entregaId, setEntregaId] = useState("normal");
  const [currencyChoice, setCurrencyChoice] = useState<Currency | null>(null);

  const tipo = TIPO_SITIO.find(t => t.id === tipoId)!;
  const diseno = TIPO_DISENO.find(d => d.id === disenoId)!;
  const entrega = TIEMPO_ENTREGA.find(e => e.id === entregaId)!;

  const PRECIO_PAGINA_EXTRA = 120000;
  
  const calcularSubtotal = () => {
    const costoPaginasExtras = (paginas - 1) * PRECIO_PAGINA_EXTRA;
    const costoFunciones = funciones.reduce((total, funcId) => {
      const func = FUNCIONES_EXTRA.find(f => f.id === funcId);
      return total + (func ? func.price : 0);
    }, 0);
    
    const base = tipo.price + costoPaginasExtras + costoFunciones + diseno.price;
    return base * entrega.multiplier;
  };

  const total = calcularSubtotal();
  const currency: Currency = currencyChoice ?? (lang === "ES" ? "COP" : "USD");
  const formatCurrency = (amountCop: number) =>
    currency === "COP"
      ? `${new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(amountCop)} COP`
      : `${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.ceil(amountCop / COP_PER_USD / 5) * 5)} USD`;

  const generarWhatsApp = () => {
    const funcsSeleccionadas = funciones.map(id => FUNCIONES_EXTRA.find(f => f.id === id)?.title).join(", ") || t("Ninguna", "None");
    
    const mensajeEs = `Hola 👋 Quiero cotizar un sitio web.\n\n📌 Detalle:\n- Tipo: ${tipo.title}\n- Páginas: ${paginas}\n- Funcionalidades: ${funcsSeleccionadas}\n- Diseño: ${diseno.title}\n- Entrega: ${entrega.title}\n\n💰 Total estimado: ${formatCurrency(total)}`;
    
    const mensajeEn = `Hi 👋 I want to request a web quote.\n\n📌 Details:\n- Type: ${tipo.title}\n- Pages: ${paginas}\n- Features: ${funcsSeleccionadas}\n- Design: ${diseno.title}\n- Timeline: ${entrega.title}\n\n💰 Estimated total: ${formatCurrency(total)}`;
    
    return `https://wa.me/573006030655?text=${encodeURIComponent(lang === 'ES' ? mensajeEs : mensajeEn)}`;
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const toggleFuncion = (id: string) => {
    setFunciones(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  return (
    <section id="quote" className="py-24 md:py-32 max-w-4xl mx-auto px-6 relative z-10">
      
      <div className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal mb-6">04 — {t("Cotizar", "Quote")}</p>
        <h2 className="font-display text-5xl md:text-6xl leading-[1.02] mb-4">
          {t("Inicia tu ", "Start a ")}<em className="text-muted">{t("proyecto.", "project.")}</em>
        </h2>
        <p className="text-muted text-lg">{t("Cotiza tu próxima idea al instante con esta herramienta interactiva.", "Quote your next idea instantly with this interactive tool.")}</p>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl p-6 md:p-10 relative overflow-hidden">
        <div className="w-full bg-ink h-1 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="h-full bg-signal"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {step < 5 && (
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8 pb-6 border-b border-line">
            <div className="flex items-center gap-4">
              <span className="text-muted">{t("Total estimado:", "Estimated total:")}</span>
              <div role="group" aria-label={t("Moneda", "Currency")} className="flex rounded-full border border-line p-0.5 font-mono text-xs">
                {(["COP", "USD"] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrencyChoice(code)}
                    aria-pressed={currency === code}
                    className={`cursor-pointer rounded-full px-3 py-1 transition-colors ${currency === code ? "bg-bone text-ink" : "text-muted hover:text-bone"}`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-2xl md:text-3xl font-semibold text-signal">{formatCurrency(total)}</span>
          </div>
        )}

        <div className="min-h-75 relative">
          <AnimatePresence mode="wait" custom={1}>
            
            {step === 0 && (
              <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-bone font-semibold mb-6">{t("1. ¿Qué tipo de sitio web necesitas?", "1. What type of website do you need?")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TIPO_SITIO.map(item => (
                    <button key={item.id} onClick={() => setTipoId(item.id)} className={`p-4 rounded-lg border text-left transition-all ${tipoId === item.id ? 'bg-signal/10 border-signal' : 'bg-ink border-line hover:border-muted'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-bone">{item.title}</h4>
                        {tipoId === item.id && <Check className="w-5 h-5 text-signal" />}
                      </div>
                      <p className="text-xs text-muted mb-4">{item.desc}</p>
                      <p className="text-signal font-mono text-sm">{formatCurrency(item.price)}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-bone font-semibold mb-2">{t("2. ¿Cuántas páginas en total?", "2. How many pages in total?")}</h3>
                <p className="text-muted mb-8 text-sm">{t(`El sitio base incluye 1 página. Cada adicional suma ${formatCurrency(PRECIO_PAGINA_EXTRA)}.`, `The base site includes 1 page. Each additional page adds ${formatCurrency(PRECIO_PAGINA_EXTRA)}.`)}</p>
                <div className="flex items-center justify-center gap-6 bg-ink p-8 rounded-2xl border border-line w-max mx-auto">
                  <button onClick={() => setPaginas(Math.max(1, paginas - 1))} className="p-3 bg-ink-3 hover:bg-ink-2 text-bone rounded-full transition-colors"><Minus className="w-6 h-6"/></button>
                  <span className="text-5xl font-semibold text-bone w-16 text-center">{paginas}</span>
                  <button onClick={() => setPaginas(paginas + 1)} className="p-3 bg-ink-3 hover:bg-ink-2 text-bone rounded-full transition-colors"><Plus className="w-6 h-6"/></button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-bone font-semibold mb-6">{t("3. Funcionalidades Extra (Opcional)", "3. Extra Features (Optional)")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {FUNCIONES_EXTRA.map(item => {
                    const isSelected = funciones.includes(item.id);
                    return (
                      <button key={item.id} onClick={() => toggleFuncion(item.id)} className={`p-4 rounded-lg border text-left transition-all ${isSelected ? 'bg-signal/10 border-signal' : 'bg-ink border-line hover:border-muted'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-bone">{item.title}</h4>
                          {isSelected && <Check className="w-5 h-5 text-signal" />}
                        </div>
                        <p className="text-xs text-muted mb-4">{item.desc}</p>
                        <p className="text-signal font-mono text-sm">+{formatCurrency(item.price)}</p>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-bone font-semibold mb-6">{t("4. Tipo de Diseño", "4. Design Type")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TIPO_DISENO.map(item => (
                    <button key={item.id} onClick={() => setDisenoId(item.id)} className={`p-4 rounded-lg border text-left transition-all ${disenoId === item.id ? 'bg-signal/10 border-signal' : 'bg-ink border-line hover:border-muted'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-bone">{item.title}</h4>
                        {disenoId === item.id && <Check className="w-5 h-5 text-signal" />}
                      </div>
                      <p className="text-xs text-muted mb-4">{item.desc}</p>
                      <p className="text-signal font-mono text-sm">{item.price === 0 ? t("Incluido", "Included") : `+${formatCurrency(item.price)}`}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-bone font-semibold mb-6">{t("5. Tiempo de Entrega", "5. Delivery Time")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TIEMPO_ENTREGA.map(item => (
                    <button key={item.id} onClick={() => setEntregaId(item.id)} className={`p-4 rounded-lg border text-left transition-all ${entregaId === item.id ? 'bg-signal/10 border-signal' : 'bg-ink border-line hover:border-muted'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-bone">{item.title}</h4>
                        {entregaId === item.id && <Check className="w-5 h-5 text-signal" />}
                      </div>
                      <p className="text-xs text-muted">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="text-center">
                <div className="bg-ink border border-line rounded-2xl p-8 mb-8 text-left max-w-lg mx-auto">
                  <h3 className="text-2xl text-bone font-semibold mb-6 text-center">{t("Resumen de tu Cotización", "Quote Summary")}</h3>
                  <div className="space-y-3 text-bone/80">
                    <p className="flex justify-between"><span>{t("Tipo:", "Type:")}</span> <span className="font-medium text-bone">{tipo.title}</span></p>
                    <p className="flex justify-between"><span>{t("Páginas:", "Pages:")}</span> <span className="font-medium text-bone">{paginas}</span></p>
                    <p className="flex justify-between"><span>{t("Extras:", "Extras:")}</span> <span className="font-medium text-bone text-right">{funciones.length ? funciones.map(id => FUNCIONES_EXTRA.find(f => f.id === id)?.title).join(", ") : t("Ninguna", "None")}</span></p>
                    <p className="flex justify-between"><span>{t("Diseño:", "Design:")}</span> <span className="font-medium text-bone">{diseno.title}</span></p>
                    <p className="flex justify-between"><span>{t("Entrega:", "Timeline:")}</span> <span className="font-medium text-bone">{entrega.title}</span></p>
                  </div>
                  <div className="border-t border-line mt-6 pt-6 flex justify-between items-center">
                    <span className="text-lg text-muted">Total:</span>
                    <span className="text-3xl font-semibold text-signal">{formatCurrency(total)}</span>
                  </div>
                </div>
                
                <a 
                  href={generarWhatsApp()}
                  onClick={() => track("Quote Sent", { type: tipo.id, currency })}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-signal hover:bg-bone text-ink font-semibold rounded-full transition-colors"
                >
                  {t("Enviar por WhatsApp", "Send via WhatsApp")} <Send className="w-5 h-5" />
                </a>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-line">
          <button 
            onClick={prevStep} 
            disabled={step === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${step === 0 ? 'text-muted/40 cursor-not-allowed' : 'text-muted hover:text-bone hover:bg-ink-3'}`}
          >
            <ArrowLeft className="w-4 h-4" /> {t("Anterior", "Back")}
          </button>
          
          {step < 5 && (
            <button 
              onClick={nextStep} 
              className="flex items-center gap-2 px-6 py-3 bg-bone text-ink hover:bg-signal rounded-lg font-semibold transition-colors"
            >
              {t("Siguiente", "Next")} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
}