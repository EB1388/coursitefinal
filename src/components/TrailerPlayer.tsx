"use client";

import { useLocale } from "@/context/LocaleContext";

export function TrailerPlayer({
  src,
  accent,
  poster,
}: {
  src: string;
  accent: string;
  poster?: string;
}) {
  const { tr } = useLocale();

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
        <p className="text-sm font-medium text-white/70">{tr("watchTrailer")}</p>
        <span className="text-xs uppercase tracking-widest" style={{ color: accent }}>
          30s
        </span>
      </div>
      <video
        src={src}
        poster={poster}
        className="aspect-video w-full bg-black object-cover"
        muted
        loop
        playsInline
        controls
        preload="none"
      />
    </div>
  );
}
