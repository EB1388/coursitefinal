"use client";

import { useMemo, useRef, type ComponentType, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, MeshDistortMaterial, Stars, Torus, Trail } from "@react-three/drei";
import * as THREE from "three";
import { SceneLighting } from "@/components/three/SceneLighting";
import {
  DriftField,
  GlowOrb,
  Nebula,
  useRingWaves,
  useSceneTime,
} from "@/components/three/SceneKit";
import { productSceneConfigs, type ProductSceneSlug } from "@/lib/productScenes";

export type SceneDriveProps = {
  progress?: MutableRefObject<number>;
  intensity?: number;
  transparentBg?: boolean;
  /** Cinema = hi-res fullscreen flow · Flow = perf-optimised scroll · Minimal = calm apps flow */
  detail?: "standard" | "cinema" | "flow" | "minimal";
};

/* ------------------------------------------------------------------ */
/* Starhook — comet threads a living constellation                     */
/* ------------------------------------------------------------------ */
function StarhookScene({ progress, intensity = 1, transparentBg, detail = "standard" }: SceneDriveProps) {
  const cfg = productSceneConfigs.starhook;
  const cinema = detail === "cinema";
  const cometRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const starRefs = useRef<(THREE.Group | null)[]>([]);
  const time = useSceneTime(progress);

  const stars = useMemo<[number, number, number][]>(
    () => [
      [0, 0.1, 0],
      [2.3, 0.7, -1.1],
      [1.4, -0.9, -2.6],
      [-1.2, -0.4, -1.8],
      [-2.4, 0.6, -3.1],
      [0.4, 1.2, -4],
      [2.6, -0.3, -4.6],
    ],
    [],
  );
  const linePoints = useMemo(() => stars.map((s) => new THREE.Vector3(...s)), [stars]);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(stars.map((s) => new THREE.Vector3(...s)), false, "catmullrom", 0.4),
    [stars],
  );

  useFrame(() => {
    const p = progress?.current ?? 0;
    const t = time.current;

    if (cometRef.current) {
      const u = (t * 0.06) % 1;
      const pos = curve.getPointAt(u);
      cometRef.current.position.copy(pos);

      // "hook" pulse when the comet passes near an anchor star
      starRefs.current.forEach((star, i) => {
        if (!star) return;
        const d = pos.distanceTo(linePoints[i]);
        const pop = d < 0.5 ? 1 + (0.5 - d) * 1.6 : 1;
        star.scale.setScalar(THREE.MathUtils.lerp(star.scale.x, pop, 0.2));
      });
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.25 + p * 0.4;
      groupRef.current.rotation.x = Math.sin(t * 0.07) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {!transparentBg && (
        <>
          <color attach="background" args={[cfg.background]} />
          <fog attach="fog" args={[cfg.fog, 5, 18]} />
        </>
      )}
      <SceneLighting accent={cfg.primary} secondary={cfg.secondary} sparkleColor={cfg.secondary} />
      <Nebula
        blobs={[
          { position: [-2.5, 1.5, -6], color: cfg.primary, scale: 7, opacity: 0.14 },
          { position: [3, -1.5, -7], color: cfg.secondary, scale: 6, opacity: 0.1 },
        ]}
      />
      <Stars radius={14} depth={45} count={cinema ? 2000 : 900} factor={cinema ? 2.6 : 2.2} saturation={0} fade speed={0.4} />
      <DriftField count={cinema ? 120 : 70} color={cfg.primary} spread={14} size={cinema ? 0.06 : 0.05} opacity={0.5} progress={progress} />

      <Line points={linePoints} color={cfg.primary} opacity={0.5 * intensity} transparent lineWidth={2} />

      {stars.map((pos, i) => (
        <group
          key={i}
          position={pos}
          ref={(el) => {
            starRefs.current[i] = el;
          }}
        >
          <GlowOrb
            radius={i === 0 ? (cinema ? 0.28 : 0.22) : cinema ? 0.18 : 0.15}
            color={i === 0 ? cfg.secondary : cfg.primary}
            emissiveIntensity={1.3 * intensity}
            haloOpacity={0.16}
            segments={cinema ? 48 : 32}
          />
        </group>
      ))}

      <Trail width={0.35} length={9} color={cfg.secondary} attenuation={(w) => w * w}>
        <mesh ref={cometRef}>
          <sphereGeometry args={[0.12, 18, 18]} />
          <meshStandardMaterial color="#ffffff" emissive={cfg.secondary} emissiveIntensity={2.4 * intensity} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Neon Drift — orb weaves a neon arena                                */
/* ------------------------------------------------------------------ */
function NeonDriftScene({ progress, intensity = 1, transparentBg, detail = "standard" }: SceneDriveProps) {
  const cfg = productSceneConfigs.neondrift;
  const cinema = detail === "cinema";
  const orbRef = useRef<THREE.Mesh>(null);
  const gemRefs = useRef<(THREE.Group | null)[]>([]);
  const enemiesRef = useRef<THREE.Group>(null);
  const powerRef = useRef<THREE.Mesh>(null);
  const time = useSceneTime(progress);
  const ringRefs = useRingWaves(3, 3.2, 3.2);

  const gems = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        x: Math.cos((i / 10) * Math.PI * 2) * (1.6 + (i % 3) * 0.4),
        z: Math.sin((i / 10) * Math.PI * 2) * (1.6 + (i % 3) * 0.4),
        y: (i % 2) * 0.3 - 0.15,
      })),
    [],
  );

  const orbPos = useRef(new THREE.Vector3());
  useFrame(() => {
    const t = time.current;
    if (orbRef.current) {
      // Lissajous weave path
      orbPos.current.set(Math.sin(t * 1.1) * 1.6, Math.sin(t * 1.7) * 0.4, Math.cos(t * 0.8) * 1.3);
      orbRef.current.position.copy(orbPos.current);
    }
    gemRefs.current.forEach((gem, i) => {
      if (!gem) return;
      gem.rotation.y = t * 1.5 + i;
      gem.rotation.x = t * 0.8;
      const base = gems[i];
      const d = orbPos.current.distanceTo(new THREE.Vector3(base.x, base.y, base.z));
      const pop = d < 0.6 ? 1.7 : 1;
      gem.scale.setScalar(THREE.MathUtils.lerp(gem.scale.x, pop, 0.15));
      gem.position.y = base.y + Math.sin(t * 2 + i) * 0.08;
    });
    if (enemiesRef.current) {
      enemiesRef.current.children.forEach((child, i) => {
        const r = 2.6 + Math.sin(t * 0.5 + i) * 0.2;
        child.position.set(Math.cos(t * 0.35 + i * 2.1) * r, 0.15 + Math.sin(t + i) * 0.1, Math.sin(t * 0.3 + i * 2.1) * r);
        const s = 1 + Math.sin(t * 3 + i) * 0.12;
        child.scale.setScalar(s);
      });
    }
    if (powerRef.current) {
      powerRef.current.position.set(Math.sin(t * 0.6) * 0.8, 0.4 + Math.sin(t * 1.4) * 0.15, Math.cos(t * 0.5) * 0.8);
      powerRef.current.rotation.y = t;
    }
  });

  return (
    <group>
      {!transparentBg && (
        <>
          <color attach="background" args={[cfg.background]} />
          <fog attach="fog" args={[cfg.fog, 3, 15]} />
        </>
      )}
      <SceneLighting accent={cfg.primary} secondary={cfg.secondary} sparkleColor="#00FF88" sparkleCount={30} />
      <Nebula
        blobs={[
          { position: [-2.5, 1, -5], color: cfg.primary, scale: 6, opacity: 0.12 },
          { position: [2.5, -1, -5], color: cfg.secondary, scale: 6, opacity: 0.12 },
        ]}
      />

      {/* Arena floor + pulse rings */}
      <group position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <planeGeometry args={[9, 9, 24, 24]} />
          <meshBasicMaterial color={cfg.primary} wireframe transparent opacity={0.09 * intensity} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            ref={(el) => {
              ringRefs.current[i] = el;
            }}
          >
            <ringGeometry args={[0.9, 1, 48]} />
            <meshBasicMaterial color={cfg.primary} transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
        ))}
      </group>

      {gems.map((g, i) => (
        <group
          key={i}
          position={[g.x, g.y, g.z]}
          ref={(el) => {
            gemRefs.current[i] = el;
          }}
        >
          <mesh>
            <octahedronGeometry args={[0.14, 0]} />
            <meshStandardMaterial color={cfg.accent} emissive={cfg.accent} emissiveIntensity={1.3 * intensity} toneMapped={false} />
          </mesh>
          <mesh scale={1.8}>
            <octahedronGeometry args={[0.14, 0]} />
            <meshBasicMaterial color={cfg.accent} transparent opacity={0.12} depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      ))}

      <group ref={enemiesRef}>
        {[0, 1, 2, 3].map((i) => (
          <group key={`enemy-${i}`}>
            <mesh>
              <icosahedronGeometry args={[0.2, 0]} />
              <meshStandardMaterial color="#FF3359" emissive="#FF3359" emissiveIntensity={1.3 * intensity} toneMapped={false} />
            </mesh>
            <mesh scale={1.8}>
              <sphereGeometry args={[0.2, 12, 12]} />
              <meshBasicMaterial color="#FF3359" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>
        ))}
      </group>

      <mesh ref={powerRef}>
        <icosahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={1.5 * intensity} toneMapped={false} />
      </mesh>

      <Trail width={cinema ? 0.6 : 0.5} length={cinema ? 18 : 14} color={cfg.primary} attenuation={(w) => w * w}>
        <mesh ref={orbRef}>
          <sphereGeometry args={[cinema ? 0.32 : 0.24, cinema ? 36 : 28, cinema ? 36 : 28]} />
          <meshStandardMaterial color={cfg.primary} emissive={cfg.primary} emissiveIntensity={1.8 * intensity} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Spin Dodge — Ember Circuit orbital dodge                            */
/* ------------------------------------------------------------------ */
function SpinDodgeScene({ progress, intensity = 1, transparentBg, detail = "standard" }: SceneDriveProps) {
  const cfg = productSceneConfigs.spindodge;
  const cinema = detail === "cinema";
  const playerRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const hazardsRef = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Group>(null);
  const ring2 = useRef<THREE.Group>(null);
  const time = useSceneTime(progress);
  const bossWaves = useRingWaves(2, 2.6, 3);
  const dirRef = useRef(1);
  const lastFlip = useRef(0);

  useFrame(() => {
    const t = time.current;
    // flip direction on a rhythm
    if (t - lastFlip.current > 1.4) {
      dirRef.current *= -1;
      lastFlip.current = t;
    }
    if (playerRef.current) {
      const r = 1.6;
      const angle = t * 1.7 * dirRef.current;
      playerRef.current.position.set(Math.cos(angle) * r, Math.sin(angle) * r * 0.32, Math.sin(angle) * r * 0.15);
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 2.4) * 0.06;
      coreRef.current.scale.setScalar(s);
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.4;
    if (ring2.current) ring2.current.rotation.z = -t * 0.3;
    if (hazardsRef.current) {
      hazardsRef.current.children.forEach((child, i) => {
        // plasma hazards spiral inward then reset
        const phase = ((t * 0.35 + i / 5) % 1);
        const r = 3.2 - phase * 2.4;
        const a = i * 1.6 + t * 0.6;
        child.position.set(Math.cos(a) * r, Math.sin(a * 1.3) * 0.4, Math.sin(a) * r);
        child.scale.setScalar(0.6 + phase * 0.8);
      });
    }
  });

  return (
    <group>
      {!transparentBg && (
        <>
          <color attach="background" args={[cfg.background]} />
          <fog attach="fog" args={[cfg.fog, 3, 17]} />
        </>
      )}
      <SceneLighting accent={cfg.primary} secondary={cfg.secondary} sparkleColor={cfg.accent} sparkleCount={32} />
      <Nebula
        blobs={[
          { position: [0, 0, -6], color: cfg.secondary, scale: 7, opacity: 0.1 },
          { position: [2.5, 1.5, -5], color: cfg.primary, scale: 5, opacity: 0.1 },
        ]}
      />

      {/* Circuit grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <planeGeometry args={[8, 8, 18, 18]} />
        <meshBasicMaterial color={cfg.primary} wireframe transparent opacity={0.07 * intensity} />
      </mesh>

      {/* Ember core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[cinema ? 0.58 : 0.5, cinema ? 5 : 4]} />
        <MeshDistortMaterial
          color={cfg.secondary}
          emissive={cfg.secondary}
          emissiveIntensity={1.5 * intensity}
          distort={0.22}
          speed={2.2}
          roughness={0.3}
          metalness={0.4}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={1.7}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={cfg.secondary} transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Boss ring waves */}
      {[0, 1].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            bossWaves.current[i] = el;
          }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.9, 0.96, 64]} />
          <meshBasicMaterial color="#9E47FF" transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}

      {/* Orbit rings */}
      <group ref={ring1}>
        <Torus args={[1.6, 0.03, 12, 90]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={cfg.primary} emissive={cfg.primary} emissiveIntensity={1.3 * intensity} toneMapped={false} />
        </Torus>
      </group>
      <group ref={ring2}>
        <Torus args={[1.9, 0.02, 12, 90]} rotation={[Math.PI / 2.4, 0.3, 0]}>
          <meshStandardMaterial color={cfg.primary} emissive={cfg.primary} emissiveIntensity={0.7 * intensity} toneMapped={false} transparent opacity={0.5} />
        </Torus>
      </group>

      {/* Player */}
      <Trail width={0.18} length={7} color={cfg.primary} attenuation={(w) => w * w}>
        <mesh ref={playerRef}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive={cfg.primary} emissiveIntensity={2 * intensity} toneMapped={false} />
        </mesh>
      </Trail>

      {/* Plasma hazards */}
      <group ref={hazardsRef}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i}>
            <tetrahedronGeometry args={[0.17, 0]} />
            <meshStandardMaterial color={cfg.accent} emissive={cfg.accent} emissiveIntensity={1.4 * intensity} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* CourLearn — Sophie, a living AI coach orb                           */
/* ------------------------------------------------------------------ */
function CourLearnScene({ progress, intensity = 1, transparentBg, detail = "standard" }: SceneDriveProps) {
  const cfg = productSceneConfigs.courlearn;
  const minimal = detail === "minimal";
  const flow = detail === "flow" || minimal;
  const orbRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const spiralRef = useRef<THREE.Points>(null);
  const time = useSceneTime(progress);

  const spiralPositions = useMemo(() => {
    if (minimal) return new Float32Array(0);
    const n = flow ? 48 : 100;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const t = i / n;
      const r = 1.4 + t * 1.8;
      const a = t * Math.PI * 6;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.sin(a * 1.4) * r * 0.28;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, [flow]);

  useFrame(() => {
    const t = time.current;
    const speakPulse = flow || minimal ? 0 : Math.max(0, Math.sin(t * 0.9)) ** 3;
    if (orbRef.current) orbRef.current.rotation.y = t * (minimal ? 0.12 : 0.3);
    if (coreRef.current) {
      const breathe = 1 + Math.sin(t * 1.1) * 0.05 + speakPulse * 0.12;
      coreRef.current.scale.setScalar(breathe);
    }
    if (ring1.current) {
      ring1.current.rotation.z = t * (minimal ? 0.15 : 0.5);
      ring1.current.rotation.x = Math.sin(t * 0.4) * (minimal ? 0.08 : 0.4);
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.35;
      ring2.current.rotation.y = Math.cos(t * 0.3) * 0.5;
    }
    if (spiralRef.current) {
      spiralRef.current.rotation.y = t * 0.55;
      spiralRef.current.rotation.x = Math.sin(t * 0.25) * 0.15;
    }
  });

  return (
    <group>
      {!transparentBg && (
        <>
          <color attach="background" args={[cfg.background]} />
          <fog attach="fog" args={[cfg.fog, 2, 13]} />
        </>
      )}
      <SceneLighting
        accent={cfg.primary}
        secondary={cfg.accent}
        sparkleColor={cfg.secondary}
        sparkleCount={flow ? 16 : 40}
        lite={flow}
        minimal={minimal}
      />
      {!flow && (
        <Nebula
          blobs={[
            { position: [-1.5, 1, -4], color: cfg.primary, scale: 6, opacity: 0.16 },
            { position: [2, -1, -5], color: cfg.accent, scale: 5, opacity: 0.12 },
          ]}
        />
      )}
      {minimal && (
        <Nebula
          blobs={[
            { position: [-1.2, 0.6, -3.5], color: cfg.primary, scale: 4.5, opacity: 0.14 },
            { position: [1.4, -0.5, -4], color: cfg.accent, scale: 3.8, opacity: 0.1 },
          ]}
        />
      )}

      <group ref={orbRef}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.6, flow ? 32 : 64, flow ? 32 : 64]} />
          {minimal ? (
            <meshStandardMaterial
              color="#f4f4f8"
              emissive={cfg.primary}
              emissiveIntensity={0.55 * intensity}
              roughness={0.35}
              metalness={0.12}
              toneMapped={false}
            />
          ) : flow ? (
            <meshStandardMaterial
              color={cfg.primary}
              emissive={cfg.secondary}
              emissiveIntensity={0.7 * intensity}
              roughness={0.2}
              metalness={0.25}
              toneMapped={false}
              transparent
              opacity={0.92}
            />
          ) : (
            <MeshDistortMaterial
              color={cfg.primary}
              emissive={cfg.secondary}
              emissiveIntensity={0.55 * intensity}
              distort={0.32}
              speed={1.6}
              roughness={0.12}
              metalness={0.3}
              transparent
              opacity={0.92}
            />
          )}
        </mesh>
        {minimal ? (
          <mesh scale={1.22}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshBasicMaterial color={cfg.accent} transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        ) : (
          <mesh scale={1.3}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshBasicMaterial color={cfg.primary} transparent opacity={0.07} depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        )}

        <mesh ref={ring1}>
          <torusGeometry args={[0.85, minimal ? 0.012 : 0.02, 8, flow ? 48 : 80]} />
          <meshStandardMaterial
            color={cfg.accent}
            emissive={cfg.accent}
            emissiveIntensity={(minimal ? 0.65 : 1.1) * intensity}
            toneMapped={false}
            transparent
            opacity={minimal ? 0.72 : 0.8}
          />
        </mesh>
        {minimal ? (
          <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.05, 0.006, 8, 64]} />
            <meshStandardMaterial color={cfg.secondary} emissive={cfg.secondary} emissiveIntensity={0.45 * intensity} toneMapped={false} transparent opacity={0.5} />
          </mesh>
        ) : (
          <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1, 0.015, 8, flow ? 56 : 90]} />
            <meshStandardMaterial color={cfg.secondary} emissive={cfg.secondary} emissiveIntensity={0.8 * intensity} toneMapped={false} transparent opacity={0.55} />
          </mesh>
        )}
        {!flow && (
          <mesh rotation={[0, Math.PI / 3, Math.PI / 4]}>
            <torusGeometry args={[1.15, 0.01, 8, 90]} />
            <meshStandardMaterial color={cfg.primary} emissive={cfg.primary} emissiveIntensity={0.6 * intensity} toneMapped={false} transparent opacity={0.4} />
          </mesh>
        )}
      </group>

      {!minimal && (
        <points ref={spiralRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[spiralPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial size={flow ? 0.05 : 0.045} color={cfg.secondary} transparent opacity={0.8} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {!flow && <DriftField count={40} color={cfg.primary} spread={9} size={0.04} opacity={0.35} progress={progress} />}
      {minimal && <DriftField count={18} color={cfg.accent} spread={7} size={0.035} opacity={0.45} progress={progress} />}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Sonr — dual audio orbs + circular waveform                          */
/* ------------------------------------------------------------------ */
/** Instanced circular waveform — one draw call instead of 40 */
function SonrWaveRing({
  count,
  radius,
  color,
  intensity,
  time,
}: {
  count: number;
  radius: number;
  color: string;
  intensity: number;
  time: MutableRefObject<number>;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = time.current;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const h = 0.15 + Math.abs(Math.sin(t * 2.4 + i * 0.5)) * 0.55;
      dummy.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius);
      dummy.rotation.set(0, -a, 0);
      dummy.scale.set(1, h / 0.15, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.05, 0.15, 0.05]} />
      <meshStandardMaterial color="#F6F7FB" emissive={color} emissiveIntensity={0.6 * intensity} toneMapped={false} />
    </instancedMesh>
  );
}

function SonrScene({ progress, intensity = 1, transparentBg, detail = "standard" }: SceneDriveProps) {
  const cfg = productSceneConfigs.sonr;
  const minimal = detail === "minimal";
  const flow = detail === "flow" || minimal;
  const groupRef = useRef<THREE.Group>(null);
  const orbA = useRef<THREE.Group>(null);
  const orbB = useRef<THREE.Group>(null);
  const notesRef = useRef<THREE.Group>(null);
  const time = useSceneTime(progress);
  const captureWaves = useRingWaves(flow ? 1 : 2, 3, 2.6);

  const waveCount = minimal ? 20 : flow ? 24 : 36;
  const noteCount = minimal ? 0 : flow ? 4 : 6;

  useFrame(() => {
    const t = time.current;
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(t * (minimal ? 0.12 : 0.25)) * (minimal ? 0.08 : 0.2) +
        (progress?.current ?? 0) * (minimal ? 0.12 : 0.25);
    }
    if (orbA.current) {
      orbA.current.position.x = minimal ? -0.22 + Math.sin(t * 0.5) * 0.04 : -0.35 + Math.sin(t * 0.8) * 0.12;
      orbA.current.scale.setScalar(1 + Math.sin(t * (minimal ? 1.2 : 2.2)) * (minimal ? 0.02 : 0.06));
    }
    if (orbB.current) {
      orbB.current.position.x = minimal ? 0.22 - Math.sin(t * 0.5) * 0.04 : 0.35 - Math.sin(t * 0.8) * 0.12;
      orbB.current.scale.setScalar(1 + Math.cos(t * (minimal ? 1.2 : 2.2)) * (minimal ? 0.02 : 0.06));
    }
    if (notesRef.current) {
      notesRef.current.children.forEach((child, i) => {
        const a = t * 0.4 + (i / noteCount) * Math.PI * 2;
        const r = 1.9 + Math.sin(t * 0.5 + i) * 0.2;
        child.position.set(Math.cos(a) * r, Math.sin(t * 0.7 + i) * 0.5, Math.sin(a) * r);
        child.rotation.y = t + i;
      });
    }
  });

  return (
    <group>
      {!transparentBg && (
        <>
          <color attach="background" args={[cfg.background]} />
          <fog attach="fog" args={[cfg.fog, 2, 13]} />
        </>
      )}
      <SceneLighting
        accent={cfg.primary}
        secondary={cfg.secondary}
        sparkleColor={cfg.accent}
        sparkleCount={flow ? 14 : 34}
        lite={flow}
        minimal={minimal}
      />
      {!flow && (
        <Nebula
          blobs={[
            { position: [-1.8, 0.5, -4], color: cfg.primary, scale: 6, opacity: 0.16 },
            { position: [1.8, -0.5, -4], color: cfg.secondary, scale: 6, opacity: 0.16 },
            { position: [0, 1.5, -6], color: cfg.accent, scale: 5, opacity: 0.08 },
          ]}
        />
      )}
      {minimal && (
        <Nebula
          blobs={[
            { position: [-1.4, 0.4, -3.5], color: cfg.primary, scale: 4.2, opacity: 0.13 },
            { position: [1.4, -0.3, -3.8], color: cfg.secondary, scale: 4, opacity: 0.12 },
          ]}
        />
      )}

      <group ref={groupRef} position={[0, 0.1, 0]}>
        <group ref={orbA} position={[-0.35, 0, 0]}>
          <GlowOrb
            radius={minimal ? 0.4 : 0.5}
            color={cfg.primary}
            emissiveIntensity={(minimal ? 0.72 : 1.1) * intensity}
            haloOpacity={minimal ? 0.16 : flow ? 0.1 : 0.14}
            segments={flow ? 24 : 32}
          />
        </group>
        <group ref={orbB} position={[0.35, 0, 0.1]}>
          <GlowOrb
            radius={minimal ? 0.38 : 0.48}
            color={cfg.secondary}
            emissiveIntensity={(minimal ? 0.68 : 1.1) * intensity}
            haloOpacity={minimal ? 0.16 : flow ? 0.1 : 0.14}
            segments={flow ? 24 : 32}
          />
        </group>

        {minimal ? (
          <>
            <SonrWaveRing count={waveCount} radius={1.2} color={cfg.accent} intensity={intensity} time={time} />
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.02, 1.04, 96]} />
              <meshBasicMaterial color={cfg.accent} transparent opacity={0.22} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
          </>
        ) : (
          <SonrWaveRing count={waveCount} radius={1.35} color={cfg.accent} intensity={intensity} time={time} />
        )}

        {!flow &&
          [0, 1].map((i) => (
            <mesh
              key={i}
              ref={(el) => {
                captureWaves.current[i] = el;
              }}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <ringGeometry args={[0.9, 0.94, 64]} />
              <meshBasicMaterial color={cfg.accent} transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
          ))}

        {noteCount > 0 && (
          <group ref={notesRef}>
            {Array.from({ length: noteCount }).map((_, i) => (
              <mesh key={i}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? cfg.primary : cfg.secondary}
                  emissive={i % 2 === 0 ? cfg.primary : cfg.secondary}
                  emissiveIntensity={1.3 * intensity}
                  toneMapped={false}
                />
              </mesh>
            ))}
          </group>
        )}
      </group>
    </group>
  );
}

const sceneMap: Record<ProductSceneSlug, ComponentType<SceneDriveProps>> = {
  starhook: StarhookScene,
  neondrift: NeonDriftScene,
  spindodge: SpinDodgeScene,
  courlearn: CourLearnScene,
  sonr: SonrScene,
};

export function ProductScene({
  slug,
  progress,
  intensity = 1,
  transparentBg = false,
  detail = "standard",
}: {
  slug: ProductSceneSlug;
  progress?: MutableRefObject<number>;
  intensity?: number;
  transparentBg?: boolean;
  detail?: "standard" | "cinema" | "flow" | "minimal";
}) {
  const Scene = sceneMap[slug];
  const scale = detail === "cinema" ? 1.22 : detail === "flow" ? 1.1 : detail === "minimal" ? 1.1 : 1;
  return (
    <group scale={scale}>
      <Scene progress={progress} intensity={intensity} transparentBg={transparentBg} detail={detail} />
    </group>
  );
}
