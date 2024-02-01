import React from 'react'
import styles from './FirstSectionPage.module.scss'

function FirstSectionPage({ ImgPremierePlan, title, description }) {
  return (
    <div className={`fadinAnimation ${styles.allContainer}`}>
      <img
        className={styles.ImgPremierePlan}
        src={ImgPremierePlan}
        alt='img-premierePlan'
      />
      <div className={styles.opacityBlack}></div>
      <div className={styles.TextContent}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default FirstSectionPage
