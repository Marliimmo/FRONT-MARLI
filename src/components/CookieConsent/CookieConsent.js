import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import styles from './CookieConsent.module.scss'
import { initGA } from '../../utils/analytics'

// Le choix est mémorisé un an. La mesure d'audience ne démarre qu'après un « Accepter » explicite.
const estAccepte = (v) => v === true || v === 'true'
const aChoisi = (v) => v === true || v === false || v === 'true' || v === 'false'

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(['acceptedCookies'])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!aChoisi(cookies.acceptedCookies)) {
      setVisible(true)
    } else if (estAccepte(cookies.acceptedCookies)) {
      initGA()
    }
  }, [cookies.acceptedCookies])

  const choisir = (accepte) => {
    setCookie('acceptedCookies', accepte ? 'true' : 'false', { path: '/', maxAge: 31536000 })
    setVisible(false)
    if (accepte) initGA()
  }

  if (!visible) return null

  return (
    <div className={styles.bandeau} role='dialog' aria-label='Cookies'>
      <p>
        Nous utilisons des cookies de mesure d’audience pour améliorer le site.{' '}
        <Link to='/mentions-legales'>En savoir plus</Link>
      </p>
      <div className={styles.boutons}>
        <button type='button' className={styles.accepter} onClick={() => choisir(true)}>
          Accepter
        </button>
        <button type='button' className={styles.refuser} onClick={() => choisir(false)}>
          Refuser
        </button>
      </div>
    </div>
  )
}

export default CookieConsent
