import styles from './About.module.scss';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">

        {/* Heading */}
        <div className="dual-heading">
          <div className="heading-back">ABOUT EVENT</div>
          <h2 className="heading-front">About DevSprint</h2>
        </div>

        {/* Content */}
        <div className={styles.about__content}>

          {/* Illustration */}
          <div className={styles.about__illustration}>
            <Image
              src="/assets/images/devprint3.png" 
              alt="About DevSprint Illustration"
              width={450}
              height={450}
              priority={true}
            />
          </div>

          {/* Text */}
          <div className={styles.about__text}>
            <h3>Unleash Your Innovation</h3>
            <p>
              DevSprint is an annual hackathon hosted by Google Developer Groups (GDG) on Campus,
              MITS-DU, Gwalior. It brings together developers, innovators, and problem-solvers from
              diverse backgrounds to collaborate, build impactful solutions, and apply their skills
              to real-world challenges across domains like Web Development, Android, AI/ML,
              Cybersecurity, and IoT.
            </p>

            <p>
              Whether you&apos;re a beginner or an experienced builder, DevSprint is your launchpad to
              learn, innovate, and grow. Join us to build something meaningful, connect with
              like-minded tech enthusiasts, and transform your ideas into reality.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
