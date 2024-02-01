import React from 'react'
import FirstSectionPage from '../../components/FirstSectionPage/FirstSectionPage'
import Image from '../../assets/images/united-states-spokane.jpg'

function Acheter() {
  return (
    <div>
      <FirstSectionPage
        ImgPremierePlan={Image}
        title='Acheter un bien'
        description='Votre havre de paix vous attend dans cette élégante maison, prête à devenir vôtre.'
      />
    </div>
  )
}

export default Acheter
