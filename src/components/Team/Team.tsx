'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './TeamMembers.module.scss'

export default function TeamMembers() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<number>(0)
  const scrollSpeed = 0.5

  const teamMembers = [
    {
      id: 1,
      name: 'Vaibhav Sharma',
      role: 'GDGoC Lead',
      description: 'Leads the GDGoC initiative with vision and dedication, fostering a collaborative and innovative community.',
      image: '/assets/team/vaibhav.jpeg',
      social: {
        linkedin: 'https://www.linkedin.com/in/vaibhav-sharma-123456789/',
        github: 'https://github.com/vaibhavsharma',
        email: 'vaibhavsharma@gmail.com'
      }
    },
    {
      id: 2,
      name: 'Akash Singh',
      role: 'Content Lead',
      description: 'Crafts compelling narratives that engage and inspire our community through thoughtful content strategy.',
      image: '/assets/team/aakash.jpeg',
      social: {
        linkedin: 'https://www.linkedin.com/in/akash-singh-6bb244214/',
        github: 'https://github.com/AkashSingh6260',
        email: 'akki.akashsingh2005@gmail.com'
      }
    },
    {
      id: 3,
      name: 'Tanushka Tiwari',
      role: 'Graphic Lead',
      description: 'Transforms ideas into stunning visual experiences with creative design and innovative graphics.',
      image: '/assets/team/tanushka.avif',
      social: {
        linkedin: 'https://www.linkedin.com/in/tanushka-tiwari2105/',
        github: 'https://github.com/tanushkat96',
        email: 'tanushkat96@gmail.com'
      }
    },
    {
      id: 4,
      name: 'Jatin Pathak',
      role: 'PR Lead',
      description: 'Builds strong relationships and creates impactful communication strategies to amplify our reach.',
      image: '/assets/team/jatin.avif',
      social: {
        linkedin: 'https://www.linkedin.com/in/jatin-pathak-a1a457281',
        github: 'https://github.com/Jatzz26',
        email: 'jatintp2604@gmail.com'
      }
    },
    {
      id: 5,
      name: 'Devyash Rasela',
      role: 'Technical Lead',
      description: 'Drives innovation with cutting-edge solutions and robust technical architecture.',
      image: '/assets/team/devyash.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/devyash-rasela',
        github: 'https://github.com/devyashrasela',
        email: 'devyashrasela@gmail.com'
      }
    },
    {
      id: 6,
      name: 'Rishita Mukherjee',
      role: 'Social Media Lead',
      description: 'Amplifies our voice across digital platforms with strategic social media campaigns.',
      image: '/assets/team/rishita.png',
      social: {
        linkedin: "http://www.linkedin.com/in/rishita-mukherjee-293045325",
        github: "https://github.com/rishita-73",
        email: "mukherjirishit.07@gmail.com"
      }
    },
    {
      id: 7,
      name: 'Adhiraj Singh Bhadouriya',
      role: 'Management Lead',
      description: 'Orchestrates seamless operations and drives team synergy for maximum efficiency.',
      image: '/assets/team/adhiraj.avif',
      social: {
        linkedin: 'https://www.linkedin.com/in/adhiraj05',
        github: 'https://github.com/Adhi-raaj',
        email: 'adhirajansh@gmail.com'
      }
    },
    {
      id: 8,
      name: 'Utsav Kumawat',
      role: 'Videography Lead',
      description: 'Captures unforgettable moments and tells our story through compelling visual narratives.',
      image: '/assets/team/utsav.png',
      social: {
        linkedin: 'https://www.linkedin.com/in/alwaysutsav',
        github: 'https://github.com/always-utsav',
        email: 'utsavkumawat05@gmail.com'
      }
    }
  ]

  // Duplicate team members for seamless loop
  const duplicatedTeamMembers = [...teamMembers, ...teamMembers]

  // Auto-scroll animation
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const animateScroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed
        
        // Reset to beginning when reaching the duplicated section
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        if (scrollContainer.scrollLeft >= maxScroll * 0.66) {
          scrollContainer.scrollLeft = 0
        }
      }
      animationRef.current = requestAnimationFrame(animateScroll)
    }

    animationRef.current = requestAnimationFrame(animateScroll)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused])

  // Handle mouse events for manual scroll
  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  return (
    <section id="team" className={`section ${styles['team-members']}`}>
      <div className="container">
        <div className="dual-heading">
          <div className="heading-back">OUR TEAM</div>
          <h2 className="heading-front">Meet Our Team</h2>
        </div>

        <p className={styles['team-intro']}>
          Our diverse team of experts brings together years of experience and passion for technology.
        </p>

        <div className={styles['scroll-container-wrapper']}>
          <div className={styles['gradient-overlay-left']}></div>
          <div className={styles['gradient-overlay-right']}></div>
          
          <div 
            ref={scrollContainerRef}
            className={styles['team-scroll-container']}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
          >
            <div className={styles['team-grid']}>
              {duplicatedTeamMembers.map((member, index) => (
                <div 
                  key={`${member.id}-${index}`} 
                  className={styles['team-card']}
                >
                  <div className={styles['team-card__image']}>
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      width={200} 
                      height={200}
                      sizes="(max-width: 768px) 150px, 200px"
                      style={{ 
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover'
                      }}
                    />
                    <div className={styles['team-card__image-overlay']}>
                      <span className={styles['team-card__role']}>
                        {member.role}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles['team-card__content']}>
                    <h3 className={styles['team-card__name']}>
                      {member.name}
                    </h3>
                    
                    <p className={styles['team-card__description']}>
                      {member.description}
                    </p>
                    
                    <div className={styles['team-card__social']}>
                      {member.social.linkedin && (
                        <a 
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles['team-card__social-link']}
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                      {member.social.github && (
                        <a 
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles['team-card__social-link']}
                          aria-label={`${member.name}'s GitHub`}
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 22V18C16.1392 16.7473 15.78 15.4901 15 14.5C18 14.5 21 12.5 21 9C21.08 7.75 20.73 6.52 20 5.5C20.28 4.35 20.28 3.15 20 2C20 2 19 2 17 3.5C14.36 3 11.64 3 9.00004 3.5C7.00004 2 6.00004 2 6.00004 2C5.70004 3.15 5.70004 4.35 6.00004 5.5C5.27191 6.51588 5.91851 7.75279 5.00004 9C5.00004 12.5 8.00004 14.5 11 14.5C10.61 14.99 10.32 15.55 10.15 16.15C9.98004 16.75 9.93004 17.38 10.00004 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 19C5 20.5 5 16.5 2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                      {member.social.email && (
                        <a 
                          href={`mailto:${member.social.email}`}
                          className={styles['team-card__social-link']}
                          aria-label={`Email ${member.name}`}
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}