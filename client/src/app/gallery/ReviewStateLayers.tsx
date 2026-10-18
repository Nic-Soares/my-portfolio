// Temporary side-by-side review for TK-04.6.5 (state layers).
// "Current" renders the pre-change copies in ./legacy; delete both once approved.
import type { ReactNode } from "react";
import TabbedNavigation from "@/components/layout/navigation/TabbedNavigation/TabbedNavigation.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import IconButton from "@/components/ui/IconButton/IconButton.tsx";
import styles from "./Gallery.module.css";
import LegacyButton from "./legacy/Button/Button.tsx";
import LegacyIconButton from "./legacy/IconButton/IconButton.tsx";
import LegacyTabbedNavigation from "./legacy/TabbedNavigation/TabbedNavigation.tsx";

const BUTTON_STYLES = [
  "filled",
  "tonal",
  "outline",
  "text",
  "elevated",
] as const;
const ICON_STYLES = ["filled", "tonal", "outline", "standard"] as const;
const TABS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "repository", label: "Repository" },
];

function Column({
  title,
  B,
  I,
  T,
}: {
  title: string;
  B: typeof Button;
  I: typeof IconButton;
  T: typeof TabbedNavigation;
}) {
  return (
    <div className={styles.compareColumn}>
      <h3 className="title-medium">{title}</h3>
      <Group label="Button">
        {BUTTON_STYLES.map((style) => (
          <B key={style} size="small" style={style} label={style} />
        ))}
        <B size="small" style="tonal" label="toggle" toggleable />
      </Group>
      <Group label="IconButton">
        {ICON_STYLES.map((style) => (
          <I key={style} style={style} icon="favorite" ariaLabel={style} />
        ))}
        <I
          style="outline"
          icon="dark_mode"
          selectedIcon="light_mode"
          toggleable
          ariaLabel="toggle"
        />
      </Group>
      <Group label="Tab Bar (filled)">
        <T tabs={TABS} />
      </Group>
      <Group label="Tab Bar (tonal)">
        <T tabs={TABS} buttonStyle="tonal" />
      </Group>
    </div>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.compareGroup}>
      <span className="label-medium">{label}</span>
      <div className={styles.rowItems}>{children}</div>
    </div>
  );
}

export default function ReviewStateLayers() {
  return (
    <section className={styles.review} aria-labelledby="review-state-layers">
      <header className={styles.specimenHeader}>
        <h2 id="review-state-layers" className="headline-small">
          Review · TK-04.6.5 state layers
        </h2>
        <p className="body-medium">
          Hover, click and Tab through both columns, in Light and Dark. New: the
          label/icon color at 8% hover, 10% focus, 8% pressed (M3 Kit).
        </p>
      </header>
      <div className={styles.compare}>
        <Column
          title="Current"
          B={LegacyButton}
          I={LegacyIconButton}
          T={LegacyTabbedNavigation}
        />
        <Column title="New" B={Button} I={IconButton} T={TabbedNavigation} />
      </div>
    </section>
  );
}
