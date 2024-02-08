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
    path: '/marli/',
    element: <App />,
    children: [
      {
        path: '/marli/*',
        caseSensitive: true,
        element: <NotFound />,
      },
      {
        path: '/marli/',
        element: <HomePage />,
      },
      {
        path: '/marli/acheter',
        element: <Acheter />,
      },
      {
        path: '/marli/vendre',
        element: <Vendre />,
      },
      {
        path: '/marli/avis-de-recherche',
        element: <AvisDeRecherche />,
      },
      {
        path: '/marli/nous-contacter',
        element: <NousContacter />,
      },
      {
        path: '/marli/bien/:reference',
        element: <PageDunBien />,
      },
      {
        path: '/marli/mentions-legales',
        element: <MentionsLegales />,
      },
      {
        path: '/marli/honoraires',
        element: <Honoraires />,
      },
      {
        path: '/marli/a-propos',
        element: <APropos />,
      },
    ],
  },
])
