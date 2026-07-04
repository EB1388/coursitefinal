import type { Metadata } from "next";
import { GamingAmbient } from "@/components/GamingAmbient";
import { SectionThemeProvider } from "@/context/SectionThemeContext";

export const metadata: Metadata = {
  title: {
    default: "Cour Gaming",
    template: "%s · Cour Gaming",
  },
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionThemeProvider theme="gaming">
      <GamingAmbient />
      {children}
    </SectionThemeProvider>
  );
}
