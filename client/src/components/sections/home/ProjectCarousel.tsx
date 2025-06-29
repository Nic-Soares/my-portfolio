
import ShowcaseCarousel from '@/components/common/carousel/Carousel';
import Container from '../../layout/container/Container';
import styles from './ProjectCarousel.module.css';

const ProjectCarousel = () => {
  return (
    <Container
      className={styles.projects_carousel}
      background_color="#EFF1EB"
      border_radius="24px"
    >

      <ShowcaseCarousel/>

    </Container>
  );
};

export default ProjectCarousel;
