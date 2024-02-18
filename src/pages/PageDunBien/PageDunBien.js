import React, { useEffect, useRef, useState } from 'react'
import styles from './PageDunBien.module.scss'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faExpand,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CardSlider from '../../components/CardSlider/CardSlider'
import { Helmet } from 'react-helmet'
import { FadeIn } from '../../components/AnimatedComponents/AnimatedComponents'

function PageDunBien() {
  const sliderRef = useRef(null)
  const sliderRefFullScreen = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullScreen, setFullScreen] = useState(false)
  const [loading, setLoading] = useState(true)
  const { reference } = useParams()
  const [data, setData] = useState([])
  const [dataBienDispo, setDataBienDispo] = useState([])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    initialSlide: currentIndex,
    afterChange: (index) => setCurrentIndex(index),
  }

  const settingsBienRecommander = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: dataBienDispo.length >= 2 ? 2 : dataBienDispo.length,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: dataBienDispo.length >= 2 ? 2 : dataBienDispo.length,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: dataBienDispo.length >= 2 ? 2 : dataBienDispo.length,
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

  const slidePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev()
    }
  }

  const slideNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext()
    }
  }

  const slidePrevFullScreen = () => {
    if (sliderRefFullScreen.current) {
      sliderRefFullScreen.current.slickPrev()
    }
  }

  const slideNextFullScreen = () => {
    if (sliderRefFullScreen.current) {
      sliderRefFullScreen.current.slickNext()
    }
  }

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentIndex)
    }

    try {
      const fecthData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/bien/get-one?ref=${reference}`,
        )
        if (response.ok) {
          const result = await response.json()
          setData(result)
          setLoading(false)
        } else {
          setLoading(false)
        }
      }

      const fecthBienDisponible = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/bien/all-biens?status=disponible&triPar=decroissant&pageSize=5`,
        )
        if (response.ok) {
          const result = await response.json()
          setDataBienDispo(result.biens)
        }
      }

      fecthBienDisponible()
      fecthData()
    } catch (error) {
      console.log('Erreur lors de la requette fecth', error)
      setLoading(false)
    }
  }, [currentIndex, reference])

  return (
    <>
      <Helmet>
        <title>Marli - Page de bien</title>
        <meta name='robots' content='noindex' />
        <meta name='description' content="Passeur d'histoires immobilières" />
      </Helmet>
      <div className={`fadinAnimation ${styles.allContainer}`}>
        {loading ? null : data.length <= 0 ? (
          <p className={styles.notFoundBien}>Aucun bien trouver</p>
        ) : (
          <FadeIn>
            {data?._medias?.image_galerie_0?.url && (
              <div className={styles.imageContainer}>
                <div className={styles.CrousselContainer}>
                  <div className={styles.slideButton}>
                    <div onClick={slidePrev}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div onClick={slideNext}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>

                  {/* slider  */}
                  <div className={styles.sliderContainer}>
                    <Slider ref={sliderRef} {...settings}>
                      {data._medias &&
                        Object.keys(data._medias).map((key, index) => {
                          const media = data._medias[key]
                          if (media.url) {
                            return (
                              <img
                                key={index}
                                src={`${process.env.REACT_APP_URL_BASE_IMAGE}${media.url}`}
                                alt={`imag slider ${index + 1}`}
                              />
                            )
                          }
                          return null
                        })}
                    </Slider>
                  </div>

                  <div>
                    {/* status bien */}
                    {data.status !== 'disponible' && (
                      <div
                        style={
                          data.status === 'vendu'
                            ? { backgroundColor: 'red' }
                            : data.status === 'sous-compromis'
                              ? { backgroundColor: 'orange' }
                              : null
                        }
                        className={styles.statusBien}
                      >
                        {data.status === 'vendu'
                          ? 'bien vendu'
                          : data.status === 'sous-compromis'
                            ? 'sous compromis'
                            : null}
                      </div>
                    )}

                    {/* icone fullScreen */}
                    <div
                      className={styles.fullScreenIcone}
                      onClick={() => setFullScreen(!fullScreen)}
                      title='Plein ecran'
                    >
                      <FontAwesomeIcon icon={faExpand} />
                    </div>
                  </div>
                </div>

                <div className={styles.galerieMiniature}>
                  {data._medias &&
                    Object.keys(data._medias).map((key, index) => {
                      const media = data._medias[key]
                      if (media.url) {
                        return (
                          <img
                            key={index}
                            src={`${process.env.REACT_APP_URL_BASE_IMAGE}${media.url}`}
                            alt={`imag slider ${index + 1}`}
                            onClick={() => setCurrentIndex(index)}
                          />
                        )
                      }
                      return null
                    })}
                </div>
              </div>
            )}

            <div className={styles.detailsBien}>
              <div className={styles.histoireContainer}>
                <h3>L’histoire</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{data.histoire}</p>
              </div>

              <div className={styles.RightContainer}>
                <div className={styles.prixElocalisation}>
                  <h3>{data.prix.toLocaleString('fr-FR')} €</h3>
                  <p>{data.localisation}</p>
                  <p>{data.title}</p>
                </div>

                <div className={styles.caracteristique}>
                  <h3>Caractéristiques</h3>
                  {data?.caracteristiques.split('#').map((value) => (
                    <p>- {value}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.sectionRef}>
              <p className={styles.reference}>REF : {reference}</p>

              <div className={styles.btnSection}>
                <Link to='/marli/nous-contacter'>
                  <button>Intéressé(e) par ce bien</button>
                </Link>
              </div>
            </div>

            {fullScreen && (
              <div className={styles.sliderFullScreen}>
                <div className={styles.slideButton}>
                  <div onClick={slidePrevFullScreen}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </div>
                  <div onClick={slideNextFullScreen}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </div>

                {/* slider  */}
                <div className={styles.sliderContainer}>
                  <Slider ref={sliderRefFullScreen} {...settings}>
                    {data._medias &&
                      Object.keys(data._medias).map((key, index) => {
                        const media = data._medias[key]
                        if (media.url) {
                          return (
                            <img
                              key={index}
                              src={`${process.env.REACT_APP_URL_BASE_IMAGE}${media.url}`}
                              alt={`imag slider ${index + 1}`}
                            />
                          )
                        }
                        return null
                      })}
                  </Slider>
                </div>

                <div
                  className={styles.closeSliderButton}
                  onClick={() => setFullScreen(!fullScreen)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
            )}
          </FadeIn>
        )}
      </div>

      {dataBienDispo.length > 0 && (
        <div className={styles.BienRecommandeContainer}>
          <h3>Biens qui pourraient vous plaire</h3>
          <Slider {...settingsBienRecommander}>
            {dataBienDispo.map((bien) =>
              bien?.ref !== reference ? (
                <CardSlider
                  key={bien.ref}
                  image={bien?._medias?.image_galerie_0?.url}
                  price={bien?.prix}
                  localisation={bien?.localisation}
                  caracteristiques={bien?.caracteristiques}
                  status={bien?.status}
                  reference={bien?.ref}
                />
              ) : null,
            )}
          </Slider>
        </div>
      )}
    </>
  )
}

export default PageDunBien
