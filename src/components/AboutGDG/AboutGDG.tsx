import styles from './AboutGDG.module.scss';
import Image from 'next/image';
import aboutGdgImg from '/public/assets/images/community.png'; // ensure the file is in public/assets/images/

export default function AboutGDG() {
  return (
    <section className={`section ${styles['about-gdg']}`}>
      <div className="container">
        {/* Heading */}
        <div className="dual-heading">
          <div className="heading-back">ABOUT GDG</div>
          <h2 className="heading-front">Google Developer Groups MITS</h2>
        </div>

        {/* Content */}
        <div className={styles['about-gdg__content']}>
          {/* Text */}
          <div className={styles['about-gdg__text']}>
            <h3>Community-Driven Innovation</h3>
            <p>
              Google Developer Groups (GDG) MITS is a community of developers passionate 
              about Google technologies and open-source development. We organize workshops, 
              hackathons, and tech talks to foster learning and innovation.
            </p>
            <p>
              Our mission is to create a vibrant ecosystem where students and professionals 
              can learn, share knowledge, and build amazing projects together. From Android 
              to Cloud, Web to AI, we cover the entire spectrum of modern technology.
            </p>
            <p>
              Join our growing community of developers, designers, and tech enthusiasts 
              who are shaping the future of technology, one project at a time.
            </p>
          </div>

          {/* Illustration */}
          <div className={styles['about-gdg__illustration']}>
            <Image
              src={aboutGdgImg}
              alt="About GDG Illustration"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
