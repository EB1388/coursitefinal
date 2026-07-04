import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAccent, getOgImage, resolveItem } from "@/lib/items";
import { privacyDocs } from "@/lib/privacy";
import { privacyPolicyUrl } from "@/lib/site";
import { itemPath } from "@/lib/themes";

export function PrivacyPageContent({ slug }: { slug: string }) {
  const item = resolveItem(slug);
  const doc = privacyDocs[slug];
  if (!item || !doc) notFound();

  const accent = getAccent(slug);
  const accentMuted = item.accentMuted;

  return (
    <div className="px-6 pb-24 pt-28">
      <div className="mx-auto max-w-3xl">
        <Link
          href={itemPath(item)}
          className="text-sm text-[var(--text-faint)] transition-colors hover:text-[var(--text-muted)]"
        >
          ← {item.name}
        </Link>

        <article className="card-premium mt-8 p-8 md:p-12">
          <h1 className="font-display text-4xl font-bold tracking-tight">
            {item.name} Privacy Policy
          </h1>
          <p className="mt-3 text-sm font-medium" style={{ color: accent }}>
            Last updated: {doc.updated}
          </p>
          <p className="mt-6 leading-relaxed text-[var(--text-muted)]">{doc.intro}</p>

          {doc.sections.map((section) => (
            <section key={section.title} className="mt-10">
              <h2 className="font-display text-xl font-semibold" style={{ color: accentMuted }}>
                {section.title}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-[var(--text-muted)]">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--text-muted)]">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="mt-10 border-t border-[var(--border)] pt-8">
            <h2 className="font-display text-xl font-semibold" style={{ color: accentMuted }}>
              Contact
            </h2>
            <p className="mt-3 text-[var(--text-muted)]">
              For privacy questions about {item.name}, contact Cour at{" "}
              <strong className="text-[var(--text)]">{doc.contact}</strong>
            </p>
            <Link
              href="/privacy"
              className="mt-4 inline-block text-sm transition-colors hover:text-[var(--text)]"
              style={{ color: accent }}
            >
              Cour studio privacy policy →
            </Link>
          </section>
        </article>
      </div>
    </div>
  );
}

export function privacyMetadata(slug: string): Metadata {
  const item = resolveItem(slug);
  if (!item) return {};
  const canonical = privacyPolicyUrl(slug);
  return {
    title: `${item.name} Privacy Policy`,
    description: `Privacy policy for ${item.name} by Cour.`,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      images: [{ url: getOgImage(slug), width: 1200, height: 630, alt: item.name }],
    },
  };
}
