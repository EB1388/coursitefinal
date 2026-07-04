"use client";

import { CursorGlow } from "@/components/CursorGlow";
import { themes } from "@/lib/themes";

export function AppsAmbient() {
  return (
    <>
      <CursorGlow color={themes.apps.cursor} />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#0c0c0f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_0%,rgba(250,36,60,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_5%_100%,rgba(125,211,252,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_50%,rgba(249,168,212,0.06),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      </div>
    </>
  );
}
