import Container from '@/components/layout/container/Container';
import styles from './HeroSection.module.css';
import IconButton from '@/components/common/buttons/icon-button/IconButton';

const HeroSection  = () => {
  return (
    <Container
      background_color='var(--md-sys-color-primary-container)'
      border_radius='20px'
      className={styles['hero-section']}
    >
      <div className={styles['hero-section__content']}>
        <div className={styles['hero-section__text-content']}>
          <h4 className='headline-small-emphasized text-on-surface'>Hello There!</h4>
          <p className='display-medium text-on-surface'>I'm <span>Nicolas Soares</span>, <br /> I turn data into visual experiences that drive smart decisions.</p>

        </div>
        <div className={styles['hero-section__actions']}>
          <div style={{ width: '100px', height: '50px', backgroundColor: 'gray' }}>
            About me
          </div>
          <div style={{ width: '100px', height: '50px', backgroundColor: 'gray' }}>
            See My Projects
          </div>
        </div>
      </div>

      <div className={styles['hero-section__image-container']}>
        <img src="" alt=""/>
      </div>

      <div className={styles['hero-section__social-links']}>
        <IconButton width='narrow'/>
        <IconButton width='narrow'/>
        <IconButton width='narrow'/>
      </div>
    </Container>
  );
};

export default HeroSection;
