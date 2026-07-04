"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { useLocale } from "@/context/LocaleContext";

const cardAccents = [
  "rgba(141, 180, 255, 0.12)",
  "rgba(255, 216, 122, 0.1)",
  "rgba(168, 85, 247, 0.12)",
  "rgba(125, 211, 252, 0.12)",
];

export function StudioStory() {
  const { locale } = useLocale();
  const reduceMotion = useReducedMotion();

  const body =
    locale === "nl"
      ? "Cour is een onafhankelijke studio die gepolijste mobiele games en apps maakt. We geloven in strakke besturing, privacy-respecterende defaults en details die je niet bewust opmerkt — maar die je wel voelt."
      : "Cour is an independent studio building polished mobile games and apps. We believe in tight controls, privacy-respecting defaults, and details you don't consciously notice — but absolutely feel.";

  const cards = [
    {
      label: locale === "nl" ? "Privacy eerst" : "Privacy first",
      value: locale === "nl" ? "Lokaal waar het kan" : "Local where possible",
    },
    {
      label: locale === "nl" ? "Craft" : "Craft",
      value: locale === "nl" ? "Elk detail telt" : "Every detail counts",
    },
    {
      label: locale === "nl" ? "Games" : "Games",
      value: "Starhook · Neon Drift · Spin Dodge",
    },
    {
      label: locale === "nl" ? "Apps" : "Apps",
      value: "CourLearn · Sonr",
    },
  ];

  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -32 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/30">
            {locale === "nl" ? "Over Cour" : "About Cour"}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-syne)" }}>
            {locale === "nl" ? "Klein studio. Grote obsessie." : "Small studio. Big obsession."}
          </h2>
          <p className="mt-5 leading-relaxed text-white/55">{body}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {cards.map((item, i) => (
            <motion.div
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE_OUT }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              className="showcase-panel rounded-2xl border border-white/10 p-5 transition-[border-color,box-shadow] duration-300 hover:border-white/16 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
              style={{
                background: `linear-gradient(145deg, ${cardAccents[i]}, transparent 70%)`,
              }}
            >
              <p className="text-xs uppercase tracking-widest text-white/35">{item.label}</p>
              <p className="mt-2 text-sm font-medium leading-snug text-white/75">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
