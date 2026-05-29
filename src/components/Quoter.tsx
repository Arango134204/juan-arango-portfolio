"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Send, Plus, Minus, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);

  const generarWhatsApp = () => {
    const funcsSeleccionadas = funciones.map(id => FUNCIONES_EXTRA.find(f => f.id === id)?.title).join(", ") || t("Ninguna", "None");
    
    const mensajeEs = `Hola 👋 Quiero cotizar un sitio web.\n\n📌 Detalle:\n- Tipo: ${tipo.title}\n- Páginas: ${paginas}\n- Funcionalidades: ${funcsSeleccionadas}\n- Diseño: ${diseno.title}\n- Entrega: ${entrega.title}\n\n💰 Total estimado: ${formatCurrency(total)} COP`;
    
    const mensajeEn = `Hi 👋 I want to request a web quote.\n\n📌 Details:\n- Type: ${tipo.title}\n- Pages: ${paginas}\n- Features: ${funcsSeleccionadas}\n- Design: ${diseno.title}\n- Timeline: ${entrega.title}\n\n💰 Estimated total: ${formatCurrency(total)} COP`;
    
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
    <section id="quote" className="py-24 max-w-4xl mx-auto px-6 relative z-10 border-t border-white/5">
      
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {t("Inicia tu ", "Start a ")}<span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-600">{t("Proyecto", "Project")}</span>
        </h2>
        <p className="text-neutral-400 text-lg">{t("Cotiza tu próxima idea al instante con esta herramienta interactiva.", "Quote your next idea instantly with this interactive tool.")}</p>
      </div>

      <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="w-full bg-neutral-950 h-2 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="h-full bg-linear-to-r from-teal-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {step < 5 && (
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
            <span className="text-neutral-400">{t("Total estimado:", "Estimated total:")}</span>
            <span className="text-2xl md:text-3xl font-bold text-teal-400">{formatCurrency(total)}</span>
          </div>
        )}

        <div className="min-h-75 relative">
          <AnimatePresence mode="wait" custom={1}>
            
            {step === 0 && (
              <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-white font-semibold mb-6">{t("1. ¿Qué tipo de sitio web necesitas?", "1. What type of website do you need?")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TIPO_SITIO.map(item => (
                    <button key={item.id} onClick={() => setTipoId(item.id)} className={`p-4 rounded-xl border text-left transition-all ${tipoId === item.id ? 'bg-teal-500/10 border-teal-500' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white">{item.title}</h4>
                        {tipoId === item.id && <Check className="w-5 h-5 text-teal-400" />}
                      </div>
                      <p className="text-xs text-neutral-400 mb-4">{item.desc}</p>
                      <p className="text-teal-400 font-mono text-sm">{formatCurrency(item.price)}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-white font-semibold mb-2">{t("2. ¿Cuántas páginas en total?", "2. How many pages in total?")}</h3>
                <p className="text-neutral-500 mb-8 text-sm">{t(`El sitio base incluye 1 página. Cada adicional suma ${formatCurrency(PRECIO_PAGINA_EXTRA)}.`, `The base site includes 1 page. Each additional page adds ${formatCurrency(PRECIO_PAGINA_EXTRA)}.`)}</p>
                <div className="flex items-center justify-center gap-6 bg-neutral-950 p-8 rounded-2xl border border-neutral-800 w-max mx-auto">
                  <button onClick={() => setPaginas(Math.max(1, paginas - 1))} className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full transition-colors"><Minus className="w-6 h-6"/></button>
                  <span className="text-5xl font-bold text-white w-16 text-center">{paginas}</span>
                  <button onClick={() => setPaginas(paginas + 1)} className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full transition-colors"><Plus className="w-6 h-6"/></button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-white font-semibold mb-6">{t("3. Funcionalidades Extra (Opcional)", "3. Extra Features (Optional)")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {FUNCIONES_EXTRA.map(item => {
                    const isSelected = funciones.includes(item.id);
                    return (
                      <button key={item.id} onClick={() => toggleFuncion(item.id)} className={`p-4 rounded-xl border text-left transition-all ${isSelected ? 'bg-teal-500/10 border-teal-500' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white">{item.title}</h4>
                          {isSelected && <Check className="w-5 h-5 text-teal-400" />}
                        </div>
                        <p className="text-xs text-neutral-400 mb-4">{item.desc}</p>
                        <p className="text-teal-400 font-mono text-sm">+{formatCurrency(item.price)}</p>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-white font-semibold mb-6">{t("4. Tipo de Diseño", "4. Design Type")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TIPO_DISENO.map(item => (
                    <button key={item.id} onClick={() => setDisenoId(item.id)} className={`p-4 rounded-xl border text-left transition-all ${disenoId === item.id ? 'bg-teal-500/10 border-teal-500' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white">{item.title}</h4>
                        {disenoId === item.id && <Check className="w-5 h-5 text-teal-400" />}
                      </div>
                      <p className="text-xs text-neutral-400 mb-4">{item.desc}</p>
                      <p className="text-teal-400 font-mono text-sm">{item.price === 0 ? t("Incluido", "Included") : `+${formatCurrency(item.price)}`}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-white font-semibold mb-6">{t("5. Tiempo de Entrega", "5. Delivery Time")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TIEMPO_ENTREGA.map(item => (
                    <button key={item.id} onClick={() => setEntregaId(item.id)} className={`p-4 rounded-xl border text-left transition-all ${entregaId === item.id ? 'bg-teal-500/10 border-teal-500' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white">{item.title}</h4>
                        {entregaId === item.id && <Check className="w-5 h-5 text-teal-400" />}
                      </div>
                      <p className="text-xs text-neutral-400">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="text-center">
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 mb-8 text-left max-w-lg mx-auto">
                  <h3 className="text-2xl text-white font-bold mb-6 text-center">{t("Resumen de tu Cotización", "Quote Summary")}</h3>
                  <div className="space-y-3 text-neutral-300">
                    <p className="flex justify-between"><span>{t("Tipo:", "Type:")}</span> <span className="font-medium text-white">{tipo.title}</span></p>
                    <p className="flex justify-between"><span>{t("Páginas:", "Pages:")}</span> <span className="font-medium text-white">{paginas}</span></p>
                    <p className="flex justify-between"><span>{t("Extras:", "Extras:")}</span> <span className="font-medium text-white text-right">{funciones.length ? funciones.map(id => FUNCIONES_EXTRA.find(f => f.id === id)?.title).join(", ") : t("Ninguna", "None")}</span></p>
                    <p className="flex justify-between"><span>{t("Diseño:", "Design:")}</span> <span className="font-medium text-white">{diseno.title}</span></p>
                    <p className="flex justify-between"><span>{t("Entrega:", "Timeline:")}</span> <span className="font-medium text-white">{entrega.title}</span></p>
                  </div>
                  <div className="border-t border-neutral-800 mt-6 pt-6 flex justify-between items-center">
                    <span className="text-lg text-neutral-400">Total:</span>
                    <span className="text-3xl font-bold text-teal-400">{formatCurrency(total)}</span>
                  </div>
                </div>
                
                <a 
                  href={generarWhatsApp()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20b858] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#25D366]/20"
                >
                  {t("Enviar por WhatsApp", "Send via WhatsApp")} <Send className="w-5 h-5" />
                </a>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
          <button 
            onClick={prevStep} 
            disabled={step === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${step === 0 ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
          >
            <ArrowLeft className="w-4 h-4" /> {t("Anterior", "Back")}
          </button>
          
          {step < 5 && (
            <button 
              onClick={nextStep} 
              className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 rounded-xl font-bold transition-colors"
            >
              {t("Siguiente", "Next")} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
}