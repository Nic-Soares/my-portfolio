import Container from '../../layout/container/Container';
import styles from './ProjectCarousel.module.css';
import CarouselItem from '../../common/carousel/CarouselItem'

const carouselData = [
  {
    id: '01',
    title: '01',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam.',
  },
];

const ProjectCarousel = () => {
  return (
    <Container
      className={styles.projects_carousel}
      background_color="#EFF1EB"
      border_radius="24px"
    >
      <div className={styles.carousel_wrapper}>
        {carouselData.map((item) => (
          <CarouselItem
            key={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </Container>
  );
};

export default ProjectCarousel;
