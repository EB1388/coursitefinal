"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";
import { FlowScrollCopy } from "@/components/three/FlowScrollCopy";
import { ProductScene } from "@/components/three/ProductScenes";
import {
  isProductSceneSlug,
  productSceneConfigs,
  type ProductSceneSlug,
} from "@/lib/productScenes";
import type { UniverseNode } from "@/lib/universe";
import { getFlowNarrative } from "@/lib/flowNarrative";
import { useMotionTier } from "@/hooks/useMotionTier";
import { useLocale } from "@/context/LocaleContext";

import type { MutableRefObject, RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

const View = dynamic(() => import("@react-three/drei").then((m) => m.View), { ssr: false });

type FlowVariant = "games" | "apps";

/** Per-variant scroll + render tuning */
const FLOW: Record<
  FlowVariant,
  {
    vhPerScene: number;
    paddingVh: number;
    scrub: number;
    cinema: boolean;
    flow: boolean;
    minimal: boolean;
    fov: number;
    bloom: number;
    dpr: number;
    introSpeed: number;
    cameraSway: number;
  }
> = {
  games: {
    vhPerScene: 155,
    paddingVh: 90,
    scrub: 0.2,
    cinema: true,
    flow: false,
    minimal: false,
    fov: 34,
    bloom: 0.95,
    dpr: 2,
    introSpeed: 3.2,
    cameraSway: 0.22,
  },
  apps: {
    vhPerScene: 130,
    paddingVh: 80,
    scrub: 0.2,
    cinema: false,
    flow: false,
    minimal: true,
    fov: 38,
    bloom: 0,
    dpr: 1.25,
    introSpeed: 1.8,
    cameraSway: 0.06,
  },
};

/** Only the active scene mounts — avoids 3× useFrame cost that caused scroll jank */
function ActiveFlowScene({
  slug,
  progress,
  variant,
  sceneCount,
}: {
  slug: ProductSceneSlug;
  progress: MutableRefObject<number>;
  variant: FlowVariant;
  sceneCount: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const intro = useRef(0);
  const camTarget = useRef(new THREE.Vector3(0, 0.15, 4.6));
  const cfg = FLOW[variant];
  const fade = useRef(1);
  const { camera } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = cfg.fov;
      camera.position.set(0, 0.15, 4.6);
      camera.updateProjectionMatrix();
    }
  }, [camera, cfg.fov]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.032);
    const p = progress.current;
    const localP = sceneCount > 0 ? (p * sceneCount) % 1 : 0;

    intro.current = Math.min(1, intro.current + d * cfg.introSpeed);
    const introEase = 1 - (1 - intro.current) ** 3;

    const camZ = cfg.cinema
      ? THREE.MathUtils.lerp(4.6, 2.9, localP)
      : cfg.minimal
        ? THREE.MathUtils.lerp(4.4, 3.5, localP)
        : THREE.MathUtils.lerp(5.2, 3.6, localP);
    camTarget.current.set(
      Math.sin(state.clock.elapsedTime * 0.06) * (cfg.cinema ? cfg.cameraSway : cfg.minimal ? cfg.cameraSway : 0.35),
      cfg.cinema ? 0.12 : cfg.minimal ? 0.08 : THREE.MathUtils.lerp(0.28, 0.1, localP),
      camZ,
    );
    state.camera.position.lerp(camTarget.current, cfg.minimal ? 0.05 : 0.08);
    state.camera.lookAt(0, 0, 0);

    if (groupRef.current) {
      const s = (cfg.cinema ? 1 : cfg.minimal ? 1.06 : 0.92) + introEase * (cfg.minimal ? 0.06 : 0.08);
      groupRef.current.scale.setScalar(s);
      groupRef.current.position.z = (1 - introEase) * (cfg.minimal ? -0.25 : -0.8);
      groupRef.current.rotation.y = (1 - introEase) * (cfg.minimal ? -0.04 : -0.25);
    }

    // smooth fade on scene swap
    fade.current = THREE.MathUtils.lerp(fade.current, 1, 0.12);
    if (groupRef.current) {
      groupRef.current.visible = fade.current > 0.02;
    }
  });

  // reset intro when slug changes
  useEffect(() => {
    intro.current = 0;
    fade.current = 0.85;
  }, [slug]);

  return (
    <group ref={groupRef}>
      <ProductScene
        slug={slug}
        progress={progress}
        intensity={cfg.minimal ? 1.35 : 1}
        transparentBg
        detail={
          cfg.cinema ? "cinema" : cfg.minimal ? "minimal" : cfg.flow ? "flow" : "standard"
        }
      />
    </group>
  );
}

function StaticGrid({ nodes }: { nodes: UniverseNode[] }) {
  const { locale } = useLocale();
  const lang = locale === "nl" ? "nl" : "en";

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {nodes.map((node) => {
        const narrative = getFlowNarrative(node.slug);
        return (
          <Link
            key={node.slug}
            href={node.href}
            className="focus-ring showcase-panel rounded-2xl border border-white/10 p-5 transition-[border-color,transform] duration-200 hover:border-white/16 active:scale-[0.99]"
            style={{ background: `linear-gradient(135deg, ${node.accent}18, transparent 70%)` }}
          >
            <p className="text-xs uppercase tracking-widest" style={{ color: node.accent }}>
              {node.kind}
            </p>
            <p className="font-display mt-2 text-lg font-bold" style={{ color: node.accentMuted }}>
              {node.name}
            </p>
            <p className="mt-1 text-sm text-white/45">{node.subtitle}</p>
            {narrative ? (
              <p className="mt-3 text-sm leading-relaxed text-white/40">{narrative.intro[lang]}</p>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}

type FlowCopy = {
  scrollLabel: { en: string; nl: string };
  staticEyebrow: { en: string; nl: string };
  staticTitle: { en: string; nl: string };
  explore: { en: string; nl: string };
};

const gamesCopy: FlowCopy = {
  scrollLabel: {
    en: "Scroll through the games",
    nl: "Scroll door de games",
  },
  staticEyebrow: {
    en: "Cour Gaming",
    nl: "Cour Gaming",
  },
  staticTitle: {
    en: "Three worlds. One-tap play.",
    nl: "Drie werelden. Eén-tap speelplezier.",
  },
  explore: { en: "Play", nl: "Speel" },
};

const appsCopy: FlowCopy = {
  scrollLabel: {
    en: "Scroll through the apps",
    nl: "Scroll door de apps",
  },
  staticEyebrow: {
    en: "Cour Apps",
    nl: "Cour Apps",
  },
  staticTitle: {
    en: "Private tools. On-device by default.",
    nl: "Privé tools. On-device als standaard.",
  },
  explore: { en: "Explore", nl: "Bekijk" },
};

/** Unique View.Port indices — games + apps must not share an index or scenes bleed */
const VIEW_INDEX: Record<FlowVariant, number> = {
  games: 1,
  apps: 3,
};

function syncFlowProgress(
  progress: number,
  nodeCount: number,
  progressRef: MutableRefObject<number>,
  lastIndexRef: MutableRefObject<number>,
  setActiveIndex: (idx: number) => void,
  setSceneLocal: (local: number) => void,
  progressBarRef: RefObject<HTMLDivElement | null>,
) {
  progressRef.current = progress;
  if (progressBarRef.current) {
    progressBarRef.current.style.transform = `scaleX(${progress})`;
  }
  const raw = progress * nodeCount;
  const idx = Math.min(nodeCount - 1, Math.floor(raw));
  const local = raw - idx;
  setSceneLocal(local);
  if (idx !== lastIndexRef.current) {
    lastIndexRef.current = idx;
    setActiveIndex(idx);
  }
}

export function ProductFlowChapter({
  nodes,
  variant,
}: {
  nodes: UniverseNode[];
  variant: FlowVariant;
}) {
  const { locale } = useLocale();
  const tier = useMotionTier();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const viewTrackRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const lastIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sceneLocal, setSceneLocal] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const flow = FLOW[variant];
  const copy = variant === "games" ? gamesCopy : appsCopy;
  const slugs = useMemo(
    () => nodes.map((n) => n.slug).filter((s): s is ProductSceneSlug => isProductSceneSlug(s)),
    [nodes],
  );
  const scrollHeight = `${flow.paddingVh * 2 + flow.vhPerScene * nodes.length}vh`;
  const activeSlug = slugs[activeIndex] ?? slugs[0];

  useEffect(() => {
    if (reduceMotion || tier === "static" || !sectionRef.current || nodes.length === 0) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: flow.scrub,
        onUpdate: (self) => {
          syncFlowProgress(
            self.progress,
            nodes.length,
            progress,
            lastIndex,
            setActiveIndex,
            setSceneLocal,
            progressBarRef,
          );
        },
      });

      syncFlowProgress(
        trigger.progress,
        nodes.length,
        progress,
        lastIndex,
        setActiveIndex,
        setSceneLocal,
        progressBarRef,
      );
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [reduceMotion, tier, nodes.length, flow.scrub]);

  const active = nodes[activeIndex];
  if (!active || !activeSlug) return null;

  const narrative = getFlowNarrative(active.slug);
  const lang = locale === "nl" ? "nl" : "en";

  if (tier === "static" || reduceMotion) {
    return (
      <section className="border-t border-white/5 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/30">
            {copy.staticEyebrow[lang]}
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {copy.staticTitle[lang]}
          </h2>
          <div className="mt-10">
            <StaticGrid nodes={nodes} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id={variant === "games" ? "games" : variant === "apps" ? "apps" : undefined}
      className="relative border-t border-white/5"
      style={{ height: scrollHeight }}
      aria-label={copy.scrollLabel[lang]}
    >
      <div className="sticky top-0 z-[2] h-screen w-full overflow-hidden">
        <div ref={viewTrackRef} className="absolute inset-0 z-0" aria-hidden />
        <View
          track={viewTrackRef as RefObject<HTMLElement>}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          index={VIEW_INDEX[variant]}
        >
          <color attach="background" args={[variant === "apps" ? "#16161c" : "#050816"]} />
          <ActiveFlowScene
            key={activeSlug}
            slug={activeSlug}
            progress={progress}
            variant={variant}
            sceneCount={nodes.length}
          />
        </View>

        <div className="pointer-events-none absolute inset-0 z-20">
        {variant === "games" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/95 to-[var(--bg)]/40 lg:via-[var(--bg)]/80 lg:to-[var(--bg)]/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/25 to-[var(--bg)]/85" />
            <div className="absolute inset-x-0 bottom-0 top-20 bg-[radial-gradient(ellipse_80%_70%_at_15%_85%,rgba(5,8,22,0.92),transparent_68%)]" />
            <div className="absolute inset-x-0 bottom-0 top-20 hidden bg-[radial-gradient(ellipse_60%_65%_at_88%_75%,rgba(5,8,22,0.88),transparent_62%)] lg:block" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#16161c] via-[#16161c]/88 to-[#16161c]/28 lg:via-[#16161c]/72 lg:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16161c] via-transparent to-[#16161c]/65" />
            <div className="absolute inset-x-0 bottom-0 top-20 bg-[radial-gradient(ellipse_70%_60%_at_18%_82%,rgba(22,22,28,0.88),transparent_70%)]" />
          </>
        )}

        {/* scroll progress */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/8">
          <div
            ref={progressBarRef}
            className="h-full origin-left bg-white/35 transition-none"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div className="absolute inset-x-0 top-28 px-6">
          <p
            className={`text-sm font-medium uppercase tracking-[0.2em] ${
              variant === "apps" ? "text-white/42" : "text-white/50"
            }`}
          >
            {copy.staticEyebrow[lang]} · {copy.scrollLabel[lang]}
          </p>
        </div>

        {/* scene step dots */}
        <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-2">
          {nodes.map((node, i) => (
            <div
              key={node.slug}
              className="h-8 w-0.5 rounded-full transition-colors duration-300"
              style={{
                background: i === activeIndex ? active.accent : "rgba(255,255,255,0.12)",
                opacity: i === activeIndex ? 1 : 0.5,
              }}
            />
          ))}
        </div>

        <div className={`absolute inset-x-0 bottom-0 flex px-6 pb-12 pt-8 md:pb-16 lg:items-center ${variant === "apps" ? "top-32" : "top-28"} items-end`}>
          <div className="pointer-events-auto mx-auto w-full max-w-7xl">
            {narrative ? (
              <FlowScrollCopy
                node={active}
                narrative={narrative}
                sceneLocal={sceneLocal}
                lang={lang}
                exploreLabel={copy.explore[lang]}
                tone={variant === "apps" ? "apps" : "gaming"}
              />
            ) : (
              <div>
                <h2
                  className="font-display text-4xl font-bold tracking-tight md:text-5xl"
                  style={{ color: active.accentMuted }}
                >
                  {active.name}
                </h2>
                <p className="mt-2 max-w-md text-sm text-white/55">{active.subtitle}</p>
                <Link
                  href={active.href}
                  className="focus-ring mt-8 inline-flex w-fit rounded-full px-6 py-3 text-sm font-semibold text-[#050816]"
                  style={{ background: active.accent }}
                >
                  {copy.explore[lang]} →
                </Link>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
