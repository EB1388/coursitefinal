"use client";

import { Environment, Sparkles } from "@react-three/drei";

/** Shared premium lighting rig for product showcase scenes */
export function SceneLighting({
  accent,
  secondary,
  sparkleColor,
  sparkleCount = 40,
  lite = false,
  minimal = false,
}: {
  accent: string;
  secondary?: string;
  sparkleColor?: string;
  sparkleCount?: number;
  /** Skip expensive Environment map — use for flow / background canvases */
  lite?: boolean;
  /** Neutral, calm lighting for apps homepage flow — bright enough to read on dark UI */
  minimal?: boolean;
}) {
  const sparkles = minimal ? 16 : lite ? Math.min(sparkleCount, 18) : sparkleCount;
  return (
    <>
      <ambientLight intensity={minimal ? 0.5 : lite ? 0.12 : 0.08} />
      <hemisphereLight
        args={
          minimal
            ? ["#52525b", "#18181b", 0.78]
            : ["#1a2040", "#020208", lite ? 0.45 : 0.35]
        }
      />
      <pointLight
        position={[3, 4, 3]}
        intensity={minimal ? 0.85 : 1.1}
        color={minimal ? accent : accent}
      />
      {secondary && (
        <pointLight
          position={[-3, -2, 2]}
          intensity={minimal ? 0.5 : 0.55}
          color={minimal ? secondary : secondary}
        />
      )}
      <pointLight
        position={[0, 0, 4]}
        intensity={minimal ? 0.35 : 0}
        color="#ffffff"
      />
      <directionalLight position={[0, 5, 2]} intensity={minimal ? 0.38 : 0.25} color="#ffffff" />
      {!lite && !minimal && <Environment preset="night" environmentIntensity={0.35} />}
      {sparkles > 0 && (
        <Sparkles
          count={sparkles}
          scale={[10, 6, 10]}
          size={minimal ? 1.6 : lite ? 1.4 : 1.8}
          speed={minimal ? 0.18 : 0.22}
          opacity={minimal ? 0.42 : lite ? 0.35 : 0.45}
          color={sparkleColor ?? accent}
        />
      )}
    </>
  );
}
