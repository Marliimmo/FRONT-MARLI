import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './Actualites.module.scss'
import Image from '../../assets/images/jacottot/bandeau-actualites.jpg' // photo : Jean-Claude Jacottot
import BandeauPage from '../../components/Refonte/BandeauPage'
import Apparition from '../../components/Refonte/Apparition'

// Noms propres et sigles qui gardent leur majuscule quand on harmonise un titre
const NOMS_PROPRES = ['Besançon', 'DPE', 'PTZ', 'Doubs', 'Haut-Doubs', 'Maîche', 'France', 'Marli', 'G', 'G+']

// Titres écrits « À La Manière Anglaise » : majuscule au premier mot seulement, comme en français,
// sauf pour les noms propres et les sigles
function harmoniserTitreArticle(titre) {
  const mots = titre.replace(/ - /g, '. ').split(' ')
  const lettres = mots.filter((m) => /[A-Za-zÀ-ÿ]/.test(m))
  const majuscules = lettres.filter((m) => /^[A-ZÀ-Ý]/.test(m)).length
  if (majuscules < lettres.length / 2) return titre
  let debut = true
  return mots
    .map((m) => {
      const premier = debut
      debut = m.endsWith('.')
      if (NOMS_PROPRES.includes(m.replace(/[^\wÀ-ÿ+-]/g, ''))) return m
      const bas = m.toLowerCase()
      return premier ? bas.charAt(0).toUpperCase() + bas.slice(1) : bas
    })
    .join(' ')
}

// Dates écrites à la main dans le fichier : mois en minuscules, « Aout » → « août »
const soignerDate = (d) => (d || '').toLowerCase().replace('aout', 'août')

// Résumés réécrits pour les articles dont le résumé d'origine ne convenait pas
const RESUMES = {
  '/articles/article-marche-besancon-2026.html':
    'Les chiffres disent une chose, le terrain en dit une autre : une lecture du marché bisontin quartier par quartier, et pourquoi un bien correctement estimé se vend aujourd’hui en moins de trois mois.',
}

// Résumés : les tirets longs deviennent des virgules
const soignerResume = (r) => (r || '').replace(/\s+—\s+/g, ', ')

// La liste des articles est générée automatiquement dans public/articles/articles.json
// par scripts/publish-articles.mjs : rien à modifier ici pour publier un article.
function Actualites() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('/articles/articles.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : []))
      .then((liste) =>
        setArticles(
          (Array.isArray(liste) ? liste : []).map((a) => ({
            ...a,
            title: harmoniserTitreArticle(a.title || ''),
            date: soignerDate(a.date),
            excerpt: RESUMES[a.link] || soignerResume(a.excerpt),
          })),
        ),
      )
      .catch(() => setArticles([]))
  }, [])

  const [premier, ...autres] = articles

  return (
    <>
      <Helmet>
        <title>Actualités immobilières à Besançon et en Franche-Comté - Marli Immobilier</title>
        <meta
          name='description'
          content='Marché immobilier, réglementation, conseils pour vendre ou acheter : l’actualité immobilière locale et nationale décryptée par Marli Immobilier, à Besançon.'
        />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://marli-immobilier.com/actualite' />
      </Helmet>

      <BandeauPage
        positionPhoto='50% 60%'
        photo={Image}
        alt='Un pont de Besançon illuminé la nuit'
        etiquette='Actualités'
        titre='Le journal de Marli'
        accroche='L’immobilier, d’ici et d’ailleurs, décrypté.'
      />

      {/* Le dernier article, en grand */}
      {premier && (
        <Apparition>
          <a href={premier.link} className={styles.une}>
            <div className={styles.unePhoto}>
              <img className='photo-article' src={premier.urlImage} alt={premier.title} />
            </div>
            <div className={styles.uneTexte}>
              <span className='etiquette'>À la une · {premier.date}</span>
              <h2>{premier.title}</h2>
              <p>{premier.excerpt}</p>
              <span className='lien-souligne'>Lire l’article</span>
            </div>
          </a>
        </Apparition>
      )}

      {/* Les autres articles */}
      {autres.length > 0 && (
        <section className={styles.liste}>
          {autres.map((a) => (
            <Apparition key={a.id}>
              <a href={a.link} className={styles.carte}>
                <div className={styles.cartePhoto}>
                  <img className='photo-article' src={a.urlImage} alt={a.title} loading='lazy' />
                </div>
                <span className='etiquette'>{a.date}</span>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
              </a>
            </Apparition>
          ))}
        </section>
      )}
    </>
  )
}

export default Actualites
