"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { CourApp } from "@/lib/apps";
import { gamePath } from "@/lib/themes";
import { useLocale } from "@/context/LocaleContext";
import { useSound } from "@/context/SoundContext";

export function AppCard({ app, index }: { app: CourApp; index: number }) {
  const { tr } = useLocale();
  const { playHover } = useSound();
  const reduceMotion = useReducedMotion();
  const thumb = app.screenshots[0];

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, transform: "translateY(24px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, transform: "translateY(0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="group relative"
    >
      <div
        className="absolute -inset-px rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: app.glow }}
      />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-[border-color] duration-200 ease-out group-hover:border-white/20">
        {thumb && (
          <div className="relative h-44 overflow-hidden border-b border-white/5">
            <Image
              src={thumb}
              alt={app.name}
              fill
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
          </div>
        )}
        <div className="p-6 md:p-8">
          <p
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: app.accent }}
          >
            {app.category}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{app.name}</h3>
          <p className="mt-1 text-sm text-white/50">{app.subtitle}</p>
          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-white/60">
            {app.promo}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={gamePath(app.slug)}
              onMouseEnter={playHover}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-[#050816] transition-transform duration-160 ease-out active:scale-[0.97]"
              style={{ background: app.accent }}
            >
              {tr("viewApp")}
            </Link>
            <Link
              href={`${gamePath(app.slug)}/privacy`}
              className="inline-flex items-center rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/70 transition-[border-color,transform] duration-200 ease-out hover:border-white/25 hover:text-white active:scale-[0.97]"
            >
              {tr("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
