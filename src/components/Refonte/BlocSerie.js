import React from 'react'
import CarteBien, { soigner } from './CarteBien'
import { fourchettePrix } from './series'
import styles from './BlocSerie.module.scss'

// Une série présentée comme les chapitres d'un livre : un en-tête, puis une carte par bien.
// « refCourante » : sur la page d'un bien, signale le bien que l'on est en train de lire.
function BlocSerie({ serie, refCourante = null, titreSection = null }) {
  const n = serie.chapitres.length
  const fourchette = fourchettePrix(serie.chapitres)
  return (
    <div className={styles.serie}>
      <div className={styles.entete}>
        <span className='etiquette'>{titreSection || soigner(serie.chapitres[0].localisation)}</span>
        <h2>{serie.titre}</h2>
        <p className={styles.sousTitre}>
          Une série de {n} biens{fourchette ? `, ${fourchette}` : ''}
        </p>
        <p className={styles.invitation}>Chaque bien a sa propre histoire : choisissez votre chapitre.</p>
      </div>
      <div className={styles.grille} style={{ '--colonnes': Math.min(n, 3) }}>
        {serie.chapitres.map((c) => (
          <div key={c.ref} className={c.ref === refCourante ? styles.courant : undefined}>
            {c.ref === refCourante && <span className={styles.numero}>Vous êtes ici</span>}
            <CarteBien bien={c} hauteurPhoto={n > 2 ? 380 : 460} largeurImage={900} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlocSerie
