import { createBrowserRouter } from 'react-router-dom'
import App from './App'

// composants de pages
import HomePage from './pages/Accueil/Accueil'
import Acheter from './pages/Acheter/Acheter'
import Vendre from './pages/Vendre/Vendre'
import AvisDeRecherche from './pages/Avis_de_recherche/AvisDeRecherche.js'
import NousContacter from './pages/Nous_Contacter/NousContacter.js'
import PageDunBien from './pages/PageDunBien/PageDunBien.js'
import MentionsLegales from './pages/MentionsLegales/MentionsLegales.js'
import Honoraires from './pages/Honoraires/Honoraires.js'
import APropos from './pages/A_Propos/A_Propos.js'

// page d'erreur
import NotFound from './not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/*',
        caseSensitive: true,
        element: <NotFound />,
      },
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/acheter',
        element: <Acheter />,
      },
      {
        path: '/vendre',
        element: <Vendre />,
      },
      {
        path: '/avis-de-recherche',
        element: <AvisDeRecherche />,
      },
      {
        path: '/nous-contacter',
        element: <NousContacter />,
        <Route path='/honoraires' element={<Honoraires />} />
      },
      {
        path: '/bien/:reference',
        element: <PageDunBien />,
      },
      {
        path: '/mentions-legales',
        element: <MentionsLegales />,
      },
      {
        path: '/honoraires',
        element: <Honoraires />,
      },
      {
        path: '/a-propos',
        element: <APropos />,
      },
    ],
  },
])
