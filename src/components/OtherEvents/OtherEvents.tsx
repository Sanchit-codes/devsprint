import styles from './OtherEvents.module.scss'

export default function OtherEvents() {
  const events = [
    {
      title: 'Tech Talk Series',
      description: 'Monthly tech talks featuring industry experts sharing insights on latest technologies and trends.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
    },
    {
      title: 'Android Study Jams',
      description: 'Hands-on Android development workshops with guided learning paths and expert mentorship.',
      image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80'
    },
    {
      title: 'Cloud Study Jam',
      description: 'Learn Google Cloud Platform through interactive labs and real-world project implementations.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
    }
  ]

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
                <img src={event.image} alt={event.title} />
              </div>
              <div className={styles['other-events__card-content']}>
                <h3 className={styles['other-events__card-title']}>
                  {event.title}
                </h3>
                <p className={styles['other-events__card-description']}>
                  {event.description}
                </p>
                <div className={styles['other-events__card-link']}>
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
    </section>
  )
}
