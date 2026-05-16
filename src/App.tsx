import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Loader from "./components/Loader"
import RSVPForm from "./components/RSVPForm"
import Home from "./components/Home"
import RSVPList from "./components/GuestList"
import Navbar from "./components/Navbar"
import LoveNote from "./components/LoveNote"
import Details from "./components/Details"
import Entourage from "./components/Entourage"
import GiftGuide from "./components/GiftGuide"
import Rules from "./components/Rules"


export default function App() {
  const [loading, setLoading] = useState(true)

    useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}

      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <LoveNote />
                <Details />
                <Entourage />
                <GiftGuide />
                <Rules />
                <RSVPForm />
              </>
            }
          />
          <Route path="/list" element={<RSVPList />} />
        </Routes>
      </div>
    </>
  )
}