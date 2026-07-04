import type { ProductSceneSlug } from "@/lib/productScenes";

export type FlowBeat = {
  en: string;
  nl: string;
};

export type FlowHeadlinePart = FlowBeat & {
  color?: string;
};

export type FlowHighlight = {
  badge: string;
  title: FlowBeat;
  body: FlowBeat;
};

export type FlowCard = {
  title: FlowBeat;
  body: FlowBeat;
  steps?: FlowBeat[];
  highlight?: FlowHighlight;
};

export type FlowNarrative = {
  slug: ProductSceneSlug;
  /** Short label beside product name */
  eyebrow?: FlowBeat;
  headline: FlowHeadlinePart[];
  intro: FlowBeat;
  pills: FlowBeat[];
  cards: FlowCard[];
  screenshot?: string;
  flipScreenshot?: boolean;
};

export const flowNarratives: Record<ProductSceneSlug, FlowNarrative> = {
  starhook: {
    slug: "starhook",
    intro: {
      en: "Orbit, release, and hook from star to star in a one-touch space challenge built for perfect timing.",
      nl: "Orbit, los en hook van ster naar ster in een one-touch ruimte-uitdaging voor perfecte timing.",
    },
    headline: [
      { en: "Thread the", nl: "Thread the", color: "#ffffff" },
      { en: "Constellation.", nl: "Constellation.", color: "#ffd87a" },
    ],
    pills: [
      { en: "One-touch swing", nl: "One-touch swing" },
      { en: "Stardust runs", nl: "Stardust runs" },
      { en: "Leaderboard chase", nl: "Leaderboard chase" },
    ],
    cards: [
      {
        title: { en: "Built around the hook.", nl: "Built around the hook." },
        body: {
          en: "Each run is a clean timing loop: circle a star, let go, then catch the next anchor before drifting away.",
          nl: "Elke run is een strakke timing-loop: cirkel een ster, laat los, en vang het volgende anker voordat je wegdrijft.",
        },
        steps: [
          { en: "Orbit a glowing star", nl: "Orbit een gloeiende ster" },
          { en: "Release at the right angle", nl: "Los op het juiste moment" },
          { en: "Hook the next target", nl: "Hook het volgende doel" },
        ],
      },
      {
        title: { en: "Short runs, sharp timing.", nl: "Short runs, sharp timing." },
        body: {
          en: "Simple enough to start instantly, tense enough to make every next star feel earned.",
          nl: "Simpel genoeg om direct te starten, spannend genoeg om elke volgende ster verdiend te voelen.",
        },
        highlight: {
          badge: "+1",
          title: { en: "Stardust reward", nl: "Stardust reward" },
          body: {
            en: "Clean chains keep the constellation growing.",
            nl: "Clean chains houden je sterrenbeeld groeiend.",
          },
        },
      },
    ],
    screenshot: "/screenshots/starhook/starhook-menu.png",
    flipScreenshot: false,
  },
  neondrift: {
    slug: "neondrift",
    intro: {
      en: "Guide the glowing core through a field of hazards, chain combos, and chase one more impossible run.",
      nl: "Leid de gloeiende core door een veld van hazards, keten combo's en jaag op nog één onmogelijke run.",
    },
    headline: [
      { en: "Drag.", nl: "Drag.", color: "#00f5d4" },
      { en: "Drift.", nl: "Drift.", color: "#ff2d95" },
      { en: "Survive.", nl: "Survive.", color: "#ffffff" },
    ],
    pills: [
      { en: "One-touch control", nl: "One-touch control" },
      { en: "Combo scoring", nl: "Combo scoring" },
      { en: "Daily challenges", nl: "Daily challenges" },
    ],
    cards: [
      {
        title: { en: "Fast arcade survival", nl: "Fast arcade survival" },
        body: {
          en: "Every run starts simple, then turns into a neon obstacle field built for split-second movement.",
          nl: "Elke run begint simpel, en wordt een neon obstacle field voor split-second movement.",
        },
        steps: [
          { en: "Drag the glowing core", nl: "Sleep de gloeiende core" },
          { en: "Thread through hazards", nl: "Thread door hazards" },
          { en: "Keep the combo alive", nl: "Houd de combo alive" },
        ],
      },
      {
        title: { en: "Built for one more run", nl: "Built for one more run" },
        body: {
          en: "Practice mode, leaderboards, shop unlocks, and daily challenge goals keep the loop moving.",
          nl: "Practice mode, leaderboards, shop unlocks en daily challenges houden de loop levend.",
        },
        highlight: {
          badge: "x2",
          title: { en: "Combo pressure", nl: "Combo pressure" },
          body: {
            en: "Riskier drifting pushes bigger scores.",
            nl: "Risicovoller driften levert hogere scores.",
          },
        },
      },
    ],
    screenshot: "/screenshots/neondrift/01-menu.png",
  },
  spindodge: {
    slug: "spindodge",
    intro: {
      en: "Circle the core, slip through hazard waves, and trigger overdrive when the run starts to bend out of control.",
      nl: "Circle the core, slip door hazard waves en trigger overdrive wanneer the run begint te ontsporen.",
    },
    headline: [
      { en: "Spin fast.", nl: "Spin fast.", color: "#ffffff" },
      { en: "Dodge faster.", nl: "Dodge faster.", color: "#ffb938" },
    ],
    pills: [
      { en: "Orbit control", nl: "Orbit control" },
      { en: "Overdrive combos", nl: "Overdrive combos" },
      { en: "Boss phases", nl: "Boss phases" },
    ],
    cards: [
      {
        title: { en: "Built for orbit pressure.", nl: "Built for orbit pressure." },
        body: {
          en: "The core rule is readable instantly: stay on the ring, dodge the hazards, and keep the combo alive.",
          nl: "The core rule is direct leesbaar: blijf on the ring, dodge the hazards en houd the combo alive.",
        },
        steps: [
          { en: "Spin around the core", nl: "Spin around the core" },
          { en: "Dodge incoming hazards", nl: "Dodge incoming hazards" },
          { en: "Push into overdrive", nl: "Push into overdrive" },
        ],
      },
      {
        title: { en: "One more level.", nl: "One more level." },
        body: {
          en: "Short, readable rounds stack into harder patterns, faster phases, and better score runs.",
          nl: "Short, readable rounds stapelen naar harder patterns, faster phases en betere score runs.",
        },
        highlight: {
          badge: "x2",
          title: { en: "Combo scoring", nl: "Combo scoring" },
          body: {
            en: "Clean dodges turn pressure into points.",
            nl: "Clean dodges turn pressure into points.",
          },
        },
      },
    ],
    screenshot: "/screenshots/spindodge/01-menu.png",
    flipScreenshot: false,
  },
  courlearn: {
    slug: "courlearn",
    intro: {
      en: "Meet Couri — your on-device AI coach for speaking practice, live coaching, and adaptive focus.",
      nl: "Meet Couri — je on-device AI coach voor spreek-oefening, live coaching en adaptieve focus.",
    },
    headline: [
      { en: "Learn with", nl: "Learn with", color: "#ffffff" },
      { en: "Couri.", nl: "Couri.", color: "#7dd3fc" },
    ],
    pills: [
      { en: "On-device LLM", nl: "On-device LLM" },
      { en: "Voice practice", nl: "Voice practice" },
      { en: "Private by design", nl: "Private by design" },
    ],
    cards: [
      {
        title: { en: "Conversation-first lessons", nl: "Conversation-first lessons" },
        body: {
          en: "Lessons built around dialogue — not a grid of chatbot replies.",
          nl: "Lessen rond dialoog — geen grid vol chatbot-antwoorden.",
        },
        steps: [
          { en: "Open a lesson hub", nl: "Open a lesson hub" },
          { en: "Practice with Couri live", nl: "Oefen live met Couri" },
          { en: "Track adaptive focus", nl: "Volg adaptive focus" },
        ],
      },
      {
        title: { en: "Offline-first shell", nl: "Offline-first shell" },
        body: {
          en: "Capacitor iOS app with on-device inference — no server required for core coaching.",
          nl: "Capacitor iOS app met on-device inference — geen server nodig voor core coaching.",
        },
        highlight: {
          badge: "AI",
          title: { en: "On your phone", nl: "On your phone" },
          body: {
            en: "Your conversations stay on-device.",
            nl: "Je gesprekken blijven on-device.",
          },
        },
      },
    ],
    screenshot: "/screenshots/courlearn/promo-02-learn-hub.png",
  },
  sonr: {
    slug: "sonr",
    intro: {
      en: "Find songs that feel like the one you love — identify, tune the vibe, and save to Apple Music.",
      nl: "Vind nummers die voelen als degene die je liefhebt — identificeer, tune de vibe, sla op in Apple Music.",
    },
    headline: [
      { en: "Hear it once.", nl: "Één keer horen.", color: "#ffffff" },
      { en: "Find the feel.", nl: "Vind the feel.", color: "#fa243c" },
    ],
    pills: [
      { en: "Clip to song", nl: "Clip naar nummer" },
      { en: "Vibe tuning", nl: "Vibe tuning" },
      { en: "Apple Music sync", nl: "Apple Music sync" },
    ],
    cards: [
      {
        title: { en: "From clip to playlist", nl: "From clip to playlist" },
        body: {
          en: "Import from Photos or Share sheet. Audio stays on your device.",
          nl: "Importeer via Photos or Share sheet. Audio blijft on-device.",
        },
        steps: [
          { en: "Import or identify a track", nl: "Importeer or identificeer" },
          { en: "Tune mood and energy", nl: "Tune mood en energy" },
          { en: "Save similar picks", nl: "Sla vergelijkbare picks op" },
        ],
      },
      {
        title: { en: "Private by design", nl: "Private by design" },
        body: {
          en: "On-device audio matching and MusicKit via Apple frameworks. No media uploads to Cour servers.",
          nl: "On-device audio matching en MusicKit via Apple. Geen media uploads naar Cour servers.",
        },
        highlight: {
          badge: "♪",
          title: { en: "For You picks", nl: "For You picks" },
          body: {
            en: "Similar songs ranked by vibe, ready to save.",
            nl: "Vergelijkbare nummers op vibe, klaar om op te slaan.",
          },
        },
      },
    ],
    screenshot: "/screenshots/sonr/sonr-store-02-home.png",
  },
};

export function getFlowNarrative(slug: string): FlowNarrative | undefined {
  if (slug in flowNarratives) return flowNarratives[slug as ProductSceneSlug];
  return undefined;
}

/** Map scroll progress within a scene (0–1) to active step index */
export function flowActiveStep(sceneLocal: number, stepCount: number): number {
  if (stepCount <= 1) return 0;
  // Steps complete by flowCardFocus threshold so step 3 lights before the second card takes over
  const windowEnd = 0.55;
  const t = Math.min(1, Math.max(0, sceneLocal / windowEnd));
  return Math.min(stepCount - 1, Math.floor(t * stepCount));
}

export function flowCardFocus(sceneLocal: number): 0 | 1 {
  return sceneLocal >= 0.55 ? 1 : 0;
}
