import Image from 'next/image'
import styles from './Footer.module.scss'

export default function Footer() {
  const socialLinks = [
  
    {
      name: 'LinkedIn',
      icon: 'https://img.icons8.com/ios-filled/50/000000/linkedin.png',
      url: 'https://www.linkedin.com/company/gdg-on-campus-mits-gwalior/',
      className: 'linkedin'
    },
    {
      name: 'Instagram',
      icon: 'https://img.icons8.com/ios-filled/50/000000/instagram-new.png',
      url: 'https://www.instagram.com/gdg.mits?igsh=MTVwMnRzbDFna2hrYg==/',
      className: 'instagram'
    },
    {
      name: 'GitHub',
      icon: 'https://img.icons8.com/ios-filled/50/000000/github.png',
      url: 'https://www.linkedin.com/company/gdg-on-campus-mits-gwalior/',
      className: 'github'
    },
    
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__left}>
          <div className={styles.footer__logo}>
            <Image
              src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_1080,q_100,w_1080/v1/gcs/platform-data-goog/chapter_banners/blob_rKcKdQg"
              alt="GDG MITS Logo"
              width={60}
              height={60}
              className={styles['footer__logo-icon']}
            />
            <div className={styles['footer__logo-text']}>
              <div className={styles.brand}>GDGoC MITS DU</div>
              <div className={styles.event}>DevSprint 2026</div>
            </div>
          </div>
          <div className={styles.footer__copyright}>
            © 2025 <span className={styles.highlight}>DevSprint</span> by GDG MITS. All rights reserved.
          </div>
        </div>
        
        <div className={styles.footer__right}>
          <div className={styles.footer__social}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.footer__socialLink} ${styles[social.className]}`}
                aria-label={social.name}
              >
                <div className={styles.socialIconWrapper}>
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={20}
                    height={20}
                    className={styles.socialIcon}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}