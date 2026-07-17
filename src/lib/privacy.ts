import { CONTACT_EMAIL } from "@/lib/site";

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

const UPDATED = "17 July 2026";

const thirdPartyEqualProtection =
  "When Cour uses a third-party service that processes data in connection with a product (for example Apple frameworks or Google AdMob), Cour requires that those providers protect user data with protections that are the same as, or equal to, the protections described in this policy and required by Apple's App Review Guidelines.";

function retentionDeletionSection(productName: string, extras: string[] = []): PrivacySection {
  return {
    title: "Data Retention And Deletion",
    paragraphs: [
      `Local gameplay, preference, and progress data for ${productName} is retained on your device until you clear it or delete the app.`,
      `You can delete local data by deleting ${productName} from your device. If you use optional Apple services (such as Game Center or Apple Music), you can manage or delete related data through your Apple ID and the relevant Apple product settings.`,
      `To request deletion of any personal information Cour may hold about you in connection with ${productName}, email ${CONTACT_EMAIL} with your request. We will respond within a reasonable time and delete or anonymize information we control, except where we must retain it for legal, security, or fraud-prevention reasons.`,
      ...extras,
    ],
  };
}

function consentSection(hasAds: boolean): PrivacySection {
  return {
    title: "Consent, Privacy Choices, And Withdrawal",
    paragraphs: hasAds
      ? [
          "Where required by law, we ask for your advertising and tracking privacy choices before requesting personalized ads.",
          "You can withdraw advertising or tracking consent at any time by declining App Tracking Transparency prompts, updating options in the app's settings (where available), resetting your advertising identifier in iOS Settings, or changing privacy settings for Apple services you use.",
          `You can also email ${CONTACT_EMAIL} to ask how to withdraw consent or exercise privacy rights available in your region.`,
        ]
      : [
          "Cour does not sell personal data. Optional features that need permissions (for example microphone, Photos, or Apple Music) only run after you grant access.",
          "You can withdraw permission at any time in iOS Settings for the app, or by disabling the related feature in the app.",
          `You can also email ${CONTACT_EMAIL} to ask how to withdraw consent or exercise privacy rights available in your region.`,
        ],
  };
}

export const companyPrivacyDoc: PrivacyDoc = {
  updated: UPDATED,
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
        "Each Cour game and app handles data according to its own privacy policy. Those policies explain what is stored on your device, which optional services (such as Game Center, AdMob, or Apple Music) may be used, how long data is retained, how to request deletion, and how to contact us about that product.",
        "For product-specific details, see the privacy policies linked below.",
      ],
    },
    {
      title: "Data Retention And Deletion",
      paragraphs: [
        "Website server logs are retained only as long as needed for security and site operation, then deleted or anonymized.",
        `To request deletion of personal information Cour may hold about you, email ${CONTACT_EMAIL}. We will respond within a reasonable time and delete or anonymize information we control, except where retention is required by law or needed for security.`,
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
        thirdPartyEqualProtection,
      ],
    },
    {
      title: "Changes To This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Product-specific policies may also be updated independently when product practices change.",
      ],
    },
  ],
  contact: CONTACT_EMAIL,
};

export const privacyDocs: Record<string, PrivacyDoc> = {
  starhook: {
    updated: UPDATED,
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
          "On iOS 14 and later, Starhook may present App Tracking Transparency when personalized advertising requires tracking permission. You can decline and still play; ads may be less personalized.",
        ],
      },
      consentSection(true),
      retentionDeletionSection("Starhook", [
        "Advertising data collected by Google AdMob is retained according to Google's policies. You can limit ad tracking in iOS Settings and through any in-app privacy options Starhook provides.",
      ]),
      {
        title: "Children",
        paragraphs: [
          "Starhook is not intended to knowingly collect personal information from children. If you believe a child has provided personal information through the app, please contact us so we can review it.",
        ],
      },
      {
        title: "Third-Party Services",
        paragraphs: [
          "Starhook may use the following third-party services:",
          thirdPartyEqualProtection,
        ],
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
    contact: CONTACT_EMAIL,
  },
  neondrift: {
    updated: UPDATED,
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
      consentSection(true),
      retentionDeletionSection("Neon Drift", [
        "Advertising data collected by Google AdMob is retained according to Google's policies. You can limit ad tracking in iOS Settings.",
      ]),
      {
        title: "Children",
        paragraphs: [
          "The App is not directed at children under 13. We do not knowingly collect personal information from children.",
        ],
      },
      {
        title: "Third-Party Services",
        paragraphs: [
          "Neon Drift may use the following third-party services:",
          thirdPartyEqualProtection,
        ],
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
    contact: CONTACT_EMAIL,
  },
  spindodge: {
    updated: UPDATED,
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
          "Optional rewarded ads may be served through Google AdMob. Google may collect or use device information, advertising identifiers, approximate location, ad interactions, and diagnostics to provide and measure ads.",
          "Where required, Spin Dodge may present consent or App Tracking Transparency prompts before personalized ads. You can decline and still play.",
        ],
      },
      consentSection(true),
      retentionDeletionSection("Spin Dodge", [
        "Advertising data collected by Google AdMob is retained according to Google's policies. You can limit ad tracking in iOS Settings.",
      ]),
      {
        title: "Children",
        paragraphs: [
          "Spin Dodge is not directed at children under 13. We do not knowingly collect personal information from children.",
        ],
      },
      {
        title: "Third-Party Services",
        paragraphs: [
          "Spin Dodge may use the following third-party services:",
          thirdPartyEqualProtection,
        ],
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
    contact: CONTACT_EMAIL,
  },
  sonr: {
    updated: UPDATED,
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
      consentSection(false),
      retentionDeletionSection("Sonr", [
        "Media you import is processed for the feature you requested and is not uploaded to Cour's servers. Apple Music and ShazamKit data is handled under Apple's retention practices.",
      ]),
      {
        title: "Third-Party Services",
        paragraphs: [
          "Sonr may use the following Apple frameworks:",
          thirdPartyEqualProtection,
        ],
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
      {
        title: "Changes To This Policy",
        paragraphs: [
          "This Privacy Policy may be updated from time to time. Any changes will be posted on this page with an updated date.",
        ],
      },
    ],
    contact: CONTACT_EMAIL,
  },
  courlearn: {
    updated: UPDATED,
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
      consentSection(false),
      retentionDeletionSection("CourLearn", [
        "If you later enable optional cloud AI features, that processing happens only with your consent, and you can withdraw consent by disabling those features and contacting us for deletion of any related data Cour controls.",
      ]),
      {
        title: "Children",
        paragraphs: [
          "CourLearn is not directed at children under 13 without parental involvement. We do not knowingly collect personal information from children.",
        ],
      },
      {
        title: "Third-Party Services",
        paragraphs: [
          "CourLearn is designed to keep core coaching on-device. If a future version uses a third-party AI or analytics provider, this policy will be updated first.",
          thirdPartyEqualProtection,
        ],
      },
      {
        title: "Changes To This Policy",
        paragraphs: [
          "This Privacy Policy may be updated from time to time. Any changes will be posted on this page with an updated date.",
        ],
      },
    ],
    contact: CONTACT_EMAIL,
  },
};
