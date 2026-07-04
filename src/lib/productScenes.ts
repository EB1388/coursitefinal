/** Per-product 3D scene metadata — sourced from Ethan drive product docs & design tokens */

export type ProductSceneSlug =
  | "starhook"
  | "neondrift"
  | "spindodge"
  | "courlearn"
  | "sonr";

export type ProductSceneConfig = {
  slug: ProductSceneSlug;
  name: string;
  tagline: string;
  motif: string;
  background: string;
  fog: string;
  primary: string;
  secondary: string;
  accent: string;
};

export const productSceneConfigs: Record<ProductSceneSlug, ProductSceneConfig> = {
  starhook: {
    slug: "starhook",
    name: "Starhook",
    tagline: "Thread the constellation",
    motif: "Comet orbiting anchor stars with glowing constellation trails",
    background: "#03050E",
    fog: "#070B1E",
    primary: "#8DB4FF",
    secondary: "#FFD87A",
    accent: "#141C3C",
  },
  neondrift: {
    slug: "neondrift",
    name: "Neon Drift",
    tagline: "Drag. Dodge. Survive.",
    motif: "Neon orb with gem pickups in a survival arena",
    background: "#02020A",
    fog: "#02020A",
    primary: "#33F2FF",
    secondary: "#FF59A6",
    accent: "#2BF29A",
  },
  spindodge: {
    slug: "spindodge",
    name: "Spin Dodge",
    tagline: "Flip. Orbit. Survive.",
    motif: "Ember Circuit — gold core, teal orbit ring, plasma hazards",
    background: "#02060F",
    fog: "#050A17",
    primary: "#00E6C7",
    secondary: "#FFB938",
    accent: "#FF4761",
  },
  courlearn: {
    slug: "courlearn",
    name: "CourLearn",
    tagline: "Couri · On-device AI coach",
    motif: "Sophie orb — lavender fluid ribbons with glass halo",
    background: "#0F0C29",
    fog: "#1E1B4B",
    primary: "#8B5CF6",
    secondary: "#6366F1",
    accent: "#60A5FA",
  },
  sonr: {
    slug: "sonr",
    name: "Sonr",
    tagline: "Similar song finder",
    motif: "Dual-tone audio orbs with waveform presence",
    background: "#090A0F",
    fog: "#15161D",
    primary: "#FF4F86",
    secondary: "#5E9BFF",
    accent: "#42D0B0",
  },
};

export function isProductSceneSlug(slug: string): slug is ProductSceneSlug {
  return slug in productSceneConfigs;
}
