import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppsAmbient } from "@/components/AppsAmbient";
import { BrandTint } from "@/components/BrandTint";
import { GamingAmbient } from "@/components/GamingAmbient";
import { SupportPageContent, supportMetadata } from "@/components/SupportPageContent";
import { SectionThemeProvider } from "@/context/SectionThemeContext";
import { getProductBrand } from "@/lib/brand";
import { getLegalSlugs, resolveItem } from "@/lib/items";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getLegalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return supportMetadata(slug);
}

export default async function LegacySupportPage({ params }: Props) {
  const { slug } = await params;
  const item = resolveItem(slug);
  if (!item) notFound();

  const brand = item.kind === "product" ? getProductBrand(slug) : undefined;
  const theme = item.kind === "game" ? "gaming" : "apps";

  return (
    <SectionThemeProvider theme={theme}>
      {brand ? <BrandTint brand={brand} slug={slug} /> : item.kind === "game" ? <GamingAmbient /> : <AppsAmbient />}
      <SupportPageContent slug={slug} />
    </SectionThemeProvider>
  );
}
