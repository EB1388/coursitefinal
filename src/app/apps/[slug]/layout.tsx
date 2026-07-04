import { notFound } from "next/navigation";
import { BrandTint } from "@/components/BrandTint";
import { getProductBrand } from "@/lib/brand";
import { getProduct } from "@/lib/products";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function AppBrandLayout({ children, params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  const brand = getProductBrand(slug);

  if (!product || !brand) notFound();

  return (
    <>
      <BrandTint brand={brand} slug={slug} />
      {children}
    </>
  );
}
