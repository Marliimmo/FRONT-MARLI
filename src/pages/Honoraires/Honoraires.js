import React from 'react'
import styles from './Honoraires.module.scss'

const Honoraires = () => {
  const tarifs = [
    { range: '< 50 000 €', tarif: 'forfait de 5 000 €' },
    { range: 'De 50 001 € à 99 999 €', tarif: '9%' },
    { range: 'De 100 000 € à 149 999 €', tarif: '8%' },
    { range: 'De 150 000 € à 249 999 €', tarif: '7%' },
    { range: 'De 250 000 € à 349 999 €', tarif: '6%' },
    { range: '> 350 000 €', tarif: '5%' }
  ]

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>NOS HONORAIRES TTC</h1>
          <p className={styles.subtitle}>
            calculés sur le prix de vente à la charge du vendeur
          </p>
        </div>
        
        <div className={styles.tableContent}>
          {tarifs.map((item, index) => (
            <div key={index} className={styles.row}>
              {item.range} : {item.tarif}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Honoraires