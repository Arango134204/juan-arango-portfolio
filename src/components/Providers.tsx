"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { IntroProvider } from "@/components/Intro";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <IntroProvider>{children}</IntroProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
