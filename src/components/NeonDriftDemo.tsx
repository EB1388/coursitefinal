"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/context/LocaleContext";

type Enemy = { x: number; y: number; r: number };

export function NeonDriftDemo({ accent }: { accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tr } = useLocale();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let orb = { x: 0, y: 0 };
    let dragging = false;
    let enemies: Enemy[] = [];
    let gems = 0;
    let tick = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      orb = { x: rect.width / 2, y: rect.height / 2 };
    };

    const spawnEnemy = (w: number, h: number) => {
      const edge = Math.floor(Math.random() * 4);
      let x = 0;
      let y = 0;
      if (edge === 0) {
        x = Math.random() * w;
        y = -20;
      } else if (edge === 1) {
        x = w + 20;
        y = Math.random() * h;
      } else if (edge === 2) {
        x = Math.random() * w;
        y = h + 20;
      } else {
        x = -20;
        y = Math.random() * h;
      }
      enemies.push({ x, y, r: 10 + Math.random() * 8 });
    };

    const pointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      orb.x = e.clientX - rect.left;
      orb.y = e.clientY - rect.top;
    };

    canvas.addEventListener("pointerdown", (e) => {
      dragging = true;
      canvas.setPointerCapture(e.pointerId);
      pointer(e);
    });
    canvas.addEventListener("pointermove", (e) => {
      if (dragging) pointer(e);
    });
    canvas.addEventListener("pointerup", () => {
      dragging = false;
    });

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      tick++;

      if (tick % 45 === 0) spawnEnemy(w, h);

      ctx.fillStyle = "#050816";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = `${accent}22`;
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }

      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        const dx = orb.x - e.x;
        const dy = orb.y - e.y;
        const dist = Math.hypot(dx, dy) || 1;
        e.x += (dx / dist) * 1.8;
        e.y += (dy / dist) * 1.8;

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ff2d95";
        ctx.fill();

        if (dist < e.r + 14) {
          enemies = [];
          gems = 0;
          setScore(0);
        }
      }

      if (tick % 60 === 0) {
        const gx = 40 + Math.random() * (w - 80);
        const gy = 40 + Math.random() * (h - 80);
        const gdist = Math.hypot(orb.x - gx, orb.y - gy);
        if (gdist < 20) {
          gems++;
          setScore(gems);
        }
        ctx.beginPath();
        ctx.arc(gx, gy, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#00f5d4";
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.shadowBlur = 20;
      ctx.shadowColor = accent;
      ctx.fill();
      ctx.shadowBlur = 0;

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [accent]);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#050816]">
      <div className="border-b border-white/5 px-4 py-3 text-xs text-white/50">
        {tr("playDemo")} — drag to dodge
      </div>
      <canvas ref={canvasRef} className="h-[320px] w-full touch-none" />
    </div>
  );
}
