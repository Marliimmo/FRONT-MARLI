import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginAdmin.module.scss'

const LoginAdmin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('https://marli-backend.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      
      const data = await response.json()
      
      if (response.ok && data.token) {
        // Stocker le token
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.userId)
        
        // Rediriger vers la page d'ajout
        navigate('/ajouter-bien')
      } else {
        setError('Email ou mot de passe incorrect')
      }
    } catch (error) {
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>MARLI</h1>
          <p>Espace Administrateur</p>
        </div>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@marli.com"
              value={credentials.email}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
          
          <div className={styles.field}>
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginAdmin