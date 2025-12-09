'use client'

import { useState } from 'react'
import styles from './Rules.module.scss'

export default function Rules() {
  const rules = [
    'Participants must submit a project presentation deck.',
    'A working MVP (Minimum Viable Product) link must be included.',
    'A maximum three-minute demo video is required.',
    'A GitHub repository link must be provided for code review.',
    'Projects must use at least one Google technology (mandatory).',
    'List all Google AI tools or additional Google services used in the solution.',
    'A short written solution description (around 100 words) must be included.',
    'Projects must be created after 1st December, 2025 to remain eligible.',
    'Participants must upload submissions using the provided template.',
    'All submission materials (code, documentation, demo, slides) must be in English.',
  ]

  const faqs = [
    {
      question: 'Who can participate in DevSprint?',
      answer: 'Anyone who is passionate about technology, regardless of experience level, can participate.',
    },
    {
      question: 'Is there a registration fee?',
      answer: 'No, DevSprint participation is completely free of cost for all attendees.',
    },
    {
      question: 'Can I participate solo or do I need a team?',
      answer: 'You may join solo or in a team of up to 4 members.',
    },
    {
      question: 'What should I bring to the event?',
      answer: 'Bring your laptop, charger, valid ID, and any additional items you need for development. Wi-Fi and workspace will be provided.',
    },
  ]

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <section id="faq" className={`section ${styles.rules}`}>
      <div className="container">
        <div className="dual-heading">
          <div className="heading-back">FAQs & RULES</div>
          <h2 className="heading-front">FAQs and Rules</h2>
        </div>

        <div className={styles.rules__wrapper}>
          {/* Rules Section */}
          <div className={styles.rules__content}>
            <div className={styles.rules__text}>
              <h3>Rules & Guidelines</h3>
              <p>To ensure a fair and enjoyable experience for everyone, please adhere to the following rules.</p>
            </div>

            <div className={styles.rules__code}>
              <div className={styles.rules__window}>
                <div className={styles.rules__header}>
                  <div className={styles.rules__buttons}>
                    <span className={styles.rules__button} data-color="red"></span>
                    <span className={styles.rules__button} data-color="yellow"></span>
                    <span className={styles.rules__button} data-color="green"></span>
                  </div>
                  <div className={styles.rules__filename}>rules.txt</div>
                </div>
                <div className={styles.rules__body}>
                  <pre>
                    {rules.map((rule, index) => (
                      <div key={index} className={styles.rules__line}>
                        <span className={styles.rules__number}>{index + 1}.</span> {rule}
                      </div>
                    ))}
                    <div className={styles.rules__comment}>
                      {`// Have fun and build something amazing!`}
                    </div>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className={styles.faq}>
            <div className={styles.faq__content}>
              <div className={styles.faq__heading}>
                <h3>Frequently Asked <br />Questions</h3>
              </div>

              <div className={styles.faq__list}>
                {faqs.map((faq, index) => (
                  <div key={index} className={styles.faq__item}>
                    <button
                      className={styles.faq__question}
                      onClick={() => toggleFaq(index)}
                    >
                      <span className={styles.faq__icon}>Q:</span>
                      <span className={styles.faq__text}>{faq.question}</span>
                      <span
                        className={styles.faq__plus}
                        style={{
                          transform: openFaqIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                          color: openFaqIndex === index ? '#1a73e8' : undefined
                        }}
                      >
                        +
                      </span>
                    </button>

                    {openFaqIndex === index && (
                      <div className={styles.faq__answer}>
                        <span></span> {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
