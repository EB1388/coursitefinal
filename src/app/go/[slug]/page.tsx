import { getAllSlugs, resolveItem } from "@/lib/items";
import { itemPath } from "@/lib/themes";
import { GoRedirect } from "@/components/GoRedirect";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function GoPage({ params }: Props) {
  const { slug } = await params;
  const item = resolveItem(slug);
  const fallback = item ? `https://cour.software${itemPath(item)}` : `https://cour.software`;
  const url =
    item && "appStoreUrl" in item && item.appStoreUrl
      ? item.appStoreUrl
      : fallback;

  return <GoRedirect url={url} />;
}
