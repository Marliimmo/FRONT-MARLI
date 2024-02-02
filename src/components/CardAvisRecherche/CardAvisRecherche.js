import React from 'react'
import styles from './CardAvisRecherche.module.scss'

function CardAvisRecherche({ urlImage }) {
  return (
    <div className={styles.allContainer}>
      <img src={urlImage} alt='imag-avis-seach' />
    </div>
  )
}

export default CardAvisRecherche
