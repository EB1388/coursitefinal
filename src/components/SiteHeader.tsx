"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LocaleToggle } from "@/components/LocaleToggle";
import { EASE_OUT } from "@/lib/motion";
import { themeFromPath, themes } from "@/lib/themes";
import { useLocale } from "@/context/LocaleContext";

export function SiteHeader() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const section = themeFromPath(pathname);
  const theme = themes[section];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/games", label: "Games", active: section === "gaming" },
    { href: "/apps", label: "Apps", active: section === "apps" },
    { href: "/press", label: locale === "nl" ? "Pers" : "Press", active: false },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                paddingTop: scrolled ? 10 : 12,
                paddingBottom: scrolled ? 10 : 12,
              }
        }
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="section-glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-[box-shadow] duration-300"
        style={{
          background: theme.glass,
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.45)" : undefined,
        }}
      >
        <Link href={theme.homeHref} className="focus-ring font-display cursor-pointer text-lg font-bold tracking-tight">
          <span style={{ color: section !== "studio" ? theme.accent : undefined }}>
            {theme.label}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring cursor-pointer rounded-full px-4 py-2 text-sm transition-colors duration-200"
              style={{
                color: link.active ? theme.accent : "var(--text-muted)",
                background: link.active ? `${theme.accent}14` : undefined,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {section !== "studio" && (
            <Link
              href="/"
              className="hidden text-xs text-[var(--text-faint)] transition-colors hover:text-[var(--text-muted)] sm:inline"
            >
              Cour
            </Link>
          )}
          <LocaleToggle />
          <button
            type="button"
            className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-muted)] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, transform: "translateY(-8px) scale(0.98)" }}
            animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
            exit={{ opacity: 0, transform: "translateY(-8px) scale(0.98)" }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="section-glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2, ease: EASE_OUT }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-[var(--text-muted)] hover:bg-white/[0.04] hover:text-[var(--text)]"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
