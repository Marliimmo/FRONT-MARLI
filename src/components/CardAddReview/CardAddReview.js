import { React, useState } from 'react'
import styles from './CardAddReview.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-scroll'
import women_1 from '../../assets/avatar/women_1.png'
import women_2 from '../../assets/avatar/women_2.png'
import women_3 from '../../assets/avatar/women_3.png'
import men_1 from '../../assets/avatar/men_1.png'
import men_2 from '../../assets/avatar/men_2.png'
import men_3 from '../../assets/avatar/men_3.png'

function CardAddReview({ visibilityForm, isSuccesSend }) {
  const [loading, setLoading] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('women_1')
  // const [selectedImage, setSelectedImage] = useState(null)
  // const [imagePreview, setImagePreview] = useState(null)
  const [pseudo, setPseudo] = useState('')
  const [description, setDescription] = useState('')
  const [succesSend, setSuccesSend] = useState('')
  const [review, setReview] = useState(5)
  const [stars, hoverStar] = useState('_5star')

  // const handleImageChange = (e) => {
  //   const selectedFile = e.target.files[0]
  //   const tailleMaxAutorisee = 5 * 1024 * 1024
  //   setSuccesSend('')

  //   if (selectedFile) {
  //     const allowedFormats = [
  //       'image/jpeg',
  //       'image/jpg',
  //       'image/png',
  //       'image/webp',
  //       'image/svg+xml',
  //     ]

  //     if (
  //       allowedFormats.includes(selectedFile.type) &&
  //       selectedFile.size <= tailleMaxAutorisee
  //     ) {
  //       const reader = new FileReader()
  //       reader.onload = () => {
  //         setSelectedImage(selectedFile)
  //         setImagePreview(reader.result)
  //       }
  //       reader.readAsDataURL(selectedFile)
  //     } else {
  //       e.target.value = ''
  //       setSelectedImage(null)
  //     }
  //   }
  // }

  // Submit de l'avis

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (review) {
      // const formData = new FormData()
      // formData.append('urlImage', selectedAvatar)
      // formData.append('pseudo', pseudo)
      // formData.append('description', description)
      // formData.append('stars', review)

      const formData = JSON.stringify({
        urlImage: selectedAvatar,
        pseudo: pseudo,
        description: description,
        stars: review,
      })

      console.log(formData)
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/add-review`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: formData,
          },
        )
        if (response.ok) {
          setTimeout(async () => {
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
          <label>Choisissez un avatar</label>
          <div className={styles.avatarContainer}>
            <div
              className={styles.oneAvatar}
              onClick={() => {
                setSelectedAvatar('women_1')
              }}
            >
              <img src={women_1} alt='avatar_1' />
              {selectedAvatar === 'women_1' && (
                <div>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
            </div>

            <div
              className={styles.oneAvatar}
              onClick={() => {
                setSelectedAvatar('men_1')
              }}
            >
              <img src={men_1} alt='avatar_2' />
              {selectedAvatar === 'men_1' && (
                <div>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
            </div>

            <div
              className={styles.oneAvatar}
              onClick={() => {
                setSelectedAvatar('women_2')
              }}
            >
              <img src={women_2} alt='avatar_3' />
              {selectedAvatar === 'women_2' && (
                <div>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
            </div>

            <div
              className={styles.oneAvatar}
              onClick={() => {
                setSelectedAvatar('men_2')
              }}
            >
              <img src={men_2} alt='avatar_4' />
              {selectedAvatar === 'men_2' && (
                <div>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
            </div>

            <div
              className={styles.oneAvatar}
              onClick={() => {
                setSelectedAvatar('women_3')
              }}
            >
              <img src={women_3} alt='avatar_5' />
              {selectedAvatar === 'women_3' && (
                <div>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
            </div>

            <div
              className={styles.oneAvatar}
              onClick={() => {
                setSelectedAvatar('men_3')
              }}
            >
              <img src={men_3} alt='avatar_6' />
              {selectedAvatar === 'men_3' && (
                <div>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
            </div>
          </div>

          {/* <label htmlFor='imageProfile'>
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
          /> */}
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
