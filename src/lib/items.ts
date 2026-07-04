import { apps, getApp, type CourApp } from "@/lib/apps";
import { getProduct, products, type CourProduct } from "@/lib/products";

export type CourItem =
  | ({ kind: "game" } & CourApp)
  | ({ kind: "product" } & CourProduct);

export function getGameSlugs(): string[] {
  return apps.map((a) => a.slug);
}

export function getProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getAllSlugs(): string[] {
  return [...getGameSlugs(), ...getProductSlugs()];
}

export function getLegalSlugs(): string[] {
  return getAllSlugs();
}

export function resolveItem(slug: string): CourItem | undefined {
  const app = getApp(slug);
  if (app) return { kind: "game", ...app };
  const product = getProduct(slug);
  if (product) return { kind: "product", ...product };
  return undefined;
}

export function getAccent(slug: string): string {
  return resolveItem(slug)?.accent ?? "#8db4ff";
}

export function getOgImage(slug: string): string {
  return `/og/${slug}.png`;
}
