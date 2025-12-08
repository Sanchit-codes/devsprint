import Image from 'next/image'
import styles from './Footer.module.scss'

export default function Footer() {
  const socialLinks = [
    {
      name: 'Twitter',
      icon: 'https://img.icons8.com/ios-filled/50/000000/twitter.png',
      url: 'https://twitter.com/gdgmits',
      className: 'twitter'
    },
    {
      name: 'LinkedIn',
      icon: 'https://img.icons8.com/ios-filled/50/000000/linkedin.png',
      url: 'https://linkedin.com/company/gdg-mits',
      className: 'linkedin'
    },
    {
      name: 'Instagram',
      icon: 'https://img.icons8.com/ios-filled/50/000000/instagram-new.png',
      url: 'https://instagram.com/gdg.mits',
      className: 'instagram'
    },
    {
      name: 'GitHub',
      icon: 'https://img.icons8.com/ios-filled/50/000000/github.png',
      url: 'https://github.com/gdg-mits',
      className: 'github'
    },
    {
      name: 'Discord',
      icon: 'https://img.icons8.com/ios-filled/50/000000/discord-logo.png',
      url: 'https://discord.gg/gdgmits',
      className: 'discord'
    }
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
              <div className={styles.brand}>GDG MITS</div>
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