import React from 'react'
import styles from './FormContact.module.scss'

function FormContact() {
  const SubmitForm = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.allContainer}>
      <form onSubmit={SubmitForm}>
        <label htmlFor='titleMessage'>Titre de votre message</label> <br />
        <input id='titleMessage' type='text' /> <br />
        <div className={styles.twoElement}>
          <label htmlFor='contextMessage'>Votre message concerne ?*</label>{' '}
          <br />
          <select id='contextMessage' required>
            <option>Autres</option>
            <option>Acheter un bien</option>
            <option>J'ai un bien que l'un de vos clients recheche</option>
          </select>
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
            <input type='number' id='phone' min='0' required />
          </div>
        </div>
        <textarea rows='5' placeholder='Message*' required></textarea>
        <br />
        <button type='submit'>Envoyer</button>
      </form>
    </div>
  )
}

export default FormContact
