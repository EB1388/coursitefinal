export type FaqItem = {
  question: string;
  answer: string;
};

export type SupportDoc = {
  intro: string;
  faqs: FaqItem[];
  contact: string;
};

export const supportDocs: Record<string, SupportDoc> = {
  starhook: {
    intro:
      "Need help with Starhook? Find answers below or reach out — we're here to help you get back to threading constellations.",
    faqs: [
      {
        question: "How do I play?",
        answer:
          "Your comet orbits a star automatically. Tap to release and fly in a straight line. If your path intersects another star, you hook it and begin orbiting again. Miss, and your run ends.",
      },
      {
        question: "What is stardust?",
        answer:
          "Stardust is earned from each run. Spend it in the theme store to unlock cosmetic sky themes and orb colours. There are no in-app purchases — everything unlocks through gameplay.",
      },
      {
        question: "Why am I seeing ads?",
        answer:
          "Starhook offers optional rewarded ads. You choose when to watch an ad in exchange for bonus stardust. Ads are never forced during gameplay.",
      },
      {
        question: "Does Starhook need an internet connection?",
        answer:
          "No. Starhook works fully offline. Game Center and ads require a connection when you choose to use those features.",
      },
      {
        question: "How do I reset my progress?",
        answer:
          "Delete and reinstall the app to reset local progress. Game Center leaderboard entries are managed through your Apple ID settings.",
      },
    ],
    contact: "support@starhook.app",
  },
  neondrift: {
    intro:
      "Questions about Neon Drift? Check the FAQs below or open an issue on GitHub.",
    faqs: [
      {
        question: "How do controls work?",
        answer:
          "Drag anywhere on screen — your orb follows your finger. Release to stop dragging. The orb continues with momentum.",
      },
      {
        question: "What are daily challenges?",
        answer:
          "Each day brings a unique challenge with bonus coin rewards. Complete it before midnight to claim the reward.",
      },
      {
        question: "How do rewarded ads work?",
        answer:
          "After game over, you can optionally watch a rewarded video ad to revive and continue your run. This is entirely optional.",
      },
      {
        question: "Game Center isn't working",
        answer:
          "Make sure you're signed into Game Center in iOS Settings and have an active internet connection. Restart the app after signing in.",
      },
    ],
    contact: "github.com/eb1388/neondrift/issues",
  },
  spindodge: {
    intro:
      "Spin Dodge support — find answers to common questions or contact us via GitHub.",
    faqs: [
      {
        question: "How do I flip direction?",
        answer:
          "Tap anywhere on screen while orbiting to flip your direction instantly. Timing is everything.",
      },
      {
        question: "What are boss levels?",
        answer:
          "Every fifth level features a boss with a unique attack pattern: ring waves, homing plasma, direction disruptions, or shrinking orbit radius.",
      },
      {
        question: "What is the Orbit Tree?",
        answer:
          "The Orbit Tree is a long-term upgrade system. Earn resources from runs and bosses to permanently improve your orb's capabilities.",
      },
      {
        question: "Unlimited vs Level mode?",
        answer:
          "Level mode has timed stages and bosses. Unlimited mode has no timer — chase high combo scores with near-miss multipliers.",
      },
    ],
    contact: "github.com/eb1388/spindodge/issues",
  },
  sonr: {
    intro:
      "Sonr support — help with importing clips, identifying songs, and saving to Apple Music.",
    faqs: [
      {
        question: "How do I import a TikTok sound?",
        answer:
          "Save the video to Photos first, then import it in Sonr or share it to Sonr from the iOS share sheet. iOS does not allow apps to silently capture audio from TikTok directly.",
      },
      {
        question: "Why didn't Sonr find my song?",
        answer:
          "Identification depends on audio clarity and ShazamKit's catalog. Try a cleaner clip, trim to the clearest section, or edit the title and artist manually before saving.",
      },
      {
        question: "Where do saved songs go?",
        answer:
          "Matched Apple Music songs are added to your TikTok Finds playlist (or the playlist you configure). Sonr uses MusicKit and requires Apple Music access.",
      },
      {
        question: "Does Sonr upload my videos?",
        answer:
          "No. Audio extraction and identification happen on your device. Sonr does not upload your media files to Cour's servers.",
      },
    ],
    contact: "support@starhook.app",
  },
  courlearn: {
    intro:
      "CourLearn support — help with Couri, lessons, and on-device AI features.",
    faqs: [
      {
        question: "What is Couri?",
        answer:
          "Couri is the on-device AI coach at the heart of CourLearn. Couri guides your learning through contextual coaching and tutor-led surfaces — not a generic chatbot grid.",
      },
      {
        question: "Does CourLearn work offline?",
        answer:
          "Core lessons and on-device AI features are designed to work offline-first. Some features may require a connection when enabled.",
      },
      {
        question: "How is my data stored?",
        answer:
          "Learning progress and settings are stored locally on your device. Cloud AI features, if enabled, will ask for your consent first.",
      },
      {
        question: "How do I reset my progress?",
        answer:
          "Delete and reinstall the app to reset local progress, or use in-app settings if a reset option is available in your build.",
      },
    ],
    contact: "support@starhook.app",
  },
};
