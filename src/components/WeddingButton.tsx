import { motion } from 'framer-motion'

export default function WeddingButton({
  label = "RSVP Now",
  onClick
}: {
  label?: string
  onClick?: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      className="px-12 py-3 text-[11px] tracking-[0.25em] uppercase border border-[#C9A84C] text-[#C9A84C] bg-white border-2 rounded-full font-medium"
      whileHover={{ backgroundColor: '#C9A84C', color: '#ffffff' }}
      whileTap={{ backgroundColor: '#C9A84C', color: '#ffffff', scale: 0.97 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {label}
    </motion.button>
  )
}

