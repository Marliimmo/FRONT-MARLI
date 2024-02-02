import React, { useState } from 'react'
import styles from './Header.module.scss'
import Logo from '../../assets/images/marli-logo.png'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHollyBerry } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const [sousMenu, setSousMenu] = useState(false)

  const displaySousMenu = () => {
    setSousMenu(!sousMenu)
  }

  return (
    <>
      <div className={styles.allContainer}>
        <Link to='/marli/'>
          <div className={styles.LogoContainer}>
            <p>
              <img src={Logo} alt='Logo Marli' />
            </p>
            <p>
              PASSEUR D'HISTOIRES <br />
              IMMOBILIERES
            </p>
          </div>
        </Link>

        <div className={styles.LinkContainer}>
          <div className={styles.TextLink}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `link_active` : 'link_menu'
              }
              to='/marli/'
            >
              Accueil
              <p></p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `link_active` : 'link_menu'
              }
              to='/marli/acheter'
            >
              Acheter
              <p></p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `link_active` : 'link_menu'
              }
              to='/marli/vendre'
            >
              Vendre
              <p></p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `link_active` : 'link_menu'
              }
              to='/marli/avis-de-recherche'
            >
              Avis de recherche
              <p></p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `link_active` : 'link_menu'
              }
              to='/marli/nous-contacter'
            >
              Nous contacter
              <p></p>
            </NavLink>
          </div>

          <div className={styles.iconApropos}>
            <Link>
              <FontAwesomeIcon icon={faHollyBerry} />
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
            to='/marli/'
          >
            Accueil
            <p></p>
          </NavLink>

          <NavLink
            onClick={displaySousMenu}
            className={({ isActive }) =>
              isActive ? `link_active_mobile` : 'link_menu_mobile'
            }
            to='/marli/acheter'
          >
            Acheter
            <p></p>
          </NavLink>

          <NavLink
            onClick={displaySousMenu}
            className={({ isActive }) =>
              isActive ? `link_active_mobile` : 'link_menu_mobile'
            }
            to='/marli/vendre'
          >
            Vendre
            <p></p>
          </NavLink>

          <NavLink
            onClick={displaySousMenu}
            className={({ isActive }) =>
              isActive ? `link_active_mobile` : 'link_menu_mobile'
            }
            to='/marli/avis-de-recherche'
          >
            Avis de recherche
            <p></p>
          </NavLink>

          <NavLink
            onClick={displaySousMenu}
            className={({ isActive }) =>
              isActive ? `link_active_mobile` : 'link_menu_mobile'
            }
            to='/marli/nous-contacter'
          >
            Nous contacter
            <p></p>
          </NavLink>
        </div>
      )}
    </>
  )
}

export default Header
