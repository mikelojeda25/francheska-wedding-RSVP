import RSVPSection from './components/RSVPSection'

export default function App() {
  console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
  return <RSVPSection />
}