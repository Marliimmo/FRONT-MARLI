import React from 'react'
import styles from './CardBien.module.scss'
import { Link } from 'react-router-dom'

function CardBien({
  imgUrl,
  prix,
  localisation,
  caracteristique,
  title,
  status,
  reference,
}) {
  const imageUrl = imgUrl?.includes('cloudinary.com') || imgUrl?.startsWith('http')
    ? imgUrl
    : `https://marli-backend.onrender.com/bien/images/${imgUrl}`;

  const caracteristiques = caracteristique?.split('#').filter(c => c.trim() !== '');

  return (
    <Link to={`/bien/${reference}`} className={styles.allContainer}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} loading="lazy" />
        {status === 'vendu' && (
          <div className={styles.statusBienVendu}>VENDU</div>
        )}
        {status === 'sous-compromis' && (
          <div className={styles.statusSousCompromis}>SOUS COMPROMIS</div>
        )}
      </div>
      <div className={styles.detailsContainer}>
        <p className={styles.titleBien}>{title}</p>
        <p className={styles.prix}>{prix?.toLocaleString()} €</p>
        <p className={styles.localisation}>{localisation}</p>
        <div className={styles.partialCarteristique}>
          {caracteristiques?.slice(0, 3).map((car, index) => (
            <div key={index} className={styles.oneCaractq}>
              <p></p>
              <p>{car}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default CardBien
