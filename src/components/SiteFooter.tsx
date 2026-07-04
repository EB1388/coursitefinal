import Link from "next/link";
import { apps } from "@/lib/apps";
import { products } from "@/lib/products";
import { appPath, gamePath, itemPrivacyPath } from "@/lib/themes";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-bold">Cour</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
            Independent studio. Games and apps with craft you can feel.
          </p>
        </div>

        <div>
          <p className="section-label text-[#8db4ff]">Cour Gaming</p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/games" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
                All games
              </Link>
            </li>
            {apps.map((app) => (
              <li key={app.slug}>
                <Link href={gamePath(app.slug)} className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
                  {app.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label text-[#7dd3fc]">Cour Apps</p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/apps" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
                All apps
              </Link>
            </li>
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={appPath(p.slug)} className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/press" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
                Press
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-[var(--border)] pt-8">
        <p className="section-label text-[var(--text-faint)]">Legal</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
            Cour Privacy Policy
          </Link>
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={itemPrivacyPath({ kind: "game", slug: app.slug })}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              {app.name}
            </Link>
          ))}
          {products.map((product) => (
            <Link
              key={product.slug}
              href={itemPrivacyPath({ kind: "product", slug: product.slug })}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              {product.name}
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-[var(--text-faint)]">
          © {new Date().getFullYear()} Cour · cour.software
        </p>
      </div>
    </footer>
  );
}
