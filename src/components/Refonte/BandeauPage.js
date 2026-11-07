import React from 'react'
import styles from './BandeauPage.module.scss'

// Bandeau d'ouverture des pages de l'agence : photo en noir et blanc, titre en bas à gauche
function BandeauPage({ photo, alt = '', etiquette, titre, accroche, positionPhoto = '50% 50%' }) {
  return (
    <section className={styles.bandeau}>
      <img className={styles.photo} src={photo} alt={alt} style={{ objectPosition: positionPhoto }} />
      <div className={styles.texte}>
        {etiquette && <span className='etiquette'>{etiquette}</span>}
        <h1>{titre}</h1>
        {accroche && <p>{accroche}</p>}
      </div>
    </section>
  )
}

export default BandeauPage
