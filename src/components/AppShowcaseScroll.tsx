"use client";

import { motion, useReducedMotion } from "motion/react";
import { AppProductCard } from "@/components/AppProductCard";
import { ShowcaseBlock } from "@/components/ShowcaseBlock";
import { gamePath } from "@/lib/themes";
import type { CourApp } from "@/lib/apps";
import type { CourProduct } from "@/lib/products";
import { EASE_OUT } from "@/lib/motion";
import { useLocale } from "@/context/LocaleContext";

function SectionHeader({
  label,
  title,
  minimal,
}: {
  label: string;
  title: string;
  minimal?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="mb-12 max-w-2xl"
    >
      <p
        className={
          minimal
            ? "text-[11px] font-medium uppercase tracking-[0.28em] text-white/38"
            : "text-sm font-medium uppercase tracking-[0.2em] text-white/30"
        }
      >
        {label}
      </p>
      <h2
        className={`mt-4 tracking-tight ${
          minimal
            ? "text-3xl font-medium text-white/90 md:text-4xl"
            : "mt-3 text-3xl font-bold md:text-4xl"
        }`}
        style={{ fontFamily: minimal ? "var(--font-dm-sans)" : "var(--font-syne)" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

export function AppShowcaseScroll({
  games,
  tools,
  gamesOnly = false,
  appsOnly = false,
}: {
  games: CourApp[];
  tools: CourProduct[];
  gamesOnly?: boolean;
  appsOnly?: boolean;
}) {
  const { tr } = useLocale();

  if (appsOnly) {
    return (
      <section id="apps" className="scroll-mt-28 bg-[var(--bg)] px-6 py-24">
        <div className="mx-auto max-w-6xl space-y-8">
          <SectionHeader label={tr("productsLabel")} title={tr("productsTitle")} minimal />
          <div className="showcase-snap space-y-8">
            {tools.map((product, i) => (
              <AppProductCard key={product.slug} product={product} index={i} minimal />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (gamesOnly) {
    return (
      <section id="games" className="scroll-mt-28 bg-[var(--bg)] px-6 py-24">
        <div className="mx-auto max-w-6xl space-y-8">
          <SectionHeader label={tr("gamesLabel")} title={tr("gamesTitle")} />
          <div className="showcase-snap space-y-8">
            {games.map((app, i) => (
              <ShowcaseBlock
                key={app.slug}
                title={app.name}
                subtitle={app.subtitle}
                description={app.promo}
                accent={app.accent}
                accentMuted={app.accentMuted}
                glow={app.glow}
                screenshots={app.screenshots}
                href={gamePath(app.slug)}
                themeSlug={app.slug}
                reversed={app.showcaseReversed ?? i % 2 === 1}
                flipImage={app.flipScreenshots === true}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="showcase" className="scroll-mt-28 px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-8">
        <SectionHeader label={tr("gamesLabel")} title={tr("gamesTitle")} />

        <div className="showcase-snap space-y-8">
          {games.map((app, i) => (
            <ShowcaseBlock
              key={app.slug}
              title={app.name}
              subtitle={app.subtitle}
              description={app.promo}
              accent={app.accent}
              accentMuted={app.accentMuted}
              glow={app.glow}
              screenshots={app.screenshots}
              href={gamePath(app.slug)}
              themeSlug={app.slug}
              reversed={app.showcaseReversed ?? i % 2 === 1}
              flipImage={app.flipScreenshots === true}
              index={i}
            />
          ))}
        </div>

        <div className="relative pt-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
          />
          <SectionHeader label={tr("productsLabel")} title={tr("productsTitle")} />
          <div className="showcase-snap space-y-8">
            {tools.map((product, i) => (
              <AppProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
