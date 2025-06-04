import styles from './HeroSection.module.css'

const HeroSection  = () => {
  return (
    <section className={styles['hero-section']}>
      <div className={styles['hero-intro']}>
        <div className={styles['hero-text']}>
          <h3>Hello There!</h3>
          <p>I'm Nicolas Soares</p>
          <p>I turn data into visual experiences that drive smart decisions.</p>
        </div>
        <div className={styles['hero-buttons']}>
          <md-filled-button>
            Projects
            <svg slot="icon" viewBox="0 0 48 48"><path d="M6 40V8l38 16Zm3-4.65L36.2 24 9 12.5v8.4L21.1 24 9 27Zm0 0V12.5 27Z"/></svg>
          </md-filled-button>
          <md-filled-button>
            Services
            <svg slot="icon" viewBox="0 0 48 48"><path d="M6 40V8l38 16Zm3-4.65L36.2 24 9 12.5v8.4L21.1 24 9 27Zm0 0V12.5 27Z"/></svg>
          </md-filled-button>
        </div>
      </div>

      <div className={styles['hero-image']}>
        <img src="" alt="" />
      </div>

      <div className={styles['social-links']}>
        <md-filled-icon-button>
          <md-icon>check</md-icon>
        </md-filled-icon-button>
        <md-filled-icon-button>
          <md-icon>check</md-icon>
        </md-filled-icon-button>
        <md-filled-icon-button>
          <md-icon>check</md-icon>
        </md-filled-icon-button>
        <md-filled-icon-button>
          <md-icon>check</md-icon>
        </md-filled-icon-button>
      </div>
    </section>
  )
}

export default HeroSection
