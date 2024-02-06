import React from 'react'
import styles from './CardBien.module.scss'
import Image from '../../assets/images/image_chambre.jpg'
import { Link } from 'react-router-dom'

function CardBien({
  imgUrl,
  prix,
  loaclisation,
  caracteristique,
  title,
  idBien,
  status,
}) {
  return (
    <Link to={`/marli/bien/1234`}>
      <div className={styles.allContainer}>
        <div className={styles.imageContainer}>
          <img src={Image} alt='imag-bien' />
          <div
            style={
              status === 'vendu'
                ? { backgroundColor: 'red' }
                : status === 'sous-compromis'
                  ? { backgroundColor: 'orange' }
                  : null
            }
            className={styles.statusBien}
          >
            {status === 'vendu'
              ? 'bien vendu'
              : status === 'sous-compromis'
                ? 'sous compromis'
                : null}
          </div>
        </div>

        <div className={styles.detailsContainer}>
          <div>
            <h4 className={styles.localisation}>Dakar, Sénégal</h4>
            <p className={styles.titleBien}>A VOS CALCULETTES</p>

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

          <h3 className={styles.prix}>250 000 €</h3>
        </div>
      </div>
    </Link>
  )
}

export default CardBien
