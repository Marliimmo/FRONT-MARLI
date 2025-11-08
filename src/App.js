import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import LoadingAllSite from './components/LoadingAllSite/LoadingAllSite'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'
import CookieConsent from './components/CookieConsent/CookieConsent'
import { initGA, logPageView } from './utils/analytics'

function App() {
  const location = useLocation()
  const [cookies] = useCookies(['acceptedCookies'])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (cookies.acceptedCookies === true) {
      initGA()
    }
  }, [cookies.acceptedCookies])

  useEffect(() => {
    if (cookies.acceptedCookies === true) {
      logPageView()
    }
  }, [location, cookies.acceptedCookies])

  return (
    <>
      <ScrollToTopButton />
      <ScrollToTop />
      <LoadingAllSite />
      <Header />
      <div style={{ minHeight: '100dvh', paddingTop: '73px' }}>
        <Outlet />
      </div>
      <Footer />
      <CookieConsent />
    </>
  )
}

export default App
