"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import type { MutableRefObject } from "react";

/**
 * Renders at the highest resolution the GPU can sustain, then steps DPR down
 * the moment framerate drops — 4K-crisp when possible, always smooth.
 */
export function AdaptiveQuality({ max = 2, min = 1 }: { max?: number; min?: number }) {
  const setDpr = useThree((s) => s.setDpr);
  const dpr = useRef(max);
  return (
    <PerformanceMonitor
      onIncline={() => {
        dpr.current = Math.min(max, dpr.current + 0.5);
        setDpr(dpr.current);
      }}
      onDecline={() => {
        dpr.current = Math.max(min, dpr.current - 0.5);
        setDpr(dpr.current);
      }}
      flipflops={4}
      onFallback={() => {
        dpr.current = min;
        setDpr(min);
      }}
    />
  );
}

/** Max device pixel ratio worth rendering — native on hi-DPI, capped for perf */
export function maxRenderDpr(cap = 2) {
  if (typeof window === "undefined") return 1.5;
  return Math.min(window.devicePixelRatio || 1, cap);
}

/** Shared scroll-time hook — blends continuous time with scroll progress */
export function useSceneTime(progress?: MutableRefObject<number>) {
  const t = useRef(0);
  useFrame((_, delta) => {
    const p = progress?.current ?? 0;
    t.current += Math.min(delta, 0.05) * (0.6 + p * 0.9);
  });
  return t;
}

/** Subtle vignette for apps flow — no bloom */
export function SceneEffectsMinimal() {
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Vignette eskil={false} offset={0.32} darkness={0.42} />
    </EffectComposer>
  );
}

/** Premium bloom + vignette pass. Gate behind desktop tier for perf. */
export function SceneEffects({
  intensity = 0.9,
  threshold = 0.18,
}: {
  intensity?: number;
  threshold?: number;
}) {
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom
        intensity={intensity}
        luminanceThreshold={threshold}
        luminanceSmoothing={0.35}
        mipmapBlur
        radius={0.7}
        resolutionScale={0.5}
      />
      <Vignette eskil={false} offset={0.25} darkness={0.6} />
    </EffectComposer>
  );
}

/** Layered drifting particle field with depth + parallax */
export function DriftField({
  count = 160,
  color = "#ffffff",
  spread = 16,
  size = 0.045,
  speed = 1,
  opacity = 0.6,
  progress,
}: {
  count?: number;
  color?: string;
  spread?: number;
  size?: number;
  speed?: number;
  opacity?: number;
  progress?: MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Points>(null);
  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.62;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return { positions };
  }, [count, spread]);

  const time = useRef(0);
  useFrame((_, delta) => {
    time.current += Math.min(delta, 0.05) * speed;
    const pts = ref.current;
    if (!pts) return;
    const p = progress?.current ?? 0;
    pts.rotation.y = time.current * 0.04 + p * 0.3;
    pts.rotation.x = Math.sin(time.current * 0.2) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Soft additive nebula blobs for atmospheric depth */
export function Nebula({
  blobs,
}: {
  blobs: { position: [number, number, number]; color: string; scale: number; opacity?: number }[];
}) {
  const texture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.35)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += delta * 0.01;
  });

  return (
    <group ref={groupRef}>
      {blobs.map((b, i) => (
        <sprite key={i} position={b.position} scale={[b.scale, b.scale, 1]}>
          <spriteMaterial
            map={texture}
            color={b.color}
            transparent
            opacity={b.opacity ?? 0.18}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

/** Glowing orb with layered halo shells */
export function GlowOrb({
  radius = 0.4,
  color,
  emissiveIntensity = 1.4,
  haloOpacity = 0.12,
  segments = 32,
}: {
  radius?: number;
  color: string;
  emissiveIntensity?: number;
  haloOpacity?: number;
  segments?: number;
}) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, segments, segments]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={emissiveIntensity} toneMapped={false} />
      </mesh>
      <mesh scale={1.5}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={haloOpacity} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh scale={2.4}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={haloOpacity * 0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

/** Expanding ring wave that resets — good for pulses/shockwaves */
export function useRingWaves(count: number, period: number, maxScale: number) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const time = useRef(0);
  useFrame((_, delta) => {
    time.current += Math.min(delta, 0.05);
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = ((time.current / period + i / count) % 1);
      const scale = 0.3 + phase * maxScale;
      mesh.scale.setScalar(scale);
      const mat = mesh.material as THREE.Material & { opacity: number };
      mat.opacity = (1 - phase) * 0.5;
    });
  });
  return refs;
}
