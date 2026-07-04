"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { PortalCard } from "@/components/PortalCard";
import { useLocale } from "@/context/LocaleContext";

export function HomeHero() {
  const { locale } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center px-6 pb-20 pt-32">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, transform: "translateY(16px)" }}
          animate={{ opacity: 1, transform: "translateY(0)" }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-3xl"
        >
          <p className="section-label">Cour Software</p>
          <h1 className="font-display mt-6 text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            Craft for
            <br />
            <span className="text-[var(--text-muted)]">mobile.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--text-muted)]">
            {locale === "nl"
              ? "Cour maakt gepolijste games en apps — strak, privé, en gemaakt om te blijven hangen."
              : "Cour builds polished games and apps — tight, private, and made to stick."}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <PortalCard
            href="/games"
            label={locale === "nl" ? "Cour Gaming" : "Cour Gaming"}
            title={locale === "nl" ? "Games" : "Games"}
            description={
              locale === "nl"
                ? "Arcade-meesterschap. One-tap controls, gloeiende werelden, nog één run."
                : "Arcade mastery. One-tap controls, glowing worlds, one more run."
            }
            accent="#8db4ff"
            meshClass="mesh-games"
            image="/screenshots/starhook/promo-01-main-menu.png"
            delay={0.1}
          />
          <PortalCard
            href="/apps"
            label={locale === "nl" ? "Cour Apps" : "Cour Apps"}
            title={locale === "nl" ? "Apps" : "Apps"}
            description={
              locale === "nl"
                ? "On-device AI coach en muziek tools. Privé by design."
                : "On-device AI coach and music tools. Private by design."
            }
            accent="#7dd3fc"
            meshClass="mesh-apps"
            image="/screenshots/courlearn/promo-02-learn-hub.png"
            delay={0.18}
          />
        </div>
      </div>
    </section>
  );
}
