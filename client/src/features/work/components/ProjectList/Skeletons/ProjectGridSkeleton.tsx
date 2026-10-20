import { useSizeClass } from "@/hooks/useSizeClass.ts";
import gridStyles from "../ProjectCardGrid/ProjectCardGrid.module.css";
import ProjectCardSkeleton from "./ProjectCardSkeleton.tsx";

// Same grid as the cards (4 / 3 / 2 / 1 columns); as many placeholders as
// the Figma Loading screens show
const COUNT = { "extra-large": 8, large: 8, medium: 6, compact: 3 } as const;

const ProjectGridSkeleton = () => {
  const sizeClass = useSizeClass();
  return (
    <div className={gridStyles.cards} aria-hidden="true">
      {Array.from({ length: COUNT[sizeClass] }, (_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProjectGridSkeleton;
