"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/context/LocaleContext";

type MockTrack = {
  title: string;
  artist: string;
  match: number;
};

const seedTrack = { title: "Midnight Drive", artist: "Luna Ray" };

const catalog: MockTrack[] = [
  { title: "Neon Skyline", artist: "Velvet Echo", match: 94 },
  { title: "After Hours", artist: "Kairo", match: 89 },
  { title: "Glass Heart", artist: "Mira Vale", match: 86 },
  { title: "Slow Burn", artist: "North Atlas", match: 82 },
  { title: "City Lights", artist: "Analog Youth", match: 78 },
];

export function SonrVibeDemo({
  accent,
  accentMuted,
}: {
  accent: string;
  accentMuted: string;
}) {
  const { locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const [vibe, setVibe] = useState(62);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      setPhase(frame * 0.08);
    }, 50);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const picks = useMemo(() => {
    const mood = vibe / 100;
    return [...catalog]
      .map((t) => ({
        ...t,
        score: t.match * (0.72 + mood * 0.28) + Math.sin(t.title.length + vibe) * 2,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [vibe]);

  const bars = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => {
        const wave = Math.sin(phase + i * 0.45) * 0.5 + 0.5;
        const pulse = Math.sin(phase * 1.4 + i * 0.2) * 0.15;
        return 0.25 + (wave + pulse) * (0.45 + vibe / 220);
      }),
    [phase, vibe],
  );

  const copy =
    locale === "nl"
      ? {
          label: "Vibe-demo",
          hint: "Schuif om de mood te tunen — picks passen zich live aan.",
          vibe: "Vibe",
          seed: "Starttrack",
          similar: "Vergelijkbaar",
        }
      : {
          label: "Vibe demo",
          hint: "Slide to tune the mood — picks update live.",
          vibe: "Vibe",
          seed: "Seed track",
          similar: "Similar picks",
        };

  return (
    <div
      className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0e] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.45)] md:p-8"
      style={{ boxShadow: `0 40px 100px ${accent}18` }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
        {copy.label}
      </p>
      <p className="mt-2 text-sm text-white/50">{copy.hint}</p>

      <div
        className="mt-6 rounded-2xl border border-white/8 p-4"
        style={{ background: `linear-gradient(135deg, ${accent}18, transparent 65%)` }}
      >
        <p className="text-[10px] uppercase tracking-widest text-white/35">{copy.seed}</p>
        <p className="font-display mt-1 text-lg font-bold text-white">{seedTrack.title}</p>
        <p className="text-sm" style={{ color: accentMuted }}>
          {seedTrack.artist}
        </p>

        <div className="mt-4 flex h-14 items-end justify-center gap-[3px]">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-[5px] rounded-full"
              style={{ background: `linear-gradient(to top, ${accent}, ${accentMuted})` }}
              animate={{ height: `${h * 100}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.12, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-white/45">
          <span>{copy.vibe}</span>
          <span style={{ color: accentMuted }}>{vibe}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={vibe}
          onChange={(e) => setVibe(Number(e.target.value))}
          className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#fa243c]"
          aria-label={copy.vibe}
        />
      </div>

      <p className="mt-6 text-[10px] uppercase tracking-widest text-white/35">{copy.similar}</p>
      <ul className="mt-3 space-y-2">
        {picks.map((track, i) => (
          <motion.li
            key={track.title}
            layout
            className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
            initial={reduceMotion ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.25 }}
          >
            <div>
              <p className="text-sm font-medium text-white/90">{track.title}</p>
              <p className="text-xs text-white/40">{track.artist}</p>
            </div>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-semibold tabular-nums"
              style={{ background: `${accent}22`, color: accentMuted }}
            >
              {Math.round(track.score)}%
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
