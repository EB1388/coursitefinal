import type { FlowBeat } from "@/lib/flowNarrative";
import type { ProductSceneSlug } from "@/lib/productScenes";

export type DetailFeatureSpotlight = {
  title: FlowBeat;
  body: FlowBeat;
  src: string;
};

export type DetailPrivacyBlock = {
  label: FlowBeat;
  title: FlowBeat;
  body: FlowBeat;
  points: FlowBeat[];
  bannerSrc?: string;
};

export type DetailMarketing = {
  stepsLabel: FlowBeat;
  stepsTitle: FlowBeat;
  featuresLabel: FlowBeat;
  featuresTitle: FlowBeat;
  flowScreens: string[];
  featureSpotlights: DetailFeatureSpotlight[];
  demoLabel?: FlowBeat;
  privacy?: DetailPrivacyBlock;
  waitlistTitle?: FlowBeat;
  waitlistBody?: FlowBeat;
  extraScreenshots?: string[];
};

export const detailMarketing: Record<ProductSceneSlug, DetailMarketing> = {
  starhook: {
    stepsLabel: { en: "How Starhook works", nl: "Zo werkt Starhook" },
    stepsTitle: { en: "From orbit to hook in one tap", nl: "Van orbit naar hook in één tap" },
    featuresLabel: { en: "Built for the loop", nl: "Gemaakt voor the loop" },
    featuresTitle: { en: "Short runs, sharp timing", nl: "Short runs, sharp timing" },
    flowScreens: [
      "/screenshots/starhook/promo-02-orbit-release-hook.png",
      "/screenshots/starhook/promo-03-catch-next-star.png",
      "/screenshots/starhook/promo-04-stardust-run.png",
    ],
    featureSpotlights: [
      {
        title: { en: "Constellation trails", nl: "Constellation trails" },
        body: {
          en: "Each successful hook extends your glowing path — miss once and the run ends.",
          nl: "Elke succesvolle hook verlengt je gloeiende pad — mis één keer en the run eindigt.",
        },
        src: "/screenshots/starhook/promo-08-perfect-arc.png",
      },
      {
        title: { en: "Theme store", nl: "Theme store" },
        body: {
          en: "Unlock cosmetic skies and spend stardust from every run on new looks.",
          nl: "Unlock cosmetic skies en besteed stardust van elke run aan nieuwe looks.",
        },
        src: "/screenshots/starhook/promo-05-cosmic-themes.png",
      },
    ],
    demoLabel: { en: "Try the hook", nl: "Probeer the hook" },
  },
  neondrift: {
    stepsLabel: { en: "How Neon Drift works", nl: "Zo werkt Neon Drift" },
    stepsTitle: { en: "Drag, dodge, chain combos", nl: "Drag, dodge, chain combos" },
    featuresLabel: { en: "Built for one more run", nl: "Gemaakt voor nog één run" },
    featuresTitle: { en: "Every screen, one purpose", nl: "Elk scherm, één doel" },
    flowScreens: [
      "/screenshots/neondrift/promo-01-menu-hero.png",
      "/screenshots/neondrift/promo-02-gameplay-hazards.png",
      "/screenshots/neondrift/promo-03-combo-run.png",
    ],
    featureSpotlights: [
      {
        title: { en: "Neon survival", nl: "Neon survival" },
        body: {
          en: "Drag your orb through hazards, collect gems, and keep the combo multiplier climbing.",
          nl: "Sleep je orb door hazards, verzamel gems en houd the combo multiplier stijgend.",
        },
        src: "/screenshots/neondrift/promo-02-gameplay-hazards.png",
      },
      {
        title: { en: "Shop & trails", nl: "Shop & trails" },
        body: {
          en: "Unlock neon trails and orb skins with coins earned from daily challenges.",
          nl: "Unlock neon trails en orb skins met coins uit daily challenges.",
        },
        src: "/screenshots/neondrift/promo-05-shop-unlocks.png",
      },
      {
        title: { en: "Daily challenges", nl: "Daily challenges" },
        body: {
          en: "Fresh goals every day push you back in for one more impossible run.",
          nl: "Verse doelen elke dag trekken je terug voor nog één onmogelijke run.",
        },
        src: "/screenshots/neondrift/promo-07-daily-challenge.png",
      },
    ],
    demoLabel: { en: "Feel the drift", nl: "Voel the drift" },
    extraScreenshots: [
      "/screenshots/neondrift/promo-08-practice-mode.png",
      "/screenshots/neondrift/promo-06-settings-tuning.png",
    ],
  },
  spindodge: {
    stepsLabel: { en: "How Spin Dodge works", nl: "Zo werkt Spin Dodge" },
    stepsTitle: { en: "Orbit, dodge, overdrive", nl: "Orbit, dodge, overdrive" },
    featuresLabel: { en: "Built for mastery", nl: "Gemaakt voor mastery" },
    featuresTitle: { en: "Levels, bosses, upgrades", nl: "Levels, bosses, upgrades" },
    flowScreens: [
      "/screenshots/spindodge/promo-01-menu-arcade.png",
      "/screenshots/spindodge/promo-03-boss-pressure.png",
      "/screenshots/spindodge/promo-04-overdrive.png",
    ],
    featureSpotlights: [
      {
        title: { en: "Overdrive combos", nl: "Overdrive combos" },
        body: {
          en: "Clean dodges stack pressure into points — push into overdrive when the run heats up.",
          nl: "Clean dodges stapelen pressure in points — push into overdrive wanneer the run heet wordt.",
        },
        src: "/screenshots/spindodge/promo-08-combo-control.png",
      },
      {
        title: { en: "Boss phases", nl: "Boss phases" },
        body: {
          en: "Every fifth level rewrites the rules with a new boss identity and mutator phase.",
          nl: "Elke vijfde level herschrijft the rules met een nieuwe boss identity en mutator phase.",
        },
        src: "/screenshots/spindodge/promo-03-boss-pressure.png",
      },
      {
        title: { en: "Orbit Tree", nl: "Orbit Tree" },
        body: {
          en: "Long-term upgrades and prestige cosmetics reward orbit skill over time.",
          nl: "Long-term upgrades en prestige cosmetics belonen orbit skill over tijd.",
        },
        src: "/screenshots/spindodge/promo-05-orbit-tree.png",
      },
    ],
    demoLabel: { en: "Try the demo", nl: "Probeer the demo" },
    extraScreenshots: [
      "/screenshots/spindodge/promo-07-game-over-clip.png",
      "/screenshots/spindodge/promo-02-mutator-rules.png",
    ],
  },
  courlearn: {
    stepsLabel: { en: "How CourLearn works", nl: "Zo werkt CourLearn" },
    stepsTitle: { en: "From lesson to live coaching", nl: "Van les naar live coaching" },
    featuresLabel: { en: "Built for learning", nl: "Gemaakt voor leren" },
    featuresTitle: { en: "Every screen, one purpose", nl: "Elk scherm, één doel" },
    flowScreens: [
      "/screenshots/courlearn/promo-02-learn-hub.png",
      "/screenshots/courlearn/promo-04-live-coach.png",
      "/screenshots/courlearn/promo-03-progress-hub.png",
    ],
    featureSpotlights: [
      {
        title: { en: "Coach live with Couri", nl: "Coach live met Couri" },
        body: {
          en: "Get guided prompts, encouragement, and real speaking practice in the moment.",
          nl: "Krijg guided prompts, encouragement en echte spreek-oefening in het moment.",
        },
        src: "/screenshots/courlearn/promo-04-live-coach.png",
      },
      {
        title: { en: "Speak out loud", nl: "Speak out loud" },
        body: {
          en: "Pronunciation practice with targeted sounds, phrases, and gentle feedback.",
          nl: "Uitspraakoefening met targeted sounds, phrases en gentle feedback.",
        },
        src: "/screenshots/courlearn/promo-06-speaking-practice.png",
      },
      {
        title: { en: "Write with guidance", nl: "Write with guidance" },
        body: {
          en: "Couri reads your writing and nudges the next better sentence — guidance, not a grade.",
          nl: "Couri leest je writing en stuurt naar de volgende betere zin — guidance, geen cijfer.",
        },
        src: "/screenshots/courlearn/promo-07-writing-coach.png",
      },
    ],
    privacy: {
      label: { en: "Private by design", nl: "Privacy eerst" },
      title: { en: "Your conversations stay on-device", nl: "Je gesprekken blijven on-device" },
      body: {
        en: "CourLearn runs on-device inference for core coaching. No server required for your practice sessions.",
        nl: "CourLearn draait on-device inference voor core coaching. Geen server nodig voor je oefensessies.",
      },
      points: [
        { en: "On-device LLM coaching", nl: "On-device LLM coaching" },
        { en: "Offline-first Capacitor shell", nl: "Offline-first Capacitor shell" },
        { en: "Voice practice stays local", nl: "Voice practice blijft lokaal" },
      ],
      bannerSrc: "/screenshots/courlearn/promo-09-profile-hub.png",
    },
    waitlistTitle: { en: "Beta — get notified", nl: "Beta — blijf op de hoogte" },
    waitlistBody: {
      en: "Leave your email for TestFlight and launch updates.",
      nl: "Laat je e-mail achter voor TestFlight- en launch-updates.",
    },
    extraScreenshots: [
      "/screenshots/courlearn/promo-05-coach-modes.png",
      "/screenshots/courlearn/promo-01-language-hub.png",
      "/screenshots/courlearn/promo-08-ai-lab.png",
    ],
  },
  sonr: {
    stepsLabel: { en: "How Sonr works", nl: "Zo werkt Sonr" },
    stepsTitle: { en: "From clip to playlist in seconds", nl: "Van clip naar playlist in seconden" },
    featuresLabel: { en: "Built for discovery", nl: "Gemaakt voor discovery" },
    featuresTitle: { en: "Every screen, one purpose", nl: "Elk scherm, één doel" },
    flowScreens: [
      "/screenshots/sonr/sonr-store-02-home.png",
      "/screenshots/sonr/sonr-store-05-taste.png",
      "/screenshots/sonr/sonr-store-04-for-you.png",
      "/screenshots/sonr/sonr-store-03-library.png",
    ],
    featureSpotlights: [
      {
        title: { en: "For You picks", nl: "For You picks" },
        body: {
          en: "Similar songs ranked by vibe — ready to preview and save in one flow.",
          nl: "Vergelijkbare nummers op vibe — klaar om te previewen en op te slaan.",
        },
        src: "/screenshots/sonr/sonr-store-04-for-you.png",
      },
      {
        title: { en: "Taste controls", nl: "Taste controls" },
        body: {
          en: "Fine-tune recommendations when you want more energy, warmth, or edge.",
          nl: "Fine-tune aanbevelingen voor meer energy, warmte of edge.",
        },
        src: "/screenshots/sonr/sonr-store-05-taste.png",
      },
      {
        title: { en: "Your library", nl: "Je bibliotheek" },
        body: {
          en: "Activity history, sync status, and edits — all stored locally on your device.",
          nl: "Activiteit, sync-status en edits — lokaal op je device.",
        },
        src: "/screenshots/sonr/sonr-store-03-library.png",
      },
    ],
    demoLabel: { en: "Feel the algorithm", nl: "Voel het algoritme" },
    privacy: {
      label: { en: "Private by design", nl: "Privacy eerst" },
      title: { en: "Your clips never leave your phone", nl: "Je clips verlaten je telefoon niet" },
      body: {
        en: "Audio extraction and ShazamKit identification run on-device. Sonr does not upload your videos or recordings to Cour's servers.",
        nl: "Audio-extractie en ShazamKit-identificatie draaien on-device. Sonr uploadt je video's niet naar Cour's servers.",
      },
      points: [
        { en: "On-device audio processing", nl: "On-device audioverwerking" },
        { en: "ShazamKit + MusicKit via Apple frameworks", nl: "ShazamKit + MusicKit via Apple" },
        { en: "Local activity history", nl: "Lokale activiteitgeschiedenis" },
      ],
      bannerSrc: "/screenshots/sonr/sonr-hero.png",
    },
    waitlistTitle: { en: "Beta — get notified", nl: "Beta — blijf op de hoogte" },
    waitlistBody: {
      en: "Leave your email for TestFlight and launch updates.",
      nl: "Laat je e-mail achter voor TestFlight- en launch-updates.",
    },
    extraScreenshots: [
      "/screenshots/sonr/sonr-store-01-boot.png",
      "/screenshots/sonr/sonr-store-06-settings.png",
    ],
  },
};

export function getDetailMarketing(slug: string): DetailMarketing | undefined {
  if (slug in detailMarketing) return detailMarketing[slug as ProductSceneSlug];
  return undefined;
}
