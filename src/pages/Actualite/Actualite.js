import React from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/banniere-actualites.jpg'
import styles from './Actualite.module.scss'
import { Helmet } from 'react-helmet'

function Actualite() {
  const articles = [
    {
      id: 1,
      title: "Marché Immobilier Besançon Novembre 2025 : La Stabilisation Tant Attendue",
      excerpt: "Après 24 mois de correction, le marché immobilier bisontin amorce enfin sa stabilisation.",
      date: "11 Novembre 2025",
      urlImage: "/articles/besancon-nov-2025.jpg",
      link: "/articles/marche-besancon-nov-2025.html"
    }
  ]

  return (
    <>
      <Helmet>
        <title>Marli Immobilier - Actualité Immobilière Besançon</title>
        <meta name='description' content="Actualité immobilière à Besançon et Franche-Comté" />
      </Helmet>
      <div className={styles.allContainer}>
        <FirstSectionPage ImgPremierePlan={Image} title='ACTUALITÉ' />
        <div className={styles.articlesContainer}>
          <h2>Actualité Immobilière</h2>
          <div className={styles.articlesGrid}>
            {articles.map(article => (
              <article key={article.id} className={styles.articleCard}>
                <div className={styles.imageContainer}>
                  <img src={article.urlImage} alt={article.title} />
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

export default Actualite
