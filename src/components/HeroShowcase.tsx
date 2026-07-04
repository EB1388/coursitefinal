"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ProductScreenshot } from "@/components/ProductScreenshot";
import { ProductPeekStrip } from "@/components/ProductPeekStrip";
import { apps } from "@/lib/apps";
import { products } from "@/lib/products";
import { EASE_OUT, fadeUp, stagger } from "@/lib/motion";
import { useLocale } from "@/context/LocaleContext";

const heroShots = [
  ...apps.flatMap((item) =>
    item.screenshots.slice(0, 2).map((src) => ({
      src,
      name: item.name,
      accent: item.accent,
      flip: item.flipScreenshots ?? false,
      themeSlug: item.slug,
      marketingBanner: false,
    })),
  ),
  ...products.map((item) => ({
    src: item.screenshots[0],
    name: item.name,
    accent: item.accent,
    flip: item.flipScreenshots ?? false,
    themeSlug: item.slug,
    marketingBanner: item.screenshotStyle === "marketing",
  })),
];

const CYCLE_MS = 4200;

export function HeroShowcase() {
  const { tr, locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      setProgress(((now - started) % CYCLE_MS) / CYCLE_MS);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, index]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroShots.length);
      setProgress(0);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const shot = heroShots[index];
  const isGameShot = apps.some((app) => app.slug === shot.themeSlug);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const phoneScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.86]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.45]);

  return (
    <section
      ref={sectionRef}
      className="hero-glow relative min-h-[80vh] overflow-hidden px-6 pb-16 pt-28 sm:min-h-[85vh] sm:pb-20 sm:pt-36 md:pb-28 md:pt-44"
    >
      {!isGameShot && (
        <motion.div
          key={shot.themeSlug}
          className="pointer-events-none absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          aria-hidden
        >
          <div
            className="absolute inset-0 transition-[background] duration-1000"
            style={{
              background: `radial-gradient(ellipse 70% 55% at 70% 30%, ${shot.accent}22, transparent 65%)`,
            }}
          />
        </motion.div>
      )}

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          style={reduceMotion ? undefined : { y: textY, opacity: textOpacity }}
          initial="hidden"
          animate="visible"
          variants={stagger(0.1)}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-sm font-medium uppercase tracking-[0.2em] text-[#8db4ff]"
          >
            {tr("heroLabel")}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="mt-6 max-w-3xl text-[clamp(2.25rem,9vw,4.5rem)] font-bold leading-[1.02] tracking-tight md:text-7xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <span className="gradient-text">{tr("heroTitle1")}</span>
            <br />
            {tr("heroTitle2")}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/55"
          >
            {tr("heroBody")}
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mt-10 flex flex-wrap gap-3 sm:gap-4"
          >
            <a
              href="#games"
              className="focus-ring inline-flex cursor-pointer items-center rounded-full bg-[#8db4ff] px-7 py-3.5 text-sm font-semibold text-[#050816] transition-transform duration-160 ease-out hover:brightness-110 active:scale-[0.97]"
            >
              {tr("heroCta")}
            </a>
            <Link href="/games" className="btn-ghost focus-ring">
              Games
            </Link>
            <Link href="/apps" className="btn-ghost focus-ring">
              Apps
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-3 border-t border-white/5 pt-8 sm:mt-16 sm:gap-6 sm:pt-10"
          >
            {[
              { value: "3", label: tr("statGames") },
              { value: "2", label: tr("statApps") },
              { value: "1-tap", label: tr("statControls") },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.45, ease: EASE_OUT }}
              >
                <p className="text-xl font-bold text-white sm:text-2xl md:text-3xl" style={{ fontFamily: "var(--font-syne)" }}>
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/40 sm:text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <ProductPeekStrip />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT }}
          className="relative"
        >
          <motion.div
            style={reduceMotion ? undefined : { y: phoneY, scale: phoneScale, opacity: phoneOpacity }}
            className="origin-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={shot.src}
                initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.94, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -20, scale: 0.97, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <ProductScreenshot
                  src={shot.src}
                  alt={`${shot.name} screenshot`}
                  accent={shot.accent}
                  marketingBanner={shot.marketingBanner}
                  priority
                  flipImage={shot.flip}
                  float
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={shot.name}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="mt-6 text-center text-sm text-white/40"
              >
                {shot.name}
              </motion.p>
            </AnimatePresence>

            <div className="mt-5 flex justify-center gap-1">
              {heroShots.map((s, i) => (
                <button
                  key={`${s.src}-${i}`}
                  type="button"
                  aria-label={`Show ${s.name}`}
                  onClick={() => {
                    setIndex(i);
                    setProgress(0);
                  }}
                  className="flex h-11 w-8 items-center justify-center"
                >
                  <span
                    className="relative block h-1.5 overflow-hidden rounded-full bg-white/10 transition-[width,background-color] duration-300"
                    style={{ width: i === index ? 28 : 8 }}
                  >
                    {i === index && !reduceMotion && (
                      <motion.span
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${progress * 100}%`, background: s.accent }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
