"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { SIGBA_BUILD_ORDER, SIGBA_CROSSBAR, SIGBA_STROKES, SIGBA_VIEWBOX } from "@/lib/sigba-logo";

const CYCLE = 7;
const EASE = [0.65, 0, 0.35, 1] as const;

export default function SigbaLoop({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const play = inView && !reduced;

  return (
    <svg
      ref={ref}
      viewBox={SIGBA_VIEWBOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="SIGBA: letters morphing into a church"
      className={className}
    >
      {SIGBA_STROKES.map((stroke) => {
        const offset = SIGBA_BUILD_ORDER.indexOf(stroke.id) * 0.012;
        return (
          <motion.path
            key={stroke.id}
            initial={{ d: reduced ? stroke.church : stroke.letter }}
            animate={play ? { d: [stroke.letter, stroke.letter, stroke.church, stroke.church, stroke.letter] } : undefined}
            transition={{
              duration: CYCLE,
              times: [0, 0.18 + offset, 0.34 + offset, 0.8, 0.96],
              ease: EASE,
              repeat: Infinity,
            }}
          />
        );
      })}
      <motion.path
        d={SIGBA_CROSSBAR}
        className="text-signal"
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={play ? { opacity: [0, 0, 1, 1, 0] } : undefined}
        transition={{ duration: CYCLE, times: [0, 0.46, 0.5, 0.78, 0.8], repeat: Infinity }}
      />
    </svg>
  );
}
