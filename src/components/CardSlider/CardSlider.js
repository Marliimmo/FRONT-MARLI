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
  isHomePage,
}) {
  return (
    <Link className={styles.linkCard} to={`/bien/${reference}`}>
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
              ? 'vendu'
              : status === 'sous-compromis'
                ? 'sous compromis'
                : `${price.toLocaleString('fr-FR')} €`}
          </h2>
        </div>

        <div className={styles.partialInfoBien}>
          <h2>{localisation}</h2>
          {isHomePage !== true && (
            <div className={styles.partialCarteristique}>
              {caracteristiques.split('#').map(
                (value, index) =>
                  index <= 3 && (
                    <div className={styles.oneCaractq}>
                      <p></p>
                      <p>{value}</p>
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CardSlider
