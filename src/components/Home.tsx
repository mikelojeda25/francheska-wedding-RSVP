import { motion } from "framer-motion"
import Countdown from './Countdown';
import WeddingButton from './WeddingButton';
import { Heart } from "lucide-react"
import StarField from "./StarField";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay: 3.4 + delay,
    duration: 0.8,
    ease: "easeInOut" as const,
  },
});

// Decorative divider component
const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 -mt-2 -mb-2 ${className}`}>
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/60" />
    <div className="w-1 h-1 rounded-full bg-white" />
    <div className="h-px w-6 bg-white/50" />
    <div className="w-2 h-2 rounded-full border-2 bg-white" />
    <div className="h-px w-6 bg-white/50" />
    <div className="w-1 h-1 rounded-full bg-white" />
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/60" />
  </div>
)

export default function Home() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">

      {/* Background Images */}
      <div
        className="absolute inset-0 bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: "url('/images/home.webp')" }}
      />
      <div
  className="absolute inset-0 bg-cover bg-center lg:hidden"
  style={{ 
    backgroundImage: "url('/images/homeMobile.webp')",
    transform: "scaleX(-1)"
  }}
/>

      {/* Overlay */}
      <div className="absolute inset-0 bg-wedding-grey/80" />

      {/* Stars */}
      <StarField />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <div className="text-center text-white px-6 mb-8">

          {/* ── DESKTOP ── */}
          <div className="hidden md:block">
            <motion.h1
              {...fadeUp(0)}
              className="text-9xl font-light tracking-wide italic"
              style={{ fontFamily: "'Great Vibes', cursive", textShadow: "2px 2px 0px #C2A378" }}
            >
              Rhandy & Francheska
            </motion.h1>

            {/* Desktop Divider */}
            <motion.div {...fadeUp(0.1)} className="mt-4 flex items-center justify-center gap-3">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-white/60" />
              <div className="w-2 h-2 rounded-full bg-white" />
              <div className="h-px w-6 bg-white/50" />
              <div className="w-3 h-3 rounded-full border-4 bg-white" />
              <div className="h-px w-6 bg-white/50" />
              <div className="w-2 h-2 rounded-full bg-white" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-white/60" />
            </motion.div>
            <motion.p
              {...fadeUp(0.15)}
              className="mt-4 text-white tracking-[0.75em] font-medium uppercase text-[2rem]"
              style={{ textShadow: "2px 1px 0px #C2A378", fontFamily: "'Cormorant Garamond', serif" }}
            >
              Wedding Celebration
            </motion.p>

            <motion.p
              {...fadeUp(0.3)}
              className="mt-5 text-xl tracking-[0.25em]  text-white/80"
              style={{ textShadow: "2px 1px 0px #C2A378" }}
            >
              Casa Macoto Beach Resort • July 25, 2026
            </motion.p>
          </div>

          {/* ── MOBILE ── */}
          <div className="md:hidden">
            <motion.h1
              {...fadeUp(0)}
              className="mt-20 text-[2.25rem] leading-none font-light tracking-wide flex flex-row justify-center items-center gap-4"
              style={{ fontFamily: "'Great Vibes', cursive", textShadow: "2px 2px 0px #C2A378" }}
            >
              <span>Rhandy</span>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart
                  className="w-8 h-8"
                  fill="#EBB26A"
                  stroke="#ffffff"
                  strokeWidth={0.5}
                />
              </motion.div>
              <span>Francheska</span>
            </motion.h1>

            {/* Mobile Divider */}
            <motion.div {...fadeUp(0.1)} className="mt-4">
              <Divider />
            </motion.div>

            <motion.p
              {...fadeUp(0.15)}
              className="mt-4 text-white tracking-[0.4em] font-bold uppercase text-[.9rem]"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.15)", fontFamily: "'Cormorant Garamond', serif" }}
            >
              Wedding Celebration
            </motion.p>

            {/* Mobile Divider below subtitle */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-[.9rem] font-bold tracking-[0.05rem] text-white/80"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.15)" }}
            >
              <div>Casa Macoto Beach Resort</div>
              <div className="mt-0.5">July 25, 2026</div>
            </motion.p>
          </div>

        </div>

        {/* Countdown Mobile */}
        <motion.div {...fadeUp(0.45)} className="md:hidden scale-80 pb-10">
          <Countdown />
        </motion.div>

        {/* RSVP Button */}
        <motion.div {...fadeUp(0.6)}>
          <WeddingButton />
        </motion.div>

        {/* Countdown Desktop */}
        <motion.div {...fadeUp(0.75)} className="absolute bottom-20 hidden md:block">
          <Countdown />
        </motion.div>

      </div>
    </section>
  );
}