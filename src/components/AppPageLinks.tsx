import Link from "next/link";
import type { CourApp } from "@/lib/apps";
import { gamePath } from "@/lib/themes";

export function AppPageLinks({ app }: { app: CourApp }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={`${gamePath(app.slug)}/privacy`}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/80 transition-[border-color,transform] duration-200 ease-out hover:border-white/20 hover:text-white active:scale-[0.97]"
      >
        Privacy Policy
      </Link>
      <Link
        href={`${gamePath(app.slug)}/support`}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/80 transition-[border-color,transform] duration-200 ease-out hover:border-white/20 hover:text-white active:scale-[0.97]"
      >
        Support
      </Link>
      {app.supportEmail && (
        <a
          href={`mailto:${app.supportEmail}`}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#050816] transition-transform duration-160 ease-out active:scale-[0.97]"
          style={{ background: app.accent }}
        >
          Contact
        </a>
      )}
      {app.githubIssues && (
        <a
          href={app.githubIssues}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/80 transition-[border-color,transform] duration-200 ease-out hover:border-white/20 hover:text-white active:scale-[0.97]"
        >
          GitHub
        </a>
      )}
    </div>
  );
}
