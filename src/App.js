import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingAllSite from './components/LoadingAllSite/LoadingAllSite'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'
import CookieConsent from './components/CookieConsent/CookieConsent'

function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
      {/* <CookieConsent /> */}
    </>
  )
}

export default App
