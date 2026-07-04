"use client";

import { CursorGlow } from "@/components/CursorGlow";
import { Starfield } from "@/components/Starfield";
import { themes } from "@/lib/themes";

export function GamingAmbient() {
  return (
    <>
      <Starfield />
      <CursorGlow color={themes.gaming.cursor} />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(141,180,255,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(168,85,247,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(141,180,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(141,180,255,0.5)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>
    </>
  );
}
