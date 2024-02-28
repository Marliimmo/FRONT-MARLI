import React, { useEffect, useRef, useState } from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/22.jpg'
import styles from './Vendre.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import CardSlider from '../../components/CardSlider/CardSlider'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import FormVendreOuRecherche from '../../components/FormVendreOuRecherche/FormVendreOuRecherche'
import { Helmet } from 'react-helmet'
import { SlideOfRight } from '../../components/AnimatedComponents/AnimatedComponents'

function Vendre() {
  const sliderRef = useRef(null)
  const [dataBienVendu, setDataBienVendu] = useState([])
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: dataBienVendu.length >= 2 ? 2 : dataBienVendu.length,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: dataBienVendu.length >= 2 ? 2 : dataBienVendu.length,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: dataBienVendu.length >= 2 ? 2 : dataBienVendu.length,
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

  useEffect(() => {
    const fecthBienVendu = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/bien/all-biens?status=vendu&triPar=decroissant&pageSize=5`,
      )
      if (response.ok) {
        const result = await response.json()
        setDataBienVendu(result.biens)
      }
    }

    fecthBienVendu()
  }, [])
  return (
    <>
      <Helmet>
        <title>Marli - Vendre</title>
        <meta name='robots' content='noindex' />
        {/* <meta name="robots" content="index, follow" /> */}
        <meta name='description' content="Passeur d'histoires immobilières" />
      </Helmet>
      <div className={styles.allContainer}>
        <FirstSectionPage
          ImgPremierePlan={Image}
          title='Combien ça coûte ?'
          // description='Une estimation au prix juste, condition sine qua non à la vente'
        />

        <div className={styles.chekedContainer}>
          {/* <h3>Comment faisons-nous</h3> */}
          <h3>Une estimation au prix juste</h3>
          <div className={styles.ListeCheckContainer}>
            <SlideOfRight>
              <div className={styles.oneChecked}>
                <FontAwesomeIcon icon={faCheckCircle} />
                <p>
                  Chaque bien est unique. Sa valeur dépend de plusieurs
                  variables.
                </p>
              </div>
            </SlideOfRight>

            <SlideOfRight>
              <div className={styles.oneChecked}>
                <FontAwesomeIcon icon={faCheckCircle} />
                <p>
                  Année de construction, standing, rareté, état général du bien
                  et du bâtiment.
                </p>
              </div>
            </SlideOfRight>

            <SlideOfRight>
              <div className={styles.oneChecked}>
                <FontAwesomeIcon icon={faCheckCircle} />
                <p>
                  Environnement visuel et sonore, positionnement par rapport à
                  des biens similaires, marché local.
                </p>
              </div>
            </SlideOfRight>

            <SlideOfRight>
              <div className={styles.oneChecked}>
                <FontAwesomeIcon icon={faCheckCircle} />
                <p>Plus notre petit doigt…</p>
              </div>
            </SlideOfRight>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h3>Parlez-nous de votre bien</h3>
          <FormVendreOuRecherche context='vendre' />
        </div>

        {dataBienVendu.length > 0 && (
          <div className={styles.BienVenduContainer}>
            <h3>Nos biens vendus</h3>
            <Slider ref={sliderRef} {...settings}>
              {dataBienVendu.map((bien) => (
                <CardSlider
                  key={bien.ref}
                  image={bien?._medias?.image_galerie_0?.url}
                  price={bien?.prix}
                  localisation={bien?.localisation}
                  caracteristiques={bien?.caracteristiques}
                  status={bien?.status}
                  reference={bien?.ref}
                />
              ))}
            </Slider>
          </div>
        )}
      </div>
    </>
  )
}

export default Vendre
