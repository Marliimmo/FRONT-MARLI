import React, { useEffect, useState } from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/24.jpg'
import { Link } from 'react-router-dom'
import styles from './Acheter.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronUp,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import CardBien from '../../components/CardBien/CardBien'
import GifLoading from '../../components/GifLoading/GifLoading'
import { Helmet } from 'react-helmet'

function Acheter() {
  const [showFiltre, setShowFiltre] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [loading, setLoading] = useState('fecthLoad')
  const [hasMore, setHasMore] = useState(false)
  const [fecthUrl, setFecthUrl] = useState(
    `${process.env.REACT_APP_API_URL}/bien/all-biens?filter&page=1&pageSize=10`,
  )

  // les constante pour gerer la recherche et filtre des biens
  const [typeBien, setTypeBien] = useState('tous')
  const [budgets, setBudgets] = useState('')
  const [localisation, setLocalisation] = useState('')
  const [superficie, setSuperficie] = useState('')

  // Filtre pfunction
  const typeBienFunction = (e) => {
    if (
      e.target.value !== '' &&
      e.target.value !== null &&
      e.target.value !== 'tous'
    ) {
      setTypeBien(`&typeBien=${e.target.value}`)
    } else {
      setTypeBien('')
    }
    setPage(1)
  }

  const budgetsFunction = (e) => {
    if (e.target.value !== '' && e.target.value !== null) {
      setBudgets(`&budgets=${e.target.value}`)
    } else {
      setBudgets('')
    }
    setPage(1)
  }

  const localisationFunction = (e) => {
    if (e.target.value !== '' && e.target.value !== null) {
      setLocalisation(`&localisation=${e.target.value}`)
    } else {
      setLocalisation('')
    }
    setPage(1)
  }

  const superficieFunction = (e) => {
    if (e.target.value !== '' && e.target.value !== null) {
      setSuperficie(`&superficie=${e.target.value}`)
    } else {
      setSuperficie('')
    }
    setPage(1)
  }
  //

  // function de création du lien de la requette de recherche ou filtre
  const NewUrlFecth = (e) => {
    e.preventDefault()
    setLoading('filtre')
    let newUrl = `${process.env.REACT_APP_API_URL}/bien/all-biens?filter`
    if (typeBien !== '') {
      newUrl = `${newUrl}${typeBien}`
    }
    if (budgets !== '') {
      newUrl = `${newUrl}${budgets}`
    }
    if (localisation !== '') {
      newUrl = `${newUrl}${localisation}`
    }
    if (superficie !== '') {
      newUrl = `${newUrl}${superficie}`
    }

    setTimeout(() => {
      setLoading('')
      setFecthUrl(`${newUrl}&page=1&pageSize=10`)
      setPage(1)
    }, 1000)
  }
  //

  // La fonction pour faire un fecth en recupérant des user en paginant la reponse.
  const loadMoreData = async () => {
    setLoading('seeMore')

    try {
      const response = await fetch(
        `${fecthUrl.split('&page')[0]}&page=${page + 1}&pageSize=${pageSize}`,
      )
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
      }
      const result = await response.json()
      setTimeout(() => {
        const { biens, hasMore } = result
        setData([...data, ...biens])
        setHasMore(hasMore)
        setPage(page + 1)
        setLoading('')
      }, 1000)
    } catch (error) {
      setLoading('')
      console.log('error lors de la requette fecth', error)
    }
  }

  // On englobe resquestOptions dans useMemo pour eviter de le recalculer si tokenLog ne change pas

  // Le premier rendu de la pagination
  useEffect(() => {
    setLoading('fecthLoad')
    const fetchInitialData = async () => {
      try {
        const response = await fetch(fecthUrl)
        if (!response.ok) {
          setLoading('')
          throw new Error(`Erreur HTTP : ${response.status}`)
        }
        const result = await response.json()
        const { biens, hasMore } = result
        setData(biens)
        setHasMore(hasMore)
        setLoading('')
      } catch (error) {
        setLoading('')
        console.log('error lors de la requette fecth', error)
      }
    }

    fetchInitialData()
  }, [fecthUrl])

  const handleKeyDown = (event) => {
    const keyCode = event.keyCode || event.which
    if (
      (keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      [8, 9, 13, 27, 37, 39, 46].includes(keyCode)
    ) {
      return true
    }

    event.preventDefault()
    return false
  }

  return (
    <>
      <Helmet>
        <title>Marli - Acheter</title>
        <meta name='robots' content='noindex' />
        {/* <meta name="robots" content="index, follow" /> */}
        <meta name='description' content="Passeur d'histoires immobilières" />
      </Helmet>
      <div className={styles.allContainer}>
        {loading === 'filtre' || loading === 'fecthLoad' ? (
          <GifLoading positionDiv='fixed' />
        ) : null}

        <div className={styles.firstSection}>
          <FirstSectionPage
            ImgPremierePlan={Image}
            title='Nos adresses'
            // description='Choisissez(ou trouvez) le bien qui vous correspond pour y écrire votre(ou la suite) histoire'
          />
        </div>

        <div className={styles.BienContainer}>
          <div
            className={styles.showFiltre}
            onClick={() => setShowFiltre(!showFiltre)}
          >
            <p>Filtrer les biens par catégories</p>
            {showFiltre ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>

          <div
            style={showFiltre ? { display: 'flex' } : {}}
            className={styles.filtreContainer}
          >
            <select onChange={typeBienFunction}>
              <option value='tous'>Tous les biens</option>
              <option value='appartement'>Appartement</option>
              <option value='immeuble'>Immeuble</option>
              <option value='maison'>Maison</option>
            </select>

            <input
              onChange={budgetsFunction}
              onKeyDown={handleKeyDown}
              min={1}
              type='number'
              placeholder='Budgets max (€)'
            />

            <input
              onChange={localisationFunction}
              type='text'
              placeholder='Localisation'
            />

            <input
              onChange={superficieFunction}
              min={1}
              onKeyDown={handleKeyDown}
              type='number'
              placeholder='Superficie (m²)'
            />

            <div className={styles.btnSearchContainer} onClick={NewUrlFecth}>
              <span>Appliquer le filtre</span>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>

          <div className={styles.ListeDBien}>
            {loading === 'fecthLoad' ? null : (
              <>
                {data.map((bien) => (
                  <div key={bien?._id}>
                    <CardBien
                      imgUrl={bien?._medias?.image_galerie_0?.url}
                      prix={bien?.prix}
                      localisation={bien?.localisation}
                      caracteristique={bien?.caracteristiques}
                      title={bien?.title}
                      status={bien?.status}
                      reference={bien?.ref}
                    />
                  </div>
                ))}
                {loading === 'fecthLoad' ? null : data.length > 0 ? null : (
                  <div className={styles.notFoundBien}>Aucun bien trouver</div>
                )}

                {hasMore && (
                  <div className={styles.showMoreBtn}>
                    <button onClick={loadMoreData}>
                      {loading === 'seeMore' ? 'Chargement...' : 'Voir plus'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className={styles.investerSection}>
          <div>
            <h2>INVESTIR DANS L’IMMOBILIER</h2>
            <ul>
              <li>Accompagnement, étude de rentabilité</li>
              <li>Recherche de biens en France et au Sénégal</li>
              <li>
                Sénégal, destination soleil durant toute l’année, pour vous
                dénicher le bien qui correspond à vos attentes
              </li>
            </ul>
            <Link to='/marli/nous-contacter'>Nous contacter</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Acheter
