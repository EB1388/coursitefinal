"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ProductTile } from "@/components/ProductTile";
import { apps } from "@/lib/apps";
import { gamePath } from "@/lib/themes";
import { useLocale } from "@/context/LocaleContext";

export default function GamesPage() {
  const { locale } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen px-6 pb-24 pt-28">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-[var(--text-faint)] transition-colors hover:text-[var(--text-muted)]">
          ← Cour
        </Link>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, transform: "translateY(16px)" }}
          animate={{ opacity: 1, transform: "translateY(0)" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mt-8 max-w-2xl"
        >
          <p className="section-label text-[#8db4ff]">Cour Gaming</p>
          <h1 className="font-display mt-4 text-5xl font-bold tracking-tight md:text-6xl">
            {locale === "nl" ? "Games die blijven plakken." : "Games that stick."}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--text-muted)]">
            {locale === "nl"
              ? "Minimalistische arcade games met obsessieve afwerking — gebouwd voor flow en nog één run."
              : "Minimalist arcade games with obsessive polish — built for flow and one more run."}
          </p>
        </motion.div>

        <div className="mt-16 space-y-4">
          {apps.map((app, i) => (
            <ProductTile
              key={app.slug}
              name={app.name}
              subtitle={app.subtitle}
              href={gamePath(app.slug)}
              accent={app.accent}
              image={app.screenshots[0] ?? "/og/site.png"}
              flipImage={app.flipScreenshots ?? i % 2 === 0}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
