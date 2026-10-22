import type React from "react";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import IconButton from "../../../../../components/ui/IconButton/IconButton.tsx";
import styles from "./BlockWrapper.module.css";

interface BlockWrapperProps {
  id?: string;
  children?: React.ReactNode;
  showCopyButton?: boolean;
  isSnug?: boolean;
  isNested?: boolean;
  startsSection?: boolean; // level-2 header: section spacing above
  dangerouslySetInnerHTML?: { __html: string };
}

export const BlockWrapper = ({
  id,
  children,
  showCopyButton = true,
  isSnug = false,
  isNested = false,
  startsSection = false,
  dangerouslySetInnerHTML,
}: BlockWrapperProps) => {
  const { t } = useI18n();
  const handleCopyLink = () => {
    if (id) {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div
      className={[
        isNested ? "" : styles.block,
        isSnug ? styles.snug : "",
        startsSection ? styles.section : "",
      ]
        .join(" ")
        .trim()}
      id={id}
    >
      {/* Copy link button */}
      {showCopyButton && id && !isNested && (
        <div className={styles["copy-button-container"]}>
          <IconButton
            type="round"
            size="small"
            style="standard"
            icon="link"
            ariaLabel={t.work.copyLink}
            onClick={handleCopyLink}
          />
        </div>
      )}

      {/* Scroll target / anchor */}
      <div className={styles["scroll-target"]}></div>

      {/* Main content */}
      <div className={isNested ? "" : styles.chunk}>
        {dangerouslySetInnerHTML ? (
          <div
            className={styles["text-chunk"]}
            dangerouslySetInnerHTML={dangerouslySetInnerHTML}
          />
        ) : (
          <div className={styles["text-chunk"]}>{children}</div>
        )}
      </div>
    </div>
  );
};
