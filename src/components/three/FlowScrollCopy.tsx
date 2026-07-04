"use client";

import { AnimatePresence } from "motion/react";
import { FlowProductDisplay } from "@/components/FlowProductDisplay";
import type { FlowNarrative } from "@/lib/flowNarrative";
import type { UniverseNode } from "@/lib/universe";

export function FlowScrollCopy({
  node,
  narrative,
  sceneLocal,
  lang,
  exploreLabel,
  tone = "gaming",
}: {
  node: UniverseNode;
  narrative: FlowNarrative;
  sceneLocal: number;
  lang: "en" | "nl";
  exploreLabel: string;
  tone?: "gaming" | "apps";
}) {
  return (
    <AnimatePresence mode="wait">
      <div key={node.slug}>
        <FlowProductDisplay
          node={node}
          narrative={narrative}
          sceneLocal={sceneLocal}
          lang={lang}
          exploreLabel={exploreLabel}
          variant="scroll"
          tone={tone}
          showPhoneOnMobile
          showScreenshot={node.slug !== "courlearn"}
        />
      </div>
    </AnimatePresence>
  );
}
