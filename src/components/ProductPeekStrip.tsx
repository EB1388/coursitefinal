"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ShowcaseThemeAura } from "@/components/ShowcaseThemeAura";
import { products } from "@/lib/products";
import { appPath } from "@/lib/themes";
import { EASE_OUT } from "@/lib/motion";
import { useLocale } from "@/context/LocaleContext";

export function ProductPeekStrip() {
  const { locale } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55, ease: EASE_OUT }}
      className="mt-10 border-t border-white/5 pt-8"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
        {locale === "nl" ? "Ook in ontwikkeling" : "Also in the works"}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={appPath(product.slug)}
            className="focus-ring group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-3 transition-[border-color,background-color,transform] duration-200 hover:border-white/14 hover:bg-white/[0.05] active:scale-[0.99]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <ShowcaseThemeAura slug={product.slug} />
            </div>
            <div
              className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10"
              style={{ boxShadow: `0 8px 24px ${product.accent}22` }}
            >
              <Image
                src={product.screenshots[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="80px"
              />
            </div>
            <div className="relative min-w-0 flex-1">
              <p className="truncate text-sm font-semibold" style={{ color: product.accentMuted }}>
                {product.name}
              </p>
              <p className="truncate text-xs text-white/40">{product.subtitle}</p>
            </div>
            <span
              className="relative shrink-0 text-sm opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
              style={{ color: product.accent }}
              aria-hidden
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
