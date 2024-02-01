import React from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/united-states-spokane.jpg'
import { Link } from 'react-router-dom'
import styles from './Acheter.module.scss'

function Acheter() {
  return (
    <div>
      <FirstSectionPage
        ImgPremierePlan={Image}
        title='Acheter un bien'
        description='Votre havre de paix vous attend dans cette élégante maison, prête à devenir vôtre.'
      />

      <div className={styles.investerSection}>
        <h2>INVESTIR DANS L’IMMOBILIER</h2>
        <ul>
          <li>Accompagnement, étude de rentabilité.</li>
          <li>Recherche de biens en France et au Sénégal.</li>
          <li>
            Sénégal, destination soleil durant toute l’année, pour vous dénicher
            le bien qui correspond à vos attentes.
          </li>
        </ul>
        <Link to='nous-contacter'>Nous contacter</Link>
      </div>
    </div>
  )
}

export default Acheter
