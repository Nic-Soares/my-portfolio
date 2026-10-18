// Temporary side-by-side review for TK-04.6.4 (Tab Bar vs the Figma "Tab Bar"
// component). "Current" renders the pre-change copy in ./legacy; delete both
// once approved.
import { useState } from "react";
import TabbedNavigation from "@/components/layout/navigation/TabbedNavigation/TabbedNavigation.tsx";
import styles from "./Gallery.module.css";
import LegacyTabbedNavigation from "./legacy/TabbedNavigation/TabbedNavigation.tsx";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "repository", label: "Repository" },
];

function Column({
  title,
  T,
  stickySize,
}: {
  title: string;
  T: typeof LegacyTabbedNavigation; // the new one accepts a superset of its props
  stickySize: boolean;
}) {
  const [selected, setSelected] = useState("overview");
  return (
    <div className={styles.compareColumn}>
      <h3 className="title-medium">{title}</h3>
      <div className={styles.compareGroup}>
        <span className="label-medium">
          As used on the project page (style text) — click the tabs
        </span>
        <T
          tabs={TABS}
          buttonStyle="text"
          selectedId={selected}
          onSelect={setSelected}
        />
      </div>
      {stickySize && (
        <div className={styles.compareGroup}>
          <span className="label-medium">
            Size while scrolled (sticky): Small + shadow
          </span>
          <T tabs={TABS} buttonStyle="text" buttonSize="small" />
        </div>
      )}
    </div>
  );
}

export default function ReviewTabBar() {
  return (
    <section className={styles.review} aria-labelledby="review-tab-bar">
      <header className={styles.specimenHeader}>
        <h2 id="review-tab-bar" className="headline-small">
          Review · TK-04.6.4 Tab Bar
        </h2>
        <p className="body-medium">
          New follows the Figma Tab Bar: Surface Variant bar, Primary labels,
          selected = Primary pill with On Primary label, 96 / 56 / 48px tabs at
          Large / Medium / Compact (switch the width above), 10px around the
          bar, Small + shadow when sticky. Scroll the project page to see the
          sticky state.
        </p>
      </header>
      <div className={styles.compare}>
        <Column title="Current" T={LegacyTabbedNavigation} stickySize={false} />
        <Column title="New" T={TabbedNavigation} stickySize />
      </div>
    </section>
  );
}
