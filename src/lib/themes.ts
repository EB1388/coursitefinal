import type { CourItem } from "@/lib/items";

export type SectionTheme = "studio" | "gaming" | "apps";

export const themes = {
  studio: {
    id: "studio" as const,
    label: "Cour",
    homeHref: "/",
    bg: "#050816",
    accent: "#8db4ff",
    accentSecondary: "#ffd87a",
    progressGradient: "from-[#8db4ff] via-[#ffd87a] to-[#7dd3fc]",
    glass: "rgba(10, 15, 34, 0.72)",
    cursor: "rgba(141, 180, 255, 0.15)",
  },
  gaming: {
    id: "gaming" as const,
    label: "Cour Gaming",
    homeHref: "/games",
    bg: "#050816",
    accent: "#8db4ff",
    accentSecondary: "#a855f7",
    progressGradient: "from-[#8db4ff] via-[#a855f7] to-[#00f5d4]",
    glass: "rgba(8, 12, 28, 0.8)",
    cursor: "rgba(141, 180, 255, 0.18)",
  },
  apps: {
    id: "apps" as const,
    label: "Cour Apps",
    homeHref: "/apps",
    bg: "#0c0c0f",
    accent: "#7dd3fc",
    accentSecondary: "#fa243c",
    progressGradient: "from-[#7dd3fc] via-[#f9a8d4] to-[#fa243c]",
    glass: "rgba(16, 16, 20, 0.82)",
    cursor: "rgba(125, 211, 252, 0.14)",
  },
} as const;

export function gamePath(slug: string) {
  return `/games/${slug}`;
}

export function appPath(slug: string) {
  return `/apps/${slug}`;
}

export function itemPath(item: Pick<CourItem, "kind" | "slug">) {
  return item.kind === "game" ? gamePath(item.slug) : appPath(item.slug);
}

export function itemPrivacyPath(item: Pick<CourItem, "kind" | "slug">) {
  return `${itemPath(item)}/privacy`;
}

export function itemSupportPath(item: Pick<CourItem, "kind" | "slug">) {
  return `${itemPath(item)}/support`;
}

export function themeFromPath(pathname: string): SectionTheme {
  if (pathname.startsWith("/games")) return "gaming";
  if (pathname.startsWith("/apps")) return "apps";
  return "studio";
}
