import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import * as XLSX from 'xlsx'
import { Trash2, Download } from 'lucide-react'

interface Guest {
  id: string
  guest_name: string
  age: number
}

interface RSVP {
  id: string
  name: string
  email: string
  attending: boolean
  message: string
  dietary_restrictions: string
  created_at: string
  rsvp_guests: Guest[]
}

export default function RSVPList() {
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(true)

  const [sort, setSort] = useState<'new' | 'old' | 'az' | 'za'>('new')

  const [filter, setFilter] = useState<
    'all' |
    'dietary' |
    'attending' |
    'declined' |
    'message'
  >('all')

  useEffect(() => {
    fetchRSVP()
  }, [])

  async function fetchRSVP() {
    const { data, error } = await supabase
      .from('rsvp')
      .select(`
        *,
        rsvp_guests (
          id,
          guest_name,
          age
        )
      `)

    if (error) {
      console.log(error)
      return
    }

    setRsvps(data || [])
    setLoading(false)
  }

  async function deleteRSVP(id: string) {
    const confirmDelete = window.confirm(
      'Delete this RSVP?'
    )

    if (!confirmDelete) return

    const { error } = await supabase
      .from('rsvp')
      .delete()
      .eq('id', id)

    if (error) {
      console.log(error)
      return
    }

    setRsvps((prev) =>
      prev.filter((r) => r.id !== id)
    )
  }

  const processedRsvps = rsvps
    .filter((r) => {
      switch (filter) {
        case 'dietary':
          return r.dietary_restrictions?.trim()

        case 'attending':
          return r.attending === true

        case 'declined':
          return r.attending === false

        case 'message':
          return r.message?.trim()

        default:
          return true
      }
    })
    .sort((a, b) => {
      switch (sort) {
        case 'az':
          return a.name.localeCompare(b.name)

        case 'za':
          return b.name.localeCompare(a.name)

        case 'new':
          return (
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
          )

        case 'old':
          return (
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
          )

        default:
          return 0
      }
    })

    const totalPeople = processedRsvps.reduce(
    (total, rsvp) => {
        return total + 1 + (rsvp.rsvp_guests?.length || 0)
    },
    0
    )

  function exportToExcel() {

  const exportData: any[] = []

    processedRsvps.forEach((rsvp) => {

        // MAIN RSVP ROW
        exportData.push({
        Name: rsvp.name,
        Type: 'Main RSVP',
        Email: rsvp.email,
        Status: rsvp.attending
            ? 'Attending'
            : 'Declined',

        Dietary:
            rsvp.dietary_restrictions || '',

        Message:
            rsvp.message || '',

        Guest: '',
        GuestAge: ''
        })

        // GUEST ROWS
        if (rsvp.rsvp_guests?.length > 0) {

        rsvp.rsvp_guests.forEach((guest) => {

            exportData.push({
            Name: rsvp.name,
            Type: 'Guest',
            Email: '',
            Status: '',
            Dietary: '',
            Message: '',
            Guest: guest.guest_name,
            GuestAge: guest.age
            })

        })

        }

    })

    const worksheet =
        XLSX.utils.json_to_sheet(exportData)

    const workbook =
        XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        'RSVP'
    )

    XLSX.writeFile(
        workbook,
        `RSVP_List_${
        new Date()
            .toISOString()
            .split('T')[0]
        }.xlsx`
    )
    }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500">
        Loading RSVP data...
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          RSVP List
        </h1>

        <div className="text-sm text-gray-600 flex gap-4">
            <div>
                Entries:{' '}
                <span className="font-bold">
                {processedRsvps.length}
                </span>
            </div>

            <div>
                Total People:{' '}
                <span className="font-bold">
                {totalPeople}
                </span>
            </div>

            </div>
      </div>

      {/* CONTROLS */}
      <div className="flex justify-between items-center flex-wrap gap-3">

        {/* LEFT */}
        <div className="flex gap-2 flex-wrap">

          {/* SORT */}
          <select
            className="border border-gray-200  px-3 py-2 rounded-lg text-sm"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as any)
            }
          >
            <option value="new">
              Newest
            </option>

            <option value="old">
              Oldest
            </option>

            <option value="az">
              Name A-Z
            </option>

            <option value="za">
              Name Z-A
            </option>
          </select>

          {/* FILTER */}
          <select
            className="border border-gray-200  px-3 py-2 rounded-lg text-sm"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as any)
            }
          >
            <option value="all">
              All
            </option>

            <option value="dietary">
              Dietary Restriction
            </option>

            <option value="attending">
              Attending
            </option>

            <option value="declined">
              Declined
            </option>

            <option value="message">
              With Message
            </option>
          </select>

        </div>

        {/* RIGHT */}
        <button
          onClick={exportToExcel}
          className="bg-black text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition flex justify-center items-center gap-1"
        >
          <Download size={18} />
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-4">

        {processedRsvps.map((rsvp) => (

          <div
            key={rsvp.id}
            className="border border-gray-200  rounded-xl p-5 shadow-sm bg-white"
          >

            {/* HEADER */}
            <div className="flex justify-between items-start">

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {rsvp.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {rsvp.email}
                </p>
              </div>

              <div className="flex items-center gap-2">

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    rsvp.attending
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {rsvp.attending
                    ? 'Attending'
                    : 'Declined'}
                </span>

                <button
                  onClick={() =>
                    deleteRSVP(rsvp.id)
                  }
                  className="text-xs text-red-500 hover:underline"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </div>

            {/* MESSAGE */}
            {rsvp.message?.trim() && (
              <p className="mt-3 text-sm text-gray-700 italic">
                "{rsvp.message}"
              </p>
            )}

            {/* DIETARY */}
            {rsvp.dietary_restrictions?.trim() && (
              <p className="mt-2 text-sm text-orange-600">
                <span className="font-semibold">
                  Dietary:
                </span>{' '}
                {rsvp.dietary_restrictions}
              </p>
            )}

            {/* GUESTS */}
            {rsvp.rsvp_guests?.length > 0 && (
              <div className="mt-4 space-y-2">

                {rsvp.rsvp_guests.map((guest) => (

                  <div
                    key={guest.id}
                    className="flex justify-between bg-gray-50 px-3 py-2 rounded-lg text-sm"
                  >

                    <span>
                      {guest.guest_name}
                    </span>

                    <span className="text-gray-500">
                      {guest.age} yrs old
                    </span>

                  </div>

                ))}

              </div>
            )}

          </div>

        ))}

      </div>

    </div>
  )
}