import styles from "./WorkGrid.module.css";
import WorkCard from "./WorkCard/WorkCard";

interface WorkGridProps {
  onProjectSelect?: (projectId: string) => void;
}

const WorkGrid = ({ onProjectSelect }: WorkGridProps) => {
  return (
    <div className={styles["cards"]}>
      <WorkCard
        title="E-commerce Platform"
        categories={["Frontend", "Backend"]}
        company="Amazon"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect?.("E-commerce Platform")}
      />
      <WorkCard
        title="Mobile Banking App"
        categories={["Mobile", "Backend"]}
        company="Nubank"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect?.("Mobile Banking App")}
      />
      <WorkCard
        title="Data Analytics Dashboard"
        categories={["Data", "Frontend"]}
        company="Google"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect?.("Data Analytics Dashboard")}
      />
      <WorkCard
        title="DevOps Pipeline"
        categories={["DevOps", "Backend"]}
        company="Microsoft"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect?.("DevOps Pipeline")}
      />
      <WorkCard
        title="Design System"
        categories={["Design", "Frontend"]}
        company="Figma"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect?.("Design System")}
      />
      <WorkCard
        title="API Gateway"
        categories={["Backend", "DevOps"]}
        company="Netflix"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect?.("API Gateway")}
      />
      <WorkCard
        title="Machine Learning Model"
        categories={["Data", "Backend"]}
        company="OpenAI"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect?.("Machine Learning Model")}
      />
      <WorkCard
        title="Portfolio Website"
        categories={["Frontend", "Design"]}
        company="Personal Project"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
        onClick={() => onProjectSelect?.("Portfolio Website")}
      />
    </div>
  );
};

export default WorkGrid;
