import React, { useState } from 'react'
import styles from './AjouterBien.module.scss'

const AjouterBien = () => {
  const [formData, setFormData] = useState({
    title: '',
    histoire: '',
    localisation: '',
    prix: '',
    caracteristiques: '',
    status: 'disponible'
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch('http://localhost:8090/bien/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage(`✅ Bien créé avec succès ! Référence: ${data.ref}`)
        setFormData({
          title: '',
          histoire: '',
          localisation: '',
          prix: '',
          caracteristiques: '',
          status: 'disponible'
        })
      } else {
        setMessage('❌ Erreur lors de la création')
      }
    } catch (error) {
      setMessage('❌ Erreur serveur')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1>Ajouter un nouveau bien</h1>
        
        {message && <div className={styles.message}>{message}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Titre du bien *</label>
            <input
              type="text"
              name="title"
              placeholder="Ex: Belle maison bourguignonne"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.field}>
            <label>Description / Histoire *</label>
            <textarea
              name="histoire"
              placeholder="Décrivez le bien..."
              value={formData.histoire}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.field}>
            <label>Localisation *</label>
            <input
              type="text"
              name="localisation"
              placeholder="Ex: Dijon, Bourgogne"
              value={formData.localisation}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.field}>
            <label>Prix (€) *</label>
            <input
              type="number"
              name="prix"
              placeholder="Ex: 350000"
              value={formData.prix}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.field}>
            <label>Caractéristiques *</label>
            <input
              type="text"
              name="caracteristiques"
              placeholder="Ex: Maison#120m²#4 pièces"
              value={formData.caracteristiques}
              onChange={handleChange}
              required
            />
            <small>Format: Type#Surface#Nombre de pièces</small>
          </div>
          
          <div className={styles.field}>
            <label>Statut</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="disponible">Disponible</option>
              <option value="non-disponible">Non disponible</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Création en cours...' : 'Créer le bien'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AjouterBien