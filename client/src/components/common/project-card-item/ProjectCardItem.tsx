import ConnectedButtonGroup from "../connected-button-group/ConnectedButtonGroup";
import styles from "./ProjectCardItem.module.css";
import type { ReactNode } from "react";

type ProjectCategory =
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "Data"
  | "DevOps"
  | "Design";
type SizeOption = "xsmall" | "small" | "medium" | "large" | "xlarge";

interface ButtonOption {
  label: string;
  icon?: string | ReactNode;
  selectedIcon?: string | ReactNode;
  disabled?: boolean;
}

interface ProjectCardItemProps {
  // Project-specific props
  categories?: ProjectCategory[];
  title?: string;
  company?: string;
  imageUrl?: string;

  // ConnectedButtonGroup props
  buttonGroupSize?: SizeOption;
  buttonGroupOptions?: ButtonOption[];
  selectedIndex?: number;
  onSelectionChange?: (index: number) => void;
  allowDeselect?: boolean;
  selectable?: boolean;
  interactive?: boolean;
}

const ProjectCardItem = ({
  categories = ["Frontend", "Backend", "Data"],
  title = "Project Title",
  company = "Company Name",
  imageUrl,
  buttonGroupSize = "small",
  buttonGroupOptions,
  selectedIndex,
  onSelectionChange,
  allowDeselect = true,
  selectable = false,
  interactive = true,
}: ProjectCardItemProps) => {
  // Use buttonGroupOptions if provided, otherwise convert categories to options
  const options =
    buttonGroupOptions ||
    categories.map((category) => ({
      label: category,
    }));

  return (
    <div className={styles["project-card"]}>
      <div className={styles["project-card__content"]}>
        <div className={styles["project-card__preview"]}>
          {imageUrl && <img src={imageUrl} alt={title} />}
        </div>
        <div className={styles["project-card__info"]}>
          <ConnectedButtonGroup
            options={options}
            size={buttonGroupSize}
            selectedIndex={selectedIndex}
            onSelectionChange={onSelectionChange}
            allowDeselect={allowDeselect}
            selectable={selectable}
            interactive={interactive}
          />
          <div className="project-card__details">
            <h3 className={styles["project-card__header"]}>{title}</h3>
            <p className={styles["project-card__subtitle"]}>{company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardItem;
