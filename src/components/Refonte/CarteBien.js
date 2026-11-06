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
    .replace(/‘/g, '’')
    .replace(/([A-Za-zÀ-ÿ])([!?])(?=\s|$)/g, '$1\u202F$2')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
    .replace(/^A (?=\S)/, 'À ')
    .replace(/\bvaites\b/gi, 'Vaîtes')
}

// Titres harmonisés : un titre entièrement en capitales passe en minuscules avec une majuscule initiale
// (« LA DER » → « La der ») ; les sigles courts (« C&P ») et les capitales voulues au milieu
// d'un titre (« L’histoire dans L’HISTOIRE ») sont conservés ; « SUITE », « FIN » → « Suite », « Fin ».
export function harmoniserTitre(texte) {
  let t = soigner(texte)
  const lettres = t.replace(/[^A-Za-zÀ-ÿ]/g, '')
  if (lettres.length > 3 && lettres === lettres.toUpperCase()) {
    t = t.toLowerCase()
    t = t.charAt(0).toUpperCase() + t.slice(1)
  }
  return t.replace(/\b(SUITE|FIN)$/, (m) => m.charAt(0) + m.slice(1).toLowerCase())
}

// Codes postaux des communes du secteur, ajoutés quand l'annonce n'en indique pas
const CODES_POSTAUX = {
  besançon: '25000',
  maîche: '25120',
  gray: '70100',
  geneuille: '25870',
  abbenans: '25340',
  'lons-le-saunier': '39000',
  pontarlier: '25300',
  ornans: '25290',
  vesoul: '70000',
}

// Lieu d'un bien, présenté partout de la même façon : « Besançon, Vaîtes 25000 »
export function soignerLieu(texte) {
  let lieu = soigner(texte).replace(/\s+/g, ' ').trim()
  if (!lieu) return ''
  // code postal à 6 chiffres saisi par erreur (701000 → 70100)
  lieu = lieu.replace(/\b(\d{5})\d\b/, '$1')
  const commune = lieu.split(/[,\s]/)[0]
  const code = CODES_POSTAUX[commune.toLowerCase()]
  // quartier sans virgule : « Besançon Vaîtes » → « Besançon, Vaîtes »
  lieu = lieu.replace(new RegExp(`^(${commune})\\s+(?!\\d)(?!,)`), '$1, ')
  if (code && !/\b\d{5}\b/.test(lieu)) lieu = `${lieu} ${code}`
  return lieu
}

export function resumeBien(bien) {
  const carac = (bien.caracteristiques || '').split('#').map((c) => soigner(c)).filter(Boolean)
  const prix =
    bien.status === 'vendu'
      ? 'Vendu'
      : typeof bien.prix === 'number'
        ? `${bien.prix.toLocaleString('fr-FR')} €`
        : ''
  const statut = bien.status === 'sous-compromis' ? 'Sous compromis' : bien.status === 'vendu' ? 'Vendu' : ''
  // « Chez Corneille Chapitre deux » → titre « Chez Corneille » + ligne « Chapitre deux »
  const titreComplet = harmoniserTitre(bien.title || bien.localisation || '')
  const m = titreComplet.match(/^(.*?)[\s:,.–-]*\b(chapitre\s+.+)$/i)
  return {
    titre: m && m[1] ? m[1] : titreComplet,
    chapitre: m && m[1] ? m[2].charAt(0).toUpperCase() + m[2].slice(1) : '',
    lieu: soignerLieu(bien.localisation),
    details: carac.slice(0, 2).join(' · '),
    prix,
    statut,
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
        {r.statut && <span className='pastille'>{r.statut}</span>}
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
