"use client";

import { AppThemeBackground } from "@/components/AppThemeBackground";
import { motion, useReducedMotion } from "motion/react";

/** Scoped animated brand atmosphere — lives inside a showcase card only */
export function ShowcaseThemeAura({ slug }: { slug: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
        <AppThemeBackground slug={slug} />
      </div>
    );
  }

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      animate={{ opacity: [0.35, 0.65, 0.35] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.06, 1], x: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <AppThemeBackground slug={slug} />
      </motion.div>
    </motion.div>
  );
}
