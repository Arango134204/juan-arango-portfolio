"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { JA_BUILD_ORDER, JA_CURSOR_ID, JA_STROKES, JA_VIEWBOX } from "@/lib/ja-logo";

const CYCLE = 6;
const EASE = [0.65, 0, 0.35, 1] as const;

export default function MarkLoop({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const play = inView && !reduced;

  return (
    <svg
      ref={ref}
      viewBox={JA_VIEWBOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={7}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="J·A morphing into a [>_] terminal prompt"
      className={className}
    >
      {JA_STROKES.map((stroke) => {
        const offset = JA_BUILD_ORDER.indexOf(stroke.id) * 0.02;
        return (
          <motion.path
            key={stroke.id}
            className={stroke.id === JA_CURSOR_ID ? "text-signal" : undefined}
            initial={{ d: reduced ? stroke.mark : stroke.letter }}
            animate={play ? { d: [stroke.letter, stroke.letter, stroke.mark, stroke.mark, stroke.letter] } : undefined}
            transition={{
              duration: CYCLE,
              times: [0, 0.18 + offset, 0.36 + offset, 0.8, 0.96],
              ease: EASE,
              repeat: Infinity,
            }}
          />
        );
      })}
    </svg>
  );
}
