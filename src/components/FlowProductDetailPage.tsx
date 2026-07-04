"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { AppPageLinks } from "@/components/AppPageLinks";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { AppThemeBackground } from "@/components/AppThemeBackground";
import { DetailSection } from "@/components/DetailPageMotion";
import { FlowProductDisplay } from "@/components/FlowProductDisplay";
import { NeonDriftDemo } from "@/components/NeonDriftDemo";
import { ProductScreenshot } from "@/components/ProductScreenshot";
import { ProductPageLinks } from "@/components/ProductPageLinks";
import { SonrVibeDemo } from "@/components/SonrVibeDemo";
import { SpinDodgeDemo } from "@/components/SpinDodgeDemo";
import { StarhookMiniDemo } from "@/components/StarhookMiniDemo";
import { WaitlistForm } from "@/components/WaitlistForm";
import { isAppPromoSrc } from "@/lib/appPromoShots";
import type { CourApp } from "@/lib/apps";
import { getDetailMarketing } from "@/lib/detailMarketing";
import { getFlowNarrative } from "@/lib/flowNarrative";
import type { CourItem } from "@/lib/items";
import type { CourProduct } from "@/lib/products";
import type { ProductSceneSlug } from "@/lib/productScenes";
import { appPath, gamePath } from "@/lib/themes";
import { useLocale } from "@/context/LocaleContext";

const ambientRings: Partial<Record<ProductSceneSlug, ReactNode>> = {
  starhook: (
    <>
      <div className="absolute left-[10%] top-[20%] h-40 w-40 rounded-full border border-[#8db4ff]/20 opacity-35" />
      <div className="absolute right-[15%] top-[35%] h-56 w-56 rounded-full border border-[#ffd87a]/15 opacity-25" />
    </>
  ),
  neondrift: (
    <>
      <div className="absolute left-[12%] top-[22%] h-44 w-44 rounded-full border border-[#00f5d4]/25 opacity-35" />
      <div className="absolute right-[10%] top-[30%] h-64 w-64 rounded-full border border-[#ff2d95]/15 opacity-25" />
    </>
  ),
  spindodge: (
    <>
      <div className="absolute left-[8%] top-[18%] h-48 w-48 rounded-full border border-[#00e6c7]/20 opacity-40" />
      <div className="absolute right-[12%] top-[32%] h-64 w-64 rounded-full border border-[#ffb938]/15 opacity-30" />
      <div className="absolute bottom-[20%] left-[35%] h-80 w-80 rounded-full border border-[#ff4761]/10 opacity-25" />
    </>
  ),
  courlearn: (
    <>
      <div className="absolute left-[8%] top-[25%] h-52 w-52 rounded-full border border-[#7dd3fc]/20 opacity-30" />
      <div className="absolute right-[14%] top-[40%] h-72 w-72 rounded-full border border-[#a855f7]/12 opacity-25" />
    </>
  ),
  sonr: (
    <>
      <div className="absolute left-[10%] top-[20%] h-48 w-48 rounded-full border border-[#fa243c]/20 opacity-30" />
      <div className="absolute right-[12%] top-[35%] h-64 w-64 rounded-full border border-[#d1ad5c]/15 opacity-25" />
    </>
  ),
};

function ProductDemo({
  slug,
  accent,
  accentMuted,
}: {
  slug: ProductSceneSlug;
  accent: string;
  accentMuted: string;
}) {
  switch (slug) {
    case "starhook":
      return <StarhookMiniDemo accent={accent} />;
    case "neondrift":
      return <NeonDriftDemo accent={accent} />;
    case "spindodge":
      return <SpinDodgeDemo accent={accent} />;
    case "sonr":
      return <SonrVibeDemo accent={accent} accentMuted={accentMuted} />;
    default:
      return null;
  }
}

function ProductShot({
  src,
  alt,
  accent,
  marketing,
  flipImage,
  float,
  compact,
}: {
  src: string;
  alt: string;
  accent: string;
  marketing: boolean;
  flipImage?: boolean;
  float?: boolean;
  compact?: boolean;
}) {
  return (
    <ProductScreenshot
      src={src}
      alt={alt}
      accent={accent}
      marketingBanner={marketing}
      flipImage={flipImage}
      float={float}
      compact={compact}
    />
  );
}

export function FlowProductDetailPage({ item }: { item: CourItem }) {
  const { locale, tr } = useLocale();
  const lang = locale === "nl" ? "nl" : "en";
  const slug = item.slug as ProductSceneSlug;
  const narrative = getFlowNarrative(slug);
  const marketing = getDetailMarketing(slug);
  const isGame = item.kind === "game";

  if (!narrative || !marketing) return null;

  const accent = item.accent;
  const accentMuted = item.accentMuted;
  const name = item.name;
  const status = item.kind === "product" ? item.status : undefined;
  const backHref = isGame ? "/games" : "/apps";
  const backLabel = isGame ? "Games" : "Apps";
  const href = isGame ? gamePath(slug) : appPath(slug);
  const waitlist = item.kind === "product" && item.waitlist;
  const flipScreenshots = item.kind === "game" ? item.flipScreenshots === true : false;
  const marketingShots = item.kind === "product" && item.screenshotStyle === "marketing";
  const promoShots =
    (item.kind === "product" && item.screenshotStyle === "promo") ||
    marketing.flowScreens.some(isAppPromoSrc);
  const steps = narrative.cards[0]?.steps ?? [];
  const stepScreens = marketing.flowScreens.slice(0, Math.max(steps.length, 1));

  return (
    <div className="relative overflow-hidden px-6 pb-24 pt-28">
      <AppThemeBackground slug={slug} />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {ambientRings[slug]}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Link
          href={backHref}
          className="text-sm text-[var(--text-faint)] transition-colors hover:text-[var(--text-muted)]"
        >
          ← {backLabel}
        </Link>

        <div className="mt-10 rounded-[2rem] border border-white/8 bg-[#070b18]/80 p-6 backdrop-blur-sm md:p-10 lg:p-12">
          <FlowProductDisplay
            node={{ slug, name, accent, accentMuted, href, status }}
            narrative={narrative}
            sceneLocal={0.25}
            lang={lang}
            exploreLabel={tr("viewApp")}
            showPhoneOnMobile
            showExploreLink={false}
          />

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/8 pt-8">
            <AppStoreBadge href={item.appStoreUrl} />
            {isGame ? (
              <AppPageLinks app={item as CourApp} />
            ) : (
              <ProductPageLinks product={item as CourProduct} />
            )}
          </div>
        </div>

        {steps.length > 0 && (
          <DetailSection className="mt-24">
            <p className="section-label text-white/35">{marketing.stepsLabel[lang]}</p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {marketing.stepsTitle[lang]}
            </h2>

            <div className="mt-12 grid gap-8 lg:grid-cols-4">
              {steps.map((step, i) => (
                <div key={step.en} className="relative">
                  <span
                    className="font-display text-5xl font-bold tabular-nums text-white/[0.06]"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display -mt-6 text-lg font-semibold text-white/90">
                    {step[lang]}
                  </h3>
                  {i < stepScreens.length && (
                    <div className="mt-5 lg:hidden">
                      <ProductShot
                        src={stepScreens[i]}
                        alt={step[lang]}
                        accent={accent}
                        marketing={marketingShots}
                        flipImage={flipScreenshots}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {stepScreens.length > 0 && (
              <div
                className={`mt-10 hidden gap-4 lg:grid ${
                  stepScreens.length >= 4
                    ? "lg:grid-cols-4"
                    : stepScreens.length === 3
                      ? "lg:grid-cols-3"
                      : "lg:grid-cols-2"
                }`}
              >
                {stepScreens.map((src) => (
                  <ProductShot
                    key={src}
                    src={src}
                    alt=""
                    accent={accent}
                    marketing={marketingShots}
                    flipImage={flipScreenshots}
                    float
                  />
                ))}
              </div>
            )}
          </DetailSection>
        )}

        {marketing.featureSpotlights.length > 0 && (
          <DetailSection className="mt-24">
            <p className="section-label text-white/35">{marketing.featuresLabel[lang]}</p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {marketing.featuresTitle[lang]}
            </h2>

            <div className="mt-12 space-y-16">
              {marketing.featureSpotlights.map((feature, i) => (
                <div
                  key={feature.title.en}
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white/90">
                      {feature.title[lang]}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-white/45">
                      {feature.body[lang]}
                    </p>
                  </div>
                  <ProductShot
                    src={feature.src}
                    alt={feature.title[lang]}
                    accent={accent}
                    marketing={marketingShots}
                    flipImage={flipScreenshots}
                    float
                  />
                </div>
              ))}
            </div>
          </DetailSection>
        )}

        {marketing.demoLabel && slug !== "courlearn" && (
          <DetailSection className="mt-24">
            <p className="section-label mb-4" style={{ color: accent }}>
              {marketing.demoLabel[lang]}
            </p>
            <ProductDemo slug={slug} accent={accent} accentMuted={accentMuted} />
          </DetailSection>
        )}

        {marketing.privacy && (
          <DetailSection className="mt-24">
            <div
              className="grid gap-10 overflow-hidden rounded-[1.75rem] border border-white/10 p-8 md:grid-cols-2 md:p-12"
              style={{
                background: `linear-gradient(135deg, ${item.glow}, transparent 55%), #0a0a0e`,
              }}
            >
              <div>
                <p className="section-label text-white/35">{marketing.privacy.label[lang]}</p>
                <h2 className="font-display mt-3 text-2xl font-bold md:text-3xl">
                  {marketing.privacy.title[lang]}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/45">
                  {marketing.privacy.body[lang]}
                </p>
                <ul className="mt-6 space-y-2">
                  {marketing.privacy.points.map((point) => (
                    <li key={point.en} className="flex items-center gap-2 text-sm text-white/55">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                      {point[lang]}
                    </li>
                  ))}
                </ul>
              </div>
              {marketing.privacy.bannerSrc && (
                <div className="relative flex justify-center lg:justify-end">
                  <ProductShot
                    src={marketing.privacy.bannerSrc}
                    alt={name}
                    accent={accent}
                    marketing={marketingShots}
                  />
                </div>
              )}
            </div>
          </DetailSection>
        )}

        {marketing.extraScreenshots && marketing.extraScreenshots.length > 0 && (
          <DetailSection className="mt-16">
            <div
              className={`grid gap-6 ${
                promoShots
                  ? "sm:grid-cols-2 lg:max-w-3xl"
                  : marketingShots
                    ? "max-w-2xl"
                    : marketing.extraScreenshots.length >= 2
                      ? "sm:grid-cols-2"
                      : "max-w-sm"
              }`}
            >
              {marketing.extraScreenshots.map((src) => (
                <ProductShot
                  key={src}
                  src={src}
                  alt={name}
                  accent={accent}
                  marketing={marketingShots}
                  flipImage={flipScreenshots}
                  compact={promoShots}
                />
              ))}
            </div>
          </DetailSection>
        )}

        {waitlist && (
          <DetailSection className="mt-16">
            <div
              className="rounded-2xl border p-6 md:p-8"
              style={{
                borderColor: `${accent}33`,
                background: `linear-gradient(135deg, ${item.glow}, transparent 70%)`,
              }}
            >
              <p className="font-display text-lg font-semibold">
                {marketing.waitlistTitle?.[lang] ??
                  (lang === "nl" ? "Beta — blijf op de hoogte" : "Beta — get notified")}
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {marketing.waitlistBody?.[lang] ??
                  (lang === "nl"
                    ? "Laat je e-mail achter voor launch-updates."
                    : "Leave your email for launch updates.")}
              </p>
              <div className="mt-4 max-w-md">
                <WaitlistForm />
              </div>
            </div>
          </DetailSection>
        )}
      </div>
    </div>
  );
}
