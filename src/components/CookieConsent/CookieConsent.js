import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import styles from './CookieConsent.module.scss'
import { initGA } from '../../utils/analytics'

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(['acceptedCookies'])
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    if (!cookies.acceptedCookies) {
      setShowConsent(true)
    } else {
      initGA()
    }
  }, [cookies.acceptedCookies])

  const handleAccept = () => {
    setCookie('acceptedCookies', true, { path: '/', maxAge: 31536000 })
    setShowConsent(false)
    initGA()
  }

  const handleRefuse = () => {
    setCookie('acceptedCookies', false, { path: '/', maxAge: 31536000 })
    setShowConsent(false)
  }

  if (!showConsent) {
    return null
  }

  return (
    <div className={styles.cookieConsentContainer}>
      <div className={styles.cookieConsent}>
        <p>
          Nous utilisons des cookies pour améliorer votre expérience.
        </p>
        <div>
          <button onClick={handleAccept}>Accepter</button>
          <button onClick={handleRefuse}>Refuser</button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
