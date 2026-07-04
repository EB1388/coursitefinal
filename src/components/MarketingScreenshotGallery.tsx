"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { AppPromoShot } from "@/components/AppPromoShot";
import { PhoneMockup } from "@/components/PhoneMockup";
import { isAppPromoSrc } from "@/lib/appPromoShots";
import { screenshotImageClassName } from "@/lib/screenshotPresentation";

export function MarketingBanner({
  src,
  alt,
  accent,
  className = "",
  priority,
}: {
  src: string;
  alt: string;
  accent?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`group/banner relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-[box-shadow,border-color] duration-500 hover:border-white/16 ${className}`}
      style={accent ? { boxShadow: `0 30px 80px ${accent}28` } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover/banner:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, 640px"
        priority={priority}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}

export function MarketingScreenshotGallery({
  screenshots,
  appName,
  accent,
  flipImage,
  marketingStyle,
}: {
  screenshots: string[];
  appName: string;
  accent: string;
  flipImage?: boolean;
  marketingStyle?: boolean;
}) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const isBanner = (src: string) =>
    (marketingStyle && !isAppPromoSrc(src)) || src.includes("-hero.");
  const isPromo = (src: string) => isAppPromoSrc(src);

  return (
    <div className="space-y-4">
      <motion.div
        key={screenshots[active]}
        initial={reduceMotion ? false : { opacity: 0, transform: "translateY(12px)" }}
        animate={{ opacity: 1, transform: "translateY(0)" }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      >
        {isPromo(screenshots[active]) ? (
          <AppPromoShot
            src={screenshots[active]}
            alt={`${appName} promo`}
            accent={accent}
            priority={active === 0}
          />
        ) : isBanner(screenshots[active]) ? (
          <MarketingBanner
            src={screenshots[active]}
            alt={`${appName} marketing`}
            accent={accent}
            priority={active === 0}
          />
        ) : (
          <PhoneMockup
            src={screenshots[active]}
            alt={`${appName} screenshot ${active + 1}`}
            accent={accent}
            flipImage={flipImage}
            priority={active === 0}
          />
        )}
      </motion.div>
      {screenshots.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {screenshots.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative shrink-0 overflow-hidden rounded-lg border transition-[border-color,transform] duration-200 active:scale-[0.97] ${
                isPromo(src) ? "h-24 w-[3.25rem]" : isBanner(src) ? "h-14 w-20" : "h-20 w-11"
              }`}
              style={{
                borderColor: i === active ? accent : "rgba(255,255,255,0.1)",
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                className={isPromo(src) ? "object-cover object-center" : screenshotImageClassName(src, flipImage)}
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
