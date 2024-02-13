import React from 'react'
import styles from './Honoraires.module.scss'
import { Helmet } from 'react-helmet'

function Honoraires() {
  return (
    <>
      <Helmet>
        <title>Marli - Nos honoraires</title>
        <meta name='robots' content='noindex' />
        {/* <meta name="robots" content="index, follow" /> */}
        <meta name='description' content="Passeur d'histoires immobilières" />
      </Helmet>
      <div className={`fadinAnimation ${styles.allContainer}`}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h2>NOS HONORAIRES TTC</h2>
            <p>calculés sur le prix de vente à la charge du vendeur</p>
          </div>

          <div className={styles.tarif}>
            <p>&lt; 50000 € : forfait de 5000 €</p>
            <p>De 50 001 € à 99 999 € : 9%</p>
            <p>De 100 000 € à 149 999 € : 8%</p>
            <p>De 150 000 € à 249 999 € : 7%</p>
            <p>&gt; 350 000 € : 5%</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Honoraires
