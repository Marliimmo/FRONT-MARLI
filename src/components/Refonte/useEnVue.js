import { useEffect, useRef, useState } from 'react'

// Indique si un élément est visible à l'écran.
// « une fois » : reste vrai après la première apparition (pour les animations d'entrée).
export function useEnVue({ seuil = 0.2, marge = '0px', uneFois = true, actif = true } = {}) {
  const ref = useRef(null)
  const [enVue, setEnVue] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!actif || !el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setEnVue(true)
      return undefined
    }
    const obs = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setEnVue(true)
          if (uneFois) obs.disconnect()
        } else if (!uneFois) {
          setEnVue(false)
        }
      },
      { threshold: seuil, rootMargin: marge },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [seuil, marge, uneFois, actif])

  return [ref, enVue]
}
