"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export type MotionTier = "full" | "lite" | "static";

function readIsMobile() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(max-width: 768px)").matches;
}

export function useMotionTier(): MotionTier {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(readIsMobile);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduceMotion) return "static";
  if (isMobile) return "lite";
  return "full";
}

/** Scroll-pinned / horizontal GSAP sections — desktop only */
export function useScrollEffectsEnabled(): boolean {
  const tier = useMotionTier();
  const reduceMotion = useReducedMotion();
  return tier === "full" && !reduceMotion;
}
