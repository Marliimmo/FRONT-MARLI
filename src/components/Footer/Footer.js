import {
  faEnvelope,
  faLocationDot,
  faMobileScreen,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'
import Logo from '../../assets/images/marli-logo.png'
import FacebookIcon from '../../assets/images/facebook-f.svg'
import LinkedInIcon from '../../assets/images/linkedin-in.svg'

function Footer() {
  return (
    <>
      <div className={styles.allContainer}>
        <div className={styles.LogoContainer}>
          <img src={Logo} alt='logo-marli' />
          <p>PASSEUR D'HISTOIRES IMMOBILIERES</p>
        </div>

        <div className={styles.FooterLinkContainer}>
          <div className={styles.widgetFooter1}>
            <h2>Nos coordonnées</h2>
            <div className={styles.LinkText}>
              <div>
                <FontAwesomeIcon icon={faLocationDot} />
                <p>2b rue des Jardins, 25 000 Besançon</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faMobileScreen} />
                <p>
                  <Link to='tel:+33 6 51 31 03 81'>+33 6 51 31 03 81</Link>
                </p>
              </div>
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
                <p>
                  <Link to='mailto:marli.immobilier@gmail.com'>
                    marli.immobilier@gmail.com
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.widgetFooter2}>
            <h2>Infos utiles</h2>
            <div className={styles.LinkText}>
              <p>
                <Link to='#'>Nos honoraires</Link>
              </p>
              <p>
                <Link to='/marli/nous-contacter'>Nous contacter</Link>
              </p>
              <p>
                <Link to='/marli/mentions-legales'>Mentions légales</Link>
              </p>
            </div>
          </div>

          <div className={styles.widgetFooter3}>
            <h2>Nos réseaux</h2>
            <div className={styles.LinkText}>
              <Link to='https://www.facebook.com/marli.immobilier'>
                <img src={FacebookIcon} alt='icon-facebook' />
              </Link>
              <Link to='https://www.linkedin.com/company/marli-immobilier'>
                <img src={LinkedInIcon} alt='icone-linkedin' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
