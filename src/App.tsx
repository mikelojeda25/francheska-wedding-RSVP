import { Routes, Route } from 'react-router-dom'
import RSVPForm from './components/RSVPForm'
import Home from './components/Home'
import RSVPList from './components/GuestList'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
            <RSVPForm />
          </>
        }
      />
      <Route path="/list" element={<RSVPList />} />
    </Routes>
  )
}