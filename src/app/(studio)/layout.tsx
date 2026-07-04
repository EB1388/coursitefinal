import { StudioAmbient } from "@/components/StudioAmbient";
import { SectionThemeProvider } from "@/context/SectionThemeContext";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionThemeProvider theme="studio">
      <StudioAmbient />
      {children}
    </SectionThemeProvider>
  );
}
