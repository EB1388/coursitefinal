import type { Metadata } from "next";
import { AppsAmbient } from "@/components/AppsAmbient";
import { SectionThemeProvider } from "@/context/SectionThemeContext";

export const metadata: Metadata = {
  title: {
    default: "Cour Apps",
    template: "%s · Cour Apps",
  },
};

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionThemeProvider theme="apps">
      <AppsAmbient />
      {children}
    </SectionThemeProvider>
  );
}
