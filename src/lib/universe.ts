import { apps } from "@/lib/apps";
import { products } from "@/lib/products";
import { appPath, gamePath } from "@/lib/themes";

export type UniverseNode = {
  slug: string;
  name: string;
  subtitle: string;
  accent: string;
  accentMuted: string;
  href: string;
  kind: "game" | "app";
  position: [number, number, number];
};

export const gameNodes: UniverseNode[] = apps.map((app, i) => ({
  slug: app.slug,
  name: app.name,
  subtitle: app.subtitle,
  accent: app.accent,
  accentMuted: app.accentMuted,
  href: gamePath(app.slug),
  kind: "game" as const,
  position: [
    -3 + i * 2.2,
    i % 2 === 0 ? 0.6 : -0.4,
    -i * 2,
  ] as [number, number, number],
}));

export const appNodes: UniverseNode[] = products.map((product, i) => ({
  slug: product.slug,
  name: product.name,
  subtitle: product.subtitle,
  accent: product.accent,
  accentMuted: product.accentMuted,
  href: appPath(product.slug),
  kind: "app" as const,
  position: [
    -1.5 + i * 3,
    i % 2 === 0 ? 0.4 : -0.3,
    -i * 2.4,
  ] as [number, number, number],
}));

/** @deprecated Use gameNodes / appNodes for separate flows */
export const universeNodes: UniverseNode[] = [...gameNodes, ...appNodes];
