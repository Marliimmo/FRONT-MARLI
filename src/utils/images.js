// URL d'image optimisée.
// Cloudinary : format moderne (WebP/AVIF), qualité auto et largeur adaptée à l'affichage
// au lieu de l'original (plusieurs Mo par photo). Anciennes images S3 : servies par le backend.
const BASE_IMAGES =
  process.env.REACT_APP_URL_BASE_IMAGE ||
  `${process.env.REACT_APP_API_URL || 'https://marli-backend.onrender.com'}/bien/images/`

export function imageUrl(url, width = 800) {
  if (!url) return ''
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    // ne pas empiler deux transformations
    if (/\/upload\/[^/]*(w_|q_|f_)/.test(url)) return url
    return url.replace('/upload/', `/upload/f_auto,q_auto,c_limit,w_${width}/`)
  }
  if (url.startsWith('http')) return url
  const key = url.replace(/^imagesBienMarli\//, '')
  return `${BASE_IMAGES}imagesBienMarli/${key}`
}

// Photos de galerie d'un bien, dans l'ordre, sans les emplacements vides ni la vidéo
export function photosDuBien(medias) {
  if (!medias) return []
  return Object.keys(medias)
    .filter((k) => /^image_galerie_\d+$/.test(k) && medias[k]?.url)
    .sort((a, b) => parseInt(a.split('_').pop(), 10) - parseInt(b.split('_').pop(), 10))
    .map((k) => medias[k].url)
}
