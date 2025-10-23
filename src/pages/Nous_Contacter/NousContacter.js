import React from 'react'
import styles from './NousContacter.module.scss'
import FormContact from '../../components/FormContact/FormContact'
// import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
// import Image from '../../assets/images/united-states-spokane.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faLocationDot,
  faPhoneFlip,
} from '@fortawesome/free-solid-svg-icons'
// import WhatsAppIcone from '../../assets/images/whatsapp.svg'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

function NousContacter() {
  return (
    <>
      <Helmet>
        <title>Marli - Contact</title>
        <meta name='robots' content='noindex' />
        {/* <meta name="robots" content="index, follow" /> */}
        <meta name='description' content="Passeur d'histoires immobilières" />
      </Helmet>
      <div className={`fadinAnimation ${styles.allContainer}`}>
        {/* <FirstSectionPage ImgPremierePlan={Image} title='Nous contacter' /> */}

        <div className={styles.coodonneeContainer}>
          <div className={styles.coordonnee}>
            <Link to='tel:+33688740621'>
              <p className={styles.iconeContainer}>
                <FontAwesomeIcon icon={faPhoneFlip} />
              </p>
            </Link>
            <Link to='tel:+33688740621'>
              <div>
                <h4>Appelez-nous</h4>
                {/* <p>+33 6 88 74 06 21</p> */}
                <p>06 88 74 06 21</p>
              </div>
            </Link>
          </div>

          <div className={styles.coordonnee}>
            <Link
              to='https://maps.app.goo.gl/CDSUa2ktTnv4gJGQ9'
              target='_blank'
            >
              <p className={styles.iconeContainer}>
                <FontAwesomeIcon icon={faLocationDot} />
              </p>
            </Link>
            <Link
              to='https://maps.app.goo.gl/CDSUa2ktTnv4gJGQ9'
              target='_blank'
            >
              <div>
                {/* <h4>Pour boire un café</h4> */}
                <h4>Notre adresse</h4>
                <p>7 rue Henri Weil, 25000 Besançon</p>
              </div>
            </Link>
          </div>

          <div className={styles.coordonnee}>
            {/* <Link to='https://wa.me/33688740621' target='_blank'>
              <p className={styles.iconeContainer}>
                <img src={WhatsAppIcone} alt='whatsapp-icone' />
              </p>
            </Link>
            <Link to='https://wa.me/33688740621' target='_blank'>
              <div>
                <h4>WhatsApp</h4>
                <p>+33 6 88 74 06 21</p>
              </div>
            </Link> */}

            <Link to='mailto:contact@marli-immobilier.com'>
              <p className={styles.iconeContainer}>
                <FontAwesomeIcon icon={faEnvelope} />
              </p>
            </Link>
            <Link to='mailto:contact@marli-immobilier.com'>
              <div>
                <h4>E-mail</h4>
                <p>contact@marli.immobilier.com</p>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h3>Dites nous tout</h3>
          <p>Nous vous reviendrons rapidement</p>
          <FormContact />
        </div>
      </div>
    </>
  )
}

export default NousContacter
