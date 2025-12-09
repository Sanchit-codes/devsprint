'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './OtherEvents.module.scss'
import { useRouter } from 'next/navigation'

export default function OtherEvents() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const router = useRouter();

  const events = [
    {
      title: 'Info Session + Submission Kickoff',
      description: 'Overview of rules, judging criteria, support channels & official start of project submission.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
      fullDescription: 'This session marks the official start of the submission window. Participants will receive complete guidance on project requirements, evaluation rules, support availability, and expectations. This session ensures clarity before development begins.',
      speaker: {
        name: 'GDG Team',
        role: 'Organizers',
        bio: 'The core GDG team will walk participants through the hackathon structure and rules.',
        image: '',
      },
      eventDetails: {
        date: 'December 11, 2025',
        time: '08:30 PM – 09:30 PM',
        platform: 'Google Meet',
        mode: 'Online'
      }
    },
    {
      title: 'Expert Session 1 — Samarth Sharma',
      description: 'Hands-on session covering industry insights, problem-solving mindset, and project refinement.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      fullDescription: 'Join Samarth Sharma for an impactful expert session designed to level up your project execution approach. Learn practical frameworks, design thinking, and strategies used in real industry product-building workflows.',
      speaker: {
        name: 'Samarth Sharma',
        role: 'Industry Expert',
        bio: 'Samarth Sharma is a seasoned professional known for product-driven development and tech mentorship.',
        image: '/assets/Guests/samarth.jpg',
      },
      eventDetails: {
        date: 'December 21, 2025',
        time: '8:30 PM – 10:00 PM',
        platform: 'Google Meet',
        mode: 'Online'
      }
    },
    {
      title: 'Expert Session 2 — Balavigneshwaran Manogaran',
      description: 'A deep technical talk focused on real-world engineering workflows and product lifecycle.',
      image: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=800&q=80',
      fullDescription: 'This expert session covers advanced tech learning, real engineering systems, and roadmap strategies. Participants will gain practical knowledge to improve implementation and optimize their submission for judging.',
      speaker: {
        name: 'Balavigneshwaran Manogaran',
        role: 'Industry Expert',
        bio: 'Balavigneshwaran brings extensive experience in scalable systems, architecture design, and leadership.',
        image: '/assets/Guests/bala.jpg'
      },
      eventDetails: {
        date: 'December 22, 2025',
        time: '11:30 AM – 1:00 PM',
        platform: 'Google Meet',
        mode: 'Online'
      }
    },
    {
      title: 'Expert Session 3 — Kartikey Verma',
      description: 'Final expert session offering technical guidance and strategic project improvement.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
      fullDescription: 'A focused mentorship session aimed at helping participants refine their projects before submission. Learn best practices, common pitfalls, and how to convert your idea into a polished, competitive solution.',
      speaker: {
        name: 'Kartikey Verma',
        role: 'Industry Mentor',
        bio: 'Kartikey Verma specializes in product engineering and innovation, mentoring teams across domains.',
        image: '/assets/Guests/kartikey.jpg'
      },
      eventDetails: {
        date: 'December 24, 2025',
        time: '8:30 PM – 10:00 PM',
        platform: 'Google Meet',
        mode: 'Online'
      }
    }
  ];

  const handleKnowMore = (index: number) => {
    setSelectedEvent(index)
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
  }

  const handleRegister = () => {
    router.push('/register')
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
    <section id="event" className={`section ${styles['other-events']}`}>
      <div className="container">
        <div className="dual-heading">
          <div className="heading-back">OTHER EVENTS</div>
          <h2 className="heading-front">Events</h2>
        </div>

        <div className={styles['other-events__grid']}>
          {events.map((event, index) => (
            <div key={index} className={styles['other-events__card']}>
              <div className={styles['other-events__card-image']}>
                <Image
                  src={event.image}
                  alt={event.title}
                  width={800}
                  height={400}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover'
                  }}
                />
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
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleKnowMore(index)}
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
                  <Image
                    src={events[selectedEvent].image}
                    alt={events[selectedEvent].title}
                    width={800}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                <div className={styles['modal__speaker-card']}>
                  {events[selectedEvent].speaker.image && (
                    <div className={styles['modal__speaker-image']}>
                      <Image
                        src={events[selectedEvent].speaker.image}
                        alt={events[selectedEvent].speaker.name}
                        width={400}
                        height={400}
                        sizes="(max-width: 768px) 80px, 100px"
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
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
                        <path d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <p className={styles['modal__detail-label']}>Date</p>
                        <p className={styles['modal__detail-value']}>{events[selectedEvent].eventDetails.date}</p>
                      </div>
                    </div>
                    <div className={styles['modal__detail-item']}>
                      <svg className={styles['modal__detail-icon']} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <p className={styles['modal__detail-label']}>Time</p>
                        <p className={styles['modal__detail-value']}>{events[selectedEvent].eventDetails.time}</p>
                      </div>
                    </div>
                    <div className={styles['modal__detail-item']}>
                      <svg className={styles['modal__detail-icon']} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 13.43a3.12 3.12 0 100-6.24 3.12 3.12 0 000 6.24z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 0 01-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05z" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                      <div>
                        <p className={styles['modal__detail-label']}>Platform</p>
                        <p className={styles['modal__detail-value']}>{events[selectedEvent].eventDetails.platform}</p>
                      </div>
                    </div>
                    <div className={styles['modal__detail-item']}>
                      <svg className={styles['modal__detail-icon']} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 19.9V4.1c0-.4-.3-.7-.7-.8-4-.8-7 1.2-7 5.2v7c0 4 3 6 7 5.2.4-.1.7-.4.7-.8zM21.2 12.7v-1.4c0-1.1-.9-2-2-2h-1.5c-.8 0-1.5.7-1.5 1.5v2.8c0 .8.7 1.5 1.5 1.5h1.5c1.1 0 2-.9 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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