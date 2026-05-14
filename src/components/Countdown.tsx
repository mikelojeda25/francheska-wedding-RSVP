import { useEffect, useState } from "react"

const WEDDING_DATE = "2026-07-25T16:00:00"

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining())

  function getTimeRemaining() {
    const now = new Date()
    const target = new Date(WEDDING_DATE)
    const diff = target.getTime() - now.getTime()

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeRemaining()), 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")

  const units = [
    { value: timeLeft.days, suffix: "D" },
    { value: timeLeft.hours, suffix: "H" },
    { value: timeLeft.minutes, suffix: "M" },
    { value: timeLeft.seconds, suffix: "S" },
  ]

  return (
    <div className="flex flex-col items-center gap-2 mt-6">
      <p className="text-[16px] uppercase tracking-[0.5em] text-[#C9A84C] font-bold font-['Cormorant_Garamond']">
        COUNTDOWN
      </p>

      <div className="flex items-center gap-3">
        {units.map(({ value, suffix }, i) => (
          <div key={suffix} className="flex items-center gap-3">
            <div className="flex items-end gap-1">
              <span className="text-3xl font-bold text-white tabular-nums drop-shadow-md">
                {pad(value)}
              </span>
              <span className="text-2xl font-bold tracking-widest text-[#C9A84C] drop-shadow-md">
                {suffix}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="text-white/40 text-xl">·</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}