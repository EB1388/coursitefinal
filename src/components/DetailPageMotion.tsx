"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

export function DetailMotionGrid({
  reversed,
  copy,
  media,
}: {
  reversed?: boolean;
  copy: ReactNode;
  media: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  const copyFrom = reversed ? 44 : -44;
  const mediaFrom = reversed ? -52 : 52;

  return (
    <div
      ref={ref}
      className={`mt-8 grid items-start gap-16 lg:grid-cols-2 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: copyFrom, y: 16 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
      >
        {copy}
      </motion.div>
      <motion.div
        style={reduceMotion ? undefined : { y: mediaY }}
        initial={reduceMotion ? false : { opacity: 0, x: mediaFrom, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
        className="lg:sticky lg:top-28"
      >
        {media}
      </motion.div>
    </div>
  );
}

export function DetailSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
