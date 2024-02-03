import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import styles from './CardAvis.module.scss'

function CardAvis({ avis }) {
  const [fullContent, setFullContent] = useState(false)
  return (
    <>
      <div className={styles.allContainer}>
        <div className={styles.imgContainer}>
          <div>{avis && avis.urlImg && <img src='' alt='img-user' />}</div>
        </div>

        <div className={styles.textContainer}>
          <h3>Aboubacar C.</h3>
          <p
            onClick={() => setFullContent(!fullContent)}
            style={
              fullContent ? { height: 'fit-content' } : { height: '130px' }
            }
          >
            J’ai vendu mon appartement avec l’aide de Marli immobilier. Tout
            c’est très bien passé. Je vous recommande de vendre votre bien avec
            Marli. Merci pour tout. J’ai vendu mon appartement avec l’aide de
            Marli immobilier. Tout c’est très bien passé. Je vous recommande de
            vendre votre bien avec Marli. Merci pour tout.
          </p>

          <div className={styles.starContent}>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CardAvis
