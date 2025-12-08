import styles from './Timeline.module.scss'

export default function Timeline() {
  const events = [
    {
      number: 1,
      title: 'Launch & Registrations Open',
      time: 'Dec 8 (Online)',
      description: 'Hackathon announcement and participant registrations begin.',
      color: 'blue'
    },
    {
      number: 2,
      title: 'Development & Submission Window',
      time: 'Dec 8 - 27 (Online)',
      description: 'Participants work on their projects and submit before deadline.',
      color: 'green'
    },
    {
      number: 3,
      title: 'Info Session',
      time: 'Dec 11 (Online)',
      description: 'Overview of rules, timeline, support, and event expectations.',
      color: 'yellow'
    },
    {
      number: 4,
      title: 'Expert Session 1',
      time: 'Dec 22 (11:30 AM - 1:00 PM Online)',
      description: 'Session with CEO & Founder of AugmentAppz.',
      color: 'red'
    },
    {
      number: 5,
      title: 'Expert Session 2',
      time: 'TBA (Online)',
      description: 'Session with esteemed MITS alumni.',
      color: 'blue'
    },
    {
      number: 6,
      title: 'Additional Expert Sessions',
      time: 'TBA',
      description: 'More expert talks may be scheduled.',
      color: 'green'
    },
    {
      number: 7,
      title: 'Project Evaluation',
      time: 'Dec 30 (Online)',
      description: 'Judges review submitted projects.',
      color: 'yellow'
    },
    {
      number: 8,
      title: 'Top 10 Announcement & Pitching',
      time: 'Jan 7 (Online)',
      description: 'Top 10 teams pitch their projects to judges.',
      color: 'red'
    },
    {
      number: 9,
      title: 'Final Round',
      time: 'Jan 10 (May be Offline)',
      description: 'Selected teams present final demos.',
      color: 'blue'
    },
    {
      number: 10,
      title: 'Top 3 Winners Announcement',
      time: 'Before Jan 15 (Online)',
      description: 'Official declaration of winners.',
      color: 'green'
    }
  ];

  return (
    <section id="timeline" className="section">
      <div className="container">
        <div className={styles.timeline}>
          <div className={styles.timeline__heading}>
            <h2>Event Timeline</h2>
            <p>Follow the schedule to make the most of your hackathon experience. Don&apos;t miss out on keynotes, workshops, and deadlines!</p>
          </div>
          
          <div className={styles.timeline__container}>
            <div className={styles.timeline__events}>
              {events.map((event, index) => (
                <div key={index} className={styles.timeline__item}>
                  <div className={styles.timeline__line}>
                    <div className={`${styles.timeline__badge} ${styles[event.color]}`}>
                      {event.number}
                    </div>
                    {index < events.length - 1 && (
                      <div className={styles.timeline__connector}></div>
                    )}
                  </div>
                  <div className={styles.timeline__content}>
                    <h3>{event.title}</h3>
                    <p className={styles.timeline__time}>{event.time}</p>
                    <p className={styles.timeline__description}>{event.description}</p>
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