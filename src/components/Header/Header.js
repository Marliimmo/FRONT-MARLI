import React from 'react';
import styles from './Header.module.scss';
import Logo from '../../assets/images/marli-logo.png';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <>
        <div className={styles.allContainer}>
            <Link to="/marli/">
                <div className={styles.LogoContainer}>
                    <p><img src={Logo} alt="Logo Marli" /></p>
                    <p>PASSEUR D'HISTOIRES <br />IMMOBILIERES</p>
                </div>
            </Link>

            <div className={styles.LinkContainer}>
                <NavLink className={({ isActive }) => (isActive ? `link_active` : 'link_menu')} to="/marli/">
                    Accueil
                    <p></p>
                </NavLink>

                <NavLink className={({ isActive }) => (isActive ? `link_active` : 'link_menu')} to="/marli/acheter">
                    Acheter
                    <p></p>
                </NavLink>

                <NavLink className={({ isActive }) => (isActive ? `link_active` : 'link_menu')} to="/marli/vendre">
                    Vendre
                    <p></p>
                </NavLink>

                <NavLink className={({ isActive }) => (isActive ? `link_active` : 'link_menu')} to="/marli/avis-de-recherche">
                    Avis de recherche
                    <p></p>
                </NavLink>

                <div>
                    <Link to="tel:+33651310381">
                        <div className={styles.TelButton}>
                            <FontAwesomeIcon icon={faMobileScreen}/>
                            <p>+33 6 51 31 03 81</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header