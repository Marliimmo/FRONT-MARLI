import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import styles from './CookieConsent.module.scss'

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(['acceptedCookies'])
  const [showConsent, setShowConsent] = useState(!cookies.acceptedCookies)

  const handleAccept = () => {
    setCookie('acceptedCookies', true, { path: '/' })
    setShowConsent(false)
  }

  if (!showConsent) {
    return null
  }

  return (
    <div className={styles.cookieConsentContainer}>
      <div className={styles.cookieConsent}>
        <p>
          Nous utilisons des cookies pour améliorer votre expérience
          d'utilisateur. En utilisant notre site web, vous acceptez notre
          utilisation des cookies.
        </p>
        <div>
          <button onClick={handleAccept}>Accepter</button>
          <button
            style={{ backgroundColor: 'red' }}
            onClick={() => setShowConsent(false)}
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
