"use client";

import { CursorGlow } from "@/components/CursorGlow";
import { Starfield } from "@/components/Starfield";
import { themes } from "@/lib/themes";

export function StudioAmbient() {
  return (
    <>
      <Starfield />
      <CursorGlow color={themes.studio.cursor} />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(141,180,255,0.14),transparent)]"
      />
    </>
  );
}
