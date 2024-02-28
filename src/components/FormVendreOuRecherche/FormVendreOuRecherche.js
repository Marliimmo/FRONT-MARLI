import React, { useState } from 'react'
import styles from './FormVendreOuRecherche.module.scss'
// import ReCAPTCHA from 'react-google-recaptcha'

function FormVendreOuRecherche({ context }) {
  const [localisation, setLocalisation] = useState('')
  const [typeBien, setTypeBien] = useState('Appartement')
  const [superficie, setSuperficie] = useState('')
  const [pieces, setPieces] = useState('')
  const [budget, setBudget] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
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

    // vente de bien
    if (context === 'vendre') {
      const dataSelling = JSON.stringify({
        localisation: localisation,
        typeBien: typeBien,
        superficie: superficie,
        pieces: pieces,
        name: name,
        email: email,
        phone: phone,
        message: message,
      })

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/form/selling`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dataSelling,
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
    }

    // avis de recherche
    if (context === 'avis') {
      const dataWanted = JSON.stringify({
        localisation: localisation,
        typeBien: typeBien,
        superficie: superficie,
        pieces: pieces,
        budget: budget,
        name: name,
        email: email,
        phone: phone,
        message: message,
      })

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/form/wanted`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dataWanted,
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
    }
    // }
  }

  return (
    <>
      <form id='form' onSubmit={SubmitForm}>
        <label htmlFor='localisation'>Emplacement / Localisation*</label> <br />
        <input
          onChange={(e) => {
            setLocalisation(e.target.value)
            setSuccesSend('')
          }}
          id='localisation'
          type='text'
          required
        />
        <br />
        <div className={styles.twoElement}>
          <div>
            <label htmlFor='typeDbien'>Type de bien*</label> <br />
            <select
              onChange={(e) => {
                setTypeBien(e.target.value)
                setSuccesSend('')
              }}
              id='typeDbien'
              required
            >
              <option value='Appartement'>Appartement</option>
              <option value='Immeuble'>Immeuble</option>
              <option value='Maison'>Maison</option>
              <option value='Autre'>Autre</option>
            </select>
          </div>

          <div>
            <label htmlFor='superficie'>
              Superficie {context !== 'vendre' && 'min'} (m²)*
            </label>
            <br />
            <input
              onChange={(e) => {
                setSuperficie(e.target.value)
                setSuccesSend('')
              }}
              id='superficie'
              type='number'
              min={1}
              required
            />
          </div>
        </div>
        <div className={styles.twoElement}>
          <div>
            <label htmlFor='pieces'>Nombre de pièces*</label> <br />
            <input
              onChange={(e) => {
                setPieces(e.target.value)
                setSuccesSend('')
              }}
              id='pieces'
              type='number'
              min={1}
              required
            />
          </div>

          <div>
            {context === 'vendre' ? null : (
              <>
                <label htmlFor='budget'>Votre budget*</label> <br />
                <input
                  onChange={(e) => {
                    setBudget(e.target.value)
                    setSuccesSend('')
                  }}
                  type='text'
                  id='budget'
                  required
                />
                <br />
              </>
            )}
          </div>
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
        />
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
              type='phone'
              id='phone'
              required
            />
          </div>
        </div>
        <textarea
          onChange={(e) => {
            setMessage(e.target.value)
            setSuccesSend('')
          }}
          rows='5'
          placeholder={
            // context === 'vendre'
            //   ? 'un mot pour accompagner ?'
            //   : 'plus de details ?'
            'Votre message'
          }
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
    </>
  )
}

export default FormVendreOuRecherche
