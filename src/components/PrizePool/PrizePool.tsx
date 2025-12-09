'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './PrizePool.module.scss'

interface Prize {
  rank: string
  icon: string
  perks: string
  className: 'first' | 'second' | 'third'
  gradient: string
  glow: string
}

export default function PrizePool() {
  const prizeRefs = useRef<(HTMLDivElement | null)[]>([])
  const headerRef = useRef<HTMLDivElement>(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [isCardVisible, setIsCardVisible] = useState(Array(3).fill(false))

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true)
            headerObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
      }
    )

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setIsCardVisible(prev => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
            cardObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
      }
    )

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    const currentRefs = prizeRefs.current
    currentRefs.forEach((ref) => {
      if (ref) cardObserver.observe(ref)
    })

    return () => {
      if (headerRef.current) headerObserver.unobserve(headerRef.current)
      currentRefs.forEach((ref) => {
        if (ref) cardObserver.unobserve(ref)
      })
    }
  }, [])

  const prizes: Prize[] = [
    {
      rank: 'Top 3',
      icon: '🏆',
      perks: 'Exclusive Swags + Certificates',
      className: 'first',
      gradient: 'linear-gradient(135deg, #fbbc04 0%, #ea8600 100%)',
      glow: 'rgba(251, 188, 4, 0.15)'
    },
    {
      rank: 'Top 10',
      icon: '✨',
      perks: 'Certificates + Featured on Our Platform',
      className: 'second',
      gradient: 'linear-gradient(135deg, #4285f4 0%, #1a73e8 100%)',
      glow: 'rgba(66, 133, 244, 0.15)'
    },
    {
      rank: 'All Participants',
      icon: '🎉',
      perks: 'Certificates',
      className: 'third',
      gradient: 'linear-gradient(135deg, #ea4335 0%, #c62828 100%)',
      glow: 'rgba(234, 67, 53, 0.15)'
    }
  ]

  return (
    <section id="prizes" className={styles.prizeSection}>
      {/* Background Decorative Elements */}
      <div className={styles.backgroundDecorations}>
        <div className={styles.decorationCircle1}></div>
        <div className={styles.decorationCircle2}></div>
        <div className={styles.decorationCircle3}></div>
        <div className={styles.decorationLine1}></div>
        <div className={styles.decorationLine2}></div>
        <div className={styles.dotPattern}></div>
      </div>

      <div className={styles.container}>
        {/* Header Section with improved styling */}
        <div className={styles.headerContainer} ref={headerRef}>
          {/* Badge/Title with animation */}
          <div className="dual-heading">
            <div className="heading-back">WINNING PRIZES</div>
            <h2 className="heading-front">AMAZING WINNING PRIZES</h2>
          </div>
        </div>

        {/* Prize Cards */}
        <div className={styles.prizeContainer}>
          <div className={styles.prizeCards}>
            {prizes.map((prize, index) => (
              <div
                key={index}
                ref={el => {
                  if (el) prizeRefs.current[index] = el
                }}
                className={`${styles.prizeCard} ${styles[prize.className]} ${isCardVisible[index] ? styles.visible : ''
                  }`}
                data-index={index}
              >
                {prize.className === 'first' && (
                  <div className={styles.ribbon}>
                    <span>🏆 GOLD</span>
                  </div>
                )}

                <div
                  className={styles.cardGradient}
                  style={{ background: prize.gradient }}
                ></div>

                <div className={styles.cardShine}></div>

                <div className={styles.cardContent}>
                  <div className={styles.iconWrapper}>
                    <div className={styles.iconBackground}>
                      <div className={styles.prizeIcon}>{prize.icon}</div>
                      <div
                        className={styles.iconGlow}
                        style={{ boxShadow: `0 0 35px ${prize.glow}` }}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.rankContainer}>
                    <h3 className={styles.prizeRank}>{prize.rank}</h3>
                    <div className={styles.rankDivider}></div>
                  </div>

                  <div className={styles.perksContainer}>
                    <p className={styles.prizePerks}>{prize.perks}</p>
                  </div>

                  <div className={styles.cardCorners}>
                    <div className={`${styles.corner} ${styles.cornerTL}`}></div>
                    <div className={`${styles.corner} ${styles.cornerTR}`}></div>
                    <div className={`${styles.corner} ${styles.cornerBL}`}></div>
                    <div className={`${styles.corner} ${styles.cornerBR}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}

      </div>
    </section>
  )
}