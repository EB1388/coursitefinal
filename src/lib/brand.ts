export type ProductBrand = {
  heroImage: string;
  /** Page background */
  bg: string;
  /** Single soft radial tint — no image wallpaper */
  accentTint: string;
};

export const productBrands: Record<string, ProductBrand> = {
  courlearn: {
    heroImage: "/screenshots/courlearn/promo-02-learn-hub.png",
    bg: "#0e0c12",
    accentTint: "rgba(168, 85, 247, 0.07)",
  },
  sonr: {
    heroImage: "/screenshots/sonr/sonr-hero.png",
    bg: "#09090c",
    accentTint: "rgba(250, 36, 60, 0.06)",
  },
};

export function getProductBrand(slug: string): ProductBrand | undefined {
  return productBrands[slug];
}
