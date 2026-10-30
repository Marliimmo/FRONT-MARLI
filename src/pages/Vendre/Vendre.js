import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './Vendre.module.scss'
import Image from '../../assets/images/jacottot/bandeau-vendre.jpg' // photo : Jean-Claude Jacottot
import BandeauPage from '../../components/Refonte/BandeauPage'
import Apparition from '../../components/Refonte/Apparition'
import { resumeBien } from '../../components/Refonte/CarteBien'
import FormVendreOuRecherche from '../../components/FormVendreOuRecherche/FormVendreOuRecherche'
import { imageUrl } from '../../utils/images'

const CRITERES = [
  'Chaque bien est unique : sa valeur dépend de plusieurs variables.',
  'L’année de construction, le standing, la rareté, l’état général du bien et du bâtiment.',
  'L’environnement visuel et sonore, la comparaison avec des biens similaires, le marché local.',
  'Et notre petit doigt…',
]

const ETAPES = [
  {
    titre: 'L’estimation',
    texte: 'Une visite attentive et une analyse du marché local pour fixer le prix juste, condition d’une vente sereine.',
  },
  {
    titre: 'Le récit',
    texte: 'Nous cherchons l’histoire de votre bien et nous l’écrivons : c’est elle qui donne envie de le visiter.',
  },
  {
    titre: 'La mise en lumière',
    texte: 'Des photos soignées, une annonce sur notre site, nos réseaux et les portails, auprès de notre portefeuille d’acquéreurs.',
  },
  {
    titre: 'Le passage de témoin',
    texte: 'Visites, négociation, compromis, signature : nous vous accompagnons jusqu’à la remise des clés.',
  },
]

function Vendre() {
  const [vendus, setVendus] = useState([])

  useEffect(() => {
    const charger = async () => {
      try {
        const reponse = await fetch(
          `${process.env.REACT_APP_API_URL}/bien/all-biens?status=vendu&triPar=decroissant&pageSize=6`,
        )
        if (reponse.ok) {
          const resultat = await reponse.json()
          setVendus((resultat.biens || []).slice(0, 6))
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
        <title>Vendre votre bien immobilier à Besançon et alentours - Marli Immobilier</title>
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://marli-immobilier.com/vendre' />
        <meta
          name='description'
          content='Estimation au prix juste et vente de votre bien à Besançon, dans le Doubs, la Haute-Saône et le Jura. Marli Immobilier raconte l’histoire de votre bien et vous accompagne jusqu’à la signature.'
        />
      </Helmet>

      <BandeauPage
        photo={Image}
        alt='Les quais de Besançon et leurs reflets'
        etiquette='Vendre'
        titre='Combien ça coûte ?'
        accroche='Une estimation au prix juste, puis une histoire racontée pour trouver ceux qui prendront le relais.'
      />

      {/* L'estimation */}
      <section className={styles.estimation}>
        <Apparition className={styles.estimationTitre}>
          <span className='etiquette'>L’estimation</span>
          <h2 className='titre-grand'>Une estimation au prix juste</h2>
        </Apparition>
        <ol className={styles.criteres}>
          {CRITERES.map((c, k) => (
            <Apparition as='li' key={c}>
              <span className={styles.numero}>{String(k + 1).padStart(2, '0')}</span>
              <p>{c}</p>
            </Apparition>
          ))}
        </ol>
      </section>

      {/* La méthode */}
      <section className={styles.methode}>
        <Apparition className={styles.entete}>
          <span className='etiquette'>Notre méthode</span>
          <h2 className='titre-grand'>De l’estimation à la remise des clés</h2>
        </Apparition>
        <div className={styles.etapes}>
          {ETAPES.map((e, k) => (
            <Apparition key={e.titre} className={styles.etape}>
              <span className={styles.numero}>{String(k + 1).padStart(2, '0')}</span>
              <h3>{e.titre}</h3>
              <p>{e.texte}</p>
            </Apparition>
          ))}
        </div>
      </section>

      {/* Le formulaire */}
      <section className={styles.formulaire} id='estimation'>
        <div className={styles.formulaireCadre}>
          <span className='etiquette'>Estimation offerte</span>
          <h2 className='titre-grand'>Parlez-nous de votre bien</h2>
          <p className={styles.formulaireTexte}>
            Quelques informations suffisent : nous revenons vers vous pour convenir d’une visite.
          </p>
          <FormVendreOuRecherche context='vendre' />
        </div>
      </section>

      {/* Les histoires déjà écrites */}
      {vendus.length > 0 && (
        <section className={styles.vendus}>
          <Apparition className={styles.entete}>
            <span className='etiquette'>Ils nous ont fait confiance</span>
            <h2 className='titre-grand'>Les histoires déjà écrites</h2>
          </Apparition>
          <div className={styles.grilleVendus}>
            {vendus.map((b) => {
              const r = resumeBien(b)
              const photo = b?._medias?.image_galerie_0?.url
              return (
                <Link key={b.ref} to={`/bien/${b.ref}`} className={styles.vendu}>
                  <div className={styles.venduPhoto}>
                    {photo && <img src={imageUrl(photo, 700)} alt={r.titre} loading='lazy' />}
                  </div>
                  <span className='etiquette'>{r.lieu}</span>
                  <span className={styles.venduTitre}>{r.titre}</span>
                </Link>
              )
            })}
          </div>
          <div className={styles.lienCentre}>
            <Link to='/acheter' className='lien-souligne'>
              Toutes nos histoires
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

export default Vendre
