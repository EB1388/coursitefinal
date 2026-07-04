/** Per-asset fixes for mis-exported captures (upside-down, mirrored, etc.) */
export type ScreenshotPresentation = {
  flipX?: boolean;
  rotate180?: boolean;
  /** Vertical focal point — higher values crop more status bar */
  objectPosition?: string;
};

const presentationBySrc: Record<string, ScreenshotPresentation> = {
  "/screenshots/neondrift/01-menu.png": { objectPosition: "center 11%" },
  "/screenshots/neondrift/02-gameplay.png": { objectPosition: "center 6%" },
  "/screenshots/spindodge/01-menu.png": { objectPosition: "center 8%" },
  "/screenshots/starhook/starhook-menu.png": { objectPosition: "center 4%" },
  "/screenshots/starhook/starhook-menu-theme-store-ready.png": { objectPosition: "center 4%" },
};

export function getScreenshotPresentation(src: string): ScreenshotPresentation {
  return presentationBySrc[src] ?? {};
}

export function screenshotImageClassName(
  src: string,
  flipImage?: boolean,
): string {
  const { flipX, rotate180 } = getScreenshotPresentation(src);
  const classes: string[] = ["object-cover", "object-top"];

  if (flipImage || flipX) classes.push("-scale-x-100");
  if (rotate180) classes.push("rotate-180");

  return classes.join(" ");
}

export function screenshotImageStyle(src: string): { objectPosition: string } | undefined {
  const { objectPosition } = getScreenshotPresentation(src);
  if (!objectPosition) return undefined;
  return { objectPosition };
}

/** Single-layer screen presentation — slight zoom hides status bar chrome */
export function gameScreenImageClassName(src: string, flipImage?: boolean): string {
  return `${screenshotImageClassName(src, flipImage)} scale-[1.09]`;
}
