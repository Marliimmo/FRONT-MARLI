import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from "./PoweredByChoosews.module.scss"

function PoweredByChoosews() {
  const [visibility, setVisibitity] = useState(true);
  return (
    <>
        {
            visibility && 
                <div className={styles.allContainer}>
                    <p><Link to="https://choosews.com" target='_blank'>Créer par <span>choosews</span></Link></p>
                    <p title="Fermer l'étiquette"><FontAwesomeIcon onClick={()=>setVisibitity(!visibility)} icon={faXmarkCircle}/></p>
                </div>
            }
    </>
  )
}

export default PoweredByChoosews