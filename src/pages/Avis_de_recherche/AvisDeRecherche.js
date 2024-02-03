import React from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/united-states-spokane.jpg'
import styles from './AvisDeRecherche.module.scss'
import FormVendreOuRecherche from '../../components/FormVendreOuRecherche/FormVendreOuRecherche'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'react-router-dom'
import CardAvisRecherche from '../../components/CardAvisRecherche/CardAvisRecherche'
import ImageAvisSearch from '../../assets/images/Avis-de-recherche-3-1423x1080-1.jpg'

function AvisDeRecherche() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
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
          slidesToShow: 2,
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
    <div className={styles.allContainer}>
      <FirstSectionPage ImgPremierePlan={Image} title='AVIS DE RECHERCHE' />

      <div className={styles.AvisDrechercheContainer}>
        <h3>Nos clients cherchent</h3>

        <Slider {...settings}>
          <CardAvisRecherche urlImage={ImageAvisSearch} />
          <CardAvisRecherche urlImage={ImageAvisSearch} />
          <CardAvisRecherche urlImage={ImageAvisSearch} />
          <CardAvisRecherche urlImage={ImageAvisSearch} />
          <CardAvisRecherche urlImage={ImageAvisSearch} />
        </Slider>

        <p>Vous détenez l’un de ces biens ? N’hésitez à nous contacter</p>
        <Link to='/marli/nous-contacter'>
          <button>Nous contacter</button>
        </Link>
      </div>

      <div className={styles.formContainer}>
        <h3>Décrivez nous votre recherche</h3>
        <FormVendreOuRecherche context='avis' />
      </div>
    </div>
  )
}

export default AvisDeRecherche
