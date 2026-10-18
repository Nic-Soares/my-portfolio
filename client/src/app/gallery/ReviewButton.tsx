// Temporary side-by-side review for TK-04.6.1 (Button vs the M3 Kit).
// "Current" renders the pre-change copy in ./legacy; delete both once approved.
import type { ReactNode } from "react";
import Button from "@/components/ui/Button/Button.tsx";
import styles from "./Gallery.module.css";
import LegacyButton from "./legacy/Button/Button.tsx";

const SIZES = ["xsmall", "small", "medium", "large", "xlarge"] as const;
const STYLES = ["filled", "tonal", "outline", "text", "elevated"] as const;

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.compareGroup}>
      <span className="label-medium">{label}</span>
      <div className={styles.rowItems}>{children}</div>
    </div>
  );
}

function Column({ title, B }: { title: string; B: typeof Button }) {
  return (
    <div className={`${styles.compareColumn} ${styles.touchGuide}`}>
      <h3 className="title-medium">{title}</h3>
      <Group label="Home hero (Large, square)">
        <B size="large" type="square" style="tonal" label="About me" />
        <B size="large" type="square" style="filled" label="See My Projects" />
      </Group>
      <Group label="Round sizes">
        {SIZES.map((size) => (
          <B key={size} size={size} label={size} />
        ))}
      </Group>
      <Group label="Square sizes (click to see the press radius)">
        {SIZES.map((size) => (
          <B key={size} size={size} type="square" label={size} />
        ))}
      </Group>
      <Group label="Styles (small)">
        {STYLES.map((style) => (
          <B key={style} size="small" style={style} label={style} />
        ))}
      </Group>
      <Group label="Medium styles used by the design">
        <B size="medium" style="filled" label="Filled" />
        <B size="medium" style="text" label="Text" />
      </Group>
    </div>
  );
}

export default function ReviewButton() {
  return (
    <section className={styles.review} aria-labelledby="review-button">
      <header className={styles.specimenHeader}>
        <h2 id="review-button" className="headline-small">
          Review · TK-04.6.1 Button
        </h2>
        <p className="body-medium">
          New follows the M3 Kit: XSmall/Small 32/40px visible inside a 48px
          touch target (dashed outline), padding 12/16/24/48/64px, icon gap
          4/8/8/12/16px, Medium icon 20px, square L/XL press radius 16px, focus
          ring 3px Secondary with no shape change, filled-in Elevated style.
          Press Tab to compare the focus ring.
        </p>
      </header>
      <div className={styles.compare}>
        <Column title="Current" B={LegacyButton} />
        <Column title="New" B={Button} />
      </div>
    </section>
  );
}
