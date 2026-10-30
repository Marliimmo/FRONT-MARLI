import React, { useEffect, useState } from 'react'
import { useEnVue } from './useEnVue'

// Écrit un texte lettre par lettre, avec un curseur clignotant.
// La place du texte complet est réservée dès le départ : rien ne bouge autour.
// « aLaVue » : ne commence à écrire que lorsque le texte arrive à l'écran.
function MachineAEcrire({ texte, vitesse = 55, aLaVue = false, as: Balise = 'p', className = '' }) {
  const [ref, enVue] = useEnVue({ seuil: 0.6, actif: aLaVue })
  const [n, setN] = useState(0)
  const demarre = aLaVue ? enVue : true

  useEffect(() => {
    if (!demarre) return undefined
    const reduit = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduit) {
      setN(texte.length)
      return undefined
    }
    const minuteur = setInterval(() => {
      setN((v) => {
        if (v >= texte.length) {
          clearInterval(minuteur)
          return v
        }
        return v + 1
      })
    }, vitesse)
    return () => clearInterval(minuteur)
  }, [demarre, texte, vitesse])

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
      <Balise className={className} style={{ visibility: 'hidden', margin: 0 }} aria-hidden='true'>
        {texte}
      </Balise>
      <Balise
        className={className}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, margin: 0, textAlign: 'left' }}
        aria-label={texte}
      >
        <span aria-hidden='true'>{texte.slice(0, n)}</span>
        <span className='curseur' aria-hidden='true'></span>
      </Balise>
    </div>
  )
}

export default MachineAEcrire
