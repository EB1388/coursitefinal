"use client";

import Link from "next/link";
import type { CourProduct } from "@/lib/products";
import { appPath } from "@/lib/themes";
import { useLocale } from "@/context/LocaleContext";

export function ProductPageLinks({ product }: { product: CourProduct }) {
  const { tr } = useLocale();

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={`${appPath(product.slug)}/privacy`}
        className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/80 transition-[border-color,transform] duration-200 ease-out hover:border-white/20 hover:text-white active:scale-[0.97]"
      >
        {tr("privacy")}
      </Link>
      <Link
        href={`${appPath(product.slug)}/support`}
        className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/80 transition-[border-color,transform] duration-200 ease-out hover:border-white/20 hover:text-white active:scale-[0.97]"
      >
        {tr("support")}
      </Link>
      {product.supportEmail && (
        <a
          href={`mailto:${product.supportEmail}`}
          className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-[#050816] transition-transform duration-160 active:scale-[0.97]"
          style={{ background: product.accent }}
        >
          {tr("contact")}
        </a>
      )}
      <Link
        href={`/go/${product.slug}`}
        className="inline-flex items-center rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/80 transition-[border-color,transform] duration-200 ease-out hover:border-white/20 hover:text-white active:scale-[0.97]"
      >
        {tr("viewApp")} →
      </Link>
    </div>
  );
}
