'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Timeline.module.scss';

const events = [
  { number: 1, title: 'Launch & Registrations Open', time: 'Dec 8 (Online)', description: 'Hackathon announcement and participant registrations begin.', color: 'blue' },
  { number: 2, title: 'Development & Submission Window', time: 'Dec 8 - 27 (Online)', description: 'Participants work on their projects and submit before deadline.', color: 'green' },
  { number: 3, title: 'Info Session', time: 'Dec 11 (Online)', description: 'Overview of rules, timeline, support, and event expectations.', color: 'yellow' },
  { number: 4, title: 'Expert Session 1', time: 'Dec 22 (11:30 AM - 1:00 PM Online)', description: 'Session with CEO & Founder of AugmentAppz.', color: 'red' },
  { number: 5, title: 'Expert Session 2', time: 'TBA (Online)', description: 'Session with esteemed MITS alumni.', color: 'blue' },
  { number: 6, title: 'Additional Expert Sessions', time: 'TBA', description: 'More expert talks may be scheduled.', color: 'green' },
  { number: 7, title: 'Project Evaluation', time: 'Dec 30 (Online)', description: 'Judges review submitted projects.', color: 'yellow' },
  { number: 8, title: 'Top 10 Announcement & Pitching', time: 'Jan 7 (Online)', description: 'Top 10 teams pitch their projects to judges.', color: 'red' },
  { number: 9, title: 'Final Round', time: 'Jan 10 (May be Offline)', description: 'Selected teams present final demos.', color: 'blue' },
  { number: 10, title: 'Top 3 Winners Announcement', time: 'Before Jan 15 (Online)', description: 'Official declaration of winners.', color: 'green' },
];

export default function Timeline() {
  const [activeEvent, setActiveEvent] = useState(0);
  const [visibleEvents, setVisibleEvents] = useState<boolean[]>(events.map(() => false));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sectionVisible, setSectionVisible] = useState(false);

  // Check if entire section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Observe each event for animation
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    eventRefs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleEvents(prev => {
            const updated = [...prev];
            updated[index] = entry.isIntersecting;
            return updated;
          });
        },
        { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  // Detect which event is most visible for progress bar
  useEffect(() => {
    const onScroll = () => {
      let activeIndex = 0;
      let maxVisiblePortion = 0;

      eventRefs.current.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const visibleHeight =
            Math.min(rect.bottom, window.innerHeight) -
            Math.max(rect.top, 0);

          const visibleRatio = visibleHeight / rect.height;

          if (visibleRatio > maxVisiblePortion) {
            maxVisiblePortion = visibleRatio;
            activeIndex = index;
          }
        }
      });
      setActiveEvent(activeIndex);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="timeline" className="section" ref={sectionRef}>
      <div className="container">
        <div className={styles.timeline}>
          
          {/* HEADER */}
          <div
            className={`${styles.timeline__heading} ${
              sectionVisible ? styles.visible : ''
            }`}
          >
            <h2>Event Timeline</h2>
            <p>
              Follow the schedule to make the most of your hackathon experience.
              Don&apos;t miss out on keynotes, workshops, and deadlines!
            </p>
          </div>

          {/* MAIN TIMELINE */}
          <div className={styles.timeline__container} ref={containerRef}>

            {/* PROGRESS BAR */}
            <div className={styles.timeline__progress}>
              <div
                className={styles.timeline__progressBar}
                style={{
                  height: `${(activeEvent / (events.length - 1)) * 100}%`
                }}
              ></div>
            </div>

            {/* EVENTS */}
            <div className={styles.timeline__events}>
              {events.map((event, i) => {
                const visible = visibleEvents[i];

                return (
                  <div
                    key={i}
                    ref={el => (eventRefs.current[i] = el)}
                    className={`${styles.timeline__item} ${
                      visible ? styles.visible : ''
                    }`}
                  >
                    {/* LINE + BADGE */}
                    <div className={styles.timeline__line}>
                      <div
                        className={`${styles.timeline__badge} ${
                          styles[event.color]
                        } ${i <= activeEvent ? styles.active : ''}`}
                      >
                        {event.number}
                        <div className={styles.timeline__badgeGlow}></div>
                      </div>

                      {i < events.length - 1 && (
                        <div className={styles.timeline__connector}></div>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div
                      className={`${styles.timeline__content} ${
                        visible ? styles.show : ''
                      }`}
                      data-side={i % 2 === 0 ? 'left' : 'right'}
                      style={{ ['--delay' as any]: i }}
                    >
                      <h3>{event.title}</h3>
                      <p className={styles.timeline__time}>{event.time}</p>
                      <p className={styles.timeline__description}>{event.description}</p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
