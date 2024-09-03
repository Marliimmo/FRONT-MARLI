import React, { useState } from 'react'
import styles from './Header.module.scss'
import Logo from '../../assets/images/marli-logo.png'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const [sousMenu, setSousMenu] = useState(false)

  const displaySousMenu = () => {
    setSousMenu(!sousMenu)
  }

  return (
    <>
      <div className={styles.allContainer}>
        <Link to='/'>
          <div className={styles.LogoContainer}>
            <p>
              <img src={Logo} alt='Logo Marli' />
            </p>
            <p className={styles.slogan}>
              Passeur d'histoires <br /> immobilières
            </p>
          </div>
        </Link>

        <div className={styles.LinkContainer}>
          <div className={styles.TextLink}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `link_active` : 'link_menu'
              }
              to='/'
            >
              Accueil
              <p></p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `link_active` : 'link_menu'
              }
              to='/acheter'
            >
              Acheter
              <p></p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `link_active` : 'link_menu'
              }
              to='/vendre'
            >
              Vendre
              <p></p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `link_active` : 'link_menu'
              }
              to='/avis-de-recherche'
            >
              Avis de recherche
              <p></p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `link_active` : 'link_menu'
              }
              to='/nous-contacter'
            >
              Contact
              <p></p>
            </NavLink>
          </div>

          <div className={styles.iconApropos}>
            <Link to='/a-propos'>
              <FontAwesomeIcon icon={faInfoCircle} />
            </Link>
          </div>

          <div onClick={displaySousMenu} className={styles.menuBurger}>
            <p
              className={
                sousMenu
                  ? `${styles.animationBarTop}`
                  : sousMenu === false
                    ? `${styles.BarTopSetAnim}`
                    : ''
              }
            ></p>
            <p
              className={
                sousMenu
                  ? `${styles.animationBarBottom}`
                  : sousMenu === false
                    ? `${styles.BarBottomSetAnim}`
                    : ''
              }
            ></p>
          </div>

          {/* <div>
                    <Link to="tel:+33651310381">
                        <div className={styles.TelButton}>
                            <FontAwesomeIcon icon={faMobileScreen}/>
                            <p>+33 6 51 31 03 81</p>
                        </div>
                    </Link>
                </div> */}
        </div>
      </div>

      {sousMenu && (
        <div className={styles.MenuMobile}>
          <NavLink
            onClick={displaySousMenu}
            className={({ isActive }) =>
              isActive ? `link_active_mobile` : 'link_menu_mobile'
            }
            to='/'
          >
            Accueil
            <p></p>
          </NavLink>

          <NavLink
            onClick={displaySousMenu}
            className={({ isActive }) =>
              isActive ? `link_active_mobile` : 'link_menu_mobile'
            }
            to='/acheter'
          >
            Acheter
            <p></p>
          </NavLink>

          <NavLink
            onClick={displaySousMenu}
            className={({ isActive }) =>
              isActive ? `link_active_mobile` : 'link_menu_mobile'
            }
            to='/vendre'
          >
            Vendre
            <p></p>
          </NavLink>

          <NavLink
            onClick={displaySousMenu}
            className={({ isActive }) =>
              isActive ? `link_active_mobile` : 'link_menu_mobile'
            }
            to='/avis-de-recherche'
          >
            Avis de recherche
            <p></p>
          </NavLink>

          <NavLink
            onClick={displaySousMenu}
            className={({ isActive }) =>
              isActive ? `link_active_mobile` : 'link_menu_mobile'
            }
            to='/nous-contacter'
          >
            Contact
            <p></p>
          </NavLink>
        </div>
      )}
    </>
  )
}

export default Header
