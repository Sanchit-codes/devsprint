'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './OtherEvents.module.scss'

export default function OtherEvents() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  const events = [
    {
      title: 'Tech Talk Series',
      description: 'Monthly tech talks featuring industry experts sharing insights on latest technologies and trends.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      fullDescription: 'Join us for our monthly Tech Talk Series where industry experts and thought leaders share their insights on the latest technologies, trends, and best practices. These sessions cover a wide range of topics including AI/ML, Web Development, Cloud Computing, Mobile Development, and more.',
      speaker: {
        name: 'Dr. Sarah Johnson',
        role: 'Chief Technology Officer, TechCorp',
        bio: 'Dr. Sarah Johnson is a renowned tech leader with over 15 years of experience in AI and machine learning. She has led numerous successful projects and spoken at major tech conferences worldwide.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
      },
      eventDetails: {
        date: 'December 15, 2025',
        time: '6:00 PM - 8:00 PM',
        venue: 'Main Auditorium, Tech Campus',
        mode: 'Hybrid (In-person & Online)'
      }
    },
    {
      title: 'Android Study Jams',
      description: 'Hands-on Android development workshops with guided learning paths and expert mentorship.',
      image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80',
      fullDescription: 'Android Study Jams is a community-run study group where participants learn Android development together. Follow guided learning paths created by Google experts, work on real-world projects, and get mentorship from experienced Android developers.',
      speaker: {
        name: 'Michael Chen',
        role: 'Senior Android Engineer, Google',
        bio: 'Michael is a Google Developer Expert for Android with a passion for teaching. He has developed multiple successful Android apps and regularly contributes to the Android open-source community.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
      },
      eventDetails: {
        date: 'December 20, 2025',
        time: '10:00 AM - 4:00 PM',
        venue: 'Lab Building, Room 301',
        mode: 'In-person'
      }
    },
    {
      title: 'Cloud Study Jam',
      description: 'Learn Google Cloud Platform through interactive labs and real-world project implementations.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      fullDescription: 'Dive into Google Cloud Platform with our comprehensive Cloud Study Jam program. Gain hands-on experience through interactive labs using Qwiklabs, work on real-world projects, and learn from certified Google Cloud professionals.',
      speaker: {
        name: 'Priya Sharma',
        role: 'Cloud Solutions Architect, Google Cloud',
        bio: 'Priya is a certified Google Cloud Professional with expertise in cloud architecture and DevOps. She has helped numerous organizations migrate to cloud infrastructure and optimize their operations.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80'
      },
      eventDetails: {
        date: 'December 22, 2025',
        time: '2:00 PM - 6:00 PM',
        venue: 'Computer Lab 2',
        mode: 'Hybrid (In-person & Online)'
      }
    }
  ]

  const handleKnowMore = (index: number) => {
    setSelectedEvent(index)
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
  }

  const handleRegister = () => {
    alert('Registration functionality coming soon!')
  }

  const WavyArrow = () => (
    <svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 0 10 Q 10 5, 20 10 T 35 10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 30 7 L 38 10 L 30 13"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <section className={`section ${styles['other-events']}`}>
      <div className="container">
        <div className="dual-heading">
          <div className="heading-back">OTHER EVENTS</div>
          <h2 className="heading-front">Explore More Events</h2>
        </div>
        
        <div className={styles['other-events__grid']}>
          {events.map((event, index) => (
            <div key={index} className={styles['other-events__card']}>
              <div className={styles['other-events__card-image']}>
                <Image src={event.image} alt={event.title} width={800} height={400} />
              </div>
              <div className={styles['other-events__card-content']}>
                <h3 className={styles['other-events__card-title']}>
                  {event.title}
                </h3>
                <p className={styles['other-events__card-description']}>
                  {event.description}
                </p>
                <div 
                  className={styles['other-events__card-link']}
                  onClick={() => handleKnowMore(index)}
                >
                  <span>Know More</span>
                  <span className={styles['wavy-arrow']}>
                    <WavyArrow />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent !== null && (
        <div className={styles['modal-overlay']} onClick={handleCloseModal}>
          <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles['modal__close']} 
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              ×
            </button>
            
            <div className={styles['modal__split']}>
              {/* Left Side - Image and Speaker */}
              <div className={styles['modal__left']}>
                <div className={styles['modal__image']}>
                  <Image src={events[selectedEvent].image} alt={events[selectedEvent].title} width={800} height={400} />
                </div>
                
                <div className={styles['modal__speaker-card']}>
                  <div className={styles['modal__speaker-image']}>
                    <Image 
                      src={events[selectedEvent].speaker.image} 
                      alt={events[selectedEvent].speaker.name}
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className={styles['modal__speaker-info']}>
                    <h5 className={styles['modal__speaker-name']}>
                      {events[selectedEvent].speaker.name}
                    </h5>
                    <p className={styles['modal__speaker-role']}>
                      {events[selectedEvent].speaker.role}
                    </p>
                    <p className={styles['modal__speaker-bio']}>
                      {events[selectedEvent].speaker.bio}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Content */}
              <div className={styles['modal__right']}>
                <h3 className={styles['modal__title']}>
                  {events[selectedEvent].title}
                </h3>
                
                <p className={styles['modal__description']}>
                  {events[selectedEvent].fullDescription}
                </p>

                {/* Event Details Section */}
                <div className={styles['modal__event-details']}>
                  <h4 className={styles['modal__section-heading']}>
                    <span className={styles['modal__heading-icon']}>📍</span>
                    Event Details
                  </h4>
                  <div className={styles['modal__details-list']}>
                    <div className={styles['modal__detail-item']}>
                      <svg className={styles['modal__detail-icon']} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div>
                        <p className={styles['modal__detail-label']}>Date</p>
                        <p className={styles['modal__detail-value']}>{events[selectedEvent].eventDetails.date}</p>
                      </div>
                    </div>
                    <div className={styles['modal__detail-item']}>
                      <svg className={styles['modal__detail-icon']} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div>
                        <p className={styles['modal__detail-label']}>Time</p>
                        <p className={styles['modal__detail-value']}>{events[selectedEvent].eventDetails.time}</p>
                      </div>
                    </div>
                    <div className={styles['modal__detail-item']}>
                      <svg className={styles['modal__detail-icon']} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 13.43a3.12 3.12 0 100-6.24 3.12 3.12 0 000 6.24z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 0 01-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05z" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <div>
                        <p className={styles['modal__detail-label']}>Venue</p>
                        <p className={styles['modal__detail-value']}>{events[selectedEvent].eventDetails.venue}</p>
                      </div>
                    </div>
                    <div className={styles['modal__detail-item']}>
                      <svg className={styles['modal__detail-icon']} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 19.9V4.1c0-.4-.3-.7-.7-.8-4-.8-7 1.2-7 5.2v7c0 4 3 6 7 5.2.4-.1.7-.4.7-.8zM21.2 12.7v-1.4c0-1.1-.9-2-2-2h-1.5c-.8 0-1.5.7-1.5 1.5v2.8c0 .8.7 1.5 1.5 1.5h1.5c1.1 0 2-.9 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div>
                        <p className={styles['modal__detail-label']}>Mode</p>
                        <p className={styles['modal__detail-value']}>{events[selectedEvent].eventDetails.mode}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  className={styles['modal__register-btn']}
                  onClick={handleRegister}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
