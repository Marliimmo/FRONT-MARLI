
import React, { useEffect, useState } from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/1.jpg'
import styles from './AvisDeRecherche.module.scss'
import FormVendreOuRecherche from '../../components/FormVendreOuRecherche/FormVendreOuRecherche'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'react-router-dom'
import CardAvisRecherche from '../../components/CardAvisRecherche/CardAvisRecherche'
import { Helmet } from 'react-helmet'

function AvisDeRecherche() {
  const [wanteds, setWanteds] = useState([])

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

  useEffect(() => {
    try {
      const fecthWanteds = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/bien/get-wanteds`,
        )
        if (response.ok) {
          const result = await response.json()
          setWanteds(result)
        }
      }
      fecthWanteds()
    } catch (error) {
      console.log('Erreur serveur', error)
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Marli - Avis de recherche</title>
        <meta name='robots' content='noindex' />
        <meta name='description' content="Passeur d'histoires immobilières" />
      </Helmet>
      <div className={styles.allContainer}>
        <FirstSectionPage ImgPremierePlan={Image} title='AVIS DE RECHERCHE' />

        <div className={styles.AvisDrechercheContainer}>
          <h3>Nos clients cherchent</h3>

          <Slider {...settings}>
            {wanteds.length > 0 &&
              wanteds.map((wanted) => {
                // Gérer les URLs Cloudinary
                const imageUrl = wanted.urlImage?.includes('cloudinary.com') || wanted.urlImage?.startsWith('http')
                  ? wanted.urlImage
                  : `${process.env.REACT_APP_URL_BASE_IMAGE}${wanted.urlImage}`;
                
                return (
                  <CardAvisRecherche
                    key={wanted._id}
                    urlImage={imageUrl}
                  />
                );
              })}
          </Slider>
          <p></p>
          <Link to='/nous-contacter'>
            <button>Si vous avez un de ces biens</button>
          </Link>
        </div>

        <div className={styles.formContainer}>
          <h3>Votre recherche</h3>
          <FormVendreOuRecherche context='avis' />
        </div>
      </div>
    </>
  )
}

export default AvisDeRecherche
