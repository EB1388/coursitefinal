"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/context/LocaleContext";

type Vec = { x: number; y: number };

export function StarhookMiniDemo({ accent }: { accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tr } = useLocale();
  const [score, setScore] = useState(0);
  const stateRef = useRef({
    stars: [] as Vec[],
    current: 0,
    comet: { x: 0, y: 0, angle: 0, orbiting: true, speed: 0.04, radius: 52 },
    flying: false,
    flyVel: { x: 0, y: 0 },
    score: 0,
  });

  const reset = useCallback((w: number, h: number) => {
    const stars: Vec[] = [];
    for (let i = 0; i < 5; i++) {
      stars.push({
        x: 60 + Math.random() * (w - 120),
        y: 60 + Math.random() * (h - 120),
      });
    }
    stateRef.current = {
      stars,
      current: 0,
      comet: {
        x: stars[0].x,
        y: stars[0].y,
        angle: 0,
        orbiting: true,
        speed: 0.04,
        radius: 52,
      },
      flying: false,
      flyVel: { x: 0, y: 0 },
      score: 0,
    };
    setScore(0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (stateRef.current.stars.length === 0) reset(rect.width, rect.height);
    };

    const launch = () => {
      const s = stateRef.current;
      if (!s.flying && s.comet.orbiting) {
        const star = s.stars[s.current];
        const next = s.stars[(s.current + 1) % s.stars.length];
        const angle = Math.atan2(next.y - star.y, next.x - star.x);
        s.flyVel = { x: Math.cos(angle) * 4, y: Math.sin(angle) * 4 };
        s.flying = true;
        s.comet.orbiting = false;
      }
    };

    const onTap = () => launch();
    canvas.addEventListener("click", onTap);

    let frame = 0;
    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const s = stateRef.current;

      ctx.fillStyle = "#050816";
      ctx.fillRect(0, 0, w, h);

      for (const star of s.stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 18, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const anchor = s.stars[s.current];
      const next = s.stars[(s.current + 1) % s.stars.length];

      if (s.comet.orbiting) {
        s.comet.angle += s.comet.speed;
        s.comet.x = anchor.x + Math.cos(s.comet.angle) * s.comet.radius;
        s.comet.y = anchor.y + Math.sin(s.comet.angle) * s.comet.radius;
      } else {
        s.comet.x += s.flyVel.x;
        s.comet.y += s.flyVel.y;

        const dx = next.x - s.comet.x;
        const dy = next.y - s.comet.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 16) {
          s.current = (s.current + 1) % s.stars.length;
          s.comet.orbiting = true;
          s.flying = false;
          s.comet.angle = Math.atan2(s.comet.y - next.y, s.comet.x - next.x);
          s.score += 1;
          setScore(s.score);
        } else if (s.comet.x < 0 || s.comet.x > w || s.comet.y < 0 || s.comet.y > h) {
          reset(w, h);
        }
      }

      ctx.strokeStyle = `${accent}55`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(anchor.x, anchor.y);
      ctx.lineTo(next.x, next.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(s.comet.x, s.comet.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("click", onTap);
      window.removeEventListener("resize", resize);
    };
  }, [accent, reset]);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#050816]">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 text-xs text-white/50">
        <span>{tr("tryDemo")}</span>
        <span>
          {tr("demoScore")}: {score}
        </span>
      </div>
      <canvas ref={canvasRef} className="h-[320px] w-full cursor-pointer" />
      <p className="px-4 py-3 text-center text-xs text-white/35">{tr("demoTap")}</p>
    </div>
  );
}
