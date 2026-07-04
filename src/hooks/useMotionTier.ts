"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export type MotionTier = "full" | "lite" | "static";

export function useMotionTier(): MotionTier {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduceMotion) return "static";
  if (isMobile) return "lite";
  return "full";
}
