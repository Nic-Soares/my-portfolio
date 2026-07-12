import "./ProjectDetailHero.css";
import TitleCard from "../../shared/TitleCard/TitleCard.tsx";
import MediaCard from "../../shared/MediaCard/MediaCard.tsx";

interface ProjectDetailHeroProps {
  title: string;
  description: string;
  hero?: {
    type: "image" | "video";
    src: string;
    alt?: string;
  };
}

const ProjectDetailHero = ({
  title,
  description,
  hero,
}: ProjectDetailHeroProps) => {
  return (
    <header>
      <div className="splitAsset">
        <TitleCard title={title} subtitle={description} />
        {hero && <MediaCard type={hero.type} src={hero.src} alt={hero.alt} />}
      </div>
    </header>
  );
};

export default ProjectDetailHero;
