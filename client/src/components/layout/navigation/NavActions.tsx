import { useCallback, useId, useState } from "react";
import { useTheme } from "@/app/theme/ThemeProvider.tsx";
import IconButton from "@/components/ui/IconButton/IconButton.tsx";
import { Menu } from "@/components/ui/Menu/Menu.tsx";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import {
  LOCALE_NAMES,
  LOCALE_TAGS,
  LOCALES,
  type Locale,
} from "@/i18n/locale.ts";
import styles from "./NavActions.module.css";

type Width = "default" | "wide";

// Language and theme actions, shared by the rail (default width) and the
// top app bar (wide), as in Figma.
// The language button opens the Figma "Language Menu": beside the rail,
// under the top app bar. Each option is named in its own language.
export function LanguageAction({ width = "default" }: { width?: Width }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const close = useCallback(() => setOpen(false), []);

  return (
    <div className={styles.anchor}>
      <IconButton
        type="round"
        size="medium"
        style="outline"
        width={width}
        icon="translate"
        ariaLabel={`${t.layout.language}: ${LOCALE_NAMES[locale]}`}
        ariaHasPopup="menu"
        ariaExpanded={open}
        ariaControls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
      />
      {open && (
        <Menu
          id={menuId}
          label={t.layout.language}
          placement={width === "wide" ? "bottom-end" : "right-end"}
          options={LOCALES.map((id) => ({
            id,
            label: LOCALE_NAMES[id],
            lang: LOCALE_TAGS[id],
          }))}
          selectedId={locale}
          onSelect={(id) => {
            setLocale(id as Locale);
            close();
          }}
          onClose={close}
        />
      )}
    </div>
  );
}

export function ThemeAction({ width = "default" }: { width?: Width }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useI18n();
  const isDark = resolvedTheme === "dark";
  return (
    <IconButton
      type="round"
      size="medium"
      style="outline"
      width={width}
      icon="dark_mode"
      selectedIcon="light_mode"
      selected={isDark}
      ariaLabel={t.layout.darkTheme}
      ariaPressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    />
  );
}
