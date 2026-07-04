"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductScreenshot } from "@/components/ProductScreenshot";
import { ShowcaseThemeAura } from "@/components/ShowcaseThemeAura";
import { ShowcaseSceneCanvas } from "@/components/three/ShowcaseSceneCanvas";
import { EASE_OUT } from "@/lib/motion";
import { useLocale } from "@/context/LocaleContext";
import { useSound } from "@/context/SoundContext";

gsap.registerPlugin(ScrollTrigger);

/** No live 3D or animated theme layers in showcase cards — flow chapter only */
const SHOWCASE_LIVE_BG_SKIP = new Set([
  "starhook",
  "neondrift",
  "spindodge",
  "courlearn",
  "sonr",
]);

export function ShowcaseBlock({
  title,
  subtitle,
  description,
  accent,
  accentMuted,
  glow,
  screenshots,
  href,
  reversed,
  flipImage,
  marketingBanner,
  themeSlug,
  index,
  ctaLabel,
  status,
  features,
  minimal,
}: {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  accentMuted: string;
  glow: string;
  screenshots: string[];
  href: string;
  reversed?: boolean;
  flipImage?: boolean;
  marketingBanner?: boolean;
  themeSlug?: string;
  index: number;
  ctaLabel?: string;
  status?: string;
  features?: string[];
  minimal?: boolean;
}) {
  const { tr } = useLocale();
  const { playHover } = useSound();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const sceneProgressRef = useRef(0);
  const thumb = screenshots[0];
  const skipLiveBg = themeSlug ? SHOWCASE_LIVE_BG_SKIP.has(themeSlug) : false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [32, -32]);

  useEffect(() => {
    if (reduceMotion || !ref.current || !themeSlug || SHOWCASE_LIVE_BG_SKIP.has(themeSlug)) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "start end",
        end: "end start",
        scrub: true,
        onUpdate: (self) => {
          sceneProgressRef.current = self.progress;
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [reduceMotion, themeSlug]);

  const textFrom = reversed ? 48 : -48;
  const imageFrom = reversed ? -56 : 56;

  return (
    <motion.article
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 48 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: EASE_OUT }}
      whileHover={reduceMotion ? undefined : { y: minimal ? -2 : -3 }}
      className={
        minimal
          ? "showcase-panel-minimal group relative min-h-[min(100vh,920px)] scroll-mt-28 overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-300"
          : "showcase-panel group relative min-h-[min(100vh,920px)] scroll-mt-28 overflow-hidden rounded-[2rem] border border-white/8 bg-[#070b18] transition-[border-color,box-shadow] duration-300 hover:border-white/14 hover:shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
      }
      style={minimal || skipLiveBg ? undefined : { background: `linear-gradient(135deg, ${glow}, transparent 55%)` }}
    >
      {themeSlug && !skipLiveBg && <ShowcaseThemeAura slug={themeSlug} />}
      {themeSlug && !SHOWCASE_LIVE_BG_SKIP.has(themeSlug) && (
        <ShowcaseSceneCanvas slug={themeSlug} progressRef={sceneProgressRef} />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      {!skipLiveBg && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${reversed ? "20%" : "80%"} 50%, ${accent}18, transparent 55%)`,
          }}
        />
      )}

      <div
        className={`relative z-10 grid items-center gap-10 p-8 md:p-12 lg:grid-cols-2 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: textFrom }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <p
              className="text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: minimal ? "rgba(255,255,255,0.38)" : accent }}
            >
              {subtitle}
            </p>
            {status && (
              <span
                className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={
                  minimal
                    ? {
                        borderColor: "rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.55)",
                        background: "rgba(255,255,255,0.04)",
                      }
                    : {
                        borderColor: `${accent}44`,
                        color: accentMuted,
                        background: `${accent}12`,
                      }
                }
              >
                {status}
              </span>
            )}
          </div>
          <h3
            className={`mt-3 tracking-tight ${
              minimal ? "text-4xl font-medium text-white/92 md:text-5xl" : "text-4xl font-bold md:text-5xl"
            }`}
            style={{ fontFamily: minimal ? "var(--font-dm-sans)" : "var(--font-syne)", color: minimal ? undefined : accentMuted }}
          >
            {title}
          </h3>
          <p className={`mt-5 max-w-lg text-base leading-relaxed ${minimal ? "text-white/52" : "text-white/60"}`}>
            {description}
          </p>

          {features && features.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {features.slice(0, 3).map((feature) => (
                <li
                  key={feature}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    minimal
                      ? "border-white/[0.07] bg-white/[0.03] text-white/48"
                      : "border-white/8 bg-white/[0.04] text-white/55"
                  }`}
                >
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <Link
            href={href}
            onMouseEnter={playHover}
            className={`focus-ring mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-[transform,filter,gap] duration-200 ease-out hover:gap-3 active:scale-[0.97] ${
              minimal
                ? "border border-white/12 bg-white text-[#0c0c0e] hover:bg-white/92"
                : "text-[#050816] hover:brightness-110"
            }`}
            style={minimal ? undefined : { background: accent }}
          >
            {ctaLabel ?? tr("viewApp")} →
          </Link>
        </motion.div>

        <motion.div
          style={reduceMotion ? undefined : { y: imageY }}
          initial={reduceMotion ? false : { opacity: 0, x: imageFrom, scale: 0.96 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.14, ease: EASE_OUT }}
          className="relative z-10 mx-auto w-full max-w-xl"
        >
          {thumb ? (
            <ProductScreenshot
              src={thumb}
              alt={title}
              accent={accent}
              marketingBanner={marketingBanner}
              flipImage={flipImage}
            />
          ) : (
            <div
              className="flex aspect-[9/16] max-w-sm items-center justify-center rounded-[1.5rem] border border-white/10 text-sm text-white/40"
              style={{ background: `linear-gradient(160deg, ${accent}22, #050816)` }}
            >
              Preview coming soon
            </div>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
}
