"use client";

import { useLocale } from "@/context/LocaleContext";

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex rounded-full border border-[var(--border)] p-0.5 text-[10px] font-semibold uppercase tracking-wider">
      {(["en", "nl"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-full px-2.5 py-1 transition-colors duration-200 ${
            locale === code
              ? "bg-white/10 text-[var(--text)]"
              : "text-[var(--text-faint)] hover:text-[var(--text-muted)]"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
