import { Routes, Route } from 'react-router-dom'
import RSVPForm from './components/RSVPForm'
import Home from './components/Home'
import RSVPList from './components/GuestList'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Home />
            <RSVPForm />
          </>
        }
      />
      <Route path="/list" element={<RSVPList />} />
    </Routes>
  )
}