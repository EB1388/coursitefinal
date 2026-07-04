export type Locale = "en" | "nl";

const dict = {
  en: {
    navApps: "Apps",
    navPress: "Press",
    heroLabel: "Cour Software",
    heroTitle1: "Games worth",
    heroTitle2: "one more run.",
    heroBody:
      "We craft mobile games and apps with obsessive polish — tight controls, glowing visuals, and the invisible details that make software feel alive.",
    heroCta: "See our work",
    statGames: "Games shipped",
    statApps: "Apps in beta",
    statControls: "Controls",
    statRetries: "Retries",
    gamesLabel: "Our games",
    gamesTitle: "Built for mobile. Designed to delight.",
    appsBody:
      "Games and apps with clear privacy policies, support pages, and craft you can feel.",
    privacyTitle: "Privacy-first by design",
    privacyBody:
      "Clear policies for every app. Local-first gameplay data. Optional ads only when you choose.",
    footerTagline:
      "Independent studio crafting polished mobile games and apps — built for one more run.",
    footerGames: "Games",
    footerLegal: "Legal",
    viewApp: "View app",
    privacy: "Privacy",
    support: "Support",
    contact: "Contact",
    pressTitle: "Press Kit",
    pressSubtitle: "Logos, screenshots, and fast facts for press and partners.",
    downloadScreens: "Download screenshots",
    playDemo: "Try the demo",
    watchTrailer: "Watch trailer",
    soundOn: "Sound on",
    soundOff: "Sound off",
    productsLabel: "Apps & tools",
    productsTitle: "Private, on-device, built to last.",
    tryDemo: "Tap to launch your comet toward the next star.",
    demoScore: "Score",
    demoTap: "Tap anywhere to hook",
  },
  nl: {
    navApps: "Apps",
    navPress: "Pers",
    heroLabel: "Cour Software",
    heroTitle1: "Games die",
    heroTitle2: "nog één run vragen.",
    heroBody:
      "We maken mobiele games en apps met obsessieve afwerking — strakke besturing, gloeiende visuals en onzichtbare details die software levend laten voelen.",
    heroCta: "Bekijk ons werk",
    statGames: "Games uitgebracht",
    statApps: "Apps in beta",
    statControls: "Besturing",
    statRetries: "Pogingen",
    gamesLabel: "Onze games",
    gamesTitle: "Gemaakt voor mobiel. Ontworpen om te bekoren.",
    appsBody:
      "Games en apps met duidelijke privacybeleid, supportpagina's en vakmanschap dat je voelt.",
    privacyTitle: "Privacy eerst",
    privacyBody:
      "Duidelijk beleid voor elke app. Lokale gameplay-data. Optionele ads alleen als jij kiest.",
    footerTagline:
      "Onafhankelijke studio voor gepolijste mobiele games en apps — gemaakt voor nog één run.",
    footerGames: "Games",
    footerLegal: "Juridisch",
    viewApp: "Bekijk app",
    privacy: "Privacy",
    support: "Support",
    contact: "Contact",
    pressTitle: "Perskit",
    pressSubtitle: "Logo's, screenshots en snelle feiten voor pers en partners.",
    downloadScreens: "Download screenshots",
    playDemo: "Probeer de demo",
    watchTrailer: "Bekijk trailer",
    soundOn: "Geluid aan",
    soundOff: "Geluid uit",
    productsLabel: "Apps & tools",
    productsTitle: "Privé, on-device, gebouwd om te blijven.",
    tryDemo: "Tik om je komeet naar de volgende ster te lanceren.",
    demoScore: "Score",
    demoTap: "Tik om te haken",
  },
} as const;

export type TranslationKey = keyof (typeof dict)["en"];

export function t(locale: Locale, key: TranslationKey): string {
  return dict[locale][key];
}
