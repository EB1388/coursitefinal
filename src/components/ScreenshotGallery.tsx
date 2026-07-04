"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PhoneMockup } from "@/components/PhoneMockup";
import { screenshotImageClassName } from "@/lib/screenshotPresentation";

export function ScreenshotGallery({
  screenshots,
  accent,
  appName,
  flipImage,
}: {
  screenshots: string[];
  accent: string;
  appName: string;
  flipImage?: boolean;
}) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  if (screenshots.length === 0) {
    return (
      <PhoneMockup alt={appName} accent={accent}>
        <div className="flex h-full items-center justify-center text-sm text-white/40">
          Screenshots coming soon
        </div>
      </PhoneMockup>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <motion.div
        key={screenshots[active]}
        initial={reduceMotion ? false : { opacity: 0, transform: "scale(0.97)" }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        <PhoneMockup
          src={screenshots[active]}
          alt={`${appName} screenshot ${active + 1}`}
          accent={accent}
          priority={active === 0}
          flipImage={flipImage}
        />
      </motion.div>

      {screenshots.length > 1 && (
        <div className="flex justify-center gap-2">
          {screenshots.map((shot, i) => (
            <button
              key={shot}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show screenshot ${i + 1}`}
              className="overflow-hidden rounded-lg border border-white/10 transition-[border-color,transform] duration-200 hover:border-white/25 active:scale-[0.97]"
              style={{
                boxShadow: i === active ? `0 0 0 2px ${accent}` : undefined,
              }}
            >
              <Image src={shot} alt="" width={48} height={96} className={`h-16 w-8 ${screenshotImageClassName(shot, flipImage)}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
