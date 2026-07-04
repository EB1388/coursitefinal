"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { PhoneMockup } from "@/components/PhoneMockup";
import type { UniverseNode } from "@/lib/universe";
import { apps } from "@/lib/apps";
import { products } from "@/lib/products";
import { useLocale } from "@/context/LocaleContext";
import { useMotionTier } from "@/hooks/useMotionTier";
import { isAppPromoSrc } from "@/lib/appPromoShots";

gsap.registerPlugin(ScrollTrigger);

const thumbBySlug: Record<string, string> = Object.fromEntries([
  ...apps.map((a) => [a.slug, a.screenshots[0]] as const),
  ...products.map((p) => [p.slug, p.screenshots[0]] as const),
]);

const appBySlug = Object.fromEntries(apps.map((a) => [a.slug, a]));

type StripCopy = {
  label: { en: string; nl: string };
  title: { en: string; nl: string };
};

const appsStripCopy: StripCopy = {
  label: { en: "Cour Apps", nl: "Cour Apps" },
  title: { en: "Tools for everyday use", nl: "Tools voor dagelijks gebruik" },
};

export function HorizontalProductStrip({
  nodes,
  variant,
}: {
  nodes: UniverseNode[];
  variant: "games" | "apps";
}) {
  const { locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const tier = useMotionTier();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const copy = appsStripCopy;
  const lang = locale === "nl" ? "nl" : "en";
  const showHeader = variant === "apps";

  useEffect(() => {
    if (reduceMotion || tier === "static" || !sectionRef.current || !trackRef.current) return;
    if (nodes.length <= 2) return;

    const track = trackRef.current;
    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth + 48;
      if (scrollWidth <= 0) return;

      gsap.to(track, {
        x: () => -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          pinType: "transform",
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion, tier, nodes.length]);

  const isStatic = tier === "static" || reduceMotion || nodes.length <= 2;

  return (
    <section
      ref={sectionRef}
      className={`relative border-t bg-[var(--bg)] ${variant === "apps" ? "border-white/[0.04]" : "border-white/5"}`}
    >
      {showHeader ? (
        <div className="px-6 pb-8 pt-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/38">
              {copy.label[lang]}
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-white/90 md:text-4xl">
              {copy.title[lang]}
            </h2>
          </div>
        </div>
      ) : null}

      <div className={`overflow-hidden pb-24 ${showHeader ? "pt-4" : "pt-16"}`}>
        <div
          ref={trackRef}
          className={`flex gap-5 px-6 ${isStatic ? "mx-auto max-w-6xl flex-wrap" : "w-max"}`}
        >
          {nodes.map((node) => (
            <Link
              key={node.slug}
              href={node.href}
              className={`focus-ring group relative flex w-[min(85vw,280px)] shrink-0 cursor-pointer flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-300 active:scale-[0.99] ${
                variant === "apps"
                  ? "rounded-2xl border border-white/[0.07] bg-[#111113] hover:border-white/12 hover:shadow-[0_16px_48px_rgba(0,0,0,0.32)]"
                  : "rounded-[1.75rem] border border-white/[0.08] bg-[#070b14]/90 hover:border-white/14 hover:shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
              }`}
              style={
                variant === "apps"
                  ? undefined
                  : { boxShadow: `0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px ${node.accent}12` }
              }
            >
              <div
                className={`relative overflow-hidden ${
                  variant === "games"
                    ? "flex aspect-[4/5] items-center justify-center px-5 pb-2 pt-8"
                    : isAppPromoSrc(thumbBySlug[node.slug] ?? "")
                      ? ""
                      : "aspect-[4/3]"
                } ${variant === "apps" ? "border-b border-white/[0.05]" : ""}`}
              >
                {variant === "games" ? (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 50% 28%, ${node.accent}30, transparent 58%)`,
                      }}
                    />
                    <PhoneMockup
                      src={thumbBySlug[node.slug]}
                      alt={node.name}
                      accent={node.accent}
                      flipImage={appBySlug[node.slug]?.flipScreenshots === true}
                      compact
                      gameScreen
                    />
                  </>
                ) : isAppPromoSrc(thumbBySlug[node.slug] ?? "") ? (
                  <Image
                    src={thumbBySlug[node.slug]}
                    alt={node.name}
                    width={576}
                    height={1024}
                    className="h-auto w-full object-cover object-center scale-[1.08]"
                    style={{ transformOrigin: "center center" }}
                    sizes="320px"
                  />
                ) : (
                  <Image
                    src={thumbBySlug[node.slug]}
                    alt={node.name}
                    fill
                    className={`object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] opacity-95 saturate-[0.92]`}
                    sizes="320px"
                  />
                )}
                {variant === "apps" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />
                )}
              </div>
              <div className="p-5">
                <p
                  className={`font-semibold uppercase tracking-widest ${
                    variant === "apps" ? "text-[10px] text-white/35" : "text-[10px]"
                  }`}
                  style={variant === "apps" ? undefined : { color: node.accent }}
                >
                  {node.kind}
                </p>
                <p
                  className={`font-display mt-2 text-xl font-bold ${
                    variant === "apps" ? "text-white/90" : ""
                  }`}
                  style={variant === "apps" ? undefined : { color: node.accentMuted }}
                >
                  {node.name}
                </p>
                <p className={`mt-1 text-sm ${variant === "apps" ? "text-white/42" : "text-white/45"}`}>
                  {node.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
