import styles from "./ProjectGrid.module.css";
import ProjectCardItem from "@/components/common/project-card-item/ProjectCardItem";

interface ProjectGridProps {
  onProjectSelect: (projectId: string) => void;
}

const ProjectGrid = ({ onProjectSelect }: ProjectGridProps) => {
  return (
    <div className={styles["cards"]}>
      <ProjectCardItem
        title="E-commerce Platform"
        categories={["Frontend", "Backend"]}
        company="Amazon"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect("E-commerce Platform")}
      />
      <ProjectCardItem
        title="Mobile Banking App"
        categories={["Mobile", "Backend"]}
        company="Nubank"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect("Mobile Banking App")}
      />
      <ProjectCardItem
        title="Data Analytics Dashboard"
        categories={["Data", "Frontend"]}
        company="Google"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect("Data Analytics Dashboard")}
      />
      <ProjectCardItem
        title="DevOps Pipeline"
        categories={["DevOps", "Backend"]}
        company="Microsoft"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect("DevOps Pipeline")}
      />
      <ProjectCardItem
        title="Design System"
        categories={["Design", "Frontend"]}
        company="Figma"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect("Design System")}
      />
      <ProjectCardItem
        title="API Gateway"
        categories={["Backend", "DevOps"]}
        company="Netflix"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect("API Gateway")}
      />
      <ProjectCardItem
        title="Machine Learning Model"
        categories={["Data", "Backend"]}
        company="OpenAI"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect("Machine Learning Model")}
      />
      <ProjectCardItem
        title="Portfolio Website"
        categories={["Frontend", "Design"]}
        company="Personal Project"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect("Portfolio Website")}
      />
    </div>
  );
};

export default ProjectGrid;
