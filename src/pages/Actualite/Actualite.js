import React from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/banniere-actualites.jpg'
import styles from './Actualite.module.scss'
import { Helmet } from 'react-helmet'

function Actualite() {
const articles = [
                {
      id: 10,
      title: "Plus-Value Immobilière 2026 : Calcul, Exonérations et Astuces d'Optimisation",
      excerpt: "Vous vendez un bien immobilier en 2026 ?",
      date: "2 Février 2026",
      urlImage: "/articles/article_plusvalue_2026.jpg",
      link: "/articles/article_plusvalue_2026.html"
    },

      id: 9,
      title: "Vendre en 2026 : Toutes les Obligations du Vendeur Immobilier",
      excerpt: "Vendre un bien immobilier en 2026 implique de respecter un cadre légal de plus en plus strict",
      date: "26 Janvier 2026",
      urlImage: "/articles/article_obligations_vendeur_2026.jpg",
      link: "/articles/article_obligations_vendeur_2026.html"
    },

            {
      id: 8,
      title: "Investissement Locatif 2026 : Pourquoi Besançon Tire Son Épingle du Jeu",
      excerpt: "Face aux grandes métropoles surchauffées et aux petites villes en déclin",
      date: "19 Janvier 2026",
      urlImage: "/articles/article_investissement_2026.jpg",
      link: "/articles/article_investissement_2026.html"
    },

        {
      id: 7,
      title: "DPE 2026 : L'Interdiction des Logements Classés G Arrive - Êtes-Vous Prêt ?",
      excerpt: "À partir du 1er janvier 2025, les logements classés G+ étaient déjà interdits à la location.",
      date: "12 Janvier 2026",
      urlImage: "/articles/article_dpe_2026.jpg",
      link: "/articles/article_dpe_2026.html"
    },

    {
      id: 1,
      title: "Marché Immobilier Besançon Novembre 2025 : La Stabilisation Tant Attendue",
      excerpt: "Après 24 mois de correction, le marché immobilier bisontin amorce enfin sa stabilisation.",
      date: "11 Novembre 2025",
      urlImage: "/articles/besancon-nov-2025.jpg",
      link: "/articles/marche-besancon-nov-2025.html"
    },
    {
      id: 2,
      title: "Primo-Accédants 2025 : Le Guide Complet pour Acheter à Besançon",
      excerpt: "Budget, quartiers, aides PTZ, financement : tout ce qu'il faut savoir pour réussir votre premier achat immobilier.",
      date: "Novembre 2025",
      urlImage: "/articles/primo-accedants-2025.jpg",
      link: "/articles/primo-accedants-2025.html"
    },
    {
      id: 3,
      title: "Taux de Crédit 2025 : Stratégies pour Obtenir le Meilleur Financement",
      excerpt: "Analyse complète des taux actuels et conseils pour optimiser votre prêt immobilier à Besançon.",
      date: "Novembre 2025",
      urlImage: "/articles/taux-credit-2025.jpg",
      link: "/articles/taux-credit-2025.html"
    },
    {
      id: 4,
      title: "Écoquartiers à Besançon : Où Investir en 2025 ?",
      excerpt: "Focus sur les nouveaux quartiers écologiques bisontins et leurs opportunités d'investissement.",
      date: "Novembre 2025",
      urlImage: "/articles/ecoquartiers-besancon.jpg",
      link: "/articles/ecoquartiers-besancon.html"
    },
    {
      id: 5,
      title: "DPE et Rénovation Énergétique : Guide Complet 2025",
      excerpt: "Tout savoir sur le diagnostic de performance énergétique et les travaux rentables pour valoriser votre bien.",
      date: "Novembre 2025",
      urlImage: "/articles/dpe-renovation-2025.jpg",
      link: "/articles/dpe-renovation-2025.html"
    },
    {
      id: 6,
      title: "Héritage et Succession : Le Guide Immobilier Complet",
      excerpt: "Droits, fiscalité, partage, vente : tout ce qu'il faut savoir pour gérer un bien immobilier hérité.",
      date: "Novembre 2025",
      urlImage: "/articles/heritage-succession-2025.jpg",
      link: "/articles/heritage-succession-2025.html"
    }
  ]


  return (
    <>
      <Helmet>
        <title>Marli Immobilier - Actualités Immobilières Besançon</title>
        <meta name='description' content="Actualité immobilière à Besançon et Franche-Comté" />
      </Helmet>
      <div className={styles.allContainer}>
        <FirstSectionPage ImgPremierePlan={Image} title='ACTUALITÉS' />
        <div className={styles.articlesContainer}>
          <h2>Actualités Immobilières</h2>
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
