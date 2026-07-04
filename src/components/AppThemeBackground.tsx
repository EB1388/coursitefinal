"use client";

import type { ReactNode } from "react";

const themes: Record<string, ReactNode> = {
  starhook: (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(141,180,255,0.12),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,216,122,0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
    </>
  ),
  neondrift: (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(0,245,212,0.12),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_96%,rgba(0,245,212,0.08)_100%)] [background-size:100%_4px]" />
    </>
  ),
  spindodge: (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(168,85,247,0.14),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(251,146,60,0.25)_1px,transparent_1px)] [background-size:32px_32px]" />
    </>
  ),
  sonr: (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(250,36,60,0.14),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(250,36,60,0.06)_1px,transparent_1px)] [background-size:12px_100%]" />
    </>
  ),
  courlearn: (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(125,211,252,0.12),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(249,168,212,0.1),transparent_45%)]" />
    </>
  ),
};

export function AppThemeBackground({ slug }: { slug: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {themes[slug] ?? themes.starhook}
    </div>
  );
}
