"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  APP_PROMO_IMAGE_CLASS,
  PROMO_HEIGHT,
  PROMO_WIDTH,
} from "@/lib/appPromoShots";

/** Full App Store–style promo card (headline + phone on gradient) — no double mockup frame */
export function AppPromoShot({
  src,
  alt,
  accent,
  priority,
  float,
  compact,
  className = "",
}: {
  src: string;
  alt: string;
  accent: string;
  priority?: boolean;
  float?: boolean;
  /** Smaller variant for grids and thumbnails */
  compact?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const width = compact
    ? "w-[240px] sm:w-[260px]"
    : "w-[320px] sm:w-[340px] xl:w-[360px]";

  return (
    <motion.div
      className={`relative mx-auto shrink-0 ${width} ${className}`}
      animate={float && !reduceMotion ? { y: [0, -10, 0] } : undefined}
      transition={
        float && !reduceMotion ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" } : undefined
      }
    >
      <div
        className="absolute -inset-8 rounded-full blur-3xl opacity-45"
        style={{ background: accent }}
        aria-hidden
      />
      <div
        className="relative overflow-hidden rounded-[1.35rem] border border-white/12 shadow-[0_28px_70px_rgba(0,0,0,0.55)]"
        style={{ boxShadow: `0 28px 70px ${accent}22` }}
      >
        <Image
          src={src}
          alt={alt}
          width={PROMO_WIDTH}
          height={PROMO_HEIGHT}
          className={APP_PROMO_IMAGE_CLASS}
          style={{ transformOrigin: "center center" }}
          sizes={compact ? "(max-width: 640px) 240px, 260px" : "(max-width: 1280px) 340px, 360px"}
          priority={priority}
        />
      </div>
    </motion.div>
  );
}
