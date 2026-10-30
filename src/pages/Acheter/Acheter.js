import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './Acheter.module.scss'
import Image from '../../assets/images/jacottot/bandeau-acheter.jpg' // photo : J. Jacottot
import BandeauPage from '../../components/Refonte/BandeauPage'
import Apparition from '../../components/Refonte/Apparition'
import CarteBien, { resumeBien } from '../../components/Refonte/CarteBien'
import BlocSerie from '../../components/Refonte/BlocSerie'
import { regrouper } from '../../components/Refonte/series'
import { imageUrl } from '../../utils/images'

const ONGLETS = [
  { id: 'tous', label: 'Tous les biens' },
  { id: 'appartements', label: 'Appartements' },
  { id: 'maisons', label: 'Maisons et propriétés' },
  { id: 'pro', label: 'Programmes et locaux' },
]

// Catégorie d'un bien d'après la première ligne de ses caractéristiques
function categorie(bien) {
  const type = ((bien.caracteristiques || '').split('#')[0] || '').toLowerCase()
  if (/appartement|duplex|studio|loft/.test(type)) return 'appartements'
  if (/maison|propri[ée]t[ée]|immeuble|villa|ferme|ch[âa]teau/.test(type)) return 'maisons'
  return 'pro'
}

function Acheter() {
  const [biens, setBiens] = useState([])
  const [chargement, setChargement] = useState(true)
  const [onglet, setOnglet] = useState('tous')
  const [tousLesVendus, setTousLesVendus] = useState(false)

  useEffect(() => {
    const charger = async () => {
      try {
        const reponse = await fetch(
          `${process.env.REACT_APP_API_URL}/bien/all-biens?filter&triPar=croissant&page=1&pageSize=200`,
        )
        if (reponse.ok) {
          const resultat = await reponse.json()
          setBiens(resultat.biens || [])
        }
      } catch (e) {
        // serveur indisponible : la page affiche simplement le message d'attente
      }
      setChargement(false)
    }
    charger()
  }, [])

  const { elements, nombre, vendus } = useMemo(() => {
    const enVente = biens.filter((b) => b.status === 'disponible' || b.status === 'sous-compromis')
    const filtres = enVente.filter((b) => onglet === 'tous' || categorie(b) === onglet)
    return {
      elements: regrouper(filtres),
      nombre: filtres.length,
      vendus: biens.filter((b) => b.status === 'vendu'),
    }
  }, [biens, onglet])

  // le premier bien isolé passe en vedette ; les séries suivent ; les autres biens viennent en grille
  const indexVedette = elements.findIndex((e) => e.type === 'bien')
  const vedette = indexVedette >= 0 ? elements[indexVedette] : null
  const series = elements.filter((e) => e.type === 'serie')
  const seuls = elements.filter((e, k) => e.type === 'bien' && k !== indexVedette)
  const vendusAffiches = tousLesVendus ? vendus : vendus.slice(0, 6)

  return (
    <>
      <Helmet>
        <title>Acheter un bien immobilier à Besançon et alentours - Marli Immobilier</title>
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://marli-immobilier.com/acheter' />
        <meta
          name='description'
          content='Appartements, maisons et propriétés à Besançon, Maîche et dans le Doubs. Chaque adresse a son histoire : découvrez les biens de Marli Immobilier.'
        />
      </Helmet>

      <BandeauPage
        photo={Image}
        alt='La citadelle de Besançon dans la brume'
        etiquette='Acheter'
        titre='Nos adresses'
        accroche='Chaque adresse a son histoire. À vous d’en écrire la suite.'
        positionPhoto='50% 40%'
      />

      <div className={styles.filtres}>
        <div className={styles.onglets} role='tablist' aria-label='Type de bien'>
          {ONGLETS.map((o) => (
            <button
              key={o.id}
              type='button'
              role='tab'
              aria-selected={onglet === o.id}
              className={onglet === o.id ? styles.ongletActif : styles.onglet}
              onClick={() => setOnglet(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
        {!chargement && (
          <span className={styles.compte}>
            {nombre} {nombre > 1 ? 'biens disponibles' : 'bien disponible'}
          </span>
        )}
      </div>

      {chargement && <div className={styles.attente} aria-busy='true'></div>}

      {!chargement && elements.length === 0 && (
        <p className={styles.vide}>Aucun bien dans cette catégorie pour le moment.</p>
      )}

      {/* Le premier bien, en grand */}
      {vedette && vedette.type === 'bien' && (
        <Apparition>
          <Link to={`/bien/${vedette.bien.ref}`} className={styles.vedette}>
            <div className={styles.vedettePhoto}>
              {resumeBien(vedette.bien).statut && <span className='pastille'>{resumeBien(vedette.bien).statut}</span>}
              {vedette.bien?._medias?.image_galerie_0?.url && (
                <img
                  className='photo-bien'
                  src={imageUrl(vedette.bien._medias.image_galerie_0.url, 1600)}
                  alt={resumeBien(vedette.bien).titre}
                />
              )}
            </div>
            <div className={styles.vedetteTexte}>
              <span className='etiquette'>{resumeBien(vedette.bien).lieu}</span>
              <h2>{resumeBien(vedette.bien).titre}</h2>
              {resumeBien(vedette.bien).chapitre && (
                <span className={styles.vedetteChapitre}>{resumeBien(vedette.bien).chapitre}</span>
              )}
              <span className={styles.vedetteDetails}>{resumeBien(vedette.bien).details}</span>
              <span className={styles.vedettePrix}>{resumeBien(vedette.bien).prix}</span>
              <span className='lien-souligne'>Lire son histoire</span>
            </div>
          </Link>
        </Apparition>
      )}

      {/* Les séries, puis les autres biens deux par deux */}
      {series.map((el) => (
        <Apparition key={el.cle} className={styles.blocSerie}>
          <BlocSerie serie={el} />
        </Apparition>
      ))}

      {seuls.length > 0 && (
        <div className={styles.grille}>
          {seuls.map((el) => (
            <Apparition key={el.cle}>
              <CarteBien bien={el.bien} hauteurPhoto={480} largeurImage={1000} />
            </Apparition>
          ))}
        </div>
      )}

      {/* Les histoires déjà écrites */}
      {vendus.length > 0 && (
        <section className={styles.vendus}>
          <Apparition className={styles.entete}>
            <span className='etiquette'>Vendus</span>
            <h2 className='titre-grand'>Les histoires déjà écrites</h2>
          </Apparition>
          <div className={styles.grilleVendus}>
            {vendusAffiches.map((b) => (
              <Link key={b.ref} to={`/bien/${b.ref}`} className={styles.vendu}>
                <div className={styles.venduPhoto}>
                  {b?._medias?.image_galerie_0?.url && (
                    <img src={imageUrl(b._medias.image_galerie_0.url, 700)} alt={resumeBien(b).titre} loading='lazy' />
                  )}
                </div>
                <span className='etiquette'>{resumeBien(b).lieu}</span>
                <span className={styles.venduTitre}>{resumeBien(b).titre}</span>
              </Link>
            ))}
          </div>
          {vendus.length > 6 && (
            <div className={styles.lienCentre}>
              <button type='button' className='bouton-contour' onClick={() => setTousLesVendus(!tousLesVendus)}>
                {tousLesVendus ? 'Voir moins d’histoires' : `Voir les ${vendus.length} histoires`}
              </button>
            </div>
          )}
        </section>
      )}

      {/* Avis de recherche */}
      <section className={styles.recherche}>
        <p className={styles.recherchePhrase}>Votre histoire n’est pas encore ici ?</p>
        <p className={styles.rechercheTexte}>Décrivez le lieu que vous cherchez : nous le cherchons avec vous.</p>
        <Link to='/avis-de-recherche' className='bouton-plein'>
          Déposer un avis de recherche
        </Link>
      </section>
    </>
  )
}

export default Acheter
