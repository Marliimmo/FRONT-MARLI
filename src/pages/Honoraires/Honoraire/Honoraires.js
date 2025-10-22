import React from 'react'
import styles from './Honoraires.module.scss'
import { Helmet } from 'react-helmet'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/1.jpg'

function Honoraires() {
  return (
    <>
      <Helmet>
        <title>Marli - Nos Honoraires</title>
        <meta name='description' content="Découvrez nos honoraires TTC calculés sur le prix de vente à la charge du vendeur" />
      </Helmet>
      
      <div className={styles.allContainer}>
        <FirstSectionPage ImgPremierePlan={Image} title='NOS HONORAIRES' />
        
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <h1>NOS HONORAIRES TTC</h1>
            <p className={styles.subtitle}>calculés sur le prix de vente à la charge du vendeur</p>
          </div>
          
          <div className={styles.tableContainer}>
            <div className={styles.row}>
              &lt; 50 000 € : forfait de 5 000 €
            </div>
            
            <div className={styles.row}>
              De 50 001 € à 99 999 € : 9%
            </div>
            
            <div className={styles.row}>
              De 100 000 € à 149 999 € : 8%
            </div>
            
            <div className={styles.row}>
              De 150 000 € à 249 999 € : 7%
            </div>
            
            <div className={styles.row}>
              De 250 000 € à 349 999 € : 6%
            </div>
            
            <div className={styles.row}>
              &gt; 350 000 € : 5%
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Honoraires
