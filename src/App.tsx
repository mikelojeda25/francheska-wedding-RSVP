import { Routes, Route } from 'react-router-dom'
import RSVPSection from './components/Rsvpform'
import RSVPList from './components/GuestList'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RSVPSection />} />
      <Route path="/list" element={<RSVPList />} />
    </Routes>
  )
}