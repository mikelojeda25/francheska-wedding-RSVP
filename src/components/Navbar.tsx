import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Menu, X } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { label: "Home", href: "#home" },
    { label: "Devotion", href: "#Devotion" },
    { label: "Details", href: "#Details" },
    { label: "The Entourage", href: "#Entourage" },
    { label: "Gift Guide", href: "#GiftGuide" },
    { label: "Rules", href: "#Rules" },
    { label: "RSVP", href: "#RSVPForm" }
  ]

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-wedding-babyblue/90 backdrop-blur-md shadow-lg" 
        : "bg-wedding-babyblue/60 backdrop-blur-sm"
    }`}>

      {/* DESKTOP */}
      <div className="hidden lg:flex items-center justify-between px-[12%] py-5">
        
        {/* Logo */}
        <div
          className="flex items-center gap-2 text-2xl tracking-widest font-light text-white"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          R <Heart className="w-4 h-4" fill="#ffffff" stroke="#ffffff" /> F
        </div>

        {/* Links */}
        <div className="flex gap-8 text-[11px] tracking-[0.25em] uppercase text-white/90">
          {links.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              className="hover:text-white hover:border-b hover:border-white/60 pb-0.5 transition-all"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </div>

      {/* MOBILE TOPBAR */}
      <div className="flex items-center justify-between px-6 py-5 lg:hidden">
        <div
          className="flex items-center gap-2 text-lg leading-none pt-2 text-white"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          <span className="flex items-center leading-none">R</span>
          <Heart className="w-4 h-4 flex-shrink-0" fill="#ffffff" stroke="#ffffff" />
          <span className="flex items-center leading-none">F</span>
        </div>

        <button onClick={() => setOpen(!open)} className="relative z-50 text-white">
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
            className="fixed top-0 right-0 h-screen w-[92%] bg-wedding-babyblue backdrop-blur-md flex flex-col items-center justify-center gap-8 text-sm tracking-[0.2em] uppercase text-white/90 text-xl"
          >

            {links.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                onClick={() => setOpen(false)}
                className="hover:text-white border-b border-transparent hover:border-white/40 pb-0.5 transition-all"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.label}
              </motion.a>
            ))}

            {/* Decorative heart bottom */}
            <Heart className="absolute bottom-10 w-6 h-6 text-white/30" fill="white" stroke="white" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}