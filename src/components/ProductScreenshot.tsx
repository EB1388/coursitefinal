"use client";

import { AppPromoShot } from "@/components/AppPromoShot";
import { MarketingBanner } from "@/components/MarketingScreenshotGallery";
import { PhoneMockup } from "@/components/PhoneMockup";
import { isAppPromoSrc } from "@/lib/appPromoShots";

export function ProductScreenshot({
  src,
  alt,
  accent,
  flipImage,
  float,
  priority,
  compact,
  marketingBanner,
}: {
  src: string;
  alt: string;
  accent: string;
  flipImage?: boolean;
  float?: boolean;
  priority?: boolean;
  compact?: boolean;
  marketingBanner?: boolean;
}) {
  if (isAppPromoSrc(src)) {
    return (
      <AppPromoShot
        src={src}
        alt={alt}
        accent={accent}
        float={float}
        priority={priority}
        compact={compact}
      />
    );
  }
  if (marketingBanner) {
    return <MarketingBanner src={src} alt={alt} accent={accent} priority={priority} />;
  }
  return (
    <PhoneMockup
      src={src}
      alt={alt}
      accent={accent}
      flipImage={flipImage}
      float={float}
      priority={priority}
      compact={compact}
      gameScreen
    />
  );
}
