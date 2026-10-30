import React from 'react'
import { Link } from 'react-router-dom'
import { imageUrl } from '../../utils/images'
import { useEnVue } from './useEnVue'
import styles from './CarteBien.module.scss'

const surEcranTactile = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches

export function resumeBien(bien) {
  const carac = (bien.caracteristiques || '').split('#').map((c) => c.trim()).filter(Boolean)
  const prix =
    bien.status === 'vendu'
      ? 'Vendu'
      : bien.status === 'sous-compromis'
        ? 'Sous compromis'
        : typeof bien.prix === 'number'
          ? `${bien.prix.toLocaleString('fr-FR')} €`
          : ''
  return {
    titre: bien.title || bien.localisation,
    lieu: bien.localisation,
    details: carac.slice(0, 2).join(' · '),
    prix,
  }
}

// Carte d'un bien : photo en noir et blanc, la couleur revient au survol
// (ou, sur téléphone, quand la photo passe au centre de l'écran).
function CarteBien({ bien, hauteurPhoto = 520, largeurImage = 1200 }) {
  const tactile = surEcranTactile()
  const [ref, auCentre] = useEnVue({ seuil: 0, marge: '-35% 0px -35% 0px', uneFois: false, actif: tactile })
  const r = resumeBien(bien)
  const photo = bien?._medias?.image_galerie_0?.url

  return (
    <Link to={`/bien/${bien.ref}`} className={styles.carte}>
      <div ref={ref} className={styles.cadrePhoto} style={{ height: hauteurPhoto }}>
        {photo ? (
          <img
            className={`photo-bien ${tactile && auCentre ? 'en-vue' : ''}`}
            src={imageUrl(photo, largeurImage)}
            alt={r.titre}
            loading='lazy'
          />
        ) : null}
      </div>
      <span className='etiquette'>{r.lieu}</span>
      <h3 className={styles.titre}>{r.titre}</h3>
      <div className={styles.ligneInfos}>
        <span>{r.details}</span>
        <span className={styles.prix}>{r.prix}</span>
      </div>
    </Link>
  )
}

export default CarteBien
