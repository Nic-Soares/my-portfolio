import { useTheme } from "@/app/theme/ThemeProvider.tsx";
import IconButton from "@/components/ui/IconButton/IconButton.tsx";

type Width = "default" | "wide";

// Language and theme actions, shared by the rail (default width) and the
// top app bar (wide), as in Figma.
export function LanguageAction({ width = "default" }: { width?: Width }) {
  // Language switching arrives with i18n (EP-11)
  return (
    <IconButton
      type="round"
      size="medium"
      style="outline"
      width={width}
      icon="translate"
      disabled
      ariaLabel="Language (coming soon)"
    />
  );
}

export function ThemeAction({ width = "default" }: { width?: Width }) {
  const { resolvedTheme, setTheme } = useTheme();
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
      ariaLabel="Dark theme"
      ariaPressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    />
  );
}
