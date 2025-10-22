import React from 'react'
import styles from './CardAvisRecherche.module.scss'

function CardAvisRecherche({ urlImage }) {
  return (
    <div className={styles.cardContainer}>
      <img src={urlImage} alt='Avis de recherche' />
    </div>
  )
}

export default CardAvisRecherche
