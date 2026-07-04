import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupportPageContent, supportMetadata } from "@/components/SupportPageContent";
import { getProductSlugs, resolveItem } from "@/lib/items";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return supportMetadata(slug);
}

export default async function AppSupportPage({ params }: Props) {
  const { slug } = await params;
  const item = resolveItem(slug);
  if (item?.kind !== "product") notFound();
  return <SupportPageContent slug={slug} />;
}
