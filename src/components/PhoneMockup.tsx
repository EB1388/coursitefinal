"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { gameScreenImageClassName, getScreenshotPresentation, screenshotImageClassName } from "@/lib/screenshotPresentation";

const sizeStyles = {
  default: {
    shell: "max-w-[300px] sm:max-w-[320px]",
    radius: "rounded-[2.25rem]",
  },
  compact: {
    shell: "w-[72%] max-w-[220px]",
    radius: "rounded-[1.85rem]",
  },
} as const;

export function PhoneMockup({
  src,
  alt,
  accent,
  priority,
  flipImage,
  float,
  compact,
  children,
  gameScreen,
}: {
  src?: string;
  alt: string;
  accent: string;
  priority?: boolean;
  flipImage?: boolean;
  float?: boolean;
  /** Smaller screen for cards and strips */
  compact?: boolean;
  children?: ReactNode;
  /** Crop + polish tuned for raw iOS game captures */
  gameScreen?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const size = compact ? sizeStyles.compact : sizeStyles.default;
  const presentation = getScreenshotPresentation(src ?? "");
  const imageClass = gameScreen
    ? gameScreenImageClassName(src ?? "", flipImage)
    : screenshotImageClassName(src ?? "", flipImage);
  const imageStyle = presentation.objectPosition
    ? { objectPosition: presentation.objectPosition }
    : undefined;

  return (
    <motion.div
      className={`relative mx-auto w-full ${size.shell}`}
      animate={float && !reduceMotion ? { y: [0, -10, 0] } : undefined}
      transition={
        float && !reduceMotion ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" } : undefined
      }
    >
      <div
        className={`absolute -inset-6 rounded-full blur-3xl ${
          float ? "phone-mockup-glow opacity-35" : "opacity-30"
        }`}
        style={{ background: accent }}
        aria-hidden
      />

      {/* Single screen layer — no double bezel */}
      <div
        className={`relative aspect-[9/19.5] overflow-hidden ${size.radius} border border-white/10 bg-[#050816] shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,0,0,0.25)]`}
        style={{ boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 56px ${accent}20` }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={imageClass}
            style={imageStyle}
            sizes={compact ? "220px" : "320px"}
            priority={priority}
          />
        ) : (
          children
        )}

        {/* Hide any remaining status-bar edge + add glass depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[8%] bg-gradient-to-b from-[#050816]/90 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/[0.08] via-transparent to-black/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
        />
      </div>
    </motion.div>
  );
}
