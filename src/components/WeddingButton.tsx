import { motion } from 'framer-motion'

export default function WeddingButton() {
  return (
    <div style={{ filter: "drop-shadow(3px 3px 0px #ffffff)" }}>
      <motion.a
        href="#RSVPForm"
        className="lg:px-60 py-4 text-[16px] tracking-[0.25em] uppercase bg-[#86afcd] rounded-[10px] font-medium px-22 cursor-pointer text-white"
        whileHover={{ backgroundColor: '#C9A84C', color: '#ffffff' }}
        whileTap={{ backgroundColor: '#C9A84C', color: '#ffffff', scale: 0.97 }}
        transition={{ duration: 0.13, ease: 'easeInOut' }}
      >
        RSVP NOW
      </motion.a>
    </div>
  )
}