"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { AppProductCard } from "@/components/AppProductCard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { products } from "@/lib/products";
import { useLocale } from "@/context/LocaleContext";
import { EASE_OUT } from "@/lib/motion";

export default function AppsPage() {
  const { locale } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen px-6 pb-24 pt-28">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-[var(--text-faint)] transition-colors hover:text-[var(--text-muted)]"
        >
          ← Cour
        </Link>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mt-8 max-w-2xl"
        >
          <p className="section-label text-[#7dd3fc]">Cour Apps</p>
          <h1 className="font-display mt-4 text-5xl font-bold tracking-tight md:text-6xl">
            {locale === "nl" ? "Tools die op je device leven." : "Tools that live on your device."}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--text-muted)]">
            {locale === "nl"
              ? "AI coaching en muziek utilities — privé, lokaal, en gemaakt met dezelfde craft als onze games."
              : "AI coaching and music utilities — private, local, and built with the same craft as our games."}
          </p>
        </motion.div>

        <div className="showcase-snap mt-14 space-y-8">
          {products.map((product, i) => (
            <AppProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>

        <div
          className="mt-16 rounded-2xl border border-white/8 p-8 md:p-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(125, 211, 252, 0.08), transparent 60%), rgba(255,255,255,0.02)",
          }}
        >
          <p className="font-display text-xl font-semibold">
            {locale === "nl" ? "Beta — blijf op de hoogte" : "Beta — get notified"}
          </p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {locale === "nl"
              ? "CourLearn en Sonr zijn in ontwikkeling."
              : "CourLearn and Sonr are in development."}
          </p>
          <div className="mt-6 max-w-md">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </div>
  );
}
