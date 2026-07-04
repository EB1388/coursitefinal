import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyItemRedirect } from "@/components/LegacyItemRedirect";
import { getAllSlugs, resolveItem } from "@/lib/items";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = resolveItem(slug);
  if (!item) return {};

  const description = item.kind === "game" ? item.promo : item.description;
  return { title: item.name, description };
}

export default async function LegacySlugPage({ params }: Props) {
  const { slug } = await params;
  const item = resolveItem(slug);
  if (!item) notFound();
  return <LegacyItemRedirect item={item} />;
}
