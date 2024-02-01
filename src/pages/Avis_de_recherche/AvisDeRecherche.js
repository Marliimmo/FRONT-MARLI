import React from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/united-states-spokane.jpg'
import styles from './AvisDeRecherche.module.scss'

function AvisDeRecherche() {
  return (
    <div className={styles.allContainer}>
      <FirstSectionPage ImgPremierePlan={Image} title='AVIS DE RECHERCHE' />
    </div>
  )
}

export default AvisDeRecherche
