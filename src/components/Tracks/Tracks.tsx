import styles from './Tracks.module.scss'

export default function Tracks() {
  const tracks = [
    {
      title: 'Flutter',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      description: 'Build beautiful cross-platform apps',
      className: 'flutter'
    },
    {
      title: 'Gemini AI',
      icon: 'https://fonts.gstatic.com/s/i/productlogos/googleg_gm/v6/192px.svg',
      description: 'Advanced multimodal AI models',
      className: 'gemini'
    },
    {
      title: 'TensorFlow',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
      description: 'End-to-end ML platform',
      className: 'tensorflow'
    },
    {
      title: 'Google Cloud',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
      description: 'Scalable cloud infrastructure',
      className: 'cloud'
    },
    {
      title: 'Firebase',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      description: 'Build apps fast, scale with ease',
      className: 'firebase'
    },
    {
      title: 'Android',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
      description: 'Modern mobile development',
      className: 'android'
    },
    {
      title: 'Angular',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      description: 'Web developer platform',
      className: 'angular'
    },
    {
      title: 'Kotlin',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
      description: 'Modern programming language',
      className: 'kotlin'
    }
  ]

  return (
    <section id="tracks" className={`section ${styles['tracks']}`}>
      <div className="container">

        <div className="dual-heading">
          <div className="heading-back">TRACKS</div>
          <h2 className="heading-front">Open Innovation</h2>
        </div>

        {/* Intro Line */}
        <p className={styles.tracks__intro}>
          Build ANY unique solution using Google technologies. No boundaries, just pure innovation.
        </p>

        <div className={styles.tracks__grid}>
          {tracks.map((track, index) => (
            <div 
              key={index} 
              className={`${styles.tracks__card} ${styles[track.className]}`}
              data-title={track.title}
            >
              <div className={styles['tracks__card-icon']}>
                <img src={track.icon} alt={track.title} />
              </div>
              <div className={styles['tracks__card-content']}>
                <h3 className={styles['tracks__card-title']}>
                  {track.title}
                </h3>
                <p className={styles['tracks__card-description']}>{track.description}</p>
              </div>
              <div className={styles['tracks__card-hover']}>
                <span>Build with {track.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tracks__footer}>
          <p className={styles.tracks__footerText}>
            <strong>Your imagination is the limit.</strong> Combine these technologies to create something amazing!
          </p>
        </div>

      </div>
    </section>
  )
}