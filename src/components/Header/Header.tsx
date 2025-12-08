'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handleNavClick = (href: string) => {
    closeMobileMenu()
    
    // Smooth scroll to section
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false)
      }
    }
    
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      window.addEventListener('resize', handleResize)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#tracks', label: 'Tracks' },
    { href: '#timeline', label: 'Schedule' },
    { href: '#event', label: 'Events' },
  
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <>
      {mobileMenuOpen && (
        <div 
          className={styles.overlay} 
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
      
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <a 
            href="#home" 
            className={styles.logoLink}
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#home')
            }}
            aria-label="DevSprint Home"
          >
            <Image
              src="/assets/images/DevSprint.png"
              alt="DevSprint Logo"
              width={200}
              height={50}
              className={styles.logoImage}
              priority
            />
          </a>
          
          <nav 
            className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}
            id="mobile-navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#register" 
              className={styles.ctaButton}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#register')
              }}
            >
              Register Now
            </a>
          </nav>
          
          <button 
            className={`${styles.menuToggle} ${mobileMenuOpen ? styles.menuToggleOpen : ''}`}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  )
}