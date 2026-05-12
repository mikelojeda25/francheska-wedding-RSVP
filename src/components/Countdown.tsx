import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2026-07-12T00:00:00"); // adjust year if needed

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      return {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    // months approximation (not perfectly accurate calendar-wise)
    const months = Math.floor(days / 30);

    return { months, days: days % 30, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad = (num) => String(num).padStart(2, "0");

  return (
    <div className="flex gap-4 text-white text-center mt-6">
      <TimeBox label="Months" value={pad(timeLeft.months)} />
      <TimeBox label="Days" value={pad(timeLeft.days)} />
      <TimeBox label="Hours" value={pad(timeLeft.hours)} />
      <TimeBox label="Minutes" value={pad(timeLeft.minutes)} />
      <TimeBox label="Seconds" value={pad(timeLeft.seconds)} />
    </div>
  );
}

function TimeBox({ label, value }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-light">{value}</div>
      <div className="text-xs uppercase tracking-widest opacity-70">
        {label}
      </div>
    </div>
  );
}