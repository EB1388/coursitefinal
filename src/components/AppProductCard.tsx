"use client";

import { ShowcaseBlock } from "@/components/ShowcaseBlock";
import type { CourProduct } from "@/lib/products";
import { appPath } from "@/lib/themes";

export function AppProductCard({
  product,
  index,
  minimal,
}: {
  product: CourProduct;
  index: number;
  minimal?: boolean;
}) {
  return (
    <ShowcaseBlock
      title={product.name}
      subtitle={product.subtitle}
      description={product.description}
      accent={product.accent}
      accentMuted={product.accentMuted}
      glow={product.glow}
      screenshots={product.screenshots}
      href={appPath(product.slug)}
      reversed={product.showcaseReversed ?? index % 2 === 1}
      flipImage={product.flipScreenshots}
      marketingBanner={product.screenshotStyle === "marketing"}
      themeSlug={product.slug}
      index={index}
      status={product.status}
      features={product.features}
      minimal={minimal}
    />
  );
}
