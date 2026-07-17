import { CONTACT_EMAIL } from "@/lib/site";

export type CourApp = {
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  promo: string;
  features: string[];
  category: string;
  accent: string;
  accentMuted: string;
  glow: string;
  screenshots: string[];
  trailer?: string;
  supportEmail?: string;
  supportUrl?: string;
  githubIssues?: string;
  appStoreUrl?: string;
  hasAds: boolean;
  hasGameCenter: boolean;
  /** Mirror screenshots horizontally (phone facing forward) */
  flipScreenshots?: boolean;
  /** Homepage showcase: image left, copy right */
  showcaseReversed?: boolean;
};

export const apps: CourApp[] = [
  {
    slug: "starhook",
    name: "Starhook",
    subtitle: "Thread the constellation",
    tagline: "Orbit. Hook. Survive.",
    promo:
      "Launch your comet from star to star in a one-tap arcade game about timing, flow, and one more run.",
    description:
      "Starhook is a minimalist one-tap arcade game set in a glowing night sky. Your comet orbits a star. Tap to release, fly straight, and hook the next star if your aim is true. Each successful hook extends your constellation. Miss the line and you drift into the void.",
    features: [
      "One-tap arcade controls",
      "Glowing constellation trails",
      "Theme store with unlockable cosmetic skies",
      "Stardust rewards from every run",
      "Optional rewarded ads for bonus stardust",
      "Offline play — no account required",
    ],
    category: "Arcade",
    accent: "#8db4ff",
    accentMuted: "#ffd87a",
    glow: "rgba(141, 180, 255, 0.35)",
    screenshots: [
      "/screenshots/starhook/starhook-menu.png",
      "/screenshots/starhook/starhook-menu-theme-store-ready.png",
    ],
    supportEmail: CONTACT_EMAIL,
    hasAds: true,
    hasGameCenter: true,
    flipScreenshots: false,
  },
  {
    slug: "neondrift",
    name: "Neon Drift",
    subtitle: "Drag. Dodge. Survive.",
    tagline: "One finger. Infinite neon.",
    promo:
      "Drag your orb through a neon arena. Chain combos, unlock trails, beat the daily challenge, and climb the Game Center leaderboard.",
    description:
      "Neon Drift is a fast arcade survival game with a glowing twist. Drag anywhere on the screen — your orb follows your finger. Collect green gems, grab cyan power-ups, and dodge red enemies as the arena gets harder every second.",
    features: [
      "One-finger drag controls",
      "Combo multipliers for chaining gem pickups",
      "Daily challenges with bonus coin rewards",
      "Shop with unlockable neon trails and orb skins",
      "Game Center global leaderboard",
      "Optional rewarded ad to revive after game over",
    ],
    category: "Arcade Survival",
    accent: "#00f5d4",
    accentMuted: "#ff2d95",
    glow: "rgba(0, 245, 212, 0.3)",
    screenshots: [
      "/screenshots/neondrift/01-menu.png",
      "/screenshots/neondrift/02-gameplay.png",
      "/screenshots/neondrift/03-game-over.png",
      "/screenshots/neondrift/04-shop.png",
      "/screenshots/neondrift/05-settings.png",
    ],
    githubIssues: "https://github.com/eb1388/neondrift/issues",
    supportEmail: CONTACT_EMAIL,
    hasAds: true,
    hasGameCenter: true,
  },
  {
    slug: "spindodge",
    name: "Spin Dodge",
    subtitle: "Flip. Orbit. Survive.",
    tagline: "One touch. Orbital chaos.",
    promo:
      "Orbit a neon core. Tap to flip direction. Dodge glowing plasma hazards closing in from every angle.",
    description:
      "Spin Dodge is a one-touch orbital dodge game. Clear timed stages with unique modifiers, face bosses every fifth level, or chase endless combo scores in Unlimited mode. Unlock prestige cosmetics and upgrade your long-term power in the Orbit Tree.",
    features: [
      "One-touch orbital controls",
      "Level mode with boss fights every 5 stages",
      "Unlimited mode with combo multipliers",
      "Weekly challenges and prestige cosmetics",
      "Orbit Tree long-term upgrades",
      "Optional rewarded ads via AdMob",
    ],
    category: "Arcade",
    accent: "#a855f7",
    accentMuted: "#fb923c",
    glow: "rgba(168, 85, 247, 0.35)",
    screenshots: [
      "/screenshots/spindodge/01-menu.png",
      "/screenshots/spindodge/02-mutator.png",
      "/screenshots/spindodge/03-boss-phase-2.png",
      "/screenshots/spindodge/04-overdrive.png",
      "/screenshots/spindodge/05-orbit-tree.png",
    ],
    githubIssues: "https://github.com/eb1388/spindodge/issues",
    supportEmail: CONTACT_EMAIL,
    hasAds: true,
    hasGameCenter: true,
  },
];

export function getApp(slug: string): CourApp | undefined {
  return apps.find((app) => app.slug === slug);
}
