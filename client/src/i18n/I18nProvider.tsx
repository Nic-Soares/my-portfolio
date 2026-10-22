import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  initialLocale,
  LOCALE_TAGS,
  type Locale,
  storeLocale,
} from "./locale.ts";
import { en } from "./locales/en.ts";
import { es } from "./locales/es.ts";
import { pt } from "./locales/pt.ts";
import type { Messages } from "./messages.ts";

const CATALOGS: Record<Locale, Messages> = { en, pt, es };

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
}

// Without a provider (isolated component tests) strings fall back to English
const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState(initialLocale);

  useEffect(() => {
    document.documentElement.lang = LOCALE_TAGS[locale];
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    storeLocale(next);
    setLocaleState(next);
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, t: CATALOGS[locale] }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
