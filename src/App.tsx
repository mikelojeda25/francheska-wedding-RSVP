import { Routes, Route } from 'react-router-dom'
import RSVPForm from './components/RSVPForm'
import RSVPList from './components/GuestList'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RSVPForm />} />
      <Route path="/list" element={<RSVPList />} />
    </Routes>
  )
}