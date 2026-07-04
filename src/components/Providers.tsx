"use client";

import { LocaleProvider } from "@/context/LocaleContext";
import { SoundProvider } from "@/context/SoundContext";
import { SmoothScrollProvider } from "@/components/scroll/SmoothScrollProvider";
import { SharedCanvasRoot } from "@/components/three/SharedCanvasRoot";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <SoundProvider>
        <SmoothScrollProvider>
          <SharedCanvasRoot>{children}</SharedCanvasRoot>
        </SmoothScrollProvider>
      </SoundProvider>
    </LocaleProvider>
  );
}
