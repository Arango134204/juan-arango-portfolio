"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { JA_BUILD_ORDER, JA_CURSOR_ID, JA_STROKES, JA_VIEWBOX } from "@/lib/ja-logo";

export const INTRO_STORAGE_KEY = "arango:intro-seen";

// Runs before paint so a returning visitor never sees the overlay flash. Add ?intro to the URL to replay it.
export const INTRO_SCRIPT = `(function(){try{if(sessionStorage.getItem(${JSON.stringify(
  INTRO_STORAGE_KEY,
)})&&!/[?&]intro/.test(location.search))document.documentElement.classList.add('intro-seen')}catch(e){}})()`;

const EASE = [0.65, 0, 0.35, 1] as const;
const DRAW_STAGGER = 0.16;
const MORPH_AT = 1.25;
const MORPH_STAGGER = 0.12;
const MORPH_DURATION = 0.85;
const BUILT_AT = MORPH_AT + (JA_BUILD_ORDER.length - 1) * MORPH_STAGGER + MORPH_DURATION;
const FULL_DURATION_MS = 4300;
const REDUCED_DURATION_MS = 1200;

type Mode = "pending" | "full" | "reduced" | "done";

const IntroContext = createContext(false);

export const useIntroDone = () => useContext(IntroContext);

// The starting mode is read once per page load; it must stay stable across renders.
let startMode: Mode | null = null;
const getStartMode = (): Mode => {
  if (startMode) return startMode;
  if (document.documentElement.classList.contains("intro-seen")) startMode = "done";
  else startMode = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduced" : "full";
  return startMode;
};
const subscribe = () => () => {};

export function IntroProvider({ children }: { children: ReactNode }) {
  const initialMode = useSyncExternalStore(subscribe, getStartMode, () => "pending" as Mode);
  const [finished, setFinished] = useState(false);
  const mode: Mode = finished ? "done" : initialMode;

  useEffect(() => {
    if (initialMode === "pending" || initialMode === "done") return;
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {}

    const finish = () => setFinished(true);
    const timer = window.setTimeout(finish, initialMode === "reduced" ? REDUCED_DURATION_MS : FULL_DURATION_MS);
    window.addEventListener("keydown", finish);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", finish);
    };
  }, [initialMode]);

  const reduced = mode === "reduced";

  return (
    <IntroContext.Provider value={mode === "done"}>
      {children}
      <AnimatePresence>
        {mode !== "done" && (
          <motion.div
            data-intro
            aria-hidden
            onClick={() => setFinished(true)}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            initial={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-100 flex cursor-pointer flex-col items-center justify-center gap-8 bg-ink px-6 text-bone"
          >
            {mode !== "pending" && (
              <>
                <svg
                  viewBox={JA_VIEWBOX}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[min(78vw,26rem)]"
                >
                  {JA_STROKES.map((stroke, index) => {
                    const isCursor = stroke.id === JA_CURSOR_ID;
                    return (
                      <motion.path
                        key={stroke.id}
                        className={isCursor ? "text-signal" : undefined}
                        initial={reduced ? false : { d: stroke.letter, pathLength: 0 }}
                        animate={{
                          d: stroke.mark,
                          pathLength: 1,
                          opacity: isCursor && !reduced ? [1, 1, 0, 1, 0, 1] : 1,
                        }}
                        transition={{
                          pathLength: { duration: 0.75, delay: index * DRAW_STAGGER, ease: "easeInOut" },
                          d: {
                            duration: MORPH_DURATION,
                            delay: MORPH_AT + JA_BUILD_ORDER.indexOf(stroke.id) * MORPH_STAGGER,
                            ease: EASE,
                          },
                          opacity: { duration: 1.6, delay: BUILT_AT, times: [0, 0.2, 0.35, 0.55, 0.7, 0.9] },
                        }}
                      />
                    );
                  })}
                </svg>
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: BUILT_AT - 0.2, ease: EASE }}
                  className="text-center"
                >
                  <p className="font-display text-4xl md:text-5xl">Juan José Arango</p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-muted">
                    software engineer · creative developer
                  </p>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
