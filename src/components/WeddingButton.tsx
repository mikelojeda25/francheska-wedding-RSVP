import { motion } from 'framer-motion'

export default function WeddingButton() {
  return (
    <motion.a
      href="#RSVPForm"
      className="lg:px-60 py-3 text-[14px] tracking-[0.25em] uppercase text-white bg-transparent border-1 border border-white  rounded-[10px] font-medium px-25 cursor-pointer "
      whileHover={{ backgroundColor: '#C9A84C', color: '#ffffff' }}
      whileTap={{ backgroundColor: '#C9A84C', color: '#ffffff', scale: 0.97 }}
      transition={{ duration: 0.15, ease: 'easeInOut' }}
    >
      RSVP NOW
    </motion.a>
  )
}

