"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { APP_PROMO_IMAGE_CLASS, isAppPromoSrc, PROMO_HEIGHT, PROMO_WIDTH } from "@/lib/appPromoShots";
import { screenshotImageClassName } from "@/lib/screenshotPresentation";
import { useLocale } from "@/context/LocaleContext";

export function PortalCard({
  href,
  label,
  title,
  description,
  accent,
  meshClass,
  image,
  imageFlip,
  delay = 0,
}: {
  href: string;
  label: string;
  title: string;
  description: string;
  accent: string;
  meshClass: string;
  image: string;
  imageFlip?: boolean;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const { locale } = useLocale();
  const isPromo = isAppPromoSrc(image);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, transform: "translateY(28px)" }}
      animate={{ opacity: 1, transform: "translateY(0)" }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className="group"
    >
      <Link href={href} className="card-premium block h-full">
        <div className={`relative min-h-[420px] overflow-hidden md:min-h-[480px] ${meshClass}`}>
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(circle at 50% 100%, ${accent}18, transparent 60%)` }}
          />

          <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
            <div>
              <p className="section-label" style={{ color: accent }}>
                {label}
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                {title}
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--text-muted)]">
                {description}
              </p>
            </div>

            <p
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium transition-transform duration-200 ease-out group-hover:gap-3"
              style={{ color: accent }}
            >
              {locale === "nl" ? "Verkennen" : "Explore"}
              <span aria-hidden>→</span>
            </p>
          </div>

          <div className="pointer-events-none absolute -bottom-8 -right-4 w-[58%] max-w-[300px] md:-right-8 md:w-[52%] md:max-w-[320px]">
            <div
              className={`overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out group-hover:-translate-y-2 ${
                isPromo ? "rounded-[1.35rem]" : "rounded-[1.75rem]"
              }`}
              style={{ boxShadow: `0 40px 80px ${accent}15` }}
            >
              <div className={`relative overflow-hidden ${isPromo ? "" : "aspect-[9/19]"}`}>
                {isPromo ? (
                  <Image
                    src={image}
                    alt=""
                    width={PROMO_WIDTH}
                    height={PROMO_HEIGHT}
                    className={APP_PROMO_IMAGE_CLASS}
                    style={{ transformOrigin: "center center" }}
                    sizes="320px"
                  />
                ) : (
                  <Image
                    src={image}
                    alt=""
                    fill
                    className={screenshotImageClassName(image, imageFlip)}
                    sizes="320px"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
