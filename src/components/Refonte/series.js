import { soigner } from './CarteBien'

// Les biens d'une même série partagent le début de leur titre et leur lieu :
// « Dépendances », « Dépendances SUITE », « Dépendances FIN » ;
// « Chez Corneille Chapitre un », « Chez Corneille Chapitre deux »…

const NUMEROS = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8 }

export function racineSerie(titre) {
  const t = soigner(titre)
  const m = t.match(/^(.*?)[\s:,.–-]*\b(chapitre\s+\S+|suite|fin|\d+)$/i)
  return m && m[1] ? m[1].trim() : t
}

export function rangDansSerie(titre) {
  const t = soigner(titre).toLowerCase()
  const chapitre = t.match(/chapitre\s+(\S+)$/)
  if (chapitre) return NUMEROS[chapitre[1]] || parseInt(chapitre[1], 10) || 1
  if (/\bsuite$/.test(t)) return 2
  if (/\bfin$/.test(t)) return 99
  const nombre = t.match(/(\d+)$/)
  if (nombre) return parseInt(nombre[1], 10)
  return 1
}

// Ordre dans une série : les biens disponibles d'abord, ceux sous compromis à la fin
const poidsStatut = (b) => (b.status === 'sous-compromis' ? 1 : 0)
export const trierSerie = (biens) =>
  [...biens].sort((x, y) => poidsStatut(x) - poidsStatut(y) || rangDansSerie(x.title) - rangDansSerie(y.title))

export const cleSerie = (b) =>
  `${racineSerie(b.title || '').toLowerCase()}|${soigner(b.localisation || '').toLowerCase()}`

// Transforme une liste de biens en éléments : biens seuls ou séries (2 biens ou plus)
export function regrouper(biens) {
  const groupes = new Map()
  biens.forEach((b) => {
    const cle = cleSerie(b)
    if (!groupes.has(cle)) groupes.set(cle, [])
    groupes.get(cle).push(b)
  })
  const elements = []
  const places = new Set()
  biens.forEach((b) => {
    const cle = cleSerie(b)
    if (places.has(cle)) return
    places.add(cle)
    const groupe = groupes.get(cle)
    if (groupe.length > 1) {
      const chapitres = trierSerie(groupe)
      elements.push({ type: 'serie', cle, titre: racineSerie(chapitres[0].title), chapitres })
    } else {
      elements.push({ type: 'bien', cle: b.ref, bien: b })
    }
  })
  return elements
}

// Fourchette de prix des biens disponibles d'une série (hors sous compromis)
export function fourchettePrix(chapitres) {
  const prix = chapitres
    .filter((c) => c.status === 'disponible' && typeof c.prix === 'number')
    .map((c) => c.prix)
  if (!prix.length) return ''
  if (prix.length === 1) return `${prix[0].toLocaleString('fr-FR')} €`
  return `de ${Math.min(...prix).toLocaleString('fr-FR')} € à ${Math.max(...prix).toLocaleString('fr-FR')} €`
}
