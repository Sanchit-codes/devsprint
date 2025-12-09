'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './Developer.module.scss'

export default function TeamMembers() {
  const teamMembers = [
  {
    id: 1,
    name: 'Sanchit Jain',
    role: 'FullStack Developer',
    description: 'Develops complete web solutions with smooth frontend and powerful backend integration.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80',
    social: {
      linkedin: 'https://www.linkedin.com/in/lnsanchit/',
      github: 'https://github.com/Sanchit-codes',
      email: 'sanchit.workspace@outlook.com'
    }
  },
  {
    id: 2,
    name: 'Unnati Jadon',
    role: 'FULLSTACK DEVELOPER',
    description: 'Builds end-to-end web solutions combining seamless front-end flow with robust back-end architecture.',
    image: '/assets/developers/unnati.avif',
    social: {
      linkedin: 'http://www.linkedin.com/in/unnati-jadon-610414232',
      github: 'https://github.com/Unnati1007',
      email: 'unnatijadon1007@gmail.com'
    }
  },
  {
    id: 3,
    name: 'Harsh Manmode',
    role: 'Frontend Developer',
    description: 'Builds secure APIs and scalable backend systems that keep applications running smoothly.',
    image: '/assets/developers/harsh.avif',
    social: {
      linkedin: 'harshmanmode79@gmail.com',
      github: 'https://github.com/Harsh-2006-git',
      email: 'harshmanmode79@gmail.com ',
    }
  },
  {
    id: 4,
    name: 'Prasun Singh',
    role: 'Graphic Design',
    description: 'Designs creative visuals, brand assets, and graphics that deliver clear visual impact.',
    image: '/assets/developers/prasun.avif',
    social: {
      linkedin: 'https://www.linkedin.com/in/prasun-singh-704944329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: 'https://github.com/prasun568',
      email: 'prasun5096@gmail.com'
    }
  },
  {
    id: 5,
    name: 'Adya Acharya',
    role: 'Content & Management',
    description: 'Manages content, communication, and workflow to ensure smooth and organized execution.',
    image: '/assets/developers/adya.avif',
    social: {
      linkedin: "http://www.linkedin.com/in/adya-acharya",
      github: "https://github.com/AdyaAcharya",
      email: "adyaacharya10@gmail.com"
    }
  }
]


  return (
    <section id="team" className={styles['team-section']}>
      <div className={styles['team-container']}>
        <div className={styles['team-header']}>
  <div className={styles['dual-heading']}>
    <div className={styles['heading-back']}>OUR DEVELOPER</div>
    <h2 className={styles['heading-front']}>Meet Our Developer</h2>
  </div>
  
  <p className={styles['team-subtitle']}>
    Our diverse team brings together expertise and passion for excellence.
  </p>
</div>

        <div className={styles['team-grid']}>
          {teamMembers.map((member) => (
            <div key={member.id} className={styles['team-card']}>
              <div className={styles['team-card__image-wrapper']}>
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  width={100} 
                  height={100}
                  className={styles['team-card__image']}
                />
              </div>
              
              <div className={styles['team-card__content']}>
                <h3 className={styles['team-card__name']}>
                  {member.name}
                </h3>
                
                <span className={styles['team-card__role']}>
                  {member.role}
                </span>
                
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
    </section>
  )
}