import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './Accueil.module.scss'
import Logo from '../../assets/images/marli-logo.png'
// Photos : J. Jacottot
import ImgCouverture from '../../assets/images/jacottot/couverture-quais-nuit.jpg'
import ImgReflet from '../../assets/images/jacottot/promesse-toits.jpg'
import ImgRefletCouleur from '../../assets/images/jacottot/promesse-verre.jpg'
import ImgAcheter from '../../assets/images/jacottot/service-acheter.jpg'
import ImgVendre from '../../assets/images/jacottot/service-vendre.jpg'
import ImgInvestir from '../../assets/images/jacottot/service-investir.jpg'
import ImgAvis from '../../assets/images/jacottot/avis-ville-soir.jpg'
import CardAddReview from '../../components/CardAddReview/CardAddReview'
import Apparition from '../../components/Refonte/Apparition'
import MachineAEcrire from '../../components/Refonte/MachineAEcrire'
import CarteBien from '../../components/Refonte/CarteBien'

const SERVICES = [
  {
    num: '01',
    titre: 'Acheter un bien',
    photo: ImgAcheter,
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
    photo: ImgVendre,
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
    photo: ImgInvestir,
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
  }, [avis.length, avisActif])

  const changerAvis = (sens) => setAvisActif((i) => (i + sens + avis.length) % avis.length)
  const noteMoyenne = avis.length
    ? (avis.reduce((t, a) => t + (Number(a.stars) || 5), 0) / avis.length).toLocaleString('fr-FR', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })
    : ''
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
        <div className={styles.arriveePhoto}>
          <img src={ImgCouverture} alt='Les quais du Doubs à Besançon, la nuit, et leurs reflets' />
        </div>
        <div className={styles.arriveeTexte}>
          <img className={styles.arriveeLogo} src={Logo} alt='Marli, passeur d’histoires immobilières' />
          <span className='filet'></span>
          <p className={styles.arriveePhrase}>
            Les transactions immobilières sont avant tout des histoires humaines et des passages de témoin
          </p>
          <Link to='/acheter' className='lien-souligne'>
            Découvrir nos histoires
          </Link>
        </div>
      </section>

      {/* La promesse */}
      <section className={styles.promesse}>
        <Apparition className={styles.promessePhotos}>
          <img className={styles.photoArriere} src={ImgReflet} alt='Les toits et clochers de Besançon' loading='lazy' />
          <img className={styles.photoAvant} src={ImgRefletCouleur} alt='Besançon reflétée dans un verre' loading='lazy' />
        </Apparition>
        <Apparition className={styles.promesseTexte}>
          <span className='etiquette'>Marli</span>
          <span className='filet'></span>
          <p>Nous accompagnons votre projet immobilier, de sa conception à son aboutissement.</p>
          <MachineAEcrire
            className={styles.promesseFin}
            texte='Votre satisfaction est notre première gratitude.'
            vitesse={65}
            aLaVue
          />
        </Apparition>
      </section>

      {/* Nos nouvelles histoires */}
      {biens.length > 0 && (
        <section className={styles.histoires}>
          <Apparition className={styles.enteteSection}>
            <span className='etiquette'>À découvrir</span>
            <h2 className='titre-grand'>Nos nouvelles histoires</h2>
          </Apparition>
          <div className={styles.grilleBiens}>
            {biens.map((bien) => (
              <Apparition key={bien.ref}>
                <CarteBien bien={bien} hauteurPhoto={600} largeurImage={900} />
              </Apparition>
            ))}
          </div>
          <div className={styles.lienSousGrille}>
            <Link to='/acheter' className='lien-souligne'>
              Nos autres histoires
            </Link>
          </div>
        </section>
      )}

      {/* Nos services */}
      <section className={styles.services}>
        <Apparition className={styles.enteteSection}>
          <span className='etiquette'>Nos services</span>
          <h2 className='titre-grand'>Que faisons-nous pour vous ?</h2>
        </Apparition>
        <div className={styles.grilleServices}>
          {SERVICES.map((s) => (
            <Apparition key={s.num} className={styles.service}>
              <div className={styles.servicePhoto}>
                <img src={s.photo} alt='' loading='lazy' />
              </div>
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
        <div className={styles.avisPhoto}>
          <img src={ImgAvis} alt='Besançon à la tombée de la nuit, fenêtres éclairées' loading='lazy' />
        </div>
        <div className={styles.avisContenu}>
        <div className={styles.avisResume}>
          <span className='etiquette'>Parole libre</span>
          <h2 className='titre-grand'>Leur histoire avec Marli</h2>
          {avis.length > 0 && (
            <div className={styles.avisNote}>
              <span className={styles.avisMoyenne}>{noteMoyenne}</span>
              <span className={styles.avisSur}>/ 5</span>
              <span className={styles.etoiles} aria-hidden='true'>★★★★★</span>
              <span className={styles.avisNombre}>
                {avis.length} avis
              </span>
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
        </div>

        <div className={styles.avisLecture}>
          {avisCourant && (
            <figure key={avisActif} className={styles.avisCitation}>
              <span className={styles.guillemet} aria-hidden='true'>“</span>
              <blockquote className={avisLong ? styles.avisTexteLong : styles.avisTexte}>
                {avisCourant.description}
              </blockquote>
              <figcaption>
                <span className={styles.avisAuteur}>{avisCourant.pseudo}</span>
                <span className={styles.etoilesPetites} aria-label={`${avisCourant.stars || 5} étoiles sur 5`}>
                  {'★'.repeat(Math.max(0, Math.min(5, Number(avisCourant.stars) || 5)))}
                </span>
              </figcaption>
            </figure>
          )}

          {avis.length > 1 && (
            <div className={styles.avisNavigation}>
              <button type='button' onClick={() => changerAvis(-1)} aria-label='Avis précédent'>
                ←
              </button>
              <span>
                {String(avisActif + 1).padStart(2, '0')} / {String(avis.length).padStart(2, '0')}
              </span>
              <button type='button' onClick={() => changerAvis(1)} aria-label='Avis suivant'>
                →
              </button>
            </div>
          )}
        </div>
        </div>

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
