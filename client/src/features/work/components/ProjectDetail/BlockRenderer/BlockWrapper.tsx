import type React from "react";
import IconButton from "../../../../../components/ui/IconButton/IconButton.tsx";
import styles from "./BlockWrapper.module.css";

interface BlockWrapperProps {
  id?: string;
  children?: React.ReactNode;
  showCopyButton?: boolean;
  isSnug?: boolean;
  isNested?: boolean;
  dangerouslySetInnerHTML?: { __html: string };
}

export const BlockWrapper = ({
  id,
  children,
  showCopyButton = true,
  isSnug = false,
  isNested = false,
  dangerouslySetInnerHTML,
}: BlockWrapperProps) => {
  const handleCopyLink = () => {
    if (id) {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div
      role="region"
      className={`${isNested ? "" : styles.block} ${isSnug ? styles.snug : ""}`.trim()}
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
