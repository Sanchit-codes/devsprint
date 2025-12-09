"use client"; // Add this at the very top

import { useState, useEffect } from 'react';
import styles from './Hero.module.scss';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [showTerminalContent, setShowTerminalContent] = useState(false);
  
  const words = ['Learn', 'Grow', 'Innovate'];
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const pauseTime = 1500;

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.substring(0, typedText.length + 1));
          // Show terminal content after first word starts typing
          if (typedText.length === 0 && wordIndex === 0) {
            setShowTerminalContent(true);
          }
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting backward
        if (typedText.length > 0) {
          setTypedText(currentWord.substring(0, typedText.length - 1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, wordIndex]);

  return (
    <section id="home" className={styles.hero}>
      {/* Enhanced animated gradient background */}
      <div className={styles.hero__gradientBg}>

        {/* Orbit circles – added one more */}
        <div className={styles.gradientOrbit}>
          <div className={styles.orbitalCircle}></div>
          <div className={styles.orbitalCircle}></div>
          <div className={styles.orbitalCircle}></div>
          <div className={styles.orbitalCircle}></div> {/* NEW 4th orbit */}
        </div>

        {/* Floating particles */}
        <div className={styles.particles}>
          <div className={`${styles.particle} ${styles.particle1}`}></div>
          <div className={`${styles.particle} ${styles.particle2}`}></div>
          <div className={`${styles.particle} ${styles.particle3}`}></div>
          <div className={`${styles.particle} ${styles.particle4}`}></div>
          <div className={`${styles.particle} ${styles.particle5}`}></div>
        </div>

        {/* Animated grid */}
        <div className={styles.animatedGrid}></div>

        {/* Gradient blobs */}
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
        <div className={styles.gradient3}></div>
        <div className={styles.gradient4}></div>

        
      </div>

      {/* Grid overlay */}
      <div className={styles.hero__grid}></div>

      <div className={styles.hero__content}>
        <div className={styles.hero__left}>
          {/* Title */}
          <h1 className={styles.hero__title}>
            <span className={styles.mainTitle}>
              Dev<span className={styles.highlight}>Sprint</span>
            </span>
            <span className={styles.subtitle}>Hackathon 2026</span>
          </h1>

          {/* Info cards */}
          <div className={styles.hero__infoCards}>
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>
                <span className="material-symbols-outlined">calendar_month</span>
              </div>
              <div>
                <div className={styles.label}>Date</div>
                <div className={styles.value}>Jan 5-6, 2026</div>
              </div>
              <div className={styles.cardGlow}></div>
            </div>
          </div>

          {/* CTA Buttons - Now 3 buttons in a responsive grid */}
          <div className={styles.hero__buttons}>
            <a
              href="https://vision.hack2skill.com/event/GDGoC-25-MITS-DevSprint"
              className={`${styles.btn} ${styles.btnPrimary}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.btnText}>Register Now</span>
              <span className={`${styles.btnIcon} material-symbols-outlined`}>
                arrow_forward
              </span>
              <div className={styles.btnPulse}></div>
            </a>

            <a 
              href="/register" 
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              <span className={`${styles.btnIcon} material-symbols-outlined`}>event</span>
              <span className={styles.btnText}>Event Registration</span>
            </a>

            <a 
              href="#brochure" 
              className={`${styles.btn} ${styles.btnTertiary}`}
            >
              <span className={`${styles.btnIcon} material-symbols-outlined`}>download</span>
              <span className={styles.btnText}>Download Brochure</span>
            </a>
          </div>
        </div>

        {/* Right side terminal */}
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
              {/* First line with typing animation */}
              <div className={styles.terminalLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.typedCommand}>
                  {typedText}
                </span>
              </div>

              {/* Show terminal content only after typing starts */}
              {showTerminalContent && (
                <>
                  <div className={styles.terminalOutput} style={{animationDelay: '0.5s'}}>
                    <span className={styles.success}>✓</span> Initializing DevSprint...
                  </div>
                  <div className={styles.terminalOutput} style={{animationDelay: '1s'}}>
                    <span className={styles.info}>→</span> Loading tracks...
                  </div>

                  <div className={styles.terminalTracks} style={{animationDelay: '1.5s'}}>
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
                    <div className={styles.track}>
                      <span className={styles.trackIcon}>🔗</span>
                      <span className={styles.trackName}>Blockchain</span>
                    </div>
                  </div>

                  <div className={styles.terminalOutput} style={{animationDelay: '2s'}}>
                    <span className={styles.success}>✓</span> Ready to innovate!
                  </div>

                  <div className={styles.terminalLine} style={{animationDelay: '2.5s'}}>
                    <span className={styles.prompt}>$</span>
                    <span className={styles.cursor}></span>
                  </div>
                </>
              )}
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