import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './A_Propos.module.scss'
import ImageFondatrice from '../../assets/images/fondatrice.jpeg'
import Image from '../../assets/images/jacottot/bandeau-agence.jpg' // photo : Jean-Claude Jacottot
import BandeauPage from '../../components/Refonte/BandeauPage'
import Apparition from '../../components/Refonte/Apparition'

const ENGAGEMENTS = [
  { mot: 'Passionnément', texte: 'Chaque lieu nous intéresse pour ce qu’il raconte, pas seulement pour ce qu’il vaut.' },
  { mot: 'Consciencieusement', texte: 'Une attention particulière et des services sur mesure, quels que soient la taille, le prix ou la situation du bien.' },
  { mot: 'Avec transparence', texte: 'Un échange franc à chaque étape, pour que la transaction reste une expérience sereine.' },
]

function A_Propos() {
  return (
    <>
      <Helmet>
        <title>L’agence - Marli Immobilier, passeur d’histoires immobilières à Besançon</title>
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://marli-immobilier.com/a-propos' />
        <meta
          name='description'
          content='Marli Immobilier, agence indépendante à Besançon fondée par Néné. Une approche humaine de l’immobilier, dans le Doubs, la Haute-Saône et le Jura.'
        />
      </Helmet>

      <BandeauPage
        photo={Image}
        alt='Besançon et le Doubs reflétés dans un verre'
        etiquette='L’agence'
        titre='Passeur d’histoires immobilières'
        positionPhoto='50% 60%'
      />

      {/* La conviction */}
      <section className={styles.conviction}>
        <Apparition>
          <p>Les transactions immobilières sont avant tout des histoires humaines et des passages de témoin.</p>
        </Apparition>
      </section>

      {/* La fondatrice */}
      <section className={styles.fondatrice}>
        <Apparition className={styles.portrait}>
          <img src={ImageFondatrice} alt='Néné, fondatrice de Marli Immobilier' />
          <span className='etiquette'>Néné, fondatrice</span>
        </Apparition>
        <Apparition className={styles.lettre}>
          <span className='filet'></span>
          <p>
            Commerciale depuis une trentaine d’années sur le territoire national, et notamment en
            Bourgogne-Franche-Comté, je suis reconnue pour mon professionnalisme, mon sens aigu du service et
            des relations humaines.
          </p>
          <p>
            Aujourd’hui, avec audace et efficacité, j’ai créé Marli Immobilier pour vous proposer des services à
            la mesure de vos attentes, pour l’ensemble de vos projets immobiliers.
          </p>
          <p>
            Comme dans toutes les fonctions que j’ai occupées jusqu’ici, je ne lésinerai pas sur les moyens pour
            mener à bien les missions que vous me confierez.
          </p>
          <p>Je me suis entourée de personnes expertes dans leur domaine pour vous garantir un accompagnement optimal.</p>
          <p>Merci de votre confiance. À bientôt,</p>
          <p className={styles.signature}>Néné</p>
        </Apparition>
      </section>

      {/* Chez Marli */}
      <section className={styles.marli}>
        <Apparition className={styles.marliCitation}>
          <span className='etiquette'>Chez Marli</span>
          <p>Tout lieu a quelque chose à exprimer : un vécu, une histoire, voire des secrets. Nous aurons à cœur de vous les révéler.</p>
        </Apparition>
        <Apparition className={styles.marliTexte}>
          <p>Chez Marli, la dimension humaine de toute transaction immobilière est à sa juste place.</p>
          <p>
            Nous souhaitons avoir le privilège de vous accompagner dans ces moments de vie, et partager vos
            émotions tout au long de votre projet immobilier.
          </p>
          <p>
            Notre moteur au quotidien : trouver des acquéreurs pour vos biens, des lieux de vie qui vous
            ressemblent, ou tout simplement des investissements rentables.
          </p>
          <p>
            Une transaction immobilière peut être source de stress : transformons-la en une expérience sereine,
            un parcours plaisant.
          </p>
        </Apparition>
      </section>

      {/* Les engagements */}
      <section className={styles.engagements}>
        {ENGAGEMENTS.map((e) => (
          <Apparition key={e.mot} className={styles.engagement}>
            <h2>{e.mot}</h2>
            <p>{e.texte}</p>
          </Apparition>
        ))}
      </section>

      {/* La fin */}
      <section className={styles.fin}>
        <p className={styles.finPhrase}>Bienvenue chez Marli, où votre satisfaction est notre première gratitude.</p>
        <div className={styles.finBoutons}>
          <Link to='/nous-contacter' className='bouton-plein'>
            Nous contacter
          </Link>
          <Link to='/acheter' className='bouton-contour'>
            Découvrir nos histoires
          </Link>
        </div>
      </section>
    </>
  )
}

export default A_Propos
