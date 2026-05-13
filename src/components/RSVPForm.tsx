import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

interface Guest {
  id: number
  name: string
  age: string
}

interface FormData {
  name: string
  email: string
  attending: string
  dietary_restrictions: string
  message: string
}


let guestCounter = 0

export default function RSVPSection() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    attending: '',
    dietary_restrictions: '',
    message: '',
  })

  const [guests, setGuests] = useState<Guest[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)

  const totalAttendees = 1 + guests.length

  const isUnderAge = (age: string) => {
    const parsed = parseInt(age)
    return !isNaN(parsed) && parsed < 7
  }

  const hasAgeError = guests.some((g) => isUnderAge(g.age))

  const addGuest = () => {
    setGuests((prev) => [...prev, { id: guestCounter++, name: '', age: '' }])
  }

  const removeGuest = (id: number) => {
    setGuests((prev) => prev.filter((g) => g.id !== id))
  }

  const updateGuest = (id: number, field: keyof Omit<Guest, 'id'>, value: string) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    )
  }

  const handleAttendingChange = (value: string) => {
    setForm({ ...form, attending: value, dietary_restrictions: '' })
    if (value === 'no') setGuests([])
  }

  const handleSubmit = async () => {
    if (hasAgeError) return
    if (!form.name || !form.email || !form.attending || guests.some((g) => !g.name || !g.age)) {
      setError('Please fill in all required fields.')
      return
    }
    

    setSubmitting(true)
    setError(null)

    const trimmedEmail = form.email.trim().toLowerCase()

    const { data: existingEmail } = await supabase
      .from('rsvp')
      .select('id')
      .eq('email', trimmedEmail)
      .maybeSingle()

    if (existingEmail) {
      setError('An RSVP using this email already exists.')
      setSubmitting(false)
      return
    }

    try {
      const { data: rsvpData, error: rsvpError } = await supabase
        .from('rsvp')
        .insert({
          name: form.name.trim(),
          email: trimmedEmail,
          attending: form.attending === 'yes',
          dietary_restrictions: form.dietary_restrictions.trim() || null,
          message: form.message.trim() || null,
        })
        .select('id')
        .single()

      if (rsvpError) throw rsvpError

      if (guests.length > 0) {
        const guestRows = guests.map((g) => ({
          rsvp_id: rsvpData.id,
          guest_name: g.name.trim(),
          age: parseInt(g.age),
        }))

        const { error: guestError } = await supabase
          .from('rsvp_guests')
          .insert(guestRows)

        if (guestError) throw guestError
      }

      setSubmitted(true)
  setLocked(true)
    } catch (err: unknown) {
      console.error('RSVP Error:', err)
      const message = err instanceof Error ? err.message : JSON.stringify(err)
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setSubmitted(false)
  }

  

  return (
    <div id="RSVPForm" className="max-w-xl mx-auto py-12 px-4">
      {/* Success Modal */}
      {submitted && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-lg font-medium text-gray-900 mb-1">
              {form.attending === 'yes' ? 'RSVP Confirmed!' : 'Thanks for letting us know!'}
            </h2>
            <p className="text-sm text-gray-500">
              {form.attending === 'yes'
                ? `Thanks, ${form.name}. We're expecting ${totalAttendees} ${totalAttendees === 1 ? 'attendee' : 'attendees'}.`
                : `Sorry you can't make it, ${form.name}. You'll be missed!`}
            </p>
          </div>
        </div>
      )}
      <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">

        {/* Header */}
        <h2 className="text-xl font-medium text-gray-900">RSVP</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please fill out your details to confirm your attendance.
        </p>

        <hr className="my-6 border-gray-100" />

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Name <span className="text-red-400">*</span></label>
            <input
              type="text"
              placeholder="Juan dela Cruz"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-9 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Email <span className="text-red-400">*</span></label>
            <input
              type="email"
              placeholder="juan@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-9 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white"
            />
          </div>
        </div>

        {/* Will you be attending? */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-xs text-gray-500">Will you be attending? <span className="text-red-400">*</span></label>
          <select
            value={form.attending}
            onChange={(e) => handleAttendingChange(e.target.value)}
            className={`h-9 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white ${
              form.attending === '' ? 'text-gray-400' : 'text-gray-900'
            }`}
          >
            <option value="" disabled>Please select</option>
            <option value="yes">✓ Yes, I'll be there!</option>
            <option value="no">✗ No, I can't make it</option>
          </select>
        </div>

        {/* YES block — dietary + guests */}
        {form.attending === 'yes' && (
          <>
            <hr className="mb-6 border-gray-100" />

            <div className="flex flex-col gap-1 mb-4">
              <label className="text-xs text-gray-500">Dietary Restrictions</label>
              <input
                type="text"
                placeholder="Vegetarian, vegan, allergies, etc."
                value={form.dietary_restrictions}
                onChange={(e) => setForm({ ...form, dietary_restrictions: e.target.value })}
                className="h-9 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white"
              />
            </div>
            

            {guests.length > 0 && (
              <div className="grid grid-cols-[1fr_80px_32px] gap-2 mb-2">
                <span className="text-xs text-gray-400">Guest's Name <span className="text-red-400">*</span></span>
                <span className="text-xs text-gray-400">Guest's Age <span className="text-red-400">*</span></span>
                <span />
              </div>
            )}

            {guests.map((guest) => (
              <div key={guest.id} className="mb-2">
                <div className="grid grid-cols-[1fr_80px_32px] gap-2 items-start">
                  <input
                    type="text"
                    placeholder="Guest name"
                    value={guest.name}
                    onChange={(e) => updateGuest(guest.id, 'name', e.target.value)}
                    className="h-9 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    min={0}
                    value={guest.age}
                    onChange={(e) => updateGuest(guest.id, 'age', e.target.value)}
                    className={`h-9 px-3 text-sm border rounded-lg focus:outline-none bg-white ${
                      isUnderAge(guest.age)
                        ? 'border-red-300 focus:border-red-400'
                        : 'border-gray-200 focus:border-gray-400'
                    }`}
                  />
                  <button
                    onClick={() => removeGuest(guest.id)}
                    className="h-9 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                    aria-label="Remove guest"
                  >
                    ×
                  </button>
                </div>
                {isUnderAge(guest.age) && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <span>⚠</span> Guests below 7 years old are not allowed per venue rules.
                  </p>
                )}
              </div>
            ))}

            {guests.length === 0 && (
              <button
                onClick={addGuest}
                className="w-full mt-1 py-2 px-3 text-sm text-gray-500 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors flex items-center justify-center gap-1"
              >
                + Add guest
              </button>
            )}
          </>
        )}

        {/* Message — always visible once attending is selected */}
        {form.attending !== '' && (
          <>
            <hr className="my-6 border-gray-100" />
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Message to the Couple</label>
              <textarea
                placeholder="Share your well wishes..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={7}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white resize-none"
              />
            </div>
          </>
        )}

        {/* Error */}
        {error && (
          <p className="mt-4 text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting || hasAgeError || locked}
          className="mt-5 w-full h-10 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Submitting...' : 'Confirm RSVP'}
        </button>

      </div>
    </div>
  )
}