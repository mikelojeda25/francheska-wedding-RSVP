import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

export default function Loader({ onFinish }: { onFinish?: () => void }) {
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsLeaving(true), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">

      {/* GOLD VIGNETTE GLOW */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/10 blur-3xl"
        animate={isLeaving ? { opacity: 0 } : { scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={isLeaving ? { duration: 0.4, ease: "easeInOut" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SECOND SOFT LIGHT */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/5 blur-2xl"
        animate={isLeaving ? { opacity: 0 } : { y: [-10, 10, -10], opacity: [0.2, 0.35, 0.2] }}
        transition={isLeaving ? { duration: 0.6, ease: "easeInOut" } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* CENTER CONTENT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isLeaving ? { opacity: 0 } : { opacity: 1, scale: 1 }}
        transition={isLeaving ? { duration: 0.6, ease: "easeInOut" } : { duration: 1 }}
        onAnimationComplete={() => {
          if (isLeaving) onFinish?.()
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative flex flex-col items-center text-center">

          {/* MONOGRAM */}
          <div
            className="flex items-center gap-3 text-[#C9A84C]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="text-5xl tracking-widest">R</span>

            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-6 h-6" />
            </motion.div>

            <span className="text-5xl tracking-widest">F</span>
          </div>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-[#C9A84C]/80 tracking-[0.4em] text-xs uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A Wedding Invitation
          </motion.p>

        </div>
      </motion.div>

      {/* VIGNETTE OVERLAY */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black pointer-events-none" />

    </div>
  )
}