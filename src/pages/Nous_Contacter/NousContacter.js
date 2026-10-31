import React from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './NousContacter.module.scss'
import Image from '../../assets/images/jacottot/fond-contact.jpg' // photo : Jean-Claude Jacottot
import BandeauPage from '../../components/Refonte/BandeauPage'
import FormContact from '../../components/FormContact/FormContact'

const COORDONNEES = [
  { etiquette: 'Appelez-nous', valeur: '06 88 74 06 21', lien: 'tel:+33688740621' },
  { etiquette: 'Écrivez-nous', valeur: 'contact@marli-immobilier.com', lien: 'mailto:contact@marli-immobilier.com' },
  {
    etiquette: 'Rencontrons-nous',
    valeur: '7 rue Henri Weil, 25000 Besançon',
    lien: 'https://maps.app.goo.gl/CDSUa2ktTnv4gJGQ9',
    externe: true,
  },
]

function NousContacter() {
  return (
    <>
      <Helmet>
        <title>Contacter Marli Immobilier à Besançon - Estimation et conseil offerts</title>
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://marli-immobilier.com/nous-contacter' />
        <meta
          name='description'
          content='Contactez Marli Immobilier à Besançon pour une estimation offerte ou un conseil personnalisé. Agence indépendante dans le Doubs, la Haute-Saône et le Jura, joignable 7 jours sur 7.'
        />
      </Helmet>

      <BandeauPage
        photo={Image}
        alt='Un grand bâtiment des quais de Besançon à la tombée du jour'
        etiquette='Contact'
        titre='Parlons de votre projet'
        accroche='Joignable 7 jours sur 7.'
      />

      <section className={styles.coordonnees}>
        {COORDONNEES.map((c) => (
          <a
            key={c.etiquette}
            href={c.lien}
            className={styles.coordonnee}
            {...(c.externe ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            <span className='etiquette'>{c.etiquette}</span>
            <span className={styles.valeur}>{c.valeur}</span>
          </a>
        ))}
      </section>

      <section className={styles.formulaire}>
        <div className={styles.formulaireCadre}>
          <span className='etiquette'>Écrivez-nous</span>
          <h2 className='titre-grand'>Dites-nous tout</h2>
          <p className={styles.formulaireTexte}>Nous vous répondons rapidement.</p>
          <FormContact />
        </div>
      </section>
    </>
  )
}

export default NousContacter
