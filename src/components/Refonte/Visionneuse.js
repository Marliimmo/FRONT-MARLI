import React, { useCallback, useEffect, useRef, useState } from 'react'
import { imageUrl } from '../../utils/images'
import styles from './Visionneuse.module.scss'

// Visionneuse plein écran : flèches, clavier (← → Échap) et glissement du doigt
function Visionneuse({ photos, depart = 0, titre = '', onFermer, noirEtBlanc = false }) {
  const [index, setIndex] = useState(depart)
  const toucheX = useRef(null)
  const n = photos.length

  const aller = useCallback((sens) => setIndex((i) => (i + sens + n) % n), [n])

  useEffect(() => {
    const surTouche = (e) => {
      if (e.key === 'Escape') onFermer()
      if (e.key === 'ArrowRight') aller(1)
      if (e.key === 'ArrowLeft') aller(-1)
    }
    window.addEventListener('keydown', surTouche)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', surTouche)
      document.body.style.overflow = ''
    }
  }, [aller, onFermer])

  if (!n) return null

  return (
    <div
      className={styles.fond}
      role='dialog'
      aria-modal='true'
      aria-label={`Photos : ${titre}`}
      onTouchStart={(e) => {
        toucheX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (toucheX.current === null) return
        const ecart = e.changedTouches[0].clientX - toucheX.current
        if (Math.abs(ecart) > 50) aller(ecart < 0 ? 1 : -1)
        toucheX.current = null
      }}
    >
      <div className={styles.barre}>
        <span>
          {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
        <button type='button' onClick={onFermer} aria-label='Fermer'>
          ✕
        </button>
      </div>

      <div className={styles.scene}>
        <img
          key={index}
          src={imageUrl(photos[index], 2000)}
          alt={`${titre}, vue ${index + 1} sur ${n}`}
          style={noirEtBlanc ? { filter: 'grayscale(1)' } : undefined}
        />
      </div>

      {n > 1 && (
        <>
          <button type='button' className={`${styles.fleche} ${styles.gauche}`} onClick={() => aller(-1)} aria-label='Photo précédente'>
            ←
          </button>
          <button type='button' className={`${styles.fleche} ${styles.droite}`} onClick={() => aller(1)} aria-label='Photo suivante'>
            →
          </button>
        </>
      )}
    </div>
  )
}

export default Visionneuse
