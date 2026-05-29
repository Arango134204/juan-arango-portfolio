"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";

export default function IDCard() {
  // Referencia para la "caja invisible" que limita hasta dónde puedes arrastrar la tarjeta
  const constraintsRef = useRef<HTMLDivElement>(null);

  // --- 1. Valores para el efecto 3D al pasar el cursor (Tilt) ---
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const mouseXSpring = useSpring(tiltX, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(tiltY, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // --- 2. Valores para las físicas de arrastre (Drag & Péndulo) ---
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  
  // Transformamos el movimiento horizontal (X) en rotación (Z) para simular el balanceo de la cuerda
  const rotateZ = useTransform(dragX, [-200, 200], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Calculamos el efecto 3D solo relativo a la tarjeta
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    tiltX.set(mouseX / width - 0.5);
    tiltY.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    // Restauramos el tilt 3D al salir
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    // Esta es la caja delimitadora invisible. Le damos una altura generosa para poder arrastrar
    <div
      ref={constraintsRef}
      className="flex justify-center items-center w-full max-w-sm mx-auto h-150 relative"
      style={{ perspective: 1000 }}
    >
      <motion.div
        drag
        dragConstraints={constraintsRef} // Evita que se salga de la pantalla
        dragElastic={0.2} // Le da ese efecto de "goma" cuando choca contra el borde
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: dragX,
          y: dragY,
          rotateX,
          rotateY,
          rotateZ, // Aplicamos el balanceo
          transformStyle: "preserve-3d",
        }}
        className="relative w-72 h-96 bg-neutral-900 rounded-2xl border border-neutral-700/50 p-6 flex flex-col items-center shadow-2xl shadow-teal-500/10 cursor-grab active:cursor-grabbing z-20"
      >
        {/* LA CUERDA (Lanyard): Una tira larga que sube fuera de la pantalla */}
        <div 
          className="absolute bottom-full left-1/2 -ml-3 w-6 h-375 bg-linear-to-b from-[#0a0a0a] via-neutral-800 to-neutral-700/80 origin-bottom"
          style={{ transform: "translateZ(-10px)" }}
        />

        {/* Clip superior de plástico/metal */}
        <div 
          className="absolute -top-4 w-16 h-6 bg-neutral-800 rounded-t-lg border border-neutral-700/50 flex justify-center items-center z-10" 
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="w-8 h-1.5 bg-neutral-900 rounded-full"></div>
        </div>

        {/* Header de la tarjeta */}
        <div className="w-full flex justify-between items-start mb-4" style={{ transform: "translateZ(40px)" }}>
          <span className="text-xs font-mono text-neutral-500">ID: PEI-2026</span>
          <span className="text-xs font-bold text-teal-400 bg-teal-400/10 px-2 py-1 rounded pointer-events-none">DEV</span>
        </div>

        {/* Foto de perfil */}
        <div 
          className="w-28 h-28 bg-neutral-800 rounded-full border-2 border-teal-500/30 mt-4 mb-6 overflow-hidden flex items-center justify-center relative shadow-inner pointer-events-none"
          style={{ transform: "translateZ(50px)" }}
        >
          <Image 
            src="/profile.jpeg" 
            alt="Juan José Arango" 
            fill
            className="object-cover object-top scale-105" 
            priority
          />
        </div>

        {/* Información del usuario */}
        <div className="text-center w-full pointer-events-none" style={{ transform: "translateZ(40px)" }}>
          <h2 className="text-2xl font-bold text-white mb-0.5">Juan José</h2>
          <h3 className="text-lg font-bold text-neutral-300 mb-2">Arango</h3>
          <p className="text-teal-400 font-mono text-xs mb-4">Software Engineer</p>
        </div>

        {/* Código de barras decorativo */}
        <div className="mt-auto w-full flex justify-center gap-1 opacity-40 pointer-events-none" style={{ transform: "translateZ(20px)" }}>
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`h-6 bg-white ${i % 3 === 0 ? 'w-1' : i % 2 === 0 ? 'w-2' : 'w-0.5'}`}></div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}