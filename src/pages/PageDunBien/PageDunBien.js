import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './PageDunBien.module.scss'
import { imageUrl, photosDuBien } from '../../utils/images'
import CarteBien, { resumeBien, soigner } from '../../components/Refonte/CarteBien'
import Apparition from '../../components/Refonte/Apparition'
import Visionneuse from '../../components/Refonte/Visionneuse'
import BlocSerie from '../../components/Refonte/BlocSerie'
import { cleSerie, racineSerie, rangDansSerie } from '../../components/Refonte/series'

const TELEPHONE = '06 88 74 06 21'
const TELEPHONE_LIEN = 'tel:+33688740621'

// Lignes de caractéristiques qui relèvent des mentions réglementaires
const REGLEMENTAIRE = /(DPE|GES|diagnostic|dépenses|énergie|risques|g[ée]orisques|proc[ée]dure|copropri[ée]t[ée]|lots?\b|charges|honoraires|taxe fonci[èe]re|\bTF\b)/i

// Retourne une URL « embed » pour YouTube ou Vimeo, sinon null (vidéo hébergée lue directement)
const urlVideoIntegree = (url) => {
  if (!url) return null
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/)
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return null
}

// Découpe le récit : les phrases courtes du début forment l'ouverture,
// celles de la fin forment la signature, le reste se lit d'un seul tenant.
function decouperRecit(histoire, titre) {
  const paragraphes = (histoire || '')
    .split(/\n+/)
    .map((p) => soigner(p))
    .filter(Boolean)
  const titreSimple = (titre || '').toLowerCase()
  const debut = []
  let i = 0
  // l'ouverture s'arrête après la première vraie phrase (terminée par un point)
  while (i < paragraphes.length && paragraphes[i].length < 90) {
    const p = paragraphes[i]
    i += 1
    if (p.toLowerCase() === titreSimple) continue
    debut.push(p)
    if (/[.!?…]$/.test(p)) break
  }
  let j = paragraphes.length
  const fin = []
  while (j > i && paragraphes[j - 1].length < 70) {
    fin.unshift(paragraphes[j - 1])
    j -= 1
  }
  // si tout le texte est court, on le garde dans le corps
  if (j <= i) return { ouverture: [], corps: paragraphes, signature: [] }
  return { ouverture: debut, corps: paragraphes.slice(i, j), signature: fin }
}

function PageDunBien() {
  const { reference } = useParams()
  const [bien, setBien] = useState(null)
  const [chargement, setChargement] = useState(true)
  const [tousLesBiens, setTousLesBiens] = useState([])
  const [visionneuse, setVisionneuse] = useState(null)

  useEffect(() => {
    let actif = true
    setChargement(true)
    setBien(null)
    window.scrollTo(0, 0)

    const charger = async () => {
      try {
        const reponse = await fetch(`${process.env.REACT_APP_API_URL}/bien/get-one?ref=${reference}`)
        if (reponse.ok) {
          const resultat = await reponse.json()
          if (actif) setBien(resultat && resultat.ref ? resultat : null)
        }
      } catch (e) {
        // bien introuvable ou serveur indisponible
      }
      if (actif) setChargement(false)
    }
    // tous les biens : pour retrouver ceux de la même série et en proposer d'autres
    const chargerAutres = async () => {
      try {
        const reponse = await fetch(
          `${process.env.REACT_APP_API_URL}/bien/all-biens?filter&triPar=croissant&page=1&pageSize=200`,
        )
        if (reponse.ok) {
          const resultat = await reponse.json()
          if (actif) setTousLesBiens(resultat.biens || [])
        }
      } catch (e) {
        // idem
      }
    }
    charger()
    chargerAutres()
    return () => {
      actif = false
    }
  }, [reference])

  const vue = useMemo(() => {
    if (!bien) return null
    const r = resumeBien(bien)
    const carac = (bien.caracteristiques || '')
      .split('#')
      .map((c) => soigner(c).replace(/\s+/g, ' '))
      .filter(Boolean)
    const reglementaire = carac.filter((c) => REGLEMENTAIRE.test(c))
    const descriptif = carac.filter((c) => !REGLEMENTAIRE.test(c))
    // sans doublons (une même ligne saisie deux fois)
    const details = descriptif.filter(
      (c, k) => descriptif.findIndex((d) => d.toLowerCase() === c.toLowerCase()) === k,
    )
    return {
      ...r,
      photos: photosDuBien(bien._medias),
      chiffres: details.slice(0, 4),
      details: details.slice(2),
      reglementaire,
      recit: decouperRecit(bien.histoire, r.titre),
      video: bien?._medias?.video_bien?.url,
      vendu: bien.status === 'vendu',
      statut:
        bien.status === 'vendu' ? 'Vendu' : bien.status === 'sous-compromis' ? 'Sous compromis' : 'Disponible',
    }
  }, [bien])

  // La série du bien (au moins un autre bien encore en vente avec le même début de titre)
  const { serie, autres } = useMemo(() => {
    if (!bien) return { serie: null, autres: [] }
    const cle = cleSerie(bien)
    const freres = tousLesBiens.filter((b) => cleSerie(b) === cle && b.status !== 'vendu')
    const membres = freres.some((b) => b.ref === bien.ref) ? freres : [bien, ...freres]
    const enSerie = membres.length > 1
    const s = enSerie
      ? {
          cle,
          titre: racineSerie(bien.title || ''),
          chapitres: [...membres].sort((x, y) => rangDansSerie(x.title) - rangDansSerie(y.title)),
        }
      : null
    const refsSerie = new Set(membres.map((b) => b.ref))
    const a = tousLesBiens
      .filter((b) => b.status === 'disponible' && b.ref !== bien.ref && !(enSerie && refsSerie.has(b.ref)))
      .slice(0, 3)
    return { serie: s, autres: a }
  }, [bien, tousLesBiens])

  if (chargement) {
    return <div className={styles.attente} aria-busy='true'></div>
  }

  if (!bien || !vue) {
    return (
      <section className={styles.introuvable}>
        <span className='etiquette'>Bien introuvable</span>
        <h1 className='titre-grand'>Cette histoire n’est plus en ligne</h1>
        <p>Le bien a peut-être été vendu ou retiré. D’autres histoires vous attendent.</p>
        <Link to='/acheter' className='bouton-plein'>
          Découvrir nos histoires
        </Link>
      </section>
    )
  }

  const { photos } = vue
  const filtrePhoto = vue.vendu ? { filter: 'grayscale(1)' } : undefined
  // photos affichées après le récit : une pleine largeur, puis deux côte à côte, etc.
  const suite = photos.slice(1, 8)
  const blocsPhotos = []
  for (let k = 0; k < suite.length; ) {
    if (blocsPhotos.length % 2 === 0) {
      blocsPhotos.push({ type: 'pleine', photos: [{ url: suite[k], index: k + 1 }] })
      k += 1
    } else {
      const duo = suite.slice(k, k + 2).map((url, d) => ({ url, index: k + 1 + d }))
      blocsPhotos.push({ type: duo.length === 2 ? 'duo' : 'pleine', photos: duo })
      k += 2
    }
  }
  const description = (bien.histoire || '').replace(/\s+/g, ' ').trim().slice(0, 155)

  return (
    <>
      <Helmet>
        <title>{`${vue.titre}${vue.chapitre ? ` · ${vue.chapitre}` : ''} · ${vue.lieu} · Marli Immobilier`}</title>
        <meta name='description' content={description} />
        <link rel='canonical' href={`https://marli-immobilier.com/bien/${bien.ref}`} />
      </Helmet>

      {/* L'arrivée */}
      <section className={styles.arrivee}>
        {photos[0] && (
          <img
            className={styles.arriveePhoto}
            src={imageUrl(photos[0], 2000)}
            alt={vue.titre}
            style={filtrePhoto}
          />
        )}
        <div className={styles.arriveeTexte}>
          <div className={styles.arriveeTitre}>
            <span className='etiquette'>{vue.lieu}</span>
            <h1>{vue.titre}</h1>
            {vue.chapitre && <span className={styles.chapitre}>{vue.chapitre}</span>}
          </div>
          <div className={styles.arriveePrix}>
            {bien.status !== 'disponible' && <span className={styles.statut}>{vue.statut}</span>}
            {bien.status !== 'vendu' && <span className={styles.prix}>{vue.prix}</span>}
            <span className='etiquette'>{vue.chiffres.slice(0, 2).join(' · ')}</span>
            {photos.length > 1 && (
              <button type='button' className='lien-souligne' onClick={() => setVisionneuse(0)}>
                Voir les {photos.length} photos
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Les chiffres clés */}
      {vue.chiffres.length > 0 && (
        <div className={styles.chiffres}>
          {vue.chiffres.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      )}

      {/* Le récit, d'un seul tenant */}
      <section className={styles.recit}>
        <Apparition className={styles.ouverture}>
          <span className='etiquette'>L’histoire du lieu</span>
          {vue.recit.ouverture.map((p, k) =>
            k === vue.recit.ouverture.length - 1 ? (
              <p key={p} className={styles.ouverturePhrase}>
                {p}
              </p>
            ) : (
              <p key={p} className={styles.ouvertureSurtitre}>
                {p}
              </p>
            ),
          )}
          <span className='filet'></span>
        </Apparition>

        <div className={styles.lecture}>
          <article className={styles.texte}>
            {vue.recit.corps.map((p, k) => (
              <p key={k}>{p}</p>
            ))}
            {vue.recit.signature.length > 0 && (
              <p className={styles.signature}>
                {vue.recit.signature.map((s, k) => (
                  <span key={k}>{s}</span>
                ))}
              </p>
            )}
          </article>

          <aside className={styles.encadre}>
            <span className='etiquette'>{vue.statut}</span>
            <span className={styles.encadrePrix}>{vue.prix}</span>
            <span className={styles.encadreInfos}>{vue.chiffres.slice(0, 2).join(' · ')}</span>
            {bien.status !== 'vendu' && (
              <Link to='/nous-contacter' state={{ reference: bien.ref, titre: vue.titre }} className='bouton-plein'>
                Organiser une visite
              </Link>
            )}
            <div className={styles.encadreContact}>
              <span>Néné Mar, Marli Immobilier</span>
              <a href={TELEPHONE_LIEN}>{TELEPHONE}</a>
              <span className={styles.reference}>Réf. {bien.ref}</span>
            </div>
          </aside>
        </div>
      </section>

      {/* Les photos, après le récit */}
      {blocsPhotos.length > 0 && (
        <section className={styles.photos}>
          {blocsPhotos.map((bloc, k) => (
            <Apparition key={k} className={bloc.type === 'duo' ? styles.photosDuo : styles.photosPleine}>
              {bloc.photos.map((p) => (
                <button
                  key={p.index}
                  type='button'
                  className={styles.photo}
                  onClick={() => setVisionneuse(p.index)}
                  aria-label={`Agrandir la photo ${p.index + 1}`}
                >
                  <img src={imageUrl(p.url, bloc.type === 'duo' ? 1200 : 2000)} alt='' loading='lazy' style={filtrePhoto} />
                </button>
              ))}
            </Apparition>
          ))}
          {photos.length > 1 && (
            <div className={styles.photosLien}>
              <button type='button' className='bouton-contour' onClick={() => setVisionneuse(0)}>
                Voir toutes les photos ({photos.length})
              </button>
            </div>
          )}
        </section>
      )}

      {/* La visite vidéo */}
      {vue.video && (
        <section className={styles.video}>
          <span className='etiquette'>Visite vidéo</span>
          <div className={styles.videoCadre}>
            {urlVideoIntegree(vue.video) ? (
              <iframe
                src={urlVideoIntegree(vue.video)}
                title='Visite vidéo du bien'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
              />
            ) : (
              <video src={vue.video} controls playsInline />
            )}
          </div>
        </section>
      )}

      {/* Le bien en détail */}
      <section className={styles.details}>
        <div className={styles.detailsColonne}>
          <h2 className='titre-moyen'>Le bien en détail</h2>
          <ul className={styles.listeDetails}>
            {vue.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        {vue.reglementaire.length > 0 && (
          <div className={styles.detailsColonne}>
            <h2 className='titre-moyen'>Informations réglementaires</h2>
            <div className={styles.reglementaire}>
              {vue.reglementaire.map((d) => (
                <p key={d}>{d}</p>
              ))}
              <p>Réf. {bien.ref}</p>
            </div>
          </div>
        )}
      </section>

      {/* La série */}
      {serie && (
        <section className={styles.serie}>
          <BlocSerie serie={serie} refCourante={bien.ref} titreSection='La série' />
        </section>
      )}

      {/* D'autres histoires */}
      {autres.length > 0 && (
        <section className={styles.autres}>
          <Apparition className={styles.autresEntete}>
            <span className='etiquette'>À découvrir aussi</span>
            <h2 className='titre-grand'>D’autres histoires</h2>
          </Apparition>
          <div className={styles.autresGrille}>
            {autres.map((b) => (
              <Apparition key={b.ref}>
                <CarteBien bien={b} hauteurPhoto={420} largeurImage={800} />
              </Apparition>
            ))}
          </div>
        </section>
      )}

      {/* La fin */}
      {bien.status !== 'vendu' && (
        <section className={styles.fin}>
          <p className={styles.finPhrase}>Ce lieu vous parle ?</p>
          <p className={styles.finTexte}>Venez le découvrir et écrire la suite de son histoire.</p>
          <div className={styles.finBoutons}>
            <Link to='/nous-contacter' state={{ reference: bien.ref, titre: vue.titre }} className='bouton-plein'>
              Organiser une visite
            </Link>
            <a href={TELEPHONE_LIEN} className='bouton-contour'>
              {TELEPHONE}
            </a>
          </div>
        </section>
      )}

      {/* Barre d'action fixe sur téléphone */}
      {bien.status !== 'vendu' && (
        <div className={styles.barreMobile}>
          <span>{vue.prix}</span>
          <Link to='/nous-contacter' state={{ reference: bien.ref, titre: vue.titre }} className='bouton-plein'>
            Visiter
          </Link>
        </div>
      )}

      {visionneuse !== null && (
        <Visionneuse
          photos={photos}
          depart={visionneuse}
          titre={vue.titre}
          noirEtBlanc={vue.vendu}
          onFermer={() => setVisionneuse(null)}
        />
      )}
    </>
  )
}

export default PageDunBien
