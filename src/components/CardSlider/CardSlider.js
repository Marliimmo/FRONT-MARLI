import React from 'react'
import styles from './CardSlider.module.scss'
import { Link } from 'react-router-dom'
import { imageUrl } from '../../utils/images'

function CardSlider({
  image,
  price,
  localisation,
  caracteristiques,
  status,
  reference,
  isHomePage,
}) {
  const src = imageUrl(image, 800)

  return (
    <Link className={styles.linkCard} to={`/bien/${reference}`}>
      <div
        className={`${status === 'vendu' ? styles.statusBienVendu : status === 'sous-compromis' ? styles.statusSousCompromis : null} ${styles.allContainer}`}
      >
        <div className={styles.imageEprixContainer}>
          <img
            src={src}
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
                    <div className={styles.oneCaractq} key={index}>
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
