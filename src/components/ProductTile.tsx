"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { MarketingBanner } from "@/components/MarketingScreenshotGallery";
import { PhoneMockup } from "@/components/PhoneMockup";

export function ProductTile({
  name,
  subtitle,
  href,
  accent,
  image,
  flipImage,
  marketingBanner,
  index,
}: {
  name: string;
  subtitle: string;
  href: string;
  accent: string;
  image: string;
  flipImage?: boolean;
  marketingBanner?: boolean;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, transform: "translateY(20px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, transform: "translateY(0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link href={href} className="card-premium group flex flex-col md:flex-row md:items-center">
        <div className="flex flex-1 flex-col p-6 sm:p-8 md:p-10">
          <p className="section-label" style={{ color: accent }}>
            {subtitle}
          </p>
          <h3 className="font-display mt-3 text-3xl font-bold tracking-tight">{name}</h3>
          <span
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium opacity-70 transition-all duration-200 group-hover:gap-3 group-hover:opacity-100"
            style={{ color: accent }}
          >
            View
            <span aria-hidden>→</span>
          </span>
        </div>
        <div
          className={
            marketingBanner
              ? "relative mx-auto w-full max-w-[340px] shrink-0 overflow-hidden border-t border-white/5 p-4 md:mx-0 md:mr-6 md:border-t-0 md:p-6"
              : "relative mx-auto flex w-full max-w-[240px] shrink-0 items-center justify-center border-t border-white/5 px-6 py-8 md:mx-0 md:mr-8 md:max-w-[260px] md:border-t-0 md:py-10"
          }
        >
          {marketingBanner ? (
            <MarketingBanner src={image} alt={name} accent={accent} />
          ) : (
            <PhoneMockup
              src={image}
              alt={name}
              accent={accent}
              flipImage={flipImage}
              gameScreen
            />
          )}
        </div>
      </Link>
    </motion.div>
  );
}
