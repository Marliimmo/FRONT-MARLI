import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'
import Logo from '../../assets/images/marli-logo.png'

function Footer() {
  return (
    <footer className={styles.piedDePage}>
      <div className={styles.haut}>
        <Link to='/' className={styles.marque} aria-label='Marli Immobilier, accueil'>
          <img src={Logo} alt='Logo Marli' />
          <span>Passeur d’histoires immobilières</span>
        </Link>

        <div className={styles.colonnes}>
          <div className={styles.colonne}>
            <span className='etiquette'>Nous joindre</span>
            <a href='tel:+33688740621'>06 88 74 06 21</a>
            <a href='mailto:contact@marli-immobilier.com'>contact@marli-immobilier.com</a>
            <a href='https://maps.app.goo.gl/CDSUa2ktTnv4gJGQ9' target='_blank' rel='noreferrer'>
              7 rue Henri Weil, 25000 Besançon
            </a>
          </div>

          <div className={styles.colonne}>
            <span className='etiquette'>Infos utiles</span>
            <Link to='/honoraires'>Nos honoraires</Link>
            <Link to='/a-propos'>L’agence</Link>
            <Link to='/nous-contacter'>Nous contacter</Link>
            <Link to='/mentions-legales'>Mentions légales</Link>
          </div>

          <div className={styles.colonne}>
            <span className='etiquette'>Nous suivre</span>
            <a href='https://www.facebook.com/marli.immobilier' target='_blank' rel='noreferrer'>
              Facebook
            </a>
            <a href='https://www.linkedin.com/company/marli-immobilier' target='_blank' rel='noreferrer'>
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bas}>
        <span>© {new Date().getFullYear()} Marli Immobilier · Besançon, Doubs, Franche-Comté</span>
        <span>Crédits photo : J. Jacottot · Sylvie Barras</span>
      </div>
    </footer>
  )
}

export default Footer
