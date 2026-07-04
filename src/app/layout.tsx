import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { Providers } from "@/components/Providers";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Cour — Mobile Games & Apps",
    template: "%s · Cour",
  },
  description:
    "Cour builds polished mobile games and apps. Starhook, Neon Drift, Spin Dodge, CourLearn, and Sonr.",
  metadataBase: new URL("https://cour.software"),
  openGraph: {
    siteName: "Cour",
    type: "website",
    images: [{ url: "/og/site.png", width: 1200, height: 630, alt: "Cour" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--bg)] text-white">
        <Providers>
          <ScrollProgress />
          <SiteHeader />
          <main className="relative z-[1]">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
