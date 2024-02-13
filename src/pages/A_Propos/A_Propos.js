import React from 'react'
import styles from './A_Propos.module.scss'
import ImageFondatrice from '../../assets/images/fondatrice.jpeg'
import LogoMarli from '../../assets/images/marli-logo.png'
import { Helmet } from 'react-helmet'

function A_Propos() {
  return (
    <>
      <Helmet>
        <title>Marli - A propos</title>
        <meta name='robots' content='noindex' />
        {/* <meta name="robots" content="index, follow" /> */}
        <meta name='description' content="Passeur d'histoires immobilières" />
      </Helmet>
      <div className={`fadinAnimation ${styles.allContainer}`}>
        <div className={styles.presentationFondatrice}>
          <div className={styles.imageContainer}>
            <img src={ImageFondatrice} alt='img-fondatrice' />
            <div>
              <h3>Néné</h3>
              <p>Fondatrice</p>
            </div>
          </div>

          <div className={styles.textContent}>
            <p className={styles.borderStyle}></p>
            <p>
              Commerciale depuis une trentaine d’années sur le territoire
              national et notamment en Bourgogne Franche-Comté. Je suis reconnue
              pour mon professionnalisme, mon sens aigu du service et des
              relations humaines.
            </p>
            <p>
              Aujourd’hui, avec audace et efficacité, j’ai créé Marli
              Immobilier. Je vous propose des services à la mesure de vos
              attentes pour l’ensemble de vos projets immobilier.
            </p>
            <p>
              Comme dans toutes les fonctions que j’ai eues à occuper jusqu’ici,
              je ne lésinerai pas sur les moyens pour mener à bien les missions
              que vous me confierez.
            </p>
            <p>
              Je me suis entourée de personnes expertes dans leur domaine pour
              vous garantir un accompagnement optimal.
            </p>
            <p>Merci de votre confiance.</p>
            <p>A bientôt</p>
            <p>Néné</p>
          </div>
        </div>

        <div className={styles.presentationMarli}>
          <div className={styles.marliLogoContainer}>
            <img src={LogoMarli} alt='img-logo-marli' />
            <p>Passeur d'histoires immobilières</p>
          </div>

          <div className={styles.textContent}>
            <p className={styles.borderStyle}></p>
            <p>
              Chez Marli, la dimension humaine inhérente à toute transaction
              immobilière est à sa juste place.
            </p>
            <p>
              Nous souhaitons avoir le privilège de vous accompagner dans ces
              moments de vie et partager vos émotions le long de votre projet
              immobilier.
            </p>
            <p>
              Nous le ferons passionnément, consciencieusement, avec
              transparence.
            </p>
            <p>
              Nous savons que tout lieu a quelque chose à exprimer, un vécu, une
              histoire voire des secrets.
            </p>
            <p>Nous aurons à cœur de vous les révéler.</p>
            <p>
              Quelle que soit sa taille, son prix, sa situation géographique,
              nous réservons à chaque bien une attention particulière, des
              services sur mesure.
            </p>
            <p>Voilà ce que nous faisons de mieux.</p>
            <p>
              Notre moteur au quotidien sera de trouver des acquéreurs pour vos
              biens, des lieux de vie qui vous ressemblent ou tout simplement
              des investissements rentables.
            </p>
            <p>
              La transaction immobilière peut être source de stress,
              transformons la en une expérience sereine, un parcours plaisant.
            </p>
            <p>
              Bienvenue chez Marli où votre satisfaction est notre première
              gratitude.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default A_Propos
