
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enCommon from "./locales/en/common.json";
import arCommon from "./locales/ar/common.json";

export const LANGUAGES = {
  en: { label: "English", dir: "ltr" },
  ar: { label: "العربية", dir: "rtl" },
} as const;

export type Lang = keyof typeof LANGUAGES;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      ar: { common: arCommon },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    load: "languageOnly",
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
  });

function applyLang(lng?: string) {
  const lang: Lang = lng?.startsWith("ar") ? "ar" : "en";
  document.documentElement.lang = lang;
  document.documentElement.dir = LANGUAGES[lang].dir;
}

applyLang(i18n.resolvedLanguage);
i18n.on("languageChanged", applyLang);

export default i18n;
