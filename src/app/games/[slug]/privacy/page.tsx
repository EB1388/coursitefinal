import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyPageContent, privacyMetadata } from "@/components/PrivacyPageContent";
import { getGameSlugs, resolveItem } from "@/lib/items";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getGameSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return privacyMetadata(slug);
}

export default async function GamePrivacyPage({ params }: Props) {
  const { slug } = await params;
  const item = resolveItem(slug);
  if (item?.kind !== "game") notFound();
  return <PrivacyPageContent slug={slug} />;
}
