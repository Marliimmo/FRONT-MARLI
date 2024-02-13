import { React, useState } from 'react'
import styles from './CardAddReview.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-scroll'

function CardAddReview({ visibilityForm, isSuccesSend }) {
  const [loading, setLoading] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [pseudo, setPseudo] = useState('')
  const [description, setDescription] = useState('')
  const [succesSend, setSuccesSend] = useState('')
  const [review, setReview] = useState(5)
  const [stars, hoverStar] = useState('_5star')

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]
    const tailleMaxAutorisee = 5 * 1024 * 1024
    setSuccesSend('')

    if (selectedFile) {
      const allowedFormats = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/svg+xml',
      ]

      if (
        allowedFormats.includes(selectedFile.type) &&
        selectedFile.size <= tailleMaxAutorisee
      ) {
        const reader = new FileReader()
        reader.onload = () => {
          setSelectedImage(selectedFile)
          setImagePreview(reader.result)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        e.target.value = ''
        setSelectedImage(null)
      }
    }
  }

  // Submit de l'avis
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (review) {
      const formData = new FormData()
      formData.append('photo', selectedImage)
      formData.append('pseudo', pseudo)
      formData.append('description', description)
      formData.append('stars', review)

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/add-review`,
          {
            method: 'POST',
            body: formData,
          },
        )
        if (response.ok) {
          setTimeout(async () => {
            setImagePreview(null)
            const form = document.querySelector('#form')
            form.reset()
            visibilityForm()
            isSuccesSend(true)
            setLoading('')
          }, 2000)
        } else {
          setTimeout(() => {
            setLoading('')
            setSuccesSend(false)
          }, 2000)
        }
      } catch (error) {
        setLoading('')
        setSuccesSend(false)
        console.error('Erreur lors de la requête fetch :', error)
      }
    }
  }

  return (
    <div className={styles.allContainer}>
      <form id='form' onSubmit={handleSubmit} encType='multipart/form-data'>
        <h2>Déposer un avis</h2>
        <div className={styles.noteContainer}>
          <label>Votre note d'étoile :</label>
          <div className={`${styles.starContent} ${stars}`}>
            <FontAwesomeIcon
              title='1 étoile'
              icon={faStar}
              onClick={() => {
                setReview(1)
                hoverStar('_1star')
              }}
            />
            <FontAwesomeIcon
              title='2 étoiles'
              icon={faStar}
              onClick={() => {
                setReview(2)
                hoverStar('_2star')
              }}
            />
            <FontAwesomeIcon
              title='3 étoiles'
              icon={faStar}
              onClick={() => {
                setReview(3)
                hoverStar('_3star')
              }}
            />
            <FontAwesomeIcon
              title='4 étoiles'
              icon={faStar}
              onClick={() => {
                setReview(4)
                hoverStar('_4star')
              }}
            />
            <FontAwesomeIcon
              title='5 étoiles'
              icon={faStar}
              onClick={() => {
                setReview(5)
                hoverStar('_5star')
              }}
            />
          </div>
        </div>
        <div className={styles.imageContainer}>
          <label>Photo de profil</label>
          <label htmlFor='imageProfile'>
            <div>
              {imagePreview && (
                <img src={imagePreview} alt='Aperçu du profile' />
              )}
            </div>
            <FontAwesomeIcon icon={faCamera} />
          </label>
          <input
            id='imageProfile'
            type='file'
            name='photo'
            accept='.jpg, .jpeg, .png, .webp, .svg'
            onChange={handleImageChange}
          />
        </div>
        <label htmlFor='pseudo'>Entrez votre nom ou pseudo*</label>
        <br />
        <input
          onChange={(e) => {
            setPseudo(e.target.value)
            setSuccesSend('')
          }}
          id='pseudo'
          type='text'
          required
        />
        <br />
        <label htmlFor='description'>Description*</label>
        <br />
        <textarea
          onChange={(e) => {
            setDescription(e.target.value)
            setSuccesSend('')
          }}
          name='description'
          id='description'
          cols='30'
          rows='10'
          required
        ></textarea>
        <br />
        <div className={styles.btnContainer}>
          <button type='submit'>
            {loading ? 'Veuillez patienter' : 'Envoyez mon avis'}
          </button>
          <Link smooth to='avisContainer'>
            <button onClick={visibilityForm}>Annuler</button>
          </Link>
        </div>
        {succesSend === false && (
          <div className={styles.MessageFeedBackError}>
            Oups, une erreur s'est produite, vérifier vos saisies et réessayer.
          </div>
        )}
      </form>
    </div>
  )
}

export default CardAddReview
