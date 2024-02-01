import React from 'react'
import styles from './CardSlider.module.scss'
import ImageBien from '../../assets/images/immobilier.png'

function CardSlider({ image, price, partialInfo }) {
  return (
    <>
      <div className={styles.allContainer}>
        <div className={styles.imageEprixContainer}>
          <img src={ImageBien} alt='imag-bien' />
          <h2 className={styles.prixBien}>3 000 000 €</h2>
        </div>

        <div className={styles.partialInfoBien}>
          <h2>Paris, France</h2>
          <div className={styles.partialCarteristique}>
            <div className={styles.oneCaractq}>
              <p></p>
              <p>Immeuble</p>
            </div>
            <div className={styles.oneCaractq}>
              <p></p>
              <p>Immeuble</p>
            </div>
            <div className={styles.oneCaractq}>
              <p></p>
              <p>Immeuble</p>
            </div>
            <div className={styles.oneCaractq}>
              <p></p>
              <p>Immeuble</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardSlider
