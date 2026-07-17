import { CONTACT_EMAIL } from "@/lib/site";

export type CourProduct = {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  accent: string;
  accentMuted: string;
  glow: string;
  screenshots: string[];
  screenshotStyle: "phone" | "marketing" | "promo";
  category: "learning" | "music";
  status: "live" | "beta" | "in-development";
  supportEmail?: string;
  appStoreUrl?: string;
  waitlist?: boolean;
  flipScreenshots?: boolean;
  showcaseReversed?: boolean;
};

export const products: CourProduct[] = [
  {
    slug: "courlearn",
    name: "CourLearn",
    subtitle: "Couri · On-device AI coach",
    description:
      "Meet your AI coach for every lesson. Couri guides you through speaking practice, live coaching, and adaptive focus — private, on-device, and built around the conversation, not a chatbot grid.",
    features: [
      "Couri — on-device AI coach",
      "Live coach mode & voice practice",
      "Adaptive focus per lesson",
      "On-device LLM — no server required",
      "Offline-first Capacitor iOS shell",
    ],
    category: "learning",
    status: "beta",
    accent: "#a855f7",
    accentMuted: "#7dd3fc",
    glow: "rgba(168, 85, 247, 0.22)",
    screenshotStyle: "marketing",
    screenshots: [
      "/screenshots/courlearn/courlearn-hero.png",
      "/screenshots/courlearn/courlearn-launch.png",
      "/screenshots/courlearn/02-learn-hub.png",
      "/screenshots/courlearn/coach-active.png",
      "/screenshots/courlearn/05-speaking-warmup.png",
    ],
    supportEmail: CONTACT_EMAIL,
    waitlist: true,
    showcaseReversed: true,
  },
  {
    slug: "sonr",
    name: "Sonr",
    subtitle: "Similar song finder",
    description:
      "Find songs that feel like the one you love. Import a TikTok clip, identify a track from Photos, or start from any song — then tune the vibe and save similar picks straight to Apple Music.",
    features: [
      "Similar song recommendations from one seed track",
      "Vibe sliders for mood, energy, and feel",
      "Apple Music playlist sync via MusicKit",
      "Import clips from Photos or the Share sheet",
      "ShazamKit identification from on-device audio",
      "Duplicate detection and local activity history",
    ],
    category: "music",
    status: "beta",
    accent: "#fa243c",
    accentMuted: "#d1ad5c",
    glow: "rgba(250, 36, 60, 0.28)",
    screenshotStyle: "marketing",
    screenshots: [
      "/screenshots/sonr/sonr-hero.png",
      "/screenshots/sonr/sonr-store-02-home.png",
      "/screenshots/sonr/sonr-store-04-for-you.png",
      "/screenshots/sonr/sonr-store-05-taste.png",
      "/screenshots/sonr/sonr-store-03-library.png",
      "/screenshots/sonr/sonr-store-01-boot.png",
      "/screenshots/sonr/sonr-store-06-settings.png",
    ],
    supportEmail: CONTACT_EMAIL,
    waitlist: true,
    showcaseReversed: false,
  },
];

export function getProduct(slug: string): CourProduct | undefined {
  return products.find((p) => p.slug === slug);
}
