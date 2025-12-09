import React, { useState, useEffect } from 'react'
import styles from './DragDropImages.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faXmarkCircle, faGripVertical, faSave } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'
import NotifFeedBackFecth from '../NotifFeedBackFecth/NotifFeedBackFecth'
import GifLoading from '../GifLoading/GifLoading'
import ConfirmationRequired from '../ConfirmationRequired/ConfirmationRequired'

const DragDropImages = ({ modifAuthorizeValue, callBackMessageValue, messageFecthValue, onUpdate }) => {
  const [confirmationContainer, setConfirmationContainer] = useState(false)
  const [modifAuthorize, setModifAuthorize] = useState(modifAuthorizeValue)
  const [callBackMessage, setCallBackMessage] = useState(callBackMessageValue)
  const [messageFecth, setMessageFecth] = useState(messageFecthValue)
  const [images, setImages] = useState([]) // liste des images uploadées
  const [loading, setLoading] = useState(false)

  // Ajout d’une image
  const handleAddImage = (file) => {
    setImages(prev => [...prev, file])
  }

  // Suppression d’une image
  const confirmDelete = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setConfirmationContainer(false)
  }

  // Gestion du drag & drop
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('dragIndex', index)
  }

  const handleDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData('dragIndex')
    if (dragIndex === undefined) return
    const updatedImages = [...images]
    const [removed] = updatedImages.splice(dragIndex, 1)
    updatedImages.splice(dropIndex, 0, removed)
    setImages(updatedImages)
  }

  useEffect(() => {
    setModifAuthorize(modifAuthorizeValue)
    setCallBackMessage(callBackMessageValue)
    setMessageFecth(messageFecthValue)
  }, [modifAuthorizeValue, callBackMessageValue, messageFecthValue])

  return (
    <>
      <div className={styles.dragDropContainer}>
        {images.map((img, index) => (
          <div
            key={index}
            className={styles.imageItem}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
          >
            <img src={URL.createObjectURL(img)} alt={`preview-${index}`} />
            <FontAwesomeIcon
              icon={faXmarkCircle}
              className={styles.deleteIcon}
              onClick={() => setConfirmationContainer(true)}
            />
          </div>
        ))}

        <div className={styles.addImage} onClick={() => document.getElementById('fileInput').click()}>
          <FontAwesomeIcon icon={faCamera} /> Ajouter une image
        </div>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={(e) => handleAddImage(e.target.files[0])}
        />
      </div>

      {confirmationContainer && (
        <ConfirmationRequired
          contexte="Attention ! La suppression de cette image sera définitive."
          confirmation={confirmDelete}
          reset={() => setConfirmationContainer(false)}
        />
      )}

      {loading && <GifLoading />}
      <NotifFeedBackFecth
        modifAuthorizeValue={modifAuthorize}
        callBackMessageValue={callBackMessage}
        messageFecthValue={messageFecth}
      />
    </>
  )
}

export default DragDropImages


