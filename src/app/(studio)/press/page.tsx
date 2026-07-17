import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { apps } from "@/lib/apps";
import { getAllSlugs, resolveItem } from "@/lib/items";
import { products } from "@/lib/products";
import { CONTACT_EMAIL, privacyPolicyUrl } from "@/lib/site";
import { PressQrGrid } from "@/components/PressQrGrid";

export const metadata: Metadata = {
  title: "Press Kit",
  description: "Logos, screenshots, and fast facts about Cour and our apps.",
};

export default function PressPage() {
  return (
    <div className="px-6 pb-24 pt-28">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-[var(--text-faint)] transition-colors hover:text-[var(--text-muted)]">
          ← Cour
        </Link>

        <h1 className="font-display mt-8 text-[clamp(2rem,8vw,3rem)] font-bold tracking-tight">
          Press Kit
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
          Logos, screenshots, and fast facts for press, creators, and partners.
        </p>

        <section className="card-premium mt-16 p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold">About Cour</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-[var(--text-muted)]">
            Cour is an independent studio building polished mobile games and apps.
            We focus on tight controls, distinctive visuals, and privacy-respecting
            experiences — from one-tap arcade games to AI-native learning tools.
          </p>
          <p className="mt-4 text-sm text-[var(--text-faint)]">
            Website: cour.software · Contact:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[var(--text-muted)]">
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">App Store privacy URLs</h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
            Paste these into App Store Connect — each link opens that product&apos;s dedicated privacy
            policy.
          </p>
          <ul className="card-premium mt-6 divide-y divide-[var(--border)]">
            {getAllSlugs().map((slug) => {
              const item = resolveItem(slug);
              if (!item) return null;
              const url = privacyPolicyUrl(slug);
              return (
                <li key={slug} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium">{item.name}</span>
                  <a
                    href={url}
                    className="break-all font-mono text-sm text-[#8db4ff] hover:text-[#ffd87a]"
                  >
                    {url}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Quick links & QR codes</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Scan or share — each code points to the app&apos;s deep link hub on cour.software.
          </p>
          <PressQrGrid />
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Games</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {apps.map((app) => (
              <div key={app.slug} className="card-premium p-6">
                <h3 className="font-display text-lg font-semibold" style={{ color: app.accent }}>
                  {app.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{app.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{app.promo}</p>
                {app.screenshots[0] && (
                  <div className="relative mt-6 aspect-[9/16] overflow-hidden rounded-xl border border-[var(--border)]">
                    <Image
                      src={app.screenshots[0]}
                      alt={app.name}
                      fill
                      className="object-cover object-center"
                      sizes="300px"
                    />
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {app.screenshots.map((src) => (
                    <a
                      key={src}
                      href={src}
                      download
                      className="text-xs text-[var(--text-muted)] underline underline-offset-2 hover:text-[var(--text)]"
                    >
                      Screenshot
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Apps & Tools</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {products.map((product) => (
              <div key={product.slug} className="card-premium p-6">
                <h3 className="font-display text-lg font-semibold" style={{ color: product.accent }}>
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{product.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  {product.description}
                </p>
                {product.screenshots[0] && (
                  <div
                    className={`relative mt-6 overflow-hidden rounded-xl border border-[var(--border)] ${
                      product.screenshotStyle === "promo"
                        ? "aspect-[576/1024]"
                        : product.screenshotStyle === "marketing"
                          ? "aspect-[3/2]"
                          : "aspect-[9/16]"
                    }`}
                  >
                    <Image
                      src={product.screenshots[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
