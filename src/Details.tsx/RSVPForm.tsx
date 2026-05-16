import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, UserPlus, Trash2, AlertTriangle, Heart } from 'lucide-react'
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

  const inputBase =
    'h-10 px-3 text-sm border border-wedding-darkcream rounded-xl focus:outline-none focus:border-wedding-steel bg-white text-wedding-slate placeholder:text-wedding-grey/60 transition-colors'

  return (
    <section
      id="RSVPForm"
      className="relative w-full bg-wedding-warmcream overflow-hidden pt-17 lg:pt-25 pb-20"
    >
      {/* Subtle decorative blobs */}
      <div className="pointer-events-none absolute top-0 left-0 w-72 h-72 rounded-full bg-wedding-babyblue/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 rounded-full bg-wedding-gold/10 blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Success Modal */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            className="fixed inset-0 bg-wedding-slate/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="bg-white rounded-2xl p-10 max-w-sm w-full shadow-xl relative text-center border border-wedding-darkcream"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-wedding-grey hover:text-wedding-slate transition-colors"
                aria-label="Close"
              >
                ✕
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-14 h-14 rounded-full bg-wedding-babyblue/20 flex items-center justify-center mx-auto mb-5"
              >
                <Heart className="text-wedding-steel" size={24} strokeWidth={1.5} />
              </motion.div>

              <h2 className="text-lg font-medium text-wedding-slate mb-2">
                {form.attending === 'yes' ? 'RSVP Confirmed!' : 'Thanks for letting us know!'}
              </h2>
              <p className="text-sm text-wedding-grey leading-relaxed">
                {form.attending === 'yes'
                  ? `Thank you, ${form.name}. We're so excited to celebrate with ${totalAttendees === 1 ? 'you' : `you and your ${guests.length} ${guests.length === 1 ? 'guest' : 'guests'}`}!`
                  : `We'll miss you, ${form.name}. Thank you for letting us know!`}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full px-5 flex flex-col items-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center mb-12"
        >
          <h1
            className="text-5xl md:text-7xl text-wedding-slate font-bold tracking-widest drop-shadow-sm"
          >
            RSVP
          </h1>
          <p
            className="text-wedding-grey mt-2 tracking-wide text-sm md:text-base"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Please confirm your attendance by May 30, 2026
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-wedding-darkcream px-8 py-10"
        >

          {/* Name + Email */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-wedding-grey tracking-wide">
                Name <span className="text-wedding-maroon">*</span>
              </label>
              <input
                type="text"
                placeholder="Juan dela Cruz"
                value={form.name}
                disabled={locked}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputBase}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-wedding-grey tracking-wide">
                Email <span className="text-wedding-maroon">*</span>
              </label>
              <input
                type="email"
                placeholder="juan@email.com"
                value={form.email}
                disabled={locked}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputBase}
              />
            </div>
          </div>

          {/* Attending */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-xs text-wedding-grey tracking-wide">
              Will you be attending? <span className="text-wedding-maroon">*</span>
            </label>
            <select
              value={form.attending}
              disabled={locked}
              onChange={(e) => handleAttendingChange(e.target.value)}
              className={`${inputBase} ${form.attending === '' ? 'text-wedding-grey/60' : 'text-wedding-slate'}`}
            >
              <option value="" disabled>Please select</option>
              <option value="yes">✓ Yes, I'll be there!</option>
              <option value="no">✗ No, I can't make it</option>
            </select>
          </div>

          {/* YES block */}
          <AnimatePresence>
            {form.attending === 'yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <hr className="mb-5 border-wedding-darkcream" />

                <div className="flex flex-col gap-1 mb-4">
                  <label className="text-xs text-wedding-grey tracking-wide">Dietary Restrictions</label>
                  <input
                    type="text"
                    placeholder="Vegetarian, vegan, allergies, etc."
                    value={form.dietary_restrictions}
                    disabled={locked}
                    onChange={(e) => setForm({ ...form, dietary_restrictions: e.target.value })}
                    className={inputBase}
                  />
                </div>

                {/* Guest column headers */}
                {guests.length > 0 && (
                  <div className="grid grid-cols-[1fr_80px_36px] gap-2 mb-2">
                    <span className="text-xs text-wedding-grey tracking-wide">
                      Guest's Name <span className="text-wedding-maroon">*</span>
                    </span>
                    <span className="text-xs text-wedding-grey tracking-wide">
                      Age <span className="text-wedding-maroon">*</span>
                    </span>
                    <span />
                  </div>
                )}

                {/* Guest rows */}
                <AnimatePresence initial={false}>
                  {guests.map((guest) => (
                    <motion.div
                      key={guest.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="mb-2"
                    >
                      <div className="grid grid-cols-[1fr_80px_36px] gap-2 items-start">
                        <input
                          type="text"
                          placeholder="Guest name"
                          value={guest.name}
                          disabled={locked}
                          onChange={(e) => updateGuest(guest.id, 'name', e.target.value)}
                          className={inputBase}
                        />
                        <input
                          type="number"
                          placeholder="Age"
                          min={0}
                          value={guest.age}
                          disabled={locked}
                          onChange={(e) => updateGuest(guest.id, 'age', e.target.value)}
                          className={`${inputBase} ${isUnderAge(guest.age) ? 'border-wedding-maroon/50 focus:border-wedding-maroon' : ''}`}
                        />
                        <button
                          onClick={() => removeGuest(guest.id)}
                          disabled={locked}
                          className="h-10 w-9 flex items-center justify-center rounded-xl border border-wedding-darkcream text-wedding-grey hover:bg-red-50 hover:text-wedding-maroon hover:border-wedding-maroon/30 transition-colors"
                          aria-label="Remove guest"
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                      {isUnderAge(guest.age) && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-wedding-maroon flex items-center gap-1 mt-1"
                        >
                          <AlertTriangle size={11} strokeWidth={1.5} />
                          Guests below 7 years old are not allowed per venue rules.
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Add guest button — always visible while attending=yes */}
                {!locked && (
                  <button
                    onClick={addGuest}
                    className="w-full mt-1 py-2.5 px-3 text-sm text-wedding-steel border border-dashed border-wedding-darkcream rounded-xl hover:bg-wedding-warmcream hover:border-wedding-steel/40 transition-colors flex items-center justify-center gap-2"
                  >
                    <UserPlus size={15} strokeWidth={1.5} />
                    Add a guest
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message — visible once attending is selected */}
          <AnimatePresence>
            {form.attending !== '' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <hr className="my-5 border-wedding-darkcream" />
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-wedding-grey tracking-wide">Message to the Couple</label>
                  <textarea
                    placeholder="Share your well wishes..."
                    value={form.message}
                    disabled={locked}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="px-3 py-2.5 text-sm border border-wedding-darkcream rounded-xl focus:outline-none focus:border-wedding-steel bg-white text-wedding-slate placeholder:text-wedding-grey/60 resize-none transition-colors"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-start gap-2 text-sm text-wedding-maroon bg-red-50 border border-wedding-maroon/20 rounded-xl px-4 py-3"
              >
                <XCircle size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            onClick={handleSubmit}
            disabled={submitting || hasAgeError || locked}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full h-11 text-sm font-medium bg-wedding-slate text-white rounded-xl hover:bg-wedding-steel disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle2 size={15} strokeWidth={1.5} />
                Confirm RSVP
              </>
            )}
          </motion.button>

        </motion.div>
      </div>
    </section>
  )
}