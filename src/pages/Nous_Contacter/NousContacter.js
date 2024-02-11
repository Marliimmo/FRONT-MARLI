import React from 'react'
import styles from './NousContacter.module.scss'
import FormContact from '../../components/FormContact/FormContact'
// import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
// import Image from '../../assets/images/united-states-spokane.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhoneFlip } from '@fortawesome/free-solid-svg-icons'
import WhatsAppIcone from '../../assets/images/whatsapp.svg'

function NousContacter() {
  return (
    <div className={`fadinAnimation ${styles.allContainer}`}>
      {/* <FirstSectionPage ImgPremierePlan={Image} title='Nous contacter' /> */}

      <div className={styles.coodonneeContainer}>
        <div className={styles.coordonnee}>
          <p className={styles.iconeContainer}>
            <FontAwesomeIcon icon={faPhoneFlip} />
          </p>
          <div>
            <h4>Appelez-nous</h4>
            <p>+33 6 51 31 03 81</p>
          </div>
        </div>

        <div className={styles.coordonnee}>
          <p className={styles.iconeContainer}>
            <FontAwesomeIcon icon={faLocationDot} />
          </p>
          <div>
            <h4>Notre localisation</h4>
            <p>2b rue des Jardins, 25 000 Besançon</p>
          </div>
        </div>

        <div className={styles.coordonnee}>
          <p className={styles.iconeContainer}>
            <img src={WhatsAppIcone} alt='whatsapp-icone' />
          </p>
          <div>
            <h4>WhatsApp</h4>
            <p>+33 6 51 31 03 81</p>
          </div>
        </div>
      </div>

      <div className={styles.formContainer}>
        <h3>Envoyez-nous un message</h3>
        <p>Nous serons ravi de vous entendre</p>
        <FormContact />
      </div>
    </div>
  )
}

export default NousContacter
