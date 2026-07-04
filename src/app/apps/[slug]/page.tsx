import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FlowProductDetailPage } from "@/components/FlowProductDetailPage";
import { getOgImage, getProductSlugs, resolveItem } from "@/lib/items";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = resolveItem(slug);
  if (!item || item.kind !== "product") return {};

  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: item.name,
      description: item.description,
      images: [{ url: getOgImage(slug), width: 1200, height: 630, alt: item.name }],
    },
    other: {
      "apple-itunes-app": `app-argument=https://cour.software/apps/${slug}`,
    },
  };
}

export default async function AppProductPage({ params }: Props) {
  const { slug } = await params;
  const item = resolveItem(slug);
  if (item?.kind !== "product") notFound();
  return <FlowProductDetailPage item={item} />;
}
