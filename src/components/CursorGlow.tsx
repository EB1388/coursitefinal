"use client";

import { useEffect, useRef } from "react";

export function CursorGlow({ color = "rgba(141, 180, 255, 0.15)" }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[400px] w-[400px] rounded-full blur-3xl transition-opacity duration-300"
      style={{ background: color }}
    />
  );
}
