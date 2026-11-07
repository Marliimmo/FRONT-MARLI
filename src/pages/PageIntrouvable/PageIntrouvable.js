import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// Page affichée pour une adresse qui n'existe pas (ancien lien, faute de frappe…)
function PageIntrouvable() {
  return (
    <>
      <Helmet>
        <title>Page introuvable - Marli Immobilier</title>
        <meta name='robots' content='noindex' />
      </Helmet>
      <section
        style={{
          minHeight: '60vh',
          padding: '104px 6%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 24,
        }}
      >
        <span className='etiquette'>Page introuvable</span>
        <h1 className='titre-grand'>Cette page s’est égarée</h1>
        <p style={{ margin: 0, fontWeight: 300, color: '#CFCFCF' }}>
          Elle a peut-être changé d’adresse. Nos histoires, elles, vous attendent.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, paddingTop: 8 }}>
          <Link to='/' className='bouton-plein'>
            Retour à l’accueil
          </Link>
          <Link to='/acheter' className='bouton-contour'>
            Nos adresses
          </Link>
        </div>
      </section>
    </>
  )
}

export default PageIntrouvable
