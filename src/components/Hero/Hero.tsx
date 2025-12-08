import styles from './Hero.module.scss'

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      {/* Animated gradient background */}
      <div className={styles.hero__gradientBg}>
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
        <div className={styles.gradient3}></div>
      </div>
      
      {/* Grid overlay */}
      <div className={styles.hero__grid}></div>
      
      <div className={styles.hero__content}>
        <div className={styles.hero__left}>
         
          {/* Title with gradient text */}
          <h1 className={styles.hero__title}>
            <span className={styles.badge}></span>
            <span className={styles.mainTitle}>
              Dev<span className={styles.highlight}>Sprint</span>
            </span>
            <span className={styles.subtitle}>Hackathon 2026</span>
          </h1>
          
          {/* Info cards */}
          <div className={styles.hero__infoCards}>
            <div className={styles.infoCard}>
              <span className="material-symbols-outlined">calendar_month</span>
              <div>
                <div className={styles.label}>Date</div>
                <div className={styles.value}>Jan 5-6, 2026</div>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className={styles.hero__buttons}>
            <a href="#register" className={`${styles.btn} ${styles.btnPrimary}`}>
              <span>Register Now</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            <a href="#discord" className={`${styles.btn} ${styles.btnSecondary}`}>
              <span className="material-symbols-outlined">forum</span>
              <span>Join Discord</span>
            </a>
          </div>
          
        </div>
        
        {/* Right side - Code terminal */}
        <div className={styles.hero__right}>
          <div className={styles.codeTerminal}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <div className={styles.terminalTitle}>devsprint.sh</div>
              <div className={styles.terminalActions}>
                <span className="material-symbols-outlined">minimize</span>
                <span className="material-symbols-outlined">crop_square</span>
                <span className="material-symbols-outlined">close</span>
              </div>
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.terminalLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.command}>npm start devsprint-2026</span>
              </div>
              <div className={styles.terminalOutput}>
                <span className={styles.success}>✓</span> Initializing DevSprint...
              </div>
              <div className={styles.terminalOutput}>
                <span className={styles.info}>→</span> Loading tracks...
              </div>
              <div className={styles.terminalTracks}>
                <div className={styles.track}>
                  <span className={styles.trackIcon}>🌐</span>
                  <span className={styles.trackName}>Web Development</span>
                </div>
                <div className={styles.track}>
                  <span className={styles.trackIcon}>📱</span>
                  <span className={styles.trackName}>Mobile Apps</span>
                </div>
                <div className={styles.track}>
                  <span className={styles.trackIcon}>☁️</span>
                  <span className={styles.trackName}>Cloud & AI</span>
                </div>
              </div>
              <div className={styles.terminalOutput}>
                <span className={styles.success}>✓</span> Ready to innovate!
              </div>
              <div className={styles.terminalLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.cursor}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={styles.hero__scrollIndicator}>
        <div className={styles.scrollLine}></div>
        <span className="material-symbols-outlined">expand_more</span>
      </div>
    </section>
  )
}