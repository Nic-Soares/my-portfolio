import { type ReactNode, useId } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button/Button.tsx";
import { useSizeClass } from "@/hooks/useSizeClass.ts";
import styles from "./StateLayout.module.css";

// An action either runs a handler or navigates to a route
export type StateAction = { label: string } & (
  | { onClick: () => void; to?: never }
  | { to: string; onClick?: never }
);

interface StateLayoutProps {
  illustration: ReactNode;
  headline: string;
  supportingText: string;
  // Figma: at most two, the first filled and the second text
  actions?: [] | [StateAction] | [StateAction, StateAction];
  // h1 when the state is the page, h2 when it sits inside one
  headingLevel?: "h1" | "h2";
  // Below a page header (Figma "Projects — No results"): 24px vertical
  // padding at Large and up so it fits under the header without scrolling
  inline?: boolean;
}

// Figma "EmptyState / …": the shared anatomy of the system states
// (404, under construction, error, no results). Fills the page area and
// centers illustration, copy and actions.
const StateLayout = ({
  illustration,
  headline,
  supportingText,
  actions = [],
  headingLevel: Heading = "h1",
  inline = false,
}: StateLayoutProps) => {
  const navigate = useNavigate();
  const sizeClass = useSizeClass();
  const headingId = useId();

  return (
    <section
      className={`${styles.state} ${inline ? styles["state--inline"] : ""}`}
      aria-labelledby={headingId}
    >
      <div className={styles.state__illustration}>{illustration}</div>
      <div className={styles.state__copy}>
        <Heading id={headingId} className="display-small-emphasized">
          {headline}
        </Heading>
        <p className={`body-large-plus ${styles["state__supporting-text"]}`}>
          {supportingText}
        </p>
      </div>
      {actions.length > 0 && (
        <div className={styles.state__actions}>
          {actions.map((action, index) => (
            <Button
              key={action.label}
              size={sizeClass === "compact" ? "medium" : "large"}
              style={index === 0 ? "filled" : "text"}
              icon={null}
              label={action.label}
              onClick={() =>
                action.to ? navigate(action.to) : action.onClick?.()
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default StateLayout;
