import styles from './Tracks.module.scss'

export default function Tracks() {
  const tracks = [
    {
      title: 'Web Development',
      icon: '🌐',
      description: 'Build innovative web applications using modern frameworks and technologies.',
      supportText: 'Create responsive, scalable, and user-friendly web solutions.',
      technologies: ['React', 'Next.js', 'Vue', 'Node.js'],
      className: 'web'
    },
    {
      title: 'Android Development',
      icon: '📱',
      description: 'Develop native Android applications that solve real-world problems.',
      supportText: 'Build mobile apps with amazing UX and performance.',
      technologies: ['Kotlin', 'Java', 'Jetpack Compose', 'Firebase'],
      className: 'android'
    },
    {
      title: 'AI/ML',
      icon: '🤖',
      description: 'Create intelligent solutions using machine learning and artificial intelligence.',
      supportText: 'Leverage AI to build predictive and smart applications.',
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI'],
      className: 'ai'
    },
    {
      title: 'Blockchain',
      icon: '⛓️',
      description: 'Build decentralized applications using blockchain technology.',
      supportText: 'Develop secure and transparent blockchain solutions.',
      technologies: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts'],
      className: 'blockchain'
    }
  ]

  return (
    <section className={`section ${styles['tracks']}`}>
      <div className="container">

        <div className="dual-heading">
          <div className="heading-back">TRACKS</div>
          <h2 className="heading-front">Open Innovation</h2>
        </div>

        {/* Intro Line */}
        <p className={styles.tracks__intro}>
          Participants can build solutions for real-world problems using Google technologies,
          focusing on social challenges and pressing issues around them.
        </p>

        <div className={styles.tracks__grid}>
          {tracks.map((track, index) => (
            <div 
              key={index} 
              className={`${styles.tracks__card} ${styles[track.className]}`}
            >
              <div className={styles['tracks__card-header']}>
                <div className={styles['tracks__card-icon']}>
                  {track.icon}
                </div>
                <h3 className={styles['tracks__card-title']}>
                  {track.title}
                </h3>
              </div>

              <p className={styles['tracks__card-description']}>{track.description}</p>
              <p className={styles['tracks__card-description']}>{track.supportText}</p>

              <div className={styles['tracks__card-tech']}>
                {track.technologies.map((tech, techIndex) => (
                  <span key={techIndex}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
