import { useState, useEffect, lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import Loader from "./components/Loader"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import LoveNote from "./components/LoveNote"

const Details = lazy(() => import("./components/Details"))
const Entourage = lazy(() => import("./components/Entourage"))
const GiftGuide = lazy(() => import("./components/GiftGuide"))
const Rules = lazy(() => import("./components/Rules"))
const RSVPForm = lazy(() => import("./components/RSVPForm"))
const Footer = lazy(() => import("./components/Footer"))
const RSVPList = lazy(() => import("./components/GuestList"))

export default function App() {
  const [loading, setLoading] = useState(true)
  const [fontsReady, setFontsReady] = useState(false)

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true))
  }, [])

  useEffect(() => {
    if (loading || !fontsReady) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
    } else {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      window.scrollTo(0, 0)
    }
  }, [loading, fontsReady])

  const isReady = !loading && fontsReady

  return (
    <>
      {!isReady && <Loader onFinish={() => setLoading(false)} />}

      <div style={{ visibility: isReady ? "visible" : "hidden" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <LoveNote />
                <Suspense fallback={null}>
                  <Details />
                  <Entourage />
                  <GiftGuide />
                  <Rules />
                  <RSVPForm />
                  <Footer />
                </Suspense>
              </>
            }
          />
          <Route
            path="/list"
            element={
              <Suspense fallback={null}>
                <RSVPList />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </>
  )
}