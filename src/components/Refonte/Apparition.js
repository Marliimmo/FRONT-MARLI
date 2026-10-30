import React from 'react'
import { useEnVue } from './useEnVue'

// Fait apparaître son contenu en douceur quand il arrive à l'écran
function Apparition({ children, className = '', as: Balise = 'div', ...reste }) {
  const [ref, enVue] = useEnVue({ seuil: 0.15 })
  return (
    <Balise ref={ref} className={`apparition ${enVue ? 'visible' : ''} ${className}`} {...reste}>
      {children}
    </Balise>
  )
}

export default Apparition
