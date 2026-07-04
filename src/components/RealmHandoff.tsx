"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { useLocale } from "@/context/LocaleContext";

export function RealmHandoff() {
  const { locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const lang = locale === "nl" ? "nl" : "en";

  const copy = {
    en: {
      label: "Cour Apps",
      title: "Private tools. On-device by default.",
      body: "A different kind of craft — calm interfaces, local-first privacy, and software built for everyday use.",
    },
    nl: {
      label: "Cour Apps",
      title: "Privé tools. On-device als standaard.",
      body: "Een andere soort craft — rustige interfaces, local-first privacy en software voor dagelijks gebruik.",
    },
  }[lang];

  return (
    <section
      aria-hidden={false}
      className="relative overflow-hidden border-t border-white/[0.04] bg-gradient-to-b from-[#050816] via-[#09090b] to-[var(--apps-bg,#0c0c0e)] px-6 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-3xl"
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: EASE_OUT }}
        className="relative mx-auto max-w-6xl"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/40">{copy.label}</p>
        <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-tight text-white/92 md:text-[2.75rem] md:leading-[1.12]">
          {copy.title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/45">{copy.body}</p>
      </motion.div>
    </section>
  );
}
