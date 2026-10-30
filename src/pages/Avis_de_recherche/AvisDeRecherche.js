import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './AvisDeRecherche.module.scss'
import Image from '../../assets/images/jacottot/bandeau-avis-de-recherche.jpg' // photo : Jean-Claude Jacottot
import BandeauPage from '../../components/Refonte/BandeauPage'
import Apparition from '../../components/Refonte/Apparition'
import Visionneuse from '../../components/Refonte/Visionneuse'
import FormVendreOuRecherche from '../../components/FormVendreOuRecherche/FormVendreOuRecherche'

// Adresse complète d'une affiche (Cloudinary ou ancien stockage)
const adresseAffiche = (url) =>
  url && (url.includes('cloudinary.com') || url.startsWith('http'))
    ? url
    : `${process.env.REACT_APP_URL_BASE_IMAGE}${url || ''}`

function AvisDeRecherche() {
  const [affiches, setAffiches] = useState([])
  const [visionneuse, setVisionneuse] = useState(null)

  useEffect(() => {
    const charger = async () => {
      try {
        const reponse = await fetch(`${process.env.REACT_APP_API_URL}/bien/get-wanteds`)
        if (reponse.ok) {
          const resultat = await reponse.json()
          setAffiches((Array.isArray(resultat) ? resultat : []).filter((w) => w.urlImage).map((w) => adresseAffiche(w.urlImage)))
        }
      } catch (e) {
        // la section reste simplement masquée
      }
    }
    charger()
  }, [])

  return (
    <>
      <Helmet>
        <title>Avis de recherche immobilier à Besançon et dans le Doubs - Marli Immobilier</title>
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://marli-immobilier.com/avis-de-recherche' />
        <meta
          name='description'
          content='Nos acquéreurs cherchent un appartement, une maison ou un local à Besançon, dans le Doubs, la Haute-Saône et le Jura. Vous avez le bien qu’ils attendent ? Déposez aussi votre propre recherche.'
        />
      </Helmet>

      <BandeauPage
        photo={Image}
        alt='La tour de la Pelote et son reflet dans le Doubs'
        etiquette='Avis de recherche'
        titre='Nos clients cherchent'
        accroche='Leur prochain lieu est peut-être le vôtre.'
      />

      {/* Les recherches en cours */}
      {affiches.length > 0 && (
        <section className={styles.recherches}>
          <Apparition className={styles.entete}>
            <span className='etiquette'>Recherches en cours</span>
            <h2 className='titre-grand'>Ils attendent leur histoire</h2>
          </Apparition>
          <div className={styles.grille}>
            {affiches.map((url, k) => (
              <Apparition key={url}>
                <button
                  type='button'
                  className={styles.affiche}
                  onClick={() => setVisionneuse(k)}
                  aria-label={`Agrandir l’avis de recherche ${k + 1}`}
                >
                  <img src={url} alt={`Avis de recherche ${k + 1}`} loading='lazy' />
                </button>
              </Apparition>
            ))}
          </div>
          <div className={styles.appel}>
            <p>Vous avez l’un de ces biens ?</p>
            <Link to='/nous-contacter' className='bouton-plein'>
              Nous contacter
            </Link>
          </div>
        </section>
      )}

      {/* Le formulaire */}
      <section className={styles.formulaire}>
        <div className={styles.formulaireCadre}>
          <span className='etiquette'>Votre recherche</span>
          <h2 className='titre-grand'>Décrivez le lieu que vous cherchez</h2>
          <p className={styles.formulaireTexte}>Nous le cherchons avec vous.</p>
          <FormVendreOuRecherche context='avis' />
        </div>
      </section>

      {visionneuse !== null && (
        <Visionneuse photos={affiches} depart={visionneuse} titre='Avis de recherche' onFermer={() => setVisionneuse(null)} />
      )}
    </>
  )
}

export default AvisDeRecherche
