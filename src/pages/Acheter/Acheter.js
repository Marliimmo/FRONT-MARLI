import React, { useState } from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/united-states-spokane.jpg'
import { Link } from 'react-router-dom'
import styles from './Acheter.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronUp,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import CardBien from '../../components/CardBien/CardBien'

function Acheter() {
  const [showFiltre, setShowFiltre] = useState(false)
  const handleKeyDown = (event) => {
    const keyCode = event.keyCode || event.which
    if (
      (keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      [8, 9, 13, 27, 37, 39, 46].includes(keyCode)
    ) {
      return true
    }

    event.preventDefault()
    return false
  }

  return (
    <div>
      <FirstSectionPage
        ImgPremierePlan={Image}
        title='Acheter un bien'
        description='Votre havre de paix vous attend dans cette élégante maison, prête à devenir vôtre.'
      />

      <div className={styles.BienContainer}>
        <div
          className={styles.showFiltre}
          onClick={() => setShowFiltre(!showFiltre)}
        >
          <p>Filtrer les biens par catégories</p>
          {showFiltre ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </div>

        <div
          style={showFiltre ? { display: 'flex' } : {}}
          className={styles.filtreContainer}
        >
          <select>
            <option value='appartement'>Appartement</option>
            <option value='immeuble'>Immeuble</option>
            <option value='maison'>Maison</option>
          </select>

          <input
            onKeyDown={handleKeyDown}
            min={1}
            type='number'
            placeholder='Budgets max (€)'
          />

          <input type='text' placeholder='Localisation' />

          <input
            min={1}
            onKeyDown={handleKeyDown}
            type='number'
            placeholder='Superficie (m²)'
          />

          <div className={styles.btnSearchContainer}>
            <span>Appliquer le filtre</span>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>

        <div className={styles.ListeDBien}>
          <CardBien status='vendu' />
          <CardBien />
          <CardBien status='sous-compromis' />
          <CardBien />
          <CardBien />
        </div>

        <div className={styles.showMoreBtn}>
          <button>Voir plus</button>
        </div>
      </div>

      <div className={styles.investerSection}>
        <div>
          <h2>INVESTIR DANS L’IMMOBILIER</h2>
          <ul>
            <li>Accompagnement, étude de rentabilité.</li>
            <li>Recherche de biens en France et au Sénégal.</li>
            <li>
              Sénégal, destination soleil durant toute l’année, pour vous
              dénicher le bien qui correspond à vos attentes.
            </li>
          </ul>
          <Link to='/marli/nous-contacter'>Nous contacter</Link>
        </div>
      </div>
    </div>
  )
}

export default Acheter
