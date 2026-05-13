import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Menu, X } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    "Home",
    "Love Note",
    "Details",
    "The Entourage",
    "Gift Guide",
    "Rules",
    "RSVP"
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent text-white">
      
      {/* DESKTOP */}
      <div className="hidden lg:flex items-center justify-between px-60 py-6">

        {/* LEFT LOGO */}
        <div className="flex items-center gap-2 text-xl tracking-widest font-light"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          R <Heart className="w-4 h-4 text-[#C9A84C]" /> F
        </div>

        {/* RIGHT LINKS */}
        <div className="flex gap-8 text-[11px] tracking-[0.25em] uppercase">
          {links.map((item, i) => (
            <motion.a
              key={i}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="hover:text-[#C9A84C] transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex items-center justify-between px-6 py-5 lg:hidden">

      {/* LOGO */}
      <div
        className="flex items-center gap-2 text-lg leading-none pt-2"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        <span className="flex items-center leading-none">R</span>

        <Heart className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />

        <span className="flex items-center leading-none">F</span>
      </div>

      {/* BUTTON */}
      <button onClick={() => setOpen(!open)} className="relative z-50">
        {open ? <X /> : <Menu />}
      </button>

    </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%", opacity: 1 }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed top-0 right-0 h-screen w-[92%] bg-black/70 backdrop-blur-md flex flex-col items-center justify-center gap-8 text-sm tracking-[0.2em] uppercase"
          >
            {links.map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setOpen(false)}
                className="hover:text-[#C9A84C] transition z-100"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}