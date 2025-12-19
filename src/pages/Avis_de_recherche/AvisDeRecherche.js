import React, { useEffect, useState, useMemo } from 'react'
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

  useEffect(() => {
    const fecthWanteds = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/bien/get-wanteds`,
        )
        if (response.ok) {
          const result = await response.json()
          setWanteds(result)
        }
      } catch (error) {
        console.log('Erreur serveur', error)
      }
    }
    fecthWanteds()
  }, [])

  const settings = useMemo(() => ({
    dots: false,
    infinite: wanteds.length >= 3,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: wanteds.length >= 3 ? 3 : wanteds.length || 1,
    autoplay: wanteds.length >= 3,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: wanteds.length >= 3 ? 3 : wanteds.length || 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: wanteds.length >= 2 ? 2 : wanteds.length || 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: wanteds.length >= 2 ? 2 : wanteds.length || 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }), [wanteds.length])

  return (
    <>
      <Helmet>
        <title>Marli - Avis de recherche</title>
        <meta name='robots' content='noindex' />
        <meta name='description' content="Passeur d'histoires immobilières" />
      </Helmet>
      <div className={styles.allContainer}>
        <FirstSectionPage ImgPremierePlan={Image} title='AVIS DE RECHERCHE' />

        {wanteds.length > 0 && (
          <div className={styles.AvisDrechercheContainer}>
            <h3>Nos clients cherchent</h3>
            <Slider {...settings}>
              {wanteds.map((wanted) => (
                <div key={wanted._id}>
                  <CardAvisRecherche
                    urlImage={`https://marli-backend.onrender.com/api/images-bien/images/imagesBienMarli/${wanted.urlImage}`}
                  />
                </div>
              ))}
            </Slider>
            <p></p>
            <Link to='/nous-contacter'>
              <button>Si vous avez un de ces biens</button>
            </Link>
          </div>
        )}

        <div className={styles.formContainer}>
          <h3>Votre recherche</h3>
          <FormVendreOuRecherche context='avis' />
        </div>
      </div>
    </>
  )
}

export default AvisDeRecherche
