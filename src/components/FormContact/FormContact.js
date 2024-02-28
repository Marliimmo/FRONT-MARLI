import React, { useState } from 'react'
import styles from './FormContact.module.scss'
// import ReCAPTCHA from 'react-google-recaptcha'

function FormContact() {
  const [titleMessage, setTitleMessage] = useState('')
  const [motif, setMotif] = useState('Acheter un bien')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contenu, setContenu] = useState('')
  const [loading, setLoading] = useState(false)
  const [succesSend, setSuccesSend] = useState('')
  // const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)

  // const handleCaptchaChange = (value) => {
  //   if (value) {
  //     setIsCaptchaVerified(true)
  //   } else {
  //     setIsCaptchaVerified(false)
  //   }
  // }

  const SubmitForm = async (e) => {
    e.preventDefault()
    // if (isCaptchaVerified) {
    setLoading(true)
    const data = JSON.stringify({
      titleMessage: titleMessage,
      motif: motif,
      name: name,
      email: email,
      phone: phone,
      contenu: contenu,
    })

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/form/contact-us`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: data,
        },
      )
      if (response.ok) {
        setTimeout(() => {
          const form = document.querySelector('#form')
          form.reset()
          setLoading('')
          setSuccesSend(true)
        }, 1500)
      } else {
        setTimeout(() => {
          setSuccesSend(false)
          setLoading('')
        }, 1500)
      }
    } catch (error) {
      setTimeout(() => {
        setSuccesSend(false)
        setLoading('')
      }, 1500)
      console.log('Erreur lors de la requette fecth', error)
    }
    // }
  }

  return (
    <div className={styles.allContainer}>
      <form id='form' onSubmit={SubmitForm}>
        <label htmlFor='titleMessage'>Sujet</label> <br />
        <input
          id='titleMessage'
          type='text'
          onChange={(e) => {
            setTitleMessage(e.target.value)
            setSuccesSend('')
          }}
        />{' '}
        <br />
        <div className={styles.twoElement}>
          <label htmlFor='contextMessage'>Votre message concerne*</label> <br />
          <select
            onChange={(e) => {
              setMotif(e.target.value)
              setSuccesSend('')
            }}
            id='contextMessage'
            required
          >
            <option value='Acheter un bien'>Acheter un bien</option>
            <option value="J'ai un bien que l'un de vos clients recherche">
              J'ai un bien que l'un de vos clients recheche
            </option>
            <option value='Autre'>Autre</option>
          </select>
        </div>
        <label htmlFor='name'>Nom & prénom*</label> <br />
        <input
          onChange={(e) => {
            setName(e.target.value)
            setSuccesSend('')
          }}
          type='text'
          id='name'
          required
        />{' '}
        <br />
        <div className={styles.twoElement}>
          <div>
            <label htmlFor='email'>E-mail*</label> <br />
            <input
              onChange={(e) => {
                setEmail(e.target.value)
                setSuccesSend('')
              }}
              id='email'
              type='email'
              required
            />
          </div>
          <div>
            <label htmlFor='phone'>Téléphone*</label> <br />
            <input
              onChange={(e) => {
                setPhone(e.target.value)
                setSuccesSend('')
              }}
              type='number'
              id='phone'
              min='0'
              required
            />
          </div>
        </div>
        <textarea
          onChange={(e) => {
            setContenu(e.target.value)
            setSuccesSend('')
          }}
          rows='5'
          placeholder='Votre message*'
          required
        ></textarea>
        <br />
        {/* <p style={{ margin: '-10px 0px 25px 0px' }}>
          <ReCAPTCHA
            sitekey='6LdbqX4pAAAAANfZdwd_HnsBnkO0fbocvoX2d1kv'
            onChange={handleCaptchaChange}
          />
        </p> */}
        <button
          // style={!isCaptchaVerified ? { backgroundColor: 'gray' } : {}}
          type='submit'
        >
          {loading ? 'Veuillez patienter...' : 'Envoyer'}
        </button>
        <div
          style={
            succesSend === false
              ? { backgroundColor: 'red' }
              : succesSend === true
                ? { backgroundColor: 'green' }
                : {}
          }
          className={styles.MessageFeedBack}
        >
          {succesSend === false
            ? "Oups, une erreur s'est produite, verifiez vos informations saisies (email) et réessayez"
            : succesSend === true
              ? 'Votre message a été envoyé avec succès.'
              : null}
        </div>
      </form>
    </div>
  )
}

export default FormContact
