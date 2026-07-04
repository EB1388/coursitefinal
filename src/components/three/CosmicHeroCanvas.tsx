"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionTier } from "@/hooks/useMotionTier";

function Starfield({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8db4ff"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Comet({ tier }: { tier: MotionTier }) {
  const ref = useRef<THREE.Mesh>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    const sway = tier === "full" ? pointer.x * 0.8 : 0;
    ref.current.position.x = Math.sin(t * 0.4) * 2.5 + sway;
    ref.current.position.y = Math.cos(t * 0.55) * 1.2 + 0.5;
    ref.current.position.z = -3;
    if (tailRef.current) {
      tailRef.current.position.copy(ref.current.position);
      tailRef.current.position.x -= 0.6 + sway * 0.2;
      tailRef.current.rotation.z = Math.atan2(
        ref.current.position.y,
        ref.current.position.x,
      );
    }
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#ffd87a" />
      </mesh>
      <mesh ref={tailRef} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.08, 1.2, 8]} />
        <meshBasicMaterial color="#8db4ff" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function Scene({ tier }: { tier: MotionTier }) {
  const { camera } = useThree();
  const parallax = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (tier !== "full") return;
    parallax.current.x = THREE.MathUtils.lerp(parallax.current.x, state.pointer.x * 0.35, 0.05);
    parallax.current.y = THREE.MathUtils.lerp(parallax.current.y, state.pointer.y * 0.2, 0.05);
    camera.position.x = parallax.current.x;
    camera.position.y = parallax.current.y;
  });

  return (
    <>
      <color attach="background" args={["#050816"]} />
      <fog attach="fog" args={["#050816", 8, 28]} />
      <ambientLight intensity={0.25} />
      <Starfield count={tier === "full" ? 2200 : 900} />
      <Comet tier={tier} />
    </>
  );
}

export function CosmicHeroCanvas({ tier }: { tier: MotionTier }) {
  if (tier === "static") return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-90" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={tier === "full" ? [1, 1.5] : [1, 1]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Scene tier={tier} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />
    </div>
  );
}
