import { useI18n } from "@/i18n/I18nProvider.tsx";
import type { Locale } from "@/i18n/locale.ts";
import { aboutData } from "./about.data.ts";
import { aboutDataEs } from "./about.es.data.ts";
import { aboutDataPt } from "./about.pt.data.ts";
import type { AboutData } from "./about.types.ts";

const ABOUT_BY_LOCALE: Record<Locale, AboutData> = {
  en: aboutData,
  pt: aboutDataPt,
  es: aboutDataEs,
};

// About Me content in the current locale
export function useAboutData(): AboutData {
  const { locale } = useI18n();
  return ABOUT_BY_LOCALE[locale];
}
