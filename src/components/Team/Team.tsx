'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './TeamMembers.module.scss'

export default function TeamMembers() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const scrollSpeed = 1 // Pixels per frame (60fps)

  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Chief Technology Officer',
      department: 'Computer Science & Engineering',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      bio: 'Dr. Sarah Johnson is a renowned tech leader with over 15 years of experience in AI and machine learning.',
      social: {
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        twitter: 'https://twitter.com/sarahjohnson',
        github: 'https://github.com/sarahjohnson'
      },
      expertise: ['AI/ML', 'Ethical AI', 'Cloud Computing', 'Tech Leadership']
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Senior Android Engineer',
      department: 'Mobile Development',
      email: 'michael.chen@google.com',
      phone: '+1 (555) 234-5678',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      bio: 'Michael is a Google Developer Expert for Android with a passion for teaching.',
      social: {
        linkedin: 'https://linkedin.com/in/michaelchen',
        twitter: 'https://twitter.com/michaelchen',
        github: 'https://github.com/michaelchen'
      },
      expertise: ['Android Development', 'Kotlin', 'Flutter', 'Mobile Architecture']
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'Cloud Solutions Architect',
      department: 'Cloud Engineering',
      email: 'priya.sharma@googlecloud.com',
      phone: '+1 (555) 345-6789',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
      bio: 'Priya is a certified Google Cloud Professional with expertise in cloud architecture.',
      social: {
        linkedin: 'https://linkedin.com/in/priyasharma',
        twitter: 'https://twitter.com/priyasharma',
        github: 'https://github.com/priyasharma'
      },
      expertise: ['Google Cloud', 'DevOps', 'Microservices', 'Kubernetes']
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      role: 'Full Stack Developer',
      department: 'Web Technologies',
      email: 'alex.rodriguez@devcorp.com',
      phone: '+1 (555) 456-7890',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Alex is a full-stack developer with expertise in modern web technologies.',
      social: {
        linkedin: 'https://linkedin.com/in/alexrodriguez',
        twitter: 'https://twitter.com/alexrodriguez',
        github: 'https://github.com/alexrodriguez'
      },
      expertise: ['React', 'Node.js', 'GraphQL', 'TypeScript']
    },
    {
      id: 5,
      name: 'Emma Wilson',
      role: 'UX/UI Designer',
      department: 'Design & User Experience',
      email: 'emma.wilson@designstudio.com',
      phone: '+1 (555) 567-8901',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80',
      bio: 'Emma is a passionate UX/UI designer with a background in psychology and design.',
      social: {
        linkedin: 'https://linkedin.com/in/emmawilson',
        twitter: 'https://twitter.com/emmawilson',
        dribbble: 'https://dribbble.com/emmawilson'
      },
      expertise: ['UI Design', 'UX Research', 'Figma', 'Design Systems']
    },
    {
      id: 6,
      name: 'David Kim',
      role: 'Data Scientist',
      department: 'Data Analytics',
      email: 'david.kim@datascience.com',
      phone: '+1 (555) 678-9012',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      bio: 'David specializes in data science and machine learning.',
      social: {
        linkedin: 'https://linkedin.com/in/davidkim',
        twitter: 'https://twitter.com/davidkim',
        github: 'https://github.com/davidkim'
      },
      expertise: ['Data Science', 'Python', 'Machine Learning', 'Data Visualization']
    },
    {
      id: 7,
      name: 'Lisa Park',
      role: 'DevOps Engineer',
      department: 'Infrastructure',
      email: 'lisa.park@devops.com',
      phone: '+1 (555) 789-0123',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
      bio: 'Lisa is a DevOps engineer specializing in CI/CD pipelines.',
      social: {
        linkedin: 'https://linkedin.com/in/lisapark',
        twitter: 'https://twitter.com/lisapark',
        github: 'https://github.com/lisapark'
      },
      expertise: ['Docker', 'Kubernetes', 'AWS', 'Terraform']
    },
    {
      id: 8,
      name: 'Raj Patel',
      role: 'Blockchain Developer',
      department: 'Emerging Technologies',
      email: 'raj.patel@blockchain.com',
      phone: '+1 (555) 890-1234',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80',
      bio: 'Raj is a blockchain developer with expertise in smart contracts.',
      social: {
        linkedin: 'https://linkedin.com/in/rajpatel',
        twitter: 'https://twitter.com/rajpatel',
        github: 'https://github.com/rajpatel'
      },
      expertise: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js']
    }
  ]

  // Duplicate team members for seamless loop
  const duplicatedTeamMembers = [...teamMembers, ...teamMembers, ...teamMembers]

  
  return (
    <section id="team" className={`section ${styles['team-members']}`}>
      <div className="container">
        <div className="dual-heading">
          <div className="heading-back">OUR TEAM</div>
          <h2 className="heading-front">Meet Our Team</h2>
        </div>

        <p className={styles['team-intro']}>
          Our diverse team of experts brings together years of experience and passion for technology. 
          Each member contributes unique skills and perspectives to make our events successful.
        </p>

        <div className={styles['scroll-container-wrapper']}>
          <div className={styles['gradient-overlay-left']}></div>
          <div className={styles['gradient-overlay-right']}></div>
          
          <div 
            ref={scrollContainerRef}
            className={styles['team-scroll-container']}
          >
            <div className={styles['team-grid']}>
              {duplicatedTeamMembers.map((member, index) => (
                <div 
                  key={`${member.id}-${index}`} 
                  className={styles['team-card']}
                  data-index={index}
                >
                  <div className={styles['team-card__image']}>
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      width={300} 
                      height={300}
                      sizes="(max-width: 768px) 150px, 200px"
                      style={{ 
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover'
                      }}
                    />
                    <div className={styles['team-card__image-overlay']}>
                      <span className={styles['team-card__role-badge']}>
                        {member.role}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles['team-card__content']}>
                    <h3 className={styles['team-card__name']}>
                      {member.name}
                    </h3>
                    <p className={styles['team-card__department']}>
                      {member.department}
                    </p>
                    
                    <div className={styles['team-card__bio']}>
                      {member.bio}
                    </div>

                    <div className={styles['team-card__expertise']}>
                      {member.expertise.map((skill, skillIndex) => (
                        <span key={skillIndex} className={styles['team-card__skill']}>
                          {skill}
                        </span>
                      ))}
                    </div>

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
                      {member.social.twitter && (
                        <a 
                          href={member.social.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles['team-card__social-link']}
                          aria-label={`${member.name}'s Twitter`}
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                            <path d="M16 22V18C16.1392 16.7473 15.78 15.4901 15 14.5C18 14.5 21 12.5 21 9C21.08 7.75 20.73 6.52 20 5.5C20.28 4.35 20.28 3.15 20 2C20 2 19 2 17 3.5C14.36 3 11.64 3 9.00004 3.5C7.00004 2 6.00004 2 6.00004 2C5.70004 3.15 5.70004 4.35 6.00004 5.5C5.27191 6.51588 4.91851 7.75279 5.00004 9C5.00004 12.5 8.00004 14.5 11 14.5C10.61 14.99 10.32 15.55 10.15 16.15C9.98004 16.75 9.93004 17.38 10.00004 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 19C5 20.5 5 16.5 2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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