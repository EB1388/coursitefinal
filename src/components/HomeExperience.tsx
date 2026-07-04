"use client";

import { AppProductCard } from "@/components/AppProductCard";
import { AppShowcaseScroll } from "@/components/AppShowcaseScroll";
import { HeroShowcase } from "@/components/HeroShowcase";
import { RealmHandoff } from "@/components/RealmHandoff";
import { HorizontalProductStrip } from "@/components/scroll/HorizontalProductStrip";
import { ProductFlowChapter } from "@/components/three/ProductFlowChapter";
import { StudioStory } from "@/components/StudioStory";
import { apps } from "@/lib/apps";
import { products } from "@/lib/products";
import { appNodes, gameNodes } from "@/lib/universe";

export function HomeExperience() {
  return (
    <>
      <HeroShowcase />

      <div className="gaming-realm">
        <ProductFlowChapter nodes={gameNodes} variant="games" />
        <HorizontalProductStrip nodes={gameNodes} variant="games" />
        <AppShowcaseScroll games={apps} tools={[]} gamesOnly />
      </div>

      <RealmHandoff />

      <div className="apps-realm">
        <ProductFlowChapter nodes={appNodes} variant="apps" />
        <HorizontalProductStrip nodes={appNodes} variant="apps" />
        <AppShowcaseScroll games={[]} tools={products} appsOnly />
      </div>

      <StudioStory />
    </>
  );
}
