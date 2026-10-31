import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './Actualites.module.scss'
import Image from '../../assets/images/jacottot/bandeau-actualites.jpg' // photo : Jean-Claude Jacottot
import BandeauPage from '../../components/Refonte/BandeauPage'
import Apparition from '../../components/Refonte/Apparition'

// La liste des articles est générée automatiquement dans public/articles/articles.json
// par scripts/publish-articles.mjs : rien à modifier ici pour publier un article.
function Actualites() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('/articles/articles.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : []))
      .then((liste) => setArticles(Array.isArray(liste) ? liste : []))
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
        photo={Image}
        alt='Les quais de Besançon la nuit'
        etiquette='Actualités'
        titre='Le journal de Marli'
        accroche='L’immobilier, d’ici et d’ailleurs, décrypté.'
      />

      {/* Le dernier article, en grand */}
      {premier && (
        <Apparition>
          <a href={premier.link} className={styles.une}>
            <div className={styles.unePhoto}>
              <img className='photo-illustration' src={premier.urlImage} alt={premier.title} />
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
                  <img className='photo-illustration' src={a.urlImage} alt={a.title} loading='lazy' />
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
