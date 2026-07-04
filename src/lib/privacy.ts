export type PrivacySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type PrivacyDoc = {
  updated: string;
  intro: string;
  sections: PrivacySection[];
  contact: string;
};

export const companyPrivacyDoc: PrivacyDoc = {
  updated: "3 July 2026",
  intro:
    "Cour is an independent studio that builds mobile games and apps. This Privacy Policy describes how Cour handles information at the studio level. Each Cour product also has its own privacy policy with product-specific details.",
  sections: [
    {
      title: "What Cour Collects",
      paragraphs: [
        "Cour does not operate a central user account system for its website or products. We do not sell personal data.",
        "When you visit cour.software, standard web server logs may temporarily record information such as your IP address, browser type, and pages visited. These logs are used for security and basic site operation.",
      ],
    },
    {
      title: "Product Privacy Policies",
      paragraphs: [
        "Each Cour game and app handles data according to its own privacy policy. Those policies explain what is stored on your device, which optional services (such as Game Center, AdMob, or Apple Music) may be used, and how to contact us about that product.",
        "For product-specific details, see the privacy policies linked below.",
      ],
    },
    {
      title: "Children",
      paragraphs: [
        "Cour products are not directed at children under 13 without appropriate parental involvement. We do not knowingly collect personal information from children through our website or apps.",
      ],
    },
    {
      title: "Third-Party Services",
      paragraphs: [
        "Some Cour products integrate third-party services such as Apple Game Center, Google AdMob, ShazamKit, or MusicKit. Those services are governed by their own privacy policies. Product-specific policies explain which services apply to each app or game.",
      ],
    },
    {
      title: "Changes To This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Product-specific policies may also be updated independently when product practices change.",
      ],
    },
  ],
  contact: "support@starhook.app",
};

export const privacyDocs: Record<string, PrivacyDoc> = {
  starhook: {
    updated: "2 July 2026",
    intro:
      "Starhook is a mobile game by Cour. This Privacy Policy explains what information may be collected or used when you play Starhook.",
    sections: [
      {
        title: "Information Starhook Stores On Your Device",
        paragraphs: [
          "Starhook stores some gameplay information locally on your device, such as your best score, stardust balance, unlocked shop items, selected themes, selected orb colours, sound settings, haptics settings, and tutorial progress.",
          "This local gameplay information is used to make the game work and remember your preferences.",
        ],
      },
      {
        title: "Game Center",
        paragraphs: [
          "Starhook may use Apple Game Center for leaderboards and achievements. If you use Game Center, Apple may process your Game Center profile, scores, achievements, and related account information. Game Center is provided by Apple and is subject to Apple's privacy practices.",
        ],
      },
      {
        title: "Advertising",
        paragraphs: [
          "Starhook may show optional rewarded ads using Google AdMob. Rewarded ads are shown only when you choose to watch an ad in exchange for an in-game reward, such as extra stardust.",
          "Google AdMob may collect or use information such as device information, advertising identifiers, approximate location, ad interactions, diagnostics, and other data used to provide, measure, and improve advertising. Depending on your location, you may be shown a consent form before ads are requested.",
        ],
      },
      {
        title: "Consent And Privacy Choices",
        paragraphs: [
          "Where required, Starhook will ask for your advertising privacy choices before requesting ads. If privacy options are available in your region, Starhook may provide a way to review or update those choices from the app's settings.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "Starhook is not intended to knowingly collect personal information from children. If you believe a child has provided personal information through the app, please contact us so we can review it.",
        ],
      },
      {
        title: "Third-Party Services",
        paragraphs: ["Starhook may use the following third-party services:"],
        bullets: [
          "Google AdMob for optional rewarded advertising.",
          "Apple Game Center for leaderboards and achievements.",
        ],
      },
      {
        title: "Changes To This Policy",
        paragraphs: [
          "This Privacy Policy may be updated from time to time. Any changes will be posted on this page with an updated date.",
        ],
      },
    ],
    contact: "support@starhook.app",
  },
  neondrift: {
    updated: "18 June 2026",
    intro:
      'Neon Drift ("the App") is developed by Cour. This policy explains what data the App collects and how it is used.',
    sections: [
      {
        title: "Data Stored On Your Device",
        paragraphs: [
          "The App saves game progress locally using UserDefaults, including high scores, coins, unlocked items, achievements, and settings. This data stays on your device unless you delete the App.",
        ],
      },
      {
        title: "Game Center",
        paragraphs: [
          "If you sign in to Game Center, your display name and leaderboard scores are handled by Apple according to Apple's privacy policy.",
        ],
      },
      {
        title: "Advertising (Google AdMob)",
        paragraphs: [
          "The App may show rewarded video ads via Google AdMob. Google may collect device identifiers, IP address, and ad interaction data to serve and measure ads.",
          "On iOS 14+, the App may request permission to track activity across apps for personalized ads (App Tracking Transparency). You can decline and still play; ad relevance may be reduced.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "The App is not directed at children under 13. We do not knowingly collect personal information from children.",
        ],
      },
    ],
    contact: "GitHub Issues at github.com/eb1388/neondrift/issues",
  },
  spindodge: {
    updated: "June 2026",
    intro:
      "Spin Dodge stores gameplay progress locally on your device. Optional Game Center features send scores to Apple. Optional rewarded ads use Google AdMob, which may collect advertising identifiers per Google's policy. We do not sell personal data.",
    sections: [
      {
        title: "Local Data",
        paragraphs: [
          "Scores, coins, settings, and unlock progress are stored on your device and are not transmitted to Cour unless you use optional online features.",
        ],
      },
      {
        title: "Game Center",
        paragraphs: [
          "If enabled, leaderboard scores and achievements are processed by Apple under Apple's privacy policy.",
        ],
      },
      {
        title: "Advertising",
        paragraphs: [
          "Optional rewarded ads may be served through Google AdMob. See Google's Privacy Policy for details on ad-related data collection.",
        ],
      },
    ],
    contact: "GitHub Issues at github.com/eb1388/spindodge/issues",
  },
  sonr: {
    updated: "3 July 2026",
    intro:
      "Sonr is a music utility by Cour. This policy explains what information may be accessed when you use Sonr to identify songs and save them to Apple Music.",
    sections: [
      {
        title: "Information Stored On Your Device",
        paragraphs: [
          "Sonr stores your recent activity locally, including matched songs, sync status, and edit history. This data stays on your device unless you delete the app.",
        ],
      },
      {
        title: "Photos And Media You Choose",
        paragraphs: [
          "When you import a video or audio clip, Sonr processes that file on your device to extract audio for song identification. Sonr does not access your library without your explicit selection.",
        ],
      },
      {
        title: "ShazamKit",
        paragraphs: [
          "Sonr uses Apple's ShazamKit to identify songs from audio you provide. Identification requests are handled according to Apple's privacy practices.",
        ],
      },
      {
        title: "Apple Music",
        paragraphs: [
          "If you choose to save a match, Sonr uses MusicKit to search Apple Music and add songs to your playlist. Apple processes your Apple Music account and library according to Apple's privacy policy.",
        ],
      },
      {
        title: "Third-Party Services",
        paragraphs: ["Sonr may use the following Apple frameworks:"],
        bullets: [
          "ShazamKit for song identification.",
          "MusicKit for Apple Music playlist sync.",
          "AVFoundation for on-device audio extraction.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "Sonr is not directed at children under 13. We do not knowingly collect personal information from children.",
        ],
      },
    ],
    contact: "support@starhook.app",
  },
  courlearn: {
    updated: "3 July 2026",
    intro:
      "CourLearn is powered by Couri, an on-device AI coach built by Cour. This policy explains how the app handles your information.",
    sections: [
      {
        title: "On-Device Learning Data",
        paragraphs: [
          "CourLearn stores your learning progress, lesson history, settings, and journey statistics locally on your device. This data is used to personalize your experience and is not required to be sent to Cour's servers for core functionality.",
        ],
      },
      {
        title: "On-Device AI",
        paragraphs: [
          "CourLearn may run AI models on your device for coaching and language features. When using on-device AI, your conversations and prompts are processed locally. If you enable features that require cloud AI, you will be asked for consent first.",
        ],
      },
      {
        title: "Microphone And Audio",
        paragraphs: [
          "If you use speaking or pronunciation features, CourLearn may access your microphone to process audio for learning feedback. Audio is used to provide the feature you requested.",
        ],
      },
      {
        title: "Analytics",
        paragraphs: [
          "CourLearn is designed to minimize data collection. We do not sell personal data. If analytics are added in future versions, this policy will be updated before they are enabled.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "CourLearn is not directed at children under 13 without parental involvement. We do not knowingly collect personal information from children.",
        ],
      },
    ],
    contact: "support@starhook.app",
  },
};
