import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Loader from "./components/Loader"
import RSVPForm from "./components/RSVPForm"
import Home from "./components/Home"
import RSVPList from "./components/GuestList"
import Navbar from "./components/Navbar"
import LoveNote from "./components/LoveNote"

export default function App() {
  const [loading, setLoading] = useState(true)

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