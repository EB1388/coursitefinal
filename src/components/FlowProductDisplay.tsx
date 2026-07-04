"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ProductScreenshot } from "@/components/ProductScreenshot";
import {
  flowActiveStep,
  flowCardFocus,
  type FlowNarrative,
} from "@/lib/flowNarrative";
import type { CourProduct } from "@/lib/products";

export type FlowDisplayNode = {
  slug: string;
  name: string;
  accent: string;
  accentMuted: string;
  href: string;
  status?: CourProduct["status"];
};

function appsCopyPanelStyle(accent: string, accentMuted: string) {
  return {
    borderColor: `${accent}48`,
    background: `linear-gradient(145deg, ${accent}14 0%, rgba(17, 17, 19, 0.93) 40%, rgba(17, 17, 19, 0.9) 100%)`,
    boxShadow: `0 0 0 1px ${accent}30, 0 0 32px ${accent}22, 0 0 80px ${accentMuted}14, 0 10px 40px rgba(0,0,0,0.42), inset 0 1px 0 ${accent}24`,
  } as const;
}

function GlassCard({
  children,
  active,
  accent,
  accentMuted,
  scrollOverlay,
  minimal,
}: {
  children: ReactNode;
  active: boolean;
  accent: string;
  accentMuted?: string;
  scrollOverlay?: boolean;
  minimal?: boolean;
}) {
  const themedApps = scrollOverlay && minimal;
  const muted = accentMuted ?? accent;

  return (
    <div
      className={`relative rounded-2xl border p-5 transition-[border-color,background-color,box-shadow] duration-400 md:p-6 ${
        scrollOverlay && !minimal ? "backdrop-blur-md" : scrollOverlay && minimal ? "backdrop-blur-sm" : ""
      }`}
      style={{
        borderColor: themedApps
          ? active
            ? `${accent}70`
            : `${accent}42`
          : active
            ? minimal
              ? "rgba(255,255,255,0.14)"
              : `${accent}${scrollOverlay ? "66" : "44"}`
            : minimal
              ? "rgba(255,255,255,0.07)"
              : scrollOverlay
                ? "rgba(255,255,255,0.14)"
                : "rgba(255,255,255,0.08)",
        background: themedApps
          ? active
            ? `linear-gradient(145deg, ${accent}16 0%, rgba(17, 17, 19, 0.94) 42%, rgba(17, 17, 19, 0.92) 100%)`
            : `linear-gradient(145deg, ${accent}0c 0%, rgba(17, 17, 19, 0.9) 38%, rgba(17, 17, 19, 0.88) 100%)`
          : scrollOverlay
            ? minimal
              ? active
                ? "rgba(17, 17, 19, 0.94)"
                : "rgba(17, 17, 19, 0.86)"
              : active
                ? "rgba(5, 8, 22, 0.88)"
                : "rgba(5, 8, 22, 0.78)"
            : active
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.03)",
        boxShadow: themedApps
          ? active
            ? `0 0 0 1px ${accent}35, 0 0 28px ${accent}28, 0 0 72px ${muted}18, 0 12px 36px rgba(0,0,0,0.38), inset 0 1px 0 ${accent}28`
            : `0 0 0 1px ${accent}22, 0 0 18px ${accent}16, 0 0 48px ${muted}10, 0 8px 28px rgba(0,0,0,0.3), inset 0 1px 0 ${accent}14`
          : active
            ? scrollOverlay
              ? minimal
                ? "0 12px 36px rgba(0,0,0,0.35)"
                : `0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px ${accent}22`
              : `0 20px 60px ${accent}12`
            : scrollOverlay
              ? minimal
                ? "0 8px 28px rgba(0,0,0,0.28)"
                : "0 12px 40px rgba(0,0,0,0.35)"
              : undefined,
      }}
    >
      {themedApps && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-80"
          style={{
            background: `linear-gradient(135deg, ${accent}55 0%, ${muted}28 38%, transparent 72%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

export function FlowProductDisplay({
  node,
  narrative,
  sceneLocal = 0.2,
  lang,
  exploreLabel,
  showExploreLink = true,
  showPhoneOnMobile = false,
  showScreenshot = true,
  variant = "page",
  tone = "gaming",
}: {
  node: FlowDisplayNode;
  narrative: FlowNarrative;
  sceneLocal?: number;
  lang: "en" | "nl";
  exploreLabel: string;
  showPhoneOnMobile?: boolean;
  showExploreLink?: boolean;
  showScreenshot?: boolean;
  /** scroll = homepage 3D flow overlay; page = dedicated product pages */
  variant?: "scroll" | "page";
  /** Visual tone for scroll overlay — apps is flatter and more minimal */
  tone?: "gaming" | "apps";
}) {
  const reduceMotion = useReducedMotion();
  const cardIndex = flowCardFocus(sceneLocal);
  const primary = narrative.cards[0];
  const secondary = narrative.cards[1];
  const activeStep = flowActiveStep(sceneLocal, primary?.steps?.length ?? 1);
  const isScroll = variant === "scroll";
  const isApps = tone === "apps";

  const copyPanelClass = isScroll
    ? isApps
      ? "relative rounded-2xl border p-5 backdrop-blur-sm md:p-6"
      : "rounded-2xl border border-white/12 bg-[#050816]/82 p-5 shadow-[0_12px_48px_rgba(0,0,0,0.55)] backdrop-blur-md md:p-6"
    : "";

  const appsPanelStyle = isScroll && isApps ? appsCopyPanelStyle(node.accent, node.accentMuted) : undefined;
  const hasScreenshot = showScreenshot && Boolean(narrative.screenshot);
  const scrollAppsNoShot = isScroll && isApps && !hasScreenshot;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`grid w-full gap-8 lg:gap-10 ${
        scrollAppsNoShot
          ? "items-start lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center"
          : hasScreenshot
            ? "items-end lg:grid-cols-[minmax(0,1.05fr)_auto_minmax(0,1fr)] lg:items-center"
            : "items-end lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center"
      }`}
    >
      <div className={`flex flex-col lg:max-w-md ${copyPanelClass}`} style={appsPanelStyle}>
        {isScroll && isApps && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-90"
            style={{
              background: `linear-gradient(135deg, ${node.accent}60 0%, ${node.accentMuted}35 42%, transparent 70%)`,
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
          />
        )}
        <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: node.accent, boxShadow: `0 0 10px ${node.accent}` }}
          />
          <p className={`font-display text-sm font-semibold ${isScroll ? "text-white" : "text-white/90"}`}>
            {node.name}
          </p>
          {node.status && (
            <span
              className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                borderColor: `${node.accent}44`,
                color: node.accentMuted,
                background: `${node.accent}12`,
              }}
            >
              {node.status}
            </span>
          )}
        </div>

        <h1
          className={`font-display mt-5 text-[clamp(1.75rem,7vw,2.5rem)] font-bold leading-[1.05] tracking-tight md:text-5xl xl:text-[3.25rem] ${
            isScroll ? "[text-shadow:0_2px_28px_rgba(0,0,0,0.85)]" : ""
          }`}
        >
          {narrative.headline.map((part, i) => (
            <span key={i} style={{ color: part.color ?? node.accentMuted }}>
              {part[lang]}
              {i < narrative.headline.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <p
          className={`mt-5 max-w-md text-base leading-relaxed md:text-[17px] ${
            isScroll ? "text-white/80" : "text-white/55"
          }`}
        >
          {narrative.intro[lang]}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {narrative.pills.map((pill) => (
            <li
              key={pill.en}
              className={`rounded-full border px-3 py-1.5 text-xs ${
                isScroll ? "font-medium text-white/85" : "text-white/60"
              }`}
              style={{
                borderColor: `${node.accent}${isScroll ? "55" : "33"}`,
                background: isScroll ? `${node.accent}18` : `${node.accent}0a`,
              }}
            >
              {pill[lang]}
            </li>
          ))}
        </ul>

        {showExploreLink && (
          <Link
            href={node.href}
            className={`focus-ring mt-8 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform active:scale-[0.97] lg:hidden ${
              isApps ? "border border-white/12 bg-white text-[#0c0c0e] hover:bg-white/92" : "text-[#050816]"
            }`}
            style={isApps ? undefined : { background: node.accent }}
          >
            {exploreLabel} →
          </Link>
        )}
        </div>
      </div>

      {hasScreenshot && (
        <div
          className={`shrink-0 justify-center ${showPhoneOnMobile ? "flex" : "hidden lg:flex"}`}
        >
          <ProductScreenshot
            src={narrative.screenshot!}
            alt={node.name}
            accent={node.accent}
            flipImage={narrative.flipScreenshot}
            float
            priority
          />
        </div>
      )}

      <div className="flex flex-col gap-4 lg:max-w-md lg:justify-self-end">
        {primary && (
          <GlassCard active={cardIndex === 0} accent={node.accent} accentMuted={node.accentMuted} scrollOverlay={isScroll} minimal={isApps}>
            <h2 className={`font-display text-lg font-semibold ${isScroll ? "text-white" : "text-white/90"}`}>
              {primary.title[lang]}
            </h2>
            <p className={`mt-2 text-sm leading-relaxed ${isScroll ? "text-white/70" : "text-white/45"}`}>
              {primary.body[lang]}
            </p>
            {primary.steps && (
              <ol className="mt-5 space-y-3">
                {primary.steps.map((step, i) => {
                  const isActive = i === activeStep;
                  return (
                    <li
                      key={step.en}
                      className="flex items-center gap-3 text-sm transition-colors duration-300"
                      style={{
                        color: isActive
                          ? "rgba(255,255,255,0.95)"
                          : isScroll
                            ? "rgba(255,255,255,0.55)"
                            : "rgba(255,255,255,0.38)",
                      }}
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{
                          background: isActive ? node.accent : `${node.accent}22`,
                          color: isActive ? "#050816" : node.accentMuted,
                        }}
                      >
                        {i + 1}
                      </span>
                      {step[lang]}
                    </li>
                  );
                })}
              </ol>
            )}
          </GlassCard>
        )}

        {secondary && (
          <GlassCard active={cardIndex === 1} accent={node.accent} accentMuted={node.accentMuted} scrollOverlay={isScroll} minimal={isApps}>
            <h2 className={`font-display text-lg font-semibold ${isScroll ? "text-white" : "text-white/90"}`}>
              {secondary.title[lang]}
            </h2>
            <p className={`mt-2 text-sm leading-relaxed ${isScroll ? "text-white/70" : "text-white/45"}`}>
              {secondary.body[lang]}
            </p>
            {secondary.highlight && (
              <div className="mt-5 flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${node.accent}, ${node.accentMuted})`,
                    color: "#050816",
                  }}
                >
                  {secondary.highlight.badge}
                </span>
                <div>
                  <p className={`text-sm font-semibold ${isScroll ? "text-white/95" : "text-white/85"}`}>
                    {secondary.highlight.title[lang]}
                  </p>
                  <p className={`mt-1 text-xs leading-relaxed ${isScroll ? "text-white/65" : "text-white/45"}`}>
                    {secondary.highlight.body[lang]}
                  </p>
                </div>
              </div>
            )}
          </GlassCard>
        )}

        {showExploreLink && (
          <Link
            href={node.href}
            className={`focus-ring hidden w-fit cursor-pointer items-center gap-2 self-start rounded-full px-6 py-3 text-sm font-semibold transition-transform active:scale-[0.97] lg:inline-flex ${
              isApps ? "border border-white/12 bg-white text-[#0c0c0e] hover:bg-white/92" : "text-[#050816]"
            }`}
            style={isApps ? undefined : { background: node.accent }}
          >
            {exploreLabel} →
          </Link>
        )}
      </div>
    </motion.div>
  );
}
