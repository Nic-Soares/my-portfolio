// Temporary side-by-side review for TK-04.6.3 (ConnectedButtonGroup and
// SearchBar vs the M3 Kit). "Current" renders the pre-change copies in
// ./legacy; delete both once approved.
import type { ReactNode } from "react";
import ConnectedButtonGroup from "@/components/ui/ConnectedButtonGroup/ConnectedButtonGroup.tsx";
import SearchBar from "@/components/ui/SearchBar/SearchBar.tsx";
import styles from "./Gallery.module.css";
import LegacyConnectedButtonGroup from "./legacy/ConnectedButtonGroup/ConnectedButtonGroup.tsx";
import LegacySearchBar from "./legacy/SearchBar/SearchBar.tsx";

const FILTERS = ["All", "Favorites", "Recent", "Archived", "Drafts"].map(
  (label) => ({ label }),
);
const FILTERS_WITH_ICONS = [
  { label: "All", icon: "apps" },
  { label: "Favorites", icon: "star", selectedIcon: "check" },
  { label: "Recent", icon: "schedule" },
];
const TAGS = ["Frontend", "Backend", "Data", "Design"].map((label) => ({
  label,
}));

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
  G,
  S,
}: {
  title: string;
  G: typeof ConnectedButtonGroup;
  S: typeof SearchBar;
}) {
  return (
    <div className={`${styles.compareColumn} ${styles.touchGuide}`}>
      <h3 className="title-medium">{title}</h3>
      <Group label="Filters, desktop (Medium) — click to select">
        <G size="medium" options={FILTERS} />
      </Group>
      <Group label="Filters with icons (optional) — selected swaps to ✓">
        <G size="medium" options={FILTERS_WITH_ICONS} selectedIndex={1} />
        <G size="small" options={FILTERS_WITH_ICONS} />
      </Group>
      <Group label="Filters, mobile (Small)">
        <G size="small" options={FILTERS.slice(0, 2)} />
      </Group>
      <Group label="Project card tags (Small, not selectable)">
        <G size="small" options={TAGS} selectable={false} />
      </Group>
      <Group label="SearchBar: empty · filled (hover the ×) · disabled">
        <S />
        <S value="Spotify" />
        <S disabled />
      </Group>
      <Group label="SearchBar in a 350px box (Compact width in Figma)">
        <div className={styles.narrowBox}>
          <S />
        </div>
      </Group>
    </div>
  );
}

export default function ReviewGroupSearch() {
  return (
    <section className={styles.review} aria-labelledby="review-group-search">
      <header className={styles.specimenHeader}>
        <h2 id="review-group-search" className="headline-small">
          Review · TK-04.6.3 ConnectedButtonGroup + SearchBar
        </h2>
        <p className="body-medium">
          Group (M3 Kit): no default icon, inner corners 8px → 12/16px on
          hover/press/focus, selected = Secondary pill, Small 40px in a 48px
          touch target, Medium padding 24px. SearchBar: no 360px minimum, hover
          = 8% layer, clear-icon hover fixed, 48px icons, full-color
          placeholder; focus shadow kept.
        </p>
      </header>
      <div className={styles.compare}>
        <Column
          title="Current"
          G={LegacyConnectedButtonGroup}
          S={LegacySearchBar}
        />
        <Column title="New" G={ConnectedButtonGroup} S={SearchBar} />
      </div>
    </section>
  );
}
