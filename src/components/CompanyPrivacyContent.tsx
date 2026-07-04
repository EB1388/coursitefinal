import Link from "next/link";
import { apps } from "@/lib/apps";
import { products } from "@/lib/products";
import { companyPrivacyDoc } from "@/lib/privacy";
import { appPath, gamePath, itemPrivacyPath } from "@/lib/themes";

const studioAccent = "#8db4ff";
const studioAccentMuted = "#ffd87a";

export function CompanyPrivacyContent() {
  const doc = companyPrivacyDoc;

  return (
    <div className="px-6 pb-24 pt-28">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm text-[var(--text-faint)] transition-colors hover:text-[var(--text-muted)]"
        >
          ← Cour
        </Link>

        <article className="card-premium mt-8 p-6 sm:p-8 md:p-12">
          <h1 className="font-display text-[clamp(1.75rem,6vw,2.25rem)] font-bold tracking-tight">Cour Privacy Policy</h1>
          <p className="mt-3 text-sm font-medium" style={{ color: studioAccent }}>
            Last updated: {doc.updated}
          </p>
          <p className="mt-6 leading-relaxed text-[var(--text-muted)]">{doc.intro}</p>

          {doc.sections.map((section) => (
            <section key={section.title} className="mt-10">
              <h2 className="font-display text-xl font-semibold" style={{ color: studioAccentMuted }}>
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

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold" style={{ color: studioAccentMuted }}>
              Product Privacy Policies
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
              Each Cour product has a dedicated privacy policy with details specific to that app or game.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="section-label text-[#8db4ff]">Cour Gaming</p>
                <ul className="mt-3 space-y-2">
                  {apps.map((app) => (
                    <li key={app.slug}>
                      <Link
                        href={itemPrivacyPath({ kind: "game", slug: app.slug })}
                        className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                      >
                        {app.name} Privacy Policy →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="section-label text-[#7dd3fc]">Cour Apps</p>
                <ul className="mt-3 space-y-2">
                  {products.map((product) => (
                    <li key={product.slug}>
                      <Link
                        href={itemPrivacyPath({ kind: "product", slug: product.slug })}
                        className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                      >
                        {product.name} Privacy Policy →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-10 border-t border-[var(--border)] pt-8">
            <h2 className="font-display text-xl font-semibold" style={{ color: studioAccentMuted }}>
              Contact
            </h2>
            <p className="mt-3 text-[var(--text-muted)]">
              For privacy questions about Cour or any of our products, contact us at{" "}
              <a
                href={`mailto:${doc.contact}`}
                className="font-medium text-[var(--text)] transition-colors hover:text-[#ffd87a]"
              >
                {doc.contact}
              </a>
              .
            </p>
            <p className="mt-4 text-sm text-[var(--text-faint)]">
              You can also visit a product page for support links:{" "}
              {apps.map((app, index) => (
                <span key={app.slug}>
                  {index > 0 && ", "}
                  <Link href={gamePath(app.slug)} className="hover:text-[var(--text-muted)]">
                    {app.name}
                  </Link>
                </span>
              ))}
              {apps.length > 0 && products.length > 0 && ", "}
              {products.map((product, index) => (
                <span key={product.slug}>
                  {index > 0 && ", "}
                  <Link href={appPath(product.slug)} className="hover:text-[var(--text-muted)]">
                    {product.name}
                  </Link>
                </span>
              ))}
              .
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
