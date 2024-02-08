import React from 'react'
import styles from './CardSlider.module.scss'
import { Link } from 'react-router-dom'

function CardSlider({
  image,
  price,
  localisation,
  caracteristiques,
  status,
  reference,
}) {
  return (
    <Link to={`/marli/bien/${reference}`}>
      <div
        className={`${status === 'vendu' ? styles.statusBienVendu : status === 'sous-compromis' ? styles.statusSousCompromis : null} ${styles.allContainer}`}
      >
        <div className={styles.imageEprixContainer}>
          <img
            src={`${process.env.REACT_APP_URL_BASE_IMAGE}${image}`}
            alt='imag-bien'
          />
          <h2 className={styles.prixBien}>
            {status === 'vendu'
              ? 'bien vendu'
              : status === 'sous-compromis'
                ? 'sous compromis'
                : `${price.toLocaleString('fr-FR')} €`}
          </h2>
        </div>

        <div className={styles.partialInfoBien}>
          <h2>{localisation}</h2>
          <div className={styles.partialCarteristique}>
            {caracteristiques.split('#').map((value) => (
              <div className={styles.oneCaractq}>
                <p></p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardSlider
