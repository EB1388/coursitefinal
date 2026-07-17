import Link from "next/link";
import { notFound } from "next/navigation";
import { getAccent, getOgImage, resolveItem } from "@/lib/items";
import { supportDocs } from "@/lib/support";
import { itemPath, itemPrivacyPath } from "@/lib/themes";

export function SupportPageContent({ slug }: { slug: string }) {
  const item = resolveItem(slug);
  const doc = supportDocs[slug];
  if (!item || !doc) notFound();

  const accent = getAccent(slug);
  const supportEmail = item.supportEmail;

  return (
    <div className="px-6 pb-24 pt-28">
      <div className="mx-auto max-w-3xl">
        <Link
          href={itemPath(item)}
          className="text-sm text-[var(--text-faint)] transition-colors hover:text-[var(--text-muted)]"
        >
          ← {item.name}
        </Link>

        <div className="mt-8">
          <h1 className="font-display text-4xl font-bold tracking-tight">
            {item.name} Support
          </h1>
          <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{doc.intro}</p>
        </div>

        <div className="mt-10 space-y-4">
          {doc.faqs.map((faq) => (
            <details
              key={faq.question}
              className="card-premium group open:border-[var(--border-strong)]"
            >
              <summary className="cursor-pointer list-none px-6 py-5 font-medium text-[var(--text)] transition-colors hover:text-[var(--text-muted)] [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-[var(--text-faint)] transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="border-t border-[var(--border)] px-6 pb-5 pt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div
          className="card-premium mt-12 p-6"
          style={{
            borderColor: `${accent}33`,
            background: `${accent}08`,
          }}
        >
          <h2 className="font-display font-semibold">Still need help?</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Reach us at{" "}
            <a
              href={`mailto:${supportEmail || doc.contact}`}
              className="text-[var(--text)] underline underline-offset-2"
            >
              {supportEmail || doc.contact}
            </a>
          </p>
          <Link
            href={itemPrivacyPath(item)}
            className="mt-4 inline-block text-sm transition-colors"
            style={{ color: accent }}
          >
            View privacy policy →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function supportMetadata(slug: string) {
  const item = resolveItem(slug);
  if (!item) return {};
  return {
    title: `${item.name} Support`,
    description: `Get help with ${item.name}.`,
    openGraph: {
      images: [{ url: getOgImage(slug), width: 1200, height: 630, alt: item.name }],
    },
  };
}
