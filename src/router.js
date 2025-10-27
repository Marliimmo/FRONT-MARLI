import { createBrowserRouter } from 'react-router-dom'
import App from './App'
// pages
import HomePage from './pages/Accueil/Accueil'
import Acheter from './pages/Acheter/Acheter'
import Vendre from './pages/Vendre/Vendre'
import AvisDeRecherche from './pages/Avis_de_recherche/AvisDeRecherche'
import NousContacter from './pages/Nous_Contacter/NousContacter'
import PageDunBien from './pages/PageDunBien/PageDunBien'
import MentionsLegales from './pages/MentionsLegales/MentionsLegales'
import Honoraires from './pages/Honoraires/Honoraires'
import APropos from './pages/A_Propos/A_Propos'
import AjouterBien from './pages/AjouterBien/AjouterBien'
import LoginAdmin from './pages/LoginAdmin/LoginAdmin'

// configuration des routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/acheter', element: <Acheter /> },
      { path: '/vendre', element: <Vendre /> },
      { path: '/avis-de-recherche', element: <AvisDeRecherche /> },
      { path: '/nous-contacter', element: <NousContacter /> },
      { path: '/bien/:reference', element: <PageDunBien /> },
      { path: '/mentions-legales', element: <MentionsLegales /> },
      { path: '/honoraires', element: <Honoraires /> },
      { path: '/a-propos', element: <APropos /> },
      { path: '/ajouter-bien', element: <AjouterBien /> },
      { path: '/admin/login', element: <LoginAdmin /> },
    ]
  }
])

export default router
// redeploy trigger Thu Oct 23 15:35:23     2025