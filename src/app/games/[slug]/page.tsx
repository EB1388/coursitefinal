import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppDetailPage } from "@/components/AppDetailPage";
import { getGameSlugs, getOgImage, resolveItem } from "@/lib/items";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getGameSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = resolveItem(slug);
  if (!item || item.kind !== "game") return {};

  return {
    title: item.name,
    description: item.promo,
    openGraph: {
      title: item.name,
      description: item.promo,
      images: [{ url: getOgImage(slug), width: 1200, height: 630, alt: item.name }],
    },
    other: {
      "apple-itunes-app": `app-argument=https://cour.software/games/${slug}`,
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const item = resolveItem(slug);
  if (item?.kind !== "game") notFound();
  return <AppDetailPage app={item} />;
}
