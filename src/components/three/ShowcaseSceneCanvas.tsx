"use client";

import dynamic from "next/dynamic";
import { useRef, type MutableRefObject, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { useMotionTier } from "@/hooks/useMotionTier";
import {
  isProductSceneSlug,
  productSceneConfigs,
  type ProductSceneSlug,
} from "@/lib/productScenes";

const View = dynamic(() => import("@react-three/drei").then((m) => m.View), { ssr: false });

const ProductScene = dynamic(
  () => import("@/components/three/ProductScenes").then((m) => m.ProductScene),
  { ssr: false },
);

const CameraDrift = dynamic(
  () => import("@/components/three/ShowcaseCameraDrift").then((m) => m.ShowcaseCameraDrift),
  { ssr: false },
);

type ShowcaseSceneCanvasProps = {
  slug: string;
  className?: string;
  progressRef?: MutableRefObject<number>;
};

export function ShowcaseSceneCanvas({
  slug,
  className = "",
  progressRef,
}: ShowcaseSceneCanvasProps) {
  const reduceMotion = useReducedMotion();
  const tier = useMotionTier();
  const trackRef = useRef<HTMLDivElement>(null);
  const localProgress = useRef(0);
  const activeRef = progressRef ?? localProgress;

  const isApp = isProductSceneSlug(slug) && (slug === "courlearn" || slug === "sonr");
  const detail = isApp ? "flow" : "standard";

  if (!isProductSceneSlug(slug) || reduceMotion || tier === "static") {
    const cfg = isProductSceneSlug(slug) ? productSceneConfigs[slug] : null;
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden
      >
        {cfg && (
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(ellipse at 50% 40%, ${cfg.primary}22, transparent 65%), radial-gradient(ellipse at 80% 80%, ${cfg.secondary}14, transparent 55%)`,
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <View
        ref={trackRef}
        track={trackRef as RefObject<HTMLElement>}
        className="absolute inset-0 h-full w-full"
        index={2}
      >
        <CameraDrift progress={activeRef} />
        <ProductScene
          slug={slug as ProductSceneSlug}
          progress={activeRef}
          intensity={0.9}
          transparentBg
          detail={detail}
        />
      </View>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/90 via-transparent to-[var(--bg)]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/85 via-transparent to-[var(--bg)]/40" />
    </div>
  );
}
