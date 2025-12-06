import React from 'react'
import styles from './CardBien.module.scss'
import { Link } from 'react-router-dom'

function CardBien({
  imgUrl,
  prix,
  localisation,
  title,
  status,
  reference,
}) {
  const imageUrl = imgUrl?.includes('cloudinary.com') || imgUrl?.startsWith('http')
    ? imgUrl
    : `https://marli-backend.onrender.com/bien/images/${imgUrl}`;

  return (
    <Link to={`/bien/${reference}`} className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} loading="lazy" />
        {status === 'vendu' && (
          <div className={styles.soldBadge}>VENDU</div>
        )}
      </div>
      <div className={styles.contentContainer}>
        <h3>{title}</h3>
        <p className={styles.price}>{prix?.toLocaleString()} €</p>
        <p className={styles.location}>{localisation}</p>
      </div>
    </Link>
  )
}

export default CardBien
