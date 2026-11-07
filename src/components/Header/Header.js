import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import Logo from '../../assets/images/marli-logo.png'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LIENS = [
  { to: '/acheter', label: 'Acheter' },
  { to: '/vendre', label: 'Vendre' },
  { to: '/avis-de-recherche', label: 'Avis de recherche' },
  { to: '/actualite', label: 'Actualités' },
  { to: '/a-propos', label: 'L’agence' },
  { to: '/nous-contacter', label: 'Contact' },
]

function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [reduit, setReduit] = useState(false)
  const location = useLocation()

  // L'en-tête s'affine dès qu'on commence à faire défiler la page
  useEffect(() => {
    const surDefilement = () => setReduit(window.scrollY > 40)
    surDefilement()
    window.addEventListener('scroll', surDefilement, { passive: true })
    return () => window.removeEventListener('scroll', surDefilement)
  }, [])

  // Le menu mobile se referme à chaque changement de page
  useEffect(() => {
    setMenuOuvert(false)
  }, [location.pathname])

  // Pas de défilement de la page derrière le menu mobile ouvert
  useEffect(() => {
    document.body.style.overflow = menuOuvert ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOuvert])

  const classeLien = ({ isActive }) =>
    isActive ? `${styles.lien} ${styles.lienActif}` : styles.lien

  return (
    <>
      <header className={`${styles.entete} ${reduit ? styles.reduit : ''}`}>
        <Link to='/' className={styles.marque} aria-label='Marli Immobilier, accueil'>
          <img src={Logo} alt='Logo Marli' />
          <span>
            Passeur d’histoires
            <br />
            immobilières
          </span>
        </Link>

        <nav className={styles.navigation} aria-label='Navigation principale'>
          {LIENS.map((l) => (
            <NavLink key={l.to} to={l.to} className={classeLien}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type='button'
          className={`${styles.burger} ${menuOuvert ? styles.burgerOuvert : ''}`}
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOuvert}
        >
          <span></span>
          <span></span>
        </button>
      </header>

      <div
        className={`${styles.menuMobile} ${menuOuvert ? styles.menuMobileOuvert : ''}`}
        aria-hidden={!menuOuvert}
      >
        <nav aria-label='Navigation mobile'>
          <NavLink to='/' end className={classeLien} tabIndex={menuOuvert ? 0 : -1}>
            Accueil
          </NavLink>
          {LIENS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={classeLien}
              tabIndex={menuOuvert ? 0 : -1}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <a className={styles.telephoneMobile} href='tel:+33688740621' tabIndex={menuOuvert ? 0 : -1}>
          06 88 74 06 21
        </a>
      </div>
    </>
  )
}

export default Header
