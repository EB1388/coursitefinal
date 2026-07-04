/** CourLearn (and similar) full-bleed App Store promo art — not raw UI captures */
export function isAppPromoSrc(src: string): boolean {
  return src.includes("/promo-");
}

export const PROMO_WIDTH = 576;
export const PROMO_HEIGHT = 1024;

/** Slight zoom keeps promo phones readable inside the card frame */
export const APP_PROMO_IMAGE_CLASS =
  "h-auto w-full object-cover object-center scale-[1.08]";
