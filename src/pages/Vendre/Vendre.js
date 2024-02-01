import React from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/united-states-spokane.jpg'

function Vendre() {
  return (
    <div>
      <FirstSectionPage
        ImgPremierePlan={Image}
        title='VENDRE / ESTIMER UN BIEN'
        description='Maximisez  la valeur de votre bien avec notre équipe de professionnels.'
      />
    </div>
  )
}

export default Vendre
