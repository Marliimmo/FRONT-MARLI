import React, { useEffect, useState } from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/banniere-actualites.jpg'
import styles from './Actualites.module.scss'
import { Helmet } from 'react-helmet-async'

function Actualites() {
// La liste des articles est générée automatiquement dans public/articles/articles.json
  // par scripts/publish-articles.mjs : plus besoin de modifier ce fichier pour publier.
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('/articles/articles.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : []))
      .then(setArticles)
      .catch(() => setArticles([]))
  }, [])


  return (
    <>
      <Helmet>
        <title>Marli Immobilier - Actualités Immobilières Besançon</title>
        <meta name='description' content="Actualité immobilière à Besançon et Franche-Comté" />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://marli-immobilier.com/actualite' />
      </Helmet>
      <div className={styles.allContainer}>
        <FirstSectionPage ImgPremierePlan={Image} title='ACTUALITÉS' />
        <div className={styles.articlesContainer}>
          <h2>Actualités Immobilières</h2>
          <div className={styles.articlesGrid}>
            {articles.map(article => (
              <article key={article.id} className={styles.articleCard}>
                <div className={styles.imageContainer}>
                  <img src={article.urlImage} alt={article.title} loading="lazy" />
                </div>
                <div className={styles.contentContainer}>
                  <h3>{article.title}</h3>
                  <p className={styles.date}>{article.date}</p>
                  <p className={styles.excerpt}>{article.excerpt}</p>
                  <a href={article.link} className={styles.readMore}>
                    Lire l'article →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Actualites
