import Container from '../../layout/container/Container'
import styles from './HeroSection.module.css'

const HeroSection  = () => {
  return (
    <Container
      background_color='#EFEEE2'
      border_radius='20px'
      className={styles['hero-section']}
    >
    </Container>
  )
}

export default HeroSection
