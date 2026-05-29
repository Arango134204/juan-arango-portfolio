"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Send, Plus, Minus, Check } from "lucide-react";

// --- Datos del Cotizador ---
const TIPO_SITIO = [
  { id: "landing", title: "Landing Page", desc: "1 página enfocada en ventas o campañas", price: 450000 },
  { id: "corp", title: "Sitio Corporativo", desc: "Hasta 5 secciones informativas", price: 800000 },
  { id: "store", title: "Tienda Online", desc: "Carrito, productos y pagos", price: 1500000 },
];

const FUNCIONES_EXTRA = [
  { id: "form", title: "Formulario", desc: "Contacto directo desde la web", price: 80000 },
  { id: "wpp", title: "WhatsApp", desc: "Chat directo con clientes", price: 50000 },
  { id: "seo", title: "SEO Básico", desc: "Optimización para Google", price: 150000 },
];

const TIPO_DISENO = [
  { id: "base", title: "Plantilla Base", desc: "Diseño profesional predefinido", price: 0 },
  { id: "custom", title: "Diseño Personalizado", desc: "Diseño único y exclusivo UI/UX", price: 300000 },
];

const TIEMPO_ENTREGA = [
  { id: "urgente", title: "Urgente (1 sem)", desc: "Prioridad máxima (+20%)", multiplier: 1.2 },
  { id: "normal", title: "Base (2 sem)", desc: "Precio estándar", multiplier: 1 },
  { id: "extendido", title: "Extendida (4 sem)", desc: "Mejor precio (-10%)", multiplier: 0.9 },
];

export default function Quoter() {
  // --- Estados ---
  const [step, setStep] = useState(0);
  const [tipo, setTipo] = useState(TIPO_SITIO[0]);
  const [paginas, setPaginas] = useState(1);
  const [funciones, setFunciones] = useState<string[]>([]);
  const [diseno, setDiseno] = useState(TIPO_DISENO[0]);
  const [entrega, setEntrega] = useState(TIEMPO_ENTREGA[1]);

  // --- Lógica de Cálculo ---
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

  // --- Lógica de WhatsApp ---
  const generarWhatsApp = () => {
    const funcsSeleccionadas = funciones.map(id => FUNCIONES_EXTRA.find(f => f.id === id)?.title).join(", ") || "Ninguna";
    const mensaje = `Hola 👋 Quiero cotizar un sitio web.\n\n📌 Detalle:\n- Tipo: ${tipo.title}\n- Páginas: ${paginas}\n- Funcionalidades: ${funcsSeleccionadas}\n- Diseño: ${diseno.title}\n- Entrega: ${entrega.title}\n\n💰 Total estimado: ${formatCurrency(total)} COP`;
    return `https://wa.me/573114005275?text=${encodeURIComponent(mensaje)}`;
  };

  // --- Navegación ---
  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const toggleFuncion = (id: string) => {
    setFunciones(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  // --- Variantes de Animación ---
  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  return (
    <section id="quote" className="py-24 max-w-4xl mx-auto px-6 relative z-10 border-t border-white/5">
      
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Inicia tu <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-600">Proyecto</span>
        </h2>
        <p className="text-neutral-400 text-lg">Cotiza tu próxima idea al instante con esta herramienta interactiva.</p>
      </div>

      <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Progress Bar */}
        <div className="w-full bg-neutral-950 h-2 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="h-full bg-linear-to-r from-teal-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Total Header (Visible except on summary) */}
        {step < 5 && (
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
            <span className="text-neutral-400">Total estimado:</span>
            <span className="text-2xl md:text-3xl font-bold text-teal-400">{formatCurrency(total)}</span>
          </div>
        )}

        {/* Contenedor de Pasos con Animación */}
        <div className="min-h-75 relative">
          <AnimatePresence mode="wait" custom={1}>
            
            {/* PASO 0: TIPO DE SITIO */}
            {step === 0 && (
              <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-white font-semibold mb-6">1. ¿Qué tipo de sitio web necesitas?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TIPO_SITIO.map(item => (
                    <button key={item.id} onClick={() => setTipo(item)} className={`p-4 rounded-xl border text-left transition-all ${tipo.id === item.id ? 'bg-teal-500/10 border-teal-500' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white">{item.title}</h4>
                        {tipo.id === item.id && <Check className="w-5 h-5 text-teal-400" />}
                      </div>
                      <p className="text-xs text-neutral-400 mb-4">{item.desc}</p>
                      <p className="text-teal-400 font-mono text-sm">{formatCurrency(item.price)}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PASO 1: PÁGINAS ADICIONALES */}
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-white font-semibold mb-2">2. ¿Cuántas páginas en total?</h3>
                <p className="text-neutral-500 mb-8 text-sm">El sitio base incluye 1 página. Cada adicional suma {formatCurrency(PRECIO_PAGINA_EXTRA)}.</p>
                <div className="flex items-center justify-center gap-6 bg-neutral-950 p-8 rounded-2xl border border-neutral-800 w-max mx-auto">
                  <button onClick={() => setPaginas(Math.max(1, paginas - 1))} className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full transition-colors"><Minus className="w-6 h-6"/></button>
                  <span className="text-5xl font-bold text-white w-16 text-center">{paginas}</span>
                  <button onClick={() => setPaginas(paginas + 1)} className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full transition-colors"><Plus className="w-6 h-6"/></button>
                </div>
              </motion.div>
            )}

            {/* PASO 2: FUNCIONES EXTRA */}
            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-white font-semibold mb-6">3. Funcionalidades Extra (Opcional)</h3>
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

            {/* PASO 3: TIPO DE DISEÑO */}
            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-white font-semibold mb-6">4. Tipo de Diseño</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TIPO_DISENO.map(item => (
                    <button key={item.id} onClick={() => setDiseno(item)} className={`p-4 rounded-xl border text-left transition-all ${diseno.id === item.id ? 'bg-teal-500/10 border-teal-500' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white">{item.title}</h4>
                        {diseno.id === item.id && <Check className="w-5 h-5 text-teal-400" />}
                      </div>
                      <p className="text-xs text-neutral-400 mb-4">{item.desc}</p>
                      <p className="text-teal-400 font-mono text-sm">{item.price === 0 ? "Incluido" : `+${formatCurrency(item.price)}`}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PASO 4: TIEMPO DE ENTREGA */}
            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <h3 className="text-xl text-white font-semibold mb-6">5. Tiempo de Entrega</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TIEMPO_ENTREGA.map(item => (
                    <button key={item.id} onClick={() => setEntrega(item)} className={`p-4 rounded-xl border text-left transition-all ${entrega.id === item.id ? 'bg-teal-500/10 border-teal-500' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white">{item.title}</h4>
                        {entrega.id === item.id && <Check className="w-5 h-5 text-teal-400" />}
                      </div>
                      <p className="text-xs text-neutral-400">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PASO 5: RESUMEN FINAL */}
            {step === 5 && (
              <motion.div key="step5" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="text-center">
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 mb-8 text-left max-w-lg mx-auto">
                  <h3 className="text-2xl text-white font-bold mb-6 text-center">Resumen de tu Cotización</h3>
                  <div className="space-y-3 text-neutral-300">
                    <p className="flex justify-between"><span>Tipo:</span> <span className="font-medium text-white">{tipo.title}</span></p>
                    <p className="flex justify-between"><span>Páginas:</span> <span className="font-medium text-white">{paginas}</span></p>
                    <p className="flex justify-between"><span>Extras:</span> <span className="font-medium text-white text-right">{funciones.length ? funciones.map(id => FUNCIONES_EXTRA.find(f => f.id === id)?.title).join(", ") : "Ninguna"}</span></p>
                    <p className="flex justify-between"><span>Diseño:</span> <span className="font-medium text-white">{diseno.title}</span></p>
                    <p className="flex justify-between"><span>Entrega:</span> <span className="font-medium text-white">{entrega.title}</span></p>
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
                  Enviar por WhatsApp <Send className="w-5 h-5" />
                </a>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Navegación Inferior */}
        <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
          <button 
            onClick={prevStep} 
            disabled={step === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${step === 0 ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Anterior
          </button>
          
          {step < 5 && (
            <button 
              onClick={nextStep} 
              className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 rounded-xl font-bold transition-colors"
            >
              Siguiente <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
}