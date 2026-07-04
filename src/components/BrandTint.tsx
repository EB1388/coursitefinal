"use client";

import { AppThemeBackground } from "@/components/AppThemeBackground";
import type { ProductBrand } from "@/lib/brand";

export function BrandTint({ brand, slug }: { brand: ProductBrand; slug: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: brand.bg }}
    >
      <div
        className="absolute inset-0 animate-[theme-breathe_10s_ease-in-out_infinite]"
        style={{
          background: `radial-gradient(ellipse 70% 45% at 50% -10%, ${brand.accentTint}, transparent 70%)`,
        }}
      />
      <AppThemeBackground slug={slug} />
    </div>
  );
}
