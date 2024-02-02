import React from 'react'
import styles from './FormVendreOuRecherche.module.scss'

function FormVendreOuRecherche({ context }) {
  const SubmitForm = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <form onSubmit={SubmitForm}>
        <label htmlFor='localisation'>Emplacement / Localisation*</label> <br />
        <input id='localisation' type='text' required /> <br />
        <div className={styles.twoElement}>
          <div>
            <label htmlFor='typeDbien'>Type de bien*</label> <br />
            <select id='typeDbien' required>
              <option>Appartement</option>
              <option>Immeuble</option>
              <option>Maison</option>
            </select>
          </div>

          <div>
            <label htmlFor='superficie'>
              Superficie {context !== 'vendre' && 'min'} (m²)*
            </label>
            <br />
            <input id='superficie' type='number' min={1} required />
          </div>
        </div>
        <div className={styles.twoElement}>
          <div>
            <label htmlFor='pieces'>Nombre de pièces*</label> <br />
            <input id='pieces' type='number' min={1} required />
          </div>

          <div>
            {context === 'vendre' ? (
              <>
                <label htmlFor='file'>Joindre un fichier</label>
                <input id='file' type='file' />
              </>
            ) : (
              <>
                <label htmlFor='budget'>Votre budget*</label> <br />
                <input type='text' id='budget' required /> <br />
              </>
            )}
          </div>
        </div>
        <label htmlFor='name'>Votre nom complet*</label> <br />
        <input type='text' id='name' required /> <br />
        <div className={styles.twoElement}>
          <div>
            <label htmlFor='email'>Votre e-mail*</label> <br />
            <input id='email' type='email' required />
          </div>
          <div>
            <label htmlFor='phone'>Téléphone*</label> <br />
            <input type='phone' id='phone' required />
          </div>
        </div>
        <textarea
          rows='5'
          placeholder={
            context === 'vendre'
              ? 'un mot pour accompagnez ?'
              : 'plus de details ?'
          }
        ></textarea>
        <br />
        <button type='submit'>Envoyer</button>
      </form>
    </>
  )
}

export default FormVendreOuRecherche
