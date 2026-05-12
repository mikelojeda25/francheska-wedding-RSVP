import { useEffect, useState } from "react"

// ── Change these values as needed ──
const WEDDING_DATE = "2026-07-25T16:00:00"
// ───────────────────────────────────

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining())

  function getTimeRemaining() {
    const now = new Date()
    const target = new Date(WEDDING_DATE)
    const diff = target.getTime() - now.getTime()

    if (diff <= 0) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }

    const seconds = Math.floor((diff / 1000) % 60)
    const minutes = Math.floor((diff / 1000 / 60) % 60)
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24)

    let months =
      (target.getFullYear() - now.getFullYear()) * 12 +
      (target.getMonth() - now.getMonth())

    const temp = new Date(now.getFullYear(), now.getMonth() + months, now.getDate())
    if (temp > target) months--

    const base = new Date(now.getFullYear(), now.getMonth() + months, now.getDate())
    const days = Math.floor((target.getTime() - base.getTime()) / (1000 * 60 * 60 * 24))

    return { months, days, hours, minutes, seconds }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (num: number) => String(num).padStart(2, "0")

  return (
    <div className="flex gap-4 text-white text-center mt-6">
      <TimeBox label="Months" value={pad(timeLeft.months)} />
      <TimeBox label="Days" value={pad(timeLeft.days)} />
      <TimeBox label="Hours" value={pad(timeLeft.hours)} />
      <TimeBox label="Minutes" value={pad(timeLeft.minutes)} />
      <TimeBox label="Seconds" value={pad(timeLeft.seconds)} />
    </div>
  )
}

function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-light">{value}</div>
      <div className="text-xs uppercase tracking-widest opacity-70">{label}</div>
    </div>
  )
}