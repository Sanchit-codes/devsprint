'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './Faculty.module.scss'

export default function TeamMembers() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<number>(0)
  const scrollSpeed = 0.5

  const facultyMembers = [
    {
      id: 1,
      name: 'DR. R.S. JADON',
      role1: 'Dean, Students Administration',
      role2: 'Faculty Coordinator',
      quote: "A hackathon isn't about the prize. It's about what you discover you can build—and who you become while building it.",
      image: 'https://web.mitsgwalior.in/images/faculties/CSE/Rs-Jadon.webp', // You'll need to add this image
      affiliation: 'GDG on Campus - MITS DU'
    }
    // Add more faculty members here if needed
  ]

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
    <>
      {/* Faculty Section */}
      <section id="faculty" className={`section ${styles['faculty-section']}`}>
        <div className="container">
          <div className="dual-heading">
            <div className="heading-back">WORDS OF WISDOM</div>
            <h2 className="heading-front">From Our Leadership</h2>
          </div>

          <div className={styles['faculty-container']}>
            {facultyMembers.map((faculty) => (
              <div key={faculty.id} className={styles['faculty-card']}>
                <div className={styles['faculty-content']}>
                  <div className={styles['faculty-quote']}>
                    <svg 
                      className={styles['quote-icon']} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 8H8C7.46957 8 6.96086 8.21071 6.58579 8.58579C6.21071 8.96086 6 9.46957 6 10V14C6 14.5304 6.21071 15.0391 6.58579 15.4142C6.96086 15.7893 7.46957 16 8 16H10C10.5304 16 11.0391 15.7893 11.4142 15.4142C11.7893 15.0391 12 14.5304 12 14V10C12 9.46957 11.7893 8.96086 11.4142 8.58579C11.0391 8.21071 10.5304 8 10 8Z" fill="currentColor"/>
                      <path d="M20 8H18C17.4696 8 16.9609 8.21071 16.5858 8.58579C16.2107 8.96086 16 9.46957 16 10V14C16 14.5304 16.2107 15.0391 16.5858 15.4142C16.9609 15.7893 17.4696 16 18 16H20C20.5304 16 21.0391 15.7893 21.4142 15.4142C21.7893 15.0391 22 14.5304 22 14V10C22 9.46957 21.7893 8.96086 21.4142 8.58579C21.0391 8.21071 20.5304 8 20 8Z" fill="currentColor"/>
                    </svg>
                    <p className={styles['faculty-quote-text']}>{faculty.quote}</p>
                  </div>
                  <div className={styles['faculty-info']}>
                    <h3 className={styles['faculty-name']}>{faculty.name}</h3>
                    <p className={styles['faculty-role']}>{faculty.role1}</p>
                     <p className={styles['faculty-role']}>{faculty.role2}</p>
                    <p className={styles['faculty-affiliation']}>{faculty.affiliation}</p>
                  </div>
                </div>
                <div className={styles['faculty-image']}>
                  <Image 
                    src={faculty.image} 
                    alt={faculty.name} 
                    width={280} 
                    height={280}
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  
    </>
  )
}