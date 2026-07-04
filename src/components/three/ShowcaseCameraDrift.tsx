"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MutableRefObject } from "react";

/** Subtle scroll + time driven camera parallax for showcase scenes */
export function ShowcaseCameraDrift({ progress }: { progress: MutableRefObject<number> }) {
  const target = useRef(new THREE.Vector3(0, 0.2, 4.2));

  useFrame((state) => {
    const p = progress.current;
    const t = state.clock.elapsedTime;
    target.current.set(
      Math.sin(t * 0.12) * 0.3,
      0.2 + Math.sin(t * 0.1) * 0.08,
      THREE.MathUtils.lerp(4.4, 3.8, p),
    );
    state.camera.position.lerp(target.current, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
