"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function IDCard() {
  const { t } = useLanguage();
  const constraintsRef = useRef<HTMLDivElement>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const mouseXSpring = useSpring(tiltX, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(tiltY, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const dragX = useMotionValue(0);
  const rotateZ = useTransform(dragX, [-200, 200], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    tiltX.set(mouseX / width - 0.5);
    tiltY.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div
      ref={constraintsRef}
      className="flex justify-center items-center w-full max-w-sm mx-auto h-150 relative z-20"
      style={{ perspective: 1000 }}
    >
      <motion.div
        initial={{ y: -800, rotateZ: 10 }} 
        animate={{ y: 0, rotateZ: 0 }}     
        transition={{ type: "spring", stiffness: 50, damping: 12, mass: 1.5 }}
        drag
        dragConstraints={constraintsRef} 
        dragElastic={0.2} 
        dragSnapToOrigin={true}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: dragX, rotateX, rotateY, rotateZ, transformStyle: "preserve-3d" }}
        className="relative w-72 h-96 bg-ink-2 rounded-2xl border border-line p-6 flex flex-col items-center shadow-2xl shadow-black/60 cursor-grab active:cursor-grabbing origin-top"
      >
        <div 
          className="absolute bottom-full left-1/2 -ml-3 hidden w-6 h-375 bg-linear-to-b from-ink via-ink-3 to-signal/40 origin-bottom pointer-events-none lg:block"
          style={{ transform: "translateZ(-10px)" }}
        />
        <div 
          className="absolute -top-4 w-16 h-6 bg-ink-3 rounded-t-lg border border-line flex justify-center items-center z-10 pointer-events-none" 
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="w-8 h-1.5 bg-ink rounded-full"></div>
        </div>

        <div className="w-full flex justify-between items-start mb-4 pointer-events-none" style={{ transform: "translateZ(40px)" }}>
          <span className="text-xs font-mono text-muted">ID: PEI-2026</span>
          <span className="text-xs font-mono text-ink bg-signal px-2 py-1 rounded">DEV</span>
        </div>

        <div 
          className="w-28 h-28 bg-ink-3 rounded-full border-2 border-signal/40 mt-4 mb-6 overflow-hidden flex items-center justify-center relative shadow-inner pointer-events-none"
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

        <div className="text-center w-full pointer-events-none" style={{ transform: "translateZ(40px)" }}>
          <h2 className="font-display text-3xl text-bone leading-none mb-1">Juan José</h2>
          <h3 className="font-display italic text-2xl text-muted mb-3">Arango</h3>
          <p className="text-signal font-mono text-xs uppercase tracking-widest mb-4">{t("Ingeniero de Software", "Software Engineer")}</p>
        </div>

        <div className="mt-auto w-full flex justify-center gap-1 opacity-40 pointer-events-none" style={{ transform: "translateZ(20px)" }}>
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`h-6 bg-bone ${i % 3 === 0 ? 'w-1' : i % 2 === 0 ? 'w-2' : 'w-0.5'}`}></div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
