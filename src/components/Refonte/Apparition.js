import React from 'react'
import { useEnVue } from './useEnVue'

// Fait apparaître son contenu en douceur quand il arrive à l'écran
function Apparition({ children, className = '', as: Balise = 'div', ...reste }) {
  // déclenché dès que le bloc entre à l'écran : pas de zone vide pendant le défilement
  const [ref, enVue] = useEnVue({ seuil: 0, marge: '0px 0px -6% 0px' })
  return (
    <Balise ref={ref} className={`apparition ${enVue ? 'visible' : ''} ${className}`} {...reste}>
      {children}
    </Balise>
  )
}

export default Apparition
