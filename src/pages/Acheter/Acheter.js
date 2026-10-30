import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './Acheter.module.scss'
import Image from '../../assets/images/jacottot/bandeau-acheter.jpg' // photo : J. Jacottot
import BandeauPage from '../../components/Refonte/BandeauPage'
import Apparition from '../../components/Refonte/Apparition'
import CarteBien, { resumeBien, soigner } from '../../components/Refonte/CarteBien'
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

// Racine d'un titre de série : « Dépendances SUITE » → « Dépendances », « Chez Corneille Chapitre deux » → « Chez Corneille »
const NUMEROS = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6 }
function racineSerie(titre) {
  const t = soigner(titre)
  const m = t.match(/^(.*?)[\s:,.–-]*\b(chapitre\s+\S+|suite|fin|\d+)$/i)
  return m && m[1] ? m[1].trim() : t
}
function rangDansSerie(titre) {
  const t = soigner(titre).toLowerCase()
  const chapitre = t.match(/chapitre\s+(\S+)$/)
  if (chapitre) return NUMEROS[chapitre[1]] || parseInt(chapitre[1], 10) || 1
  if (/\bsuite$/.test(t)) return 2
  if (/\bfin$/.test(t)) return 9
  const nombre = t.match(/(\d+)$/)
  if (nombre) return parseInt(nombre[1], 10)
  return 1
}

// Regroupe en séries les biens qui partagent un même titre de départ
function regrouper(biens) {
  const groupes = new Map()
  biens.forEach((b) => {
    const cle = `${racineSerie(b.title || '').toLowerCase()}|${(b.localisation || '').toLowerCase()}`
    if (!groupes.has(cle)) groupes.set(cle, [])
    groupes.get(cle).push(b)
  })
  const elements = []
  const dejaPlaces = new Set()
  biens.forEach((b) => {
    const cle = `${racineSerie(b.title || '').toLowerCase()}|${(b.localisation || '').toLowerCase()}`
    if (dejaPlaces.has(cle)) return
    dejaPlaces.add(cle)
    const groupe = groupes.get(cle)
    if (groupe.length > 1) {
      const chapitres = [...groupe].sort((x, y) => rangDansSerie(x.title) - rangDansSerie(y.title))
      elements.push({ type: 'serie', cle, titre: racineSerie(chapitres[0].title), chapitres })
    } else {
      elements.push({ type: 'bien', cle: b.ref, bien: b })
    }
  })
  return elements
}

function CarteSerie({ serie }) {
  const premier = serie.chapitres[0]
  const photo = premier?._medias?.image_galerie_0?.url
  const prix = serie.chapitres.filter((c) => c.status === 'disponible' && typeof c.prix === 'number').map((c) => c.prix)
  const fourchette = prix.length
    ? prix.length > 1
      ? `De ${Math.min(...prix).toLocaleString('fr-FR')} € à ${Math.max(...prix).toLocaleString('fr-FR')} €`
      : `${prix[0].toLocaleString('fr-FR')} €`
    : ''
  return (
    <div className={styles.serie}>
      <Link to={`/bien/${premier.ref}`} className={styles.seriePhoto} aria-label={serie.titre}>
        {photo && <img className='photo-bien' src={imageUrl(photo, 1400)} alt={serie.titre} loading='lazy' />}
      </Link>
      <div className={styles.serieTexte}>
        <span className='etiquette'>{soigner(premier.localisation)}</span>
        <h3>{serie.titre}</h3>
        <span className={styles.serieSousTitre}>Une série de {serie.chapitres.length} biens</span>
        {fourchette && <span className={styles.serieFourchette}>{fourchette}</span>}
        <div className={styles.serieListe}>
          {serie.chapitres.map((c) => {
            const r = resumeBien(c)
            return (
              <Link key={c.ref} to={`/bien/${c.ref}`} className={styles.serieLigne}>
                <span className={styles.serieNom}>
                  {r.titre}
                  {r.chapitre ? ` · ${r.chapitre}` : ''}
                </span>
                <span className={styles.serieDetails}>{r.details}</span>
                <span className={styles.seriePrix}>{r.prix}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
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
          <CarteSerie serie={el} />
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
