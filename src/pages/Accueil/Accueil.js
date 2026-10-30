import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './Accueil.module.scss'
import Logo from '../../assets/images/marli-logo.png'
import ImgCouverture from '../../assets/images/couverture-accueil.jpg'
import CardAddReview from '../../components/CardAddReview/CardAddReview'
import Apparition from '../../components/Refonte/Apparition'
import MachineAEcrire from '../../components/Refonte/MachineAEcrire'
import CarteBien from '../../components/Refonte/CarteBien'

const SERVICES = [
  {
    num: '01',
    titre: 'Acheter un bien',
    points: [
      'Identification de votre besoin',
      'Sélection et visite ciblées',
      'Négociation financière',
      'Compromis, signature',
    ],
    lien: { to: '/acheter', label: 'Toutes nos histoires' },
  },
  {
    num: '02',
    titre: 'Vendre un bien',
    points: [
      'Estimation',
      'Valorisation et mise en lumière',
      'Commercialisation',
      'Portefeuille clients acquéreurs conséquent',
    ],
    lien: { to: '/vendre', label: 'Estimer votre bien' },
  },
  {
    num: '03',
    titre: 'Investir dans l’immobilier',
    points: [
      'Chasseur de bien',
      'Résidences secondaires au Sénégal, destination soleil 365/365j',
      'Accompagnement, étude de faisabilité et rentabilité',
    ],
    lien: { to: '/nous-contacter', label: 'Nous contacter' },
  },
]

function Accueil() {
  const [biens, setBiens] = useState([])
  const [avis, setAvis] = useState([])
  const [avisActif, setAvisActif] = useState(0)
  const [formulaireAvis, setFormulaireAvis] = useState(false)
  const [avisEnvoye, setAvisEnvoye] = useState(false)

  useEffect(() => {
    const chargerBiens = async () => {
      try {
        const reponse = await fetch(
          `${process.env.REACT_APP_API_URL}/bien/all-biens?status=disponible&triPar=croissant&pageSize=3`,
        )
        if (reponse.ok) {
          const resultat = await reponse.json()
          setBiens(resultat.biens || [])
        }
      } catch (e) {
        // en cas d'erreur réseau, la section reste simplement vide
      }
    }
    const chargerAvis = async () => {
      try {
        const reponse = await fetch(`${process.env.REACT_APP_API_URL}/user/reviews`)
        if (reponse.ok) {
          const resultat = await reponse.json()
          setAvis(Array.isArray(resultat) ? resultat : [])
        }
      } catch (e) {
        // idem
      }
    }
    chargerBiens()
    chargerAvis()
  }, [])

  // Les avis défilent seuls, un à la fois
  useEffect(() => {
    if (avis.length < 2) return undefined
    const minuteur = setInterval(() => setAvisActif((i) => (i + 1) % avis.length), 8000)
    return () => clearInterval(minuteur)
  }, [avis.length])

  const avisCourant = avis[avisActif]
  const avisLong = avisCourant && avisCourant.description && avisCourant.description.length > 280

  return (
    <>
      <Helmet>
        <title>Marli Immobilier - Agence immobilière à Besançon et dans le Doubs</title>
        <meta
          name='description'
          content="Marli Immobilier, agence indépendante à Besançon. Achat, vente et estimation immobilière dans le Doubs et à 50km alentours. Votre passeur d'histoires immobilières."
        />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://marli-immobilier.com/' />
      </Helmet>

      <h1 className={styles.titreReferencement}>
        Marli Immobilier - Agence immobilière à Besançon et dans le Doubs
      </h1>

      {/* L'arrivée */}
      <section className={styles.arrivee}>
        <div className={styles.arriveeTexte}>
          <img className={styles.arriveeLogo} src={Logo} alt='Marli, passeur d’histoires immobilières' />
          <span className='filet'></span>
          <MachineAEcrire
            className={styles.arriveePhrase}
            texte='Les transactions immobilières sont avant tout des histoires humaines et des passages de témoin'
          />
          <Link to='/acheter' className='lien-souligne'>
            Découvrir nos histoires
          </Link>
        </div>
        <div className={styles.arriveePhoto}>
          <img src={ImgCouverture} alt='Portrait peint dans une rue de Besançon' />
        </div>
      </section>

      {/* La promesse */}
      <Apparition as='section' className={styles.promesse}>
        <span className='etiquette'>Marli</span>
        <p>Nous souhaitons faciliter vos projets immobiliers de leur conception à leur aboutissement.</p>
        <p className={styles.promesseFin}>Votre satisfaction sera notre première gratitude.</p>
      </Apparition>

      {/* Nos nouvelles histoires */}
      {biens.length > 0 && (
        <section className={styles.histoires}>
          <Apparition className={styles.enteteSection}>
            <div>
              <span className='etiquette'>À découvrir</span>
              <h2 className='titre-grand'>Nos nouvelles histoires</h2>
            </div>
            <Link to='/acheter' className='lien-souligne'>
              Nos autres histoires
            </Link>
          </Apparition>
          <div className={styles.grilleBiens}>
            {biens.map((bien) => (
              <Apparition key={bien.ref}>
                <CarteBien bien={bien} hauteurPhoto={560} largeurImage={900} />
              </Apparition>
            ))}
          </div>
        </section>
      )}

      {/* Nos services */}
      <section className={styles.services}>
        <Apparition className={styles.enteteSection}>
          <div>
            <span className='etiquette'>Nos services</span>
            <h2 className='titre-grand'>Que faisons-nous pour vous ?</h2>
          </div>
        </Apparition>
        <div className={styles.grilleServices}>
          {SERVICES.map((s) => (
            <Apparition key={s.num} className={styles.service}>
              <span className={styles.serviceNum}>{s.num}</span>
              <h3>{s.titre}</h3>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link to={s.lien.to} className='lien-souligne'>
                {s.lien.label}
              </Link>
            </Apparition>
          ))}
        </div>
      </section>

      {/* Parole libre */}
      <section className={styles.avis} id='avisContainer'>
        <span className='etiquette'>Parole libre</span>

        {avisCourant && (
          <figure key={avisActif} className={styles.avisCitation}>
            <blockquote className={avisLong ? styles.avisTexteLong : styles.avisTexte}>
              « {avisCourant.description} »
            </blockquote>
            <figcaption className='etiquette'>{avisCourant.pseudo}</figcaption>
          </figure>
        )}

        {avis.length > 1 && (
          <div className={styles.avisReperes}>
            {avis.map((a, i) => (
              <button
                key={i}
                type='button'
                className={i === avisActif ? styles.repereActif : styles.repere}
                onClick={() => setAvisActif(i)}
                aria-label={`Afficher l’avis ${i + 1}`}
              >
                <span></span>
              </button>
            ))}
          </div>
        )}

        {avisEnvoye ? (
          <p className={styles.avisMerci}>Merci pour votre avis !</p>
        ) : (
          !formulaireAvis && (
            <button type='button' className='lien-souligne' onClick={() => setFormulaireAvis(true)}>
              Laisser un avis
            </button>
          )
        )}

        <div id='formAddReview' className={styles.avisFormulaire}>
          {formulaireAvis && (
            <CardAddReview
              visibilityForm={() => setFormulaireAvis(!formulaireAvis)}
              isSuccesSend={(valeur) => setAvisEnvoye(valeur === true)}
            />
          )}
        </div>
      </section>

      {/* La fin */}
      <section className={styles.fin}>
        <MachineAEcrire
          className={styles.finPhrase}
          texte='À vous d’écrire la suite de l’histoire…'
          vitesse={70}
          aLaVue
        />
        <div className={styles.finBoutons}>
          <Link to='/acheter' className='bouton-plein'>
            Découvrir nos histoires
          </Link>
          <Link to='/nous-contacter' className='bouton-contour'>
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  )
}

export default Accueil
