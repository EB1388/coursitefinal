"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { themeFromPath, themes } from "@/lib/themes";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const theme = themes[themeFromPath(pathname)];
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r ${theme.progressGradient}`}
      style={{ scaleX }}
    />
  );
}
