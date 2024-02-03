import React, { useRef } from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/united-states-spokane.jpg'
import styles from './Vendre.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import CardSlider from '../../components/CardSlider/CardSlider'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import FormVendreOuRecherche from '../../components/FormVendreOuRecherche/FormVendreOuRecherche'

function Vendre() {
  const sliderRef = useRef(null)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }
  return (
    <div>
      <FirstSectionPage
        ImgPremierePlan={Image}
        title='VENDRE / ESTIMER UN BIEN'
        description='Maximisez  la valeur de votre bien avec notre équipe de professionnels.'
      />

      <div className={styles.chekedContainer}>
        <h3>Chaque bien est unique</h3>
        <div className={styles.ListeCheckContainer}>
          <div>
            <FontAwesomeIcon icon={faCheckCircle} />
            <p>
              Sa valeur dépend de son année de construction, son standing, son
              état général et son environnement visuel et sonore.
            </p>
          </div>

          <div>
            <FontAwesomeIcon icon={faCheckCircle} />
            <p>
              Notre évaluation immobilière prend en compte l’ensemble des
              caractéristiques de votre bâtiment pour en pondérer la valeur.
            </p>
          </div>

          <div>
            <FontAwesomeIcon icon={faCheckCircle} />
            <p>
              Notre estimation prend également en compte sa rareté, son
              positionnement par rapport à des biens similaires, enfin du marché
              local.
            </p>
          </div>

          <div>
            <FontAwesomeIcon icon={faCheckCircle} />
            <p>Plus notre petit doigt…</p>
          </div>
        </div>
      </div>

      <div className={styles.formContainer}>
        <h3>Parlez nous de votre bien</h3>
        <FormVendreOuRecherche context='vendre' />
      </div>

      <div className={styles.BienVenduContainer}>
        <h3>Nos biens vendus</h3>
        <Slider ref={sliderRef} {...settings}>
          <CardSlider status='vendu' />
          <CardSlider status='vendu' />
          <CardSlider status='vendu' />
          <CardSlider status='vendu' />
        </Slider>
      </div>
    </div>
  )
}

export default Vendre
