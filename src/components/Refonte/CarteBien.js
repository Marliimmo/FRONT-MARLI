import React from 'react'
import { Link } from 'react-router-dom'
import { imageUrl } from '../../utils/images'
import { useEnVue } from './useEnVue'
import styles from './CarteBien.module.scss'

const surEcranTactile = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches

// Petites corrections typographiques à l'affichage (le texte du dashboard n'est pas modifié) :
// apostrophes courbes, « m² », espaces en trop, emoji en début de ligne.
export function soigner(texte) {
  return (texte || '')
    .replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]\uFE0F?\s*/u, '')
    .replace(/([A-Za-zÀ-ÿ])'(?=[A-Za-zÀ-ÿ])/g, '$1’')
    .replace(/(\d)\s?m2\b/g, '$1 m²')
    .replace(/(\d)m²/g, '$1 m²')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

export function resumeBien(bien) {
  const carac = (bien.caracteristiques || '').split('#').map((c) => soigner(c)).filter(Boolean)
  const prix =
    bien.status === 'vendu'
      ? 'Vendu'
      : bien.status === 'sous-compromis'
        ? 'Sous compromis'
        : typeof bien.prix === 'number'
          ? `${bien.prix.toLocaleString('fr-FR')} €`
          : ''
  // « Chez Corneille Chapitre deux » → titre « Chez Corneille » + ligne « Chapitre deux »
  const titreComplet = soigner(bien.title || bien.localisation || '')
  const m = titreComplet.match(/^(.*?)[\s:,.–-]*\b(chapitre\s+.+)$/i)
  return {
    titre: m && m[1] ? m[1] : titreComplet,
    chapitre: m && m[1] ? m[2].charAt(0).toUpperCase() + m[2].slice(1) : '',
    lieu: soigner(bien.localisation),
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
      <h3 className={styles.titre}>
        {r.titre}
        {r.chapitre && <span className={styles.chapitre}>{r.chapitre}</span>}
      </h3>
      <div className={styles.ligneInfos}>
        <span>{r.details}</span>
        <span className={styles.prix}>{r.prix}</span>
      </div>
    </Link>
  )
}

export default CarteBien
