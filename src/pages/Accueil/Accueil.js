import React, { useState } from 'react'
import ImgPremierePlan from '../../assets/images/immobilier.png'
import styles from './Accueil.module.scss'
import Logo from '../../assets/images/marli-logo.png'
import ImgImmeuble from '../../assets/images/united-states-spokane.jpg'
import ImgDressing from '../../assets/images/image_dressing.jpg'
import IngChambre from '../../assets/images/image_chambre.jpg'
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

function Accueil() {
  const sliderRef = useRef(null)
  const [handleHover, setHandleHover] = useState(false)

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

  return (
    <div className={`fadinAnimation`}>
      <div className={styles.firstSectionContainer}>
        <img
          className={styles.ImgPremierePlan}
          src={ImgPremierePlan}
          alt='img-immobilier'
        />
        <div className={styles.opacityBlack}></div>
        <div className={styles.TextContent}>
          <p>
            <img src={Logo} alt='logo-marli' />
          </p>
          <h3>
            Les transactions immobilières sont avant tout des histoires humaines
            et des passages de témoin.
          </h3>
        </div>
      </div>

      <div className={styles.presentationSection}>
        <div className={styles.LeftContent}>
          <img src={ImgDressing} alt='img dressing' />
          <img src={IngChambre} alt='img immeuble' />
        </div>

        <div className={styles.RightContent}>
          <p className={styles.borderStyle}></p>
          <p>
            Nous souhaitons jouer un rôle de facilitateur dans l’accomplissement
            de votre projet immobilier de sa conception à son aboutissement.
            Votre satisfaction sera notre première gratitude.
          </p>

          <p>A vous d’écrire la suite de l’histoire</p>
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
          <h3>De nouvelles histoires</h3>

          {handleHover && (
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
              <CardSlider />
              <CardSlider />
              <CardSlider status='sous-compromis' />
              <CardSlider status='vendu' />
            </Slider>
          </div>

          <div className={styles.btnContainer}>
            <Link to='/marli/acheter'>Découvrir toutes nos histoires</Link>
          </div>
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
                <p>Choix et présentions de biens adéquats.</p>
              </div>

              <div>
                <FontAwesomeIcon icon={faCheckCircle} />
                <p>Négociation financière.</p>
              </div>

              <div>
                <FontAwesomeIcon icon={faCheckCircle} />
                <p>Visite, compromis, signature.</p>
              </div>
            </div>

            <Link to='/marli/acheter'>Découvrir tous nos biens</Link>
          </div>
        </div>

        <div className={styles.sectionChecked}>
          <div className={styles.LeftContent}>
            <img src={ImgImmeuble} alt='img illustration de vente de bien' />
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
                <p>Mise en lumière de votre bien avec des outils modernes.</p>
              </div>

              <div>
                <FontAwesomeIcon icon={faCheckCircle} />
                <p>Communication sur sites de ventes immobilières ciblés.</p>
              </div>

              <div>
                <FontAwesomeIcon icon={faCheckCircle} />
                <p>Portefeuille clients acquéreurs conséquent.</p>
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
            <li>Accompagnement, étude de rentabilité.</li>
            <li>Recherche de biens en France et au Sénégal.</li>
            <li>
              Sénégal, destination soleil durant toute l’année, pour vous
              dénicher le bien qui correspond à vos attentes.
            </li>
          </ul>
          <Link to='nous-contacter'>Nous contacter</Link>
        </div>
      </div>

      <div className={styles.AvisSection}>
        <h2>Paroles libres</h2>
        <div className={styles.barStyleContainer}>
          <p className={styles.borderStyle}></p>
        </div>

        <Slider {...settingsSliderAvis}>
          <CardAvis />
          <CardAvis />
          <CardAvis />
          <CardAvis />
          <CardAvis />
          <CardAvis />
        </Slider>

        <div className={styles.btnSection}>
          {/* <Link>
            <button>Voir plus d’avis</button>
          </Link> */}
          <Link>
            <button>Déposer mon avis</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Accueil
