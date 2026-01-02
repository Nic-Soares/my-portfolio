import styles from "./ProjectGrid.module.css";
import ProjectCardItem from "@/components/common/project-card-item/ProjectCardItem";

const ProjectGrid = () => {
  return (
    <div className={styles["cards"]}>
      <ProjectCardItem
        title="E-commerce Platform"
        categories={["Frontend", "Backend"]}
        company="Amazon"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
      />
      <ProjectCardItem
        title="Mobile Banking App"
        categories={["Mobile", "Backend"]}
        company="Nubank"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
      />
      <ProjectCardItem
        title="Data Analytics Dashboard"
        categories={["Data", "Frontend"]}
        company="Google"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
      />
      <ProjectCardItem
        title="DevOps Pipeline"
        categories={["DevOps", "Backend"]}
        company="Microsoft"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
      />
      <ProjectCardItem
        title="Design System"
        categories={["Design", "Frontend"]}
        company="Figma"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
      />
      <ProjectCardItem
        title="API Gateway"
        categories={["Backend", "DevOps"]}
        company="Netflix"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
      />
      <ProjectCardItem
        title="Machine Learning Model"
        categories={["Data", "Backend"]}
        company="OpenAI"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
      />
      <ProjectCardItem
        title="Portfolio Website"
        categories={["Frontend", "Design"]}
        company="Personal Project"
        buttonGroupSize="small"
        selectable={false}
        interactive={true}
      />
    </div>
  );
};

export default ProjectGrid;
