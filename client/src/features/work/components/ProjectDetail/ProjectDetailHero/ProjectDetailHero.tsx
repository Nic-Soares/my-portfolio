import "./ProjectDetailHero.css";
import MediaCard from "../../shared/MediaCard/MediaCard.tsx";
import TitleCard from "../../shared/TitleCard/TitleCard.tsx";

interface ProjectDetailHeroProps {
  title: string;
  description: string;
  hero?: {
    type: "image" | "video";
    src: string;
    srcSet?: string;
    sizes?: string;
    alt?: string;
  };
}

const ProjectDetailHero = ({
  title,
  description,
  hero,
}: ProjectDetailHeroProps) => {
  return (
    <header className="projectDetailHero">
      <div className="splitAsset">
        <TitleCard title={title} subtitle={description} />
        {hero && (
          // The hero row sets the height (Figma Hero), not the card
          <MediaCard
            type={hero.type}
            src={hero.src}
            srcSet={hero.srcSet}
            sizes={hero.sizes}
            alt={hero.alt}
            minHeight="0"
            maxHeight="none"
          />
        )}
      </div>
    </header>
  );
};

export default ProjectDetailHero;
