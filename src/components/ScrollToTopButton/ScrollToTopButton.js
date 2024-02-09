import React, { useState, useEffect } from 'react'
import styles from './ScrollToTopButton.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Afficher le bouton lorsque l'utilisateur a défilé vers le bas de la page
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div
      onClick={scrollToTop}
      className={isVisible ? styles.scrollTotopshow : styles.scrollToTop}
    >
      <button>
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <p>Haut</p>
    </div>
  )
}

export default ScrollToTopButton
