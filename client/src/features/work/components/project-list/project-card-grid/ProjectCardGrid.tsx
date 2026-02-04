import { useNavigate } from "react-router-dom";
import styles from "./ProjectCardGrid.module.css";
import ProjectCard from "../project-card/ProjectCard";
import { projectsData } from "../../../data/projects.data";

const ProjectCardGrid = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["cards"]}>
      {projectsData.map((project) => (
        <ProjectCard
          key={project.slug}
          title={project.name}
          categories={["Frontend", "Backend"]}
          company="Personal Project"
          buttonGroupSize="small"
          selectable={false}
          interactive={true}
          onClick={() => navigate(`/projects/${project.slug}`)}
        />
      ))}
    </div>
  );
};

export default ProjectCardGrid;
