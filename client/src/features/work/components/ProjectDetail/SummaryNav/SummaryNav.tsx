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
  const activeId = useActiveSection(items.map((item) => item.anchorId));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Smoothly scroll to the section heading.
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.host}>
      <nav className={styles.nav} aria-label="On this page">
        <div className={`body-small ${styles.overline}`}>On this page</div>
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
