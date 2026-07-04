"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useMotionTier } from "@/hooks/useMotionTier";
import { maxRenderDpr } from "@/components/three/SceneKit";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });

const ViewPort = dynamic(
  () => import("@react-three/drei").then((m) => m.View.Port),
  { ssr: false },
);

/**
 * One WebGL context for the whole page. Individual sections use `<View track={ref}>`
 * so only the visible viewport region renders — smooth + no context switching.
 */
export function SharedCanvasRoot({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const tier = useMotionTier();
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  if (reduceMotion || tier === "static") {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {eventSource && (
        <Canvas
          className="!fixed !inset-0 !h-full !w-full"
          style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
          eventSource={eventSource}
          dpr={tier === "full" ? maxRenderDpr(2) : 1}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
          }}
          frameloop="always"
        >
          <ViewPort />
        </Canvas>
      )}
    </>
  );
}
