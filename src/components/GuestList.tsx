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
    <div className="px-5 lg:px-50 p-4 space-y-6">
    <div className='fixed inset-0 bg-wedding-softgray h-[100vh] z-[-10]'></div>

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
            className="border border-wedding-gold/40 px-3 py-2 rounded-lg text-sm text-wedding-slate 
             outline-none focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold 
             appearance-none cursor-pointer transition-all"
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
            className="border border-wedding-gold/40 px-3 py-2 rounded-lg text-sm text-wedding-slate 
             outline-none focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold 
             appearance-none cursor-pointer transition-all"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as any)
            }
          >
            <option value="all">
              All
            </option>

            <option value="dietary">
              Restriction
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
            className="border border-gray-200  rounded-xl p-5 shadow-sm bg-wedding-warmcream"
          >

            {/* HEADER */}
            <div className="flex justify-between items-start">

              <div>
                <h2 className={`text-lg font-semibold text-gray-900
                ${ rsvp.attending ? 'text-wedding-slate' : 'text-wedding-slate' }`}>
                  {rsvp.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {rsvp.email}
                </p>
              </div>

              <div className="flex items-center gap-2 h-full min-h-[40px]">

                <span
                  className={`text-xs px-3 lg:px-20 py-1 lg:py-3 rounded-full font-medium flex ${
                    rsvp.attending
                      ? 'bg-wedding-babyblue text-white'
                      : 'bg-wedding-maroon text-white'
                  }`}
                >
                  {rsvp.attending
                    ? 'Attending'
                    : 'Declined'}
                </span>

                <button
                  onClick={() => deleteRSVP(rsvp.id)}
                  className="flex items-center justify-center p-2 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <Trash2 
                    className="w-[18px] h-[18px] lg:w-[28px] lg:h-[28px] stroke-wedding-gold hover:stroke-red-600 transition-colors" 
                  />
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
                  Restriction:
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
                    className="flex justify-between bg-wedding-softgray px-3 py-2 rounded-lg text-sm"
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