import React, { useEffect, useRef, useState } from 'react'
import styles from './PageDunBien.module.scss'
import { Link } from 'react-router-dom'
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
import Image1 from '../../assets/images/image_chambre.jpg'
import Image2 from '../../assets/images/image_chateau.jpg'
import Image3 from '../../assets/images/image_de_pont.jpg'
import Image4 from '../../assets/images/image_dressing.jpg'

function PageDunBien() {
  const sliderRef = useRef(null)
  const sliderRefFullScreen = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullScreen, setFullScreen] = useState(false)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    initialSlide: currentIndex,
    afterChange: (index) => setCurrentIndex(index),
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
  }, [currentIndex])

  return (
    <>
      <div className={`fadinAnimation ${styles.allContainer}`}>
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
                {[Image1, Image2, Image3, Image4].map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`imag slider ${index + 1}`}
                  />
                ))}
              </Slider>
            </div>

            <div
              className={styles.fullScreenIcone}
              onClick={() => setFullScreen(!fullScreen)}
              title='Plein ecran'
            >
              <FontAwesomeIcon icon={faExpand} />
            </div>
          </div>

          <div className={styles.galerieMiniature}>
            {[Image1, Image2, Image3, Image4].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`imag slider ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className={styles.detailsBien}>
          <div className={styles.histoireContainer}>
            <h3>L’histoire de ce bien</h3>
            <p>
              Son histoire est commune à celle de ses 3 voisines par leur
              jeunesse, crée en 2014, leur position géographique en cœur de
              ville et aujourd’hui leur première commercialisation. Au calme,
              avec un accès en retrait de la rue, ils forment une petite
              copropriété de 4 appartements sans charges de fonctionnement
              communes. Ils ont chacun leur propre cachet et identité.
            </p>
          </div>

          <div className={styles.RightContainer}>
            <div className={styles.prixElocalisation}>
              <h3>250 000 €</h3>
              <p>DAKAR, Sénégal</p>
              <p>A VOS CALCULETTES</p>
            </div>

            <div className={styles.caracteristique}>
              <h3>Caractéristiques</h3>
              <p>- Immeuble</p>
              <p>- 520 m²</p>
              <p>- 3 F4, 1 F3</p>
            </div>
          </div>
        </div>

        <div className={styles.sectionRef}>
          <p>Intéressé(e) par ce bien ? Contacter-nous.</p>
          <p className={styles.reference}>REF : YUT782</p>

          <div className={styles.btnSection}>
            <Link to='/marli/nous-contacter'>
              <button>Nous contacter</button>
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
                {[Image1, Image2, Image3, Image4].map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`imag slider ${index + 1}`}
                  />
                ))}
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
      </div>
    </>
  )
}

export default PageDunBien
