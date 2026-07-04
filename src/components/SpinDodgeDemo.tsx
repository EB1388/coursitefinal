"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/context/LocaleContext";

export function SpinDodgeDemo({ accent }: { accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tr } = useLocale();
  const [score, setScore] = useState(0);
  const stateRef = useRef({ angle: 0, dir: 1, hazards: [] as { a: number; dist: number }[] });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let tick = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const flip = () => {
      stateRef.current.dir *= -1;
    };
    canvas.addEventListener("click", flip);

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const cx = w / 2;
      const cy = h / 2;
      const orbitR = Math.min(w, h) * 0.28;
      tick++;

      const s = stateRef.current;
      s.angle += 0.03 * s.dir;

      if (tick % 50 === 0) {
        s.hazards.push({ a: Math.random() * Math.PI * 2, dist: Math.min(w, h) * 0.55 });
      }

      for (const hz of s.hazards) {
        hz.dist -= 1.2;
      }
      s.hazards = s.hazards.filter((hz) => hz.dist > orbitR + 10);

      ctx.fillStyle = "#050816";
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
      ctx.strokeStyle = `${accent}44`;
      ctx.lineWidth = 2;
      ctx.stroke();

      const px = cx + Math.cos(s.angle) * orbitR;
      const py = cy + Math.sin(s.angle) * orbitR;
      ctx.beginPath();
      ctx.arc(px, py, 12, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();

      let alive = true;
      for (const hz of s.hazards) {
        const hx = cx + Math.cos(hz.a) * hz.dist;
        const hy = cy + Math.sin(hz.a) * hz.dist;
        ctx.beginPath();
        ctx.arc(hx, hy, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#fb923c";
        ctx.fill();
        if (Math.hypot(hx - px, hy - py) < 20) {
          alive = false;
        }
      }

      if (!alive) {
        s.hazards = [];
        s.angle = 0;
        setScore(0);
      } else if (tick % 30 === 0) {
        setScore((v) => v + 1);
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("click", flip);
      window.removeEventListener("resize", resize);
    };
  }, [accent]);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#050816]">
      <div className="border-b border-white/5 px-4 py-3 text-xs text-white/50">
        {tr("playDemo")} — tap to flip orbit
      </div>
      <canvas ref={canvasRef} className="h-[320px] w-full cursor-pointer" />
    </div>
  );
}
