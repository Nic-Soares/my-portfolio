import { useI18n } from "@/i18n/I18nProvider.tsx";
import type { SidebarItem } from "../../../data/project-data.types.ts";
import styles from "./SummaryNav.module.css";
import { useActiveSection } from "./useActiveSection.ts";

interface SummaryNavProps {
  title: string;
  items: SidebarItem[];
}

// Figma "Summary": "On this page", the tab title and one link per section;
// the current section is Selected (aria-current)
export const SummaryNav = ({ title, items }: SummaryNavProps) => {
  const { t } = useI18n();
  const activeId = useActiveSection(items.map((item) => item.anchorId));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Scroll to the section heading; smoothly unless motion is reduced
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      element.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={styles.host}>
      <nav className={styles.nav} aria-label={t.work.onThisPage}>
        <div className={`body-small ${styles.overline}`}>
          {t.work.onThisPage}
        </div>
        <h2 className={`headline-small ${styles.dynamicTitle}`}>{title}</h2>

        <ul className={styles.list}>
          {items.map((item) => {
            const isActive = item.anchorId === activeId;
            return (
              <li key={item.anchorId} className={styles.listItem}>
                <a
                  href={`#${item.anchorId}`}
                  className={`${isActive ? "body-medium-emphasized" : "body-medium"} ${styles.link}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(e) => handleClick(e, item.anchorId)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
