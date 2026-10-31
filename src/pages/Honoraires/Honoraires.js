import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './Honoraires.module.scss'

// Barème des honoraires TTC (ne modifier qu'en cas de changement de tarif)
const TARIFS = [
  { tranche: 'Moins de 50 000 €', tarif: 'Forfait de 5 000 €' },
  { tranche: 'De 50 001 € à 99 999 €', tarif: '9 %' },
  { tranche: 'De 100 000 € à 149 999 €', tarif: '8 %' },
  { tranche: 'De 150 000 € à 249 999 €', tarif: '7 %' },
  { tranche: 'De 250 000 € à 349 999 €', tarif: '6 %' },
  { tranche: 'À partir de 350 000 €', tarif: '5 %' },
]

function Honoraires() {
  return (
    <>
      <Helmet>
        <title>Honoraires agence immobilière Besançon - Barème Marli Immobilier</title>
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://marli-immobilier.com/honoraires' />
        <meta
          name='description'
          content='Le barème des honoraires de Marli Immobilier à Besançon : des tarifs clairs pour la vente de votre bien dans le Doubs, la Haute-Saône et le Jura.'
        />
      </Helmet>

      <section className={styles.page}>
        <div className={styles.entete}>
          <span className='etiquette'>Transparence</span>
          <h1 className='titre-grand'>Nos honoraires</h1>
          <p>Honoraires TTC, calculés sur le prix de vente.</p>
        </div>

        <table className={styles.bareme}>
          <caption className={styles.legende}>Barème des honoraires de transaction</caption>
          <thead>
            <tr>
              <th scope='col'>Prix de vente</th>
              <th scope='col'>Honoraires TTC</th>
            </tr>
          </thead>
          <tbody>
            {TARIFS.map((t) => (
              <tr key={t.tranche}>
                <td>{t.tranche}</td>
                <td>{t.tarif}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.precisions}>
          <p>
            Selon le mandat, les honoraires sont à la charge du vendeur ou de l’acquéreur. La répartition est
            précisée dans chaque annonce.
          </p>
          <p>
            Lorsqu’ils sont à la charge de l’acquéreur, l’annonce indique le prix hors honoraires et le montant des
            honoraires en pourcentage.
          </p>
        </div>

        <div className={styles.fin}>
          <p>Une question sur nos honoraires ou sur l’estimation de votre bien ?</p>
          <Link to='/nous-contacter' className='bouton-contour'>
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  )
}

export default Honoraires
