import React, { useEffect, useState } from 'react'
import styles from './Accueil.module.scss'
import Logo from '../../assets/images/marli-logo.png'
import ImgImmeuble from '../../assets/images/united-states-spokane.jpg'
import ImgImmeuble19 from '../../assets/images/19.jpg'
import ImgImmeuble4 from '../../assets/images/4.jpg'
import ImgImmeuble20 from '../../assets/images/20.jpg'
import ImgImmeuble5 from '../../assets/images/5.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import CardSlider from '../../components/CardSlider/CardSlider'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRef } from 'react'
import CardAvis from '../../components/CardAvis/CardAvis'
import CardAddReview from '../../components/CardAddReview/CardAddReview'
import { Link as ScrollLink } from 'react-scroll'
import { Helmet } from 'react-helmet'

function Accueil() {
  const sliderRef = useRef(null)
  const [handleHover, setHandleHover] = useState(false)
  const [dataBienNouveau, setDataBienNouveau] = useState([])
  const [dataReviews, setDataReviews] = useState([])
  const [showFormAvis, setShowFormAvis] = useState(false)
  const [isSuccesSend, setIsSuccesSend] = useState('')

  const handleSuccesSend = (value) => {
    setIsSuccesSend(value)
  }

  // const sliderRef2 = useRef(null)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 2,
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

  const settingsSliderAvis = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: dataReviews.length >= 3 ? 3 : dataReviews.length,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: dataReviews.length >= 3 ? 3 : dataReviews.length,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: dataReviews.length >= 2 ? 2 : dataReviews.length,
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

  // const slidePrev2 = () => {
  //   if (sliderRef2.current) {
  //     sliderRef2.current.slickPrev()
  //   }
  // }

  // const slideNext2 = () => {
  //   if (sliderRef2.current) {
  //     sliderRef2.current.slickNext()
  //   }
  // }

  const handleChange = () => {
    setShowFormAvis(!showFormAvis)
  }

  useEffect(() => {
    const fecthBienDisponible = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/bien/all-biens?status=disponible&pageSize=5`,
      )
      if (response.ok) {
        const result = await response.json()
        setDataBienNouveau(result.biens)
      }
    }

    const getReviews = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/reviews`,
      )
      if (response.ok) {
        const result = await response.json()
        setDataReviews(result)
      }
    }

    fecthBienDisponible()
    getReviews()
  }, [])

  return (
    <>
      <Helmet>
        <title>Marli - Passeur d'histoires immobilières</title>
        <meta name='robots' content='noindex' />
        {/* <meta name="robots" content="index, follow" /> */}
        <meta name='description' content="Passeur d'histoires immobilières" />
      </Helmet>
      <div className={`fadinAnimation`}>
        <div className={styles.firstSectionContainer}>
          <img
            className={styles.ImgPremierePlan}
            src={ImgImmeuble19}
            alt='img-immobilier'
          />
          <div className={styles.opacityBlack}></div>
          <div className={styles.TextContent}>
            <p>
              <img src={Logo} alt='logo-marli' />
            </p>
            <h3>
              Les transactions immobilières sont avant tout des histoires
              humaines et des passages de témoin.
            </h3>
          </div>
        </div>

        <div className={styles.presentationSection}>
          <div className={styles.LeftContent}>
            <img src={ImgImmeuble4} alt='img dressing' />
            <img src={ImgImmeuble5} alt='img immeuble' />
          </div>

          <div className={styles.RightContent}>
            <p className={styles.borderStyle}></p>
            <p>
              Nous souhaitons faciliter vos projets immobiliers de leur
              conception à leur aboutissement.
              <br /> Votre satisfaction sera notre première gratitude.
            </p>

            <p>A vous d’écrire la suite de l’histoire...</p>
          </div>
        </div>

        {/* <div className={styles.NouveautesContainer2}>
        <div className={styles.titleEslideBtn}>
          <h3>De nouvelles histoires</h3>
          <div className={styles.slideButton}>
            <div onClick={slidePrev2}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div onClick={slideNext2}>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
        </div>

        <Slider ref={sliderRef2} {...settings}>
          <CardSlider />
          <CardSlider />
          <CardSlider />
          <CardSlider />
        </Slider>

        <div className={styles.btnContainer}>
          <Link to='/marli/acheter'>Découvrir toutes nos histoires</Link>
        </div>
      </div> */}

        <div className={styles.widget}>
          <div className={styles.NouveautesContainer}>
            <h3>Nos nouvelles histoires</h3>

            {dataBienNouveau.length > 2 && handleHover && (
              <div
                className={styles.slideButton}
                onMouseEnter={() => setHandleHover(true)}
                onMouseLeave={() => setHandleHover(false)}
              >
                <div onClick={slidePrev}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div onClick={slideNext}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            )}

            {/* slider  */}
            <div
              onMouseEnter={() => setHandleHover(true)}
              onMouseLeave={() => setHandleHover(false)}
            >
              <Slider ref={sliderRef} {...settings}>
                {dataBienNouveau.map((bien) => (
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

            <div className={styles.btnContainer}>
              <Link to='/marli/acheter'>Nos autres histoires</Link>
            </div>

            <h3>Que faisons-nous pour vous</h3>
          </div>

          <div className={styles.sectionChecked}>
            <div className={styles.LeftContent}>
              <img src={ImgImmeuble} alt='img illustration de vente de bien' />
            </div>

            <div className={styles.RightContent}>
              <h2>Acheter un bien</h2>
              <p className={styles.borderStyle}></p>

              <div className={styles.ListeCheckContainer}>
                <div>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>Identification de votre besoin.</p>
                </div>

                <div>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>Sélection et visite ciblées.</p>
                </div>

                <div>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>Négociation financière.</p>
                </div>

                <div>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>Compromis, signature.</p>
                </div>
              </div>

              <Link to='/marli/acheter'>Toutes nos histoires</Link>
            </div>
          </div>

          <div className={styles.sectionChecked}>
            <div className={styles.LeftContent}>
              <img
                style={{ filter: 'grayscale(1)' }}
                src={ImgImmeuble20}
                alt='img illustration de vente de bien'
              />
            </div>

            <div className={styles.RightContent}>
              <h2>Vendre un bien</h2>
              <p className={styles.borderStyle}></p>

              <div className={styles.ListeCheckContainer}>
                <div>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>Estimation</p>
                </div>

                <div>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>Valorisation et mise en lumière.</p>
                </div>

                <div>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>Commercialisation</p>
                </div>

                <div>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>Portefeuille clients acquéreurs conséquent</p>
                </div>
              </div>

              <Link to='/marli/vendre'>Estimer votre bien</Link>
            </div>
          </div>
        </div>

        <div className={styles.investerSection}>
          <div>
            <h2>INVESTIR DANS L’IMMOBILIER</h2>
            <ul>
              <li>Chasseur de bien</li>
              <li>
                Résidences secondaires au Sénégal, destination soleil 365/365j
              </li>
              <li>Accompagnement, étude de faisabilité et rentabilité</li>
            </ul>
            <Link to='nous-contacter'>Nous contacter</Link>
          </div>
        </div>

        <div id='avisContainer' className={styles.AvisSection}>
          <h2>Parole libre</h2>
          <div className={styles.barStyleContainer}>
            <p className={styles.borderStyle}></p>
          </div>
          {dataReviews.length > 0 && (
            <Slider {...settingsSliderAvis}>
              {dataReviews.map((review) => (
                <CardAvis avis={review} />
              ))}
            </Slider>
          )}
          {!showFormAvis && (
            <div className={styles.btnSection}>
              {/* <Link>
              <button>Voir plus d’avis</button>
            </Link> */}
              {isSuccesSend !== true && (
                <ScrollLink smooth to='formAddReview' onClick={handleChange}>
                  <button>Je témoigne</button>
                </ScrollLink>
              )}

              {isSuccesSend === true && (
                <div className={styles.MessageFeedBackSucces}>
                  Merci pour votre avis !
                </div>
              )}
            </div>
          )}
        </div>

        <div id='formAddReview'>
          {showFormAvis && (
            <CardAddReview
              visibilityForm={handleChange}
              isSuccesSend={handleSuccesSend}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Accueil
