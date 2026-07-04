"use client";

import { createContext, useContext, type ReactNode } from "react";
import { themes, type SectionTheme } from "@/lib/themes";

const SectionThemeContext = createContext<SectionTheme>("studio");

export function SectionThemeProvider({
  theme,
  children,
}: {
  theme: SectionTheme;
  children: ReactNode;
}) {
  const t = themes[theme];
  return (
    <SectionThemeContext.Provider value={theme}>
      <div
        className={`section-theme section-theme-${theme} min-h-full`}
        style={
          {
            "--section-bg": t.bg,
            "--section-accent": t.accent,
            "--section-glass": t.glass,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </SectionThemeContext.Provider>
  );
}

export function useSectionTheme() {
  return themes[useContext(SectionThemeContext)];
}

export function useSectionThemeId() {
  return useContext(SectionThemeContext);
}
