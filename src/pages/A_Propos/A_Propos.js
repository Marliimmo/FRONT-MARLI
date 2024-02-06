import React from 'react'
import styles from './A_Propos.module.scss'
import ImageFondatrice from '../../assets/images/fondatrice.jpeg'
import LogoMarli from '../../assets/images/marli-logo.png'

function A_Propos() {
  return (
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
          Commerciale depuis une trentaine d’années sur le territoire national
          et en particulier en Bourgogne Franche-Comté, je suis reconnue pour
          mon professionnalisme, mon sens aigu du service et des relations
          humaines.
          <br />
          <br />
          Aujourd’hui, je mets mon savoir-faire à votre service en créant Marli
          Immobilier. Avec audace et efficacité je vous propose des services à
          la mesure de vos attentes.
          <br />
          <br />
          Comme dans toutes les fonctions que j’ai eues à occuper jusqu’ici, je
          ne lésinerai pas sur les moyens pour mener à bien les missions que
          vous me confierez.
          <br />
          <br />
          Je me suis entourée de personnes expertes dans leur domaine d’activité
          pour vous garantir un accompagnement optimal. Merci de votre
          confiance.
          <br />
          <br />
        </div>
      </div>

      <div className={styles.presentationMarli}>
        <div className={styles.marliLogoContainer}>
          <img src={LogoMarli} alt='img-logo-marli' />
          <p>Passeur d'histoires immobilières</p>
        </div>

        <div className={styles.textContent}>
          <p className={styles.borderStyle}></p>
          Chez Marli, la dimension humaine inhérente à toute transaction
          immobilière est à sa juste place.
          <br />
          <br />
          Nous souhaitons avoir le privilège de vous accompagner dans ces
          moments de vie et partager vos émotions le long de votre projet
          immobilier.
          <br />
          <br />
          Nous le ferons passionnément, consciencieusement, avec transparence.
          <br />
          <br />
          Nous avons une appétence particulière pour les biens d’ expressions,
          de caractères, atypiques.
          <br />
          <br />
          Nous savons aussi que tout lieu à son vécu, son histoire voir ses
          secrets, quelque chose à exprimer. Nous aurons à cœur de vous aider à
          les révéler.
          <br />
          <br />
          Par conséquent, quelle que soit sa taille, son prix, sa situation
          géographique, nous réservons à chaque bien une attention particulière,
          des services sur mesure.
          <br />
          <br />
          Voilà ce que nous faisons de mieux.
          <br />
          <br />
          Notre moteur au quotidien sera de trouver des acquéreurs, des lieux de
          vie qui vous ressemblent ou tout simplement des investissements
          rentables.
          <br />
          <br />
          La transaction immobilière peut être source de stress, transformons la
          en une expérience sereine, un parcours plaisant.
          <br />
          <br />
          Libérez vous l’esprit en vous reposant sur une agence à votre écoute.
          <br />
          <br />
          Bienvenue chez Marli où votre satisfaction est notre première
          gratitude.
          <br />
          <br />
          A vous d’inscrire la suite de l’ histoire.
          <br />
          <br />
        </div>
      </div>
    </div>
  )
}

export default A_Propos
