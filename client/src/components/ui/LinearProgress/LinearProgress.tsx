import type { CSSProperties } from "react";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import styles from "./LinearProgress.module.css";

interface LinearProgressProps {
  // 0–100; omitted = indeterminate (Figma Type)
  value?: number;
  label?: string; // accessible name
  className?: string;
}

// Figma "Linear Progress": 4px track in Surface Container Highest, Primary
// indicator, full corners. Fills its container's width.
const LinearProgress = ({ value, label, className }: LinearProgressProps) => {
  const { t } = useI18n();
  const name = label ?? t.ui.loading;
  const determinate = value !== undefined;
  const clamped = determinate ? Math.min(100, Math.max(0, value)) : undefined;

  return (
    <div
      className={[
        styles.progress,
        determinate ? "" : styles["progress--indeterminate"],
        className ?? "",
      ].join(" ")}
      role="progressbar"
      aria-label={name}
      aria-valuemin={determinate ? 0 : undefined}
      aria-valuemax={determinate ? 100 : undefined}
      aria-valuenow={clamped}
      aria-valuetext={determinate ? `${clamped}%` : undefined}
    >
      <div
        className={styles.progress__indicator}
        style={
          determinate
            ? ({ "--progress-value": `${clamped}%` } as CSSProperties)
            : undefined
        }
      />
    </div>
  );
};

export default LinearProgress;
