import CopyrightIcon from "@assets/images/footer/copyright.svg?react";
import Divider from "@assets/images/footer/divider.svg?react";
import LogoMark from "@assets/images/footer/logo.svg?react";
import { Link } from "react-router-dom";
import { FitLines } from "@/components/ui/FitLines/FitLines.tsx";
import { useFitText } from "@/hooks/useFitText.ts";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import styles from "./Footer.module.css";
import { type FooterLink, footerColumns, footerOwner } from "./footer.data.ts";

function FooterAnchor({ link }: { link: FooterLink }) {
  const { t } = useI18n();
  const label =
    "key" in link.label
      ? t.layout.footer.links[link.label.key]
      : link.label.name;
  if (link.external) {
    return (
      <a
        className={`title-small-plus ${styles.link}`}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }
  return (
    <Link className={`title-small-plus ${styles.link}`} to={link.href}>
      {label}
    </Link>
  );
}

// Site footer (Figma "Footer"): wave divider, brand + link columns, bottom
// bar. Large = side by side; Medium/Compact = stacked; Compact also stacks
// the bottom bar.
export default function Footer() {
  const { t } = useI18n();
  const footer = t.layout.footer;
  // One line on a phone too: longer roles (pt, es) shrink instead of clipping
  const copyrightRef = useFitText<HTMLParagraphElement>();
  return (
    <footer className={styles.footer}>
      <div className={styles.divider} aria-hidden="true">
        <Divider />
      </div>
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo} aria-label={t.layout.home}>
              <LogoMark aria-hidden="true" />
            </Link>
            <FitLines
              lines={{ "extra-large": 2, large: 2 }}
              className={`title-large ${styles.tagline}`}
            >
              {footer.tagline}
            </FitLines>
          </div>
          <nav className={styles.links} aria-label={footer.nav}>
            {footerColumns.map((column) => (
              <div key={column.title} className={styles.column}>
                <h2 className={`title-small ${styles.columnTitle}`}>
                  {footer.columns[column.title]}
                </h2>
                <ul className={styles.columnLinks}>
                  {column.links.map((link) => (
                    <li
                      key={
                        link.href +
                        ("key" in link.label ? link.label.key : link.label.name)
                      }
                    >
                      <FooterAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.bottomBar}>
          <p className="label-medium-emphasized">{footerOwner}</p>
          <p
            ref={copyrightRef}
            className={`body-small fit-text ${styles.copyright}`}
          >
            <CopyrightIcon
              className={styles.copyrightIcon}
              role="img"
              aria-label={footer.copyright}
            />
            <span>
              {footer.copyrightLine(
                new Date().getFullYear(),
                footerOwner,
                footer.role,
              )}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
