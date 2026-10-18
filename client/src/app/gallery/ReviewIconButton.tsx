// Temporary side-by-side review for TK-04.6.2 (IconButton vs the M3 Kit,
// plus the Button icon-size fix). "Current" renders the pre-change copies in
// ./legacy; delete both once approved.
import type { ReactNode } from "react";
import Button from "@/components/ui/Button/Button.tsx";
import IconButton from "@/components/ui/IconButton/IconButton.tsx";
import styles from "./Gallery.module.css";
import LegacyButton from "./legacy/Button/Button.tsx";
import LegacyIconButton from "./legacy/IconButton/IconButton.tsx";

const SIZES = ["xsmall", "small", "medium", "large", "xlarge"] as const;
const STYLES = ["filled", "tonal", "outline", "standard"] as const;

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.compareGroup}>
      <span className="label-medium">{label}</span>
      <div className={styles.rowItems}>{children}</div>
    </div>
  );
}

function Column({
  title,
  I,
  B,
}: {
  title: string;
  I: typeof IconButton;
  B: typeof Button;
}) {
  return (
    <div className={`${styles.compareColumn} ${styles.touchGuide}`}>
      <h3 className="title-medium">{title}</h3>
      <Group label="Rail: settings + theme toggle (click the moon)">
        <I style="outline" size="medium" icon="settings" ariaLabel="Settings" />
        <I
          style="outline"
          size="medium"
          icon="dark_mode"
          selectedIcon="light_mode"
          toggleable
          ariaLabel="Dark theme"
        />
      </Group>
      <Group label="Top app bar (outline, wide)">
        <I
          style="outline"
          size="medium"
          width="wide"
          icon="translate"
          ariaLabel="Language"
        />
        <I
          style="outline"
          size="medium"
          width="wide"
          icon="dark_mode"
          ariaLabel="Theme"
        />
      </Group>
      <Group label="Round sizes (outline) — dashed = touch target">
        {SIZES.map((size) => (
          <I
            key={size}
            style="outline"
            size={size}
            icon="favorite"
            ariaLabel={size}
          />
        ))}
      </Group>
      <Group label="Square sizes (outline) — press to see the radius">
        {SIZES.map((size) => (
          <I
            key={size}
            type="square"
            style="outline"
            size={size}
            icon="favorite"
            ariaLabel={size}
          />
        ))}
      </Group>
      <Group label="Styles (medium) · selected">
        {STYLES.map((style) => (
          <I
            key={style}
            style={style}
            size="medium"
            icon="favorite"
            ariaLabel={style}
          />
        ))}
        {STYLES.map((style) => (
          <I
            key={`${style}-selected`}
            style={style}
            size="medium"
            icon="favorite"
            selected
            ariaLabel={`${style} selected`}
          />
        ))}
      </Group>
      <Group label="Project page link icon (small, standard)">
        <I
          type="round"
          size="small"
          style="standard"
          icon="link"
          ariaLabel="Link"
        />
      </Group>
      <Group label="Button icons: Home hero + sizes">
        <B size="large" type="square" style="tonal" label="About me" />
        <B size="large" type="square" style="filled" label="See My Projects" />
        {SIZES.map((size) => (
          <B key={size} size={size} label={size} />
        ))}
      </Group>
    </div>
  );
}

export default function ReviewIconButton() {
  return (
    <section className={styles.review} aria-labelledby="review-icon-button">
      <header className={styles.specimenHeader}>
        <h2 id="review-icon-button" className="headline-small">
          Review · TK-04.6.2 IconButton (+ Button icons)
        </h2>
        <p className="body-medium">
          New follows the M3 Kit: 48px minimum touch target, icons
          20/24/24/32/40px, square radius 12/12/16/28/28px, press radius
          8/8/12/16/16px, selected round → rounded square and square → pill, 2px
          outline from Large, `standard` styled (On Surface Variant; Primary
          when selected), focus ring 3px Secondary. Button icons now
          20/20/24/32/40px.
        </p>
      </header>
      <div className={styles.compare}>
        <Column title="Current" I={LegacyIconButton} B={LegacyButton} />
        <Column title="New" I={IconButton} B={Button} />
      </div>
    </section>
  );
}
