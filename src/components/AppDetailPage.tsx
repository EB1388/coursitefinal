"use client";

import Link from "next/link";
import { AppPageLinks } from "@/components/AppPageLinks";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { AppThemeBackground } from "@/components/AppThemeBackground";
import { DetailMotionGrid, DetailSection } from "@/components/DetailPageMotion";
import { NeonDriftDemo } from "@/components/NeonDriftDemo";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { SpinDodgeDemo } from "@/components/SpinDodgeDemo";
import { StarhookMiniDemo } from "@/components/StarhookMiniDemo";
import { TrailerPlayer } from "@/components/TrailerPlayer";
import type { CourApp } from "@/lib/apps";
import { useLocale } from "@/context/LocaleContext";

export function AppDetailPage({ app }: { app: CourApp }) {
  const { tr } = useLocale();

  return (
    <div className="relative overflow-hidden px-6 pb-24 pt-28">
      <AppThemeBackground slug={app.slug} />
      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/games"
          className="text-sm text-[var(--text-faint)] transition-colors hover:text-[var(--text-muted)]"
        >
          ← Games
        </Link>

        <DetailMotionGrid
          copy={
            <>
              <p className="section-label" style={{ color: app.accent }}>
                {app.category}
              </p>
              <h1 className="font-display mt-4 text-[clamp(2rem,8vw,3rem)] font-bold tracking-tight md:text-6xl">
                {app.name}
              </h1>
              <p className="mt-2 text-xl text-[var(--text-muted)]">{app.subtitle}</p>
              <p className="mt-6 text-lg leading-relaxed text-[var(--text-muted)]">
                {app.description}
              </p>

              <ul className="mt-8 space-y-3">
                {app.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-[var(--text-muted)]"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: app.accent }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <AppStoreBadge href={app.appStoreUrl} />
                <Link
                  href={`/go/${app.slug}`}
                  className="text-sm text-[var(--text-muted)] underline underline-offset-2 hover:text-[var(--text)]"
                >
                  Quick link →
                </Link>
              </div>

              <div className="mt-8">
                <AppPageLinks app={app} />
              </div>
            </>
          }
          media={
            <ScreenshotGallery
              screenshots={app.screenshots}
              accent={app.accent}
              appName={app.name}
              flipImage={app.flipScreenshots}
            />
          }
        />

        {app.trailer && (
          <DetailSection className="mt-20">
            <TrailerPlayer
              src={app.trailer}
              accent={app.accent}
              poster="/og/starhook.png"
            />
          </DetailSection>
        )}

        <DetailSection className="mt-12">
          <p className="section-label mb-4">{tr("playDemo")}</p>
          {app.slug === "starhook" && <StarhookMiniDemo accent={app.accent} />}
          {app.slug === "neondrift" && <NeonDriftDemo accent={app.accent} />}
          {app.slug === "spindodge" && <SpinDodgeDemo accent={app.accent} />}
        </DetailSection>
      </div>
    </div>
  );
}
