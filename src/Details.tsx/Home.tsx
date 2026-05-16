import { motion } from "framer-motion"
import Countdown from './Countdown';
import WeddingButton from './WeddingButton';
import { Heart } from "lucide-react"

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay: 2.5 + delay, // ← ito yung nawala
    duration: 0.8,
    ease: "easeInOut" as const,
  },
});

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
        style={{ backgroundImage: "url('/images/homeMobile.webp')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#boaeae]/75" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <div className="text-center text-white px-6 mb-8">

          {/* Desktop Title */}
          <motion.h1
            {...fadeUp(0)}
            className="hidden md:block text-9xl font-light tracking-wide italic"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Rhandy & Francheska
          </motion.h1>

          {/* Mobile Title */}
          <motion.h1
            {...fadeUp(0)}
            className="mt-20 md:hidden text-[2.25rem] leading-none font-light tracking-wide [text-shadow:0_2px_10px_rgba(201,168,76,0.35)] flex flex-row justify-center items-center gap-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            <span>Rhandy</span>
            <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
            <Heart className="w-8 h-8 text-[#C9A84C]" />
            </motion.div>
            <span>Francheska</span>
          </motion.h1>

          {/* Wedding Celebration */}
          <motion.p
            {...fadeUp(0.15)}
            className="mt-4 text-[#D4AF37] tracking-[0.1em] font-bold uppercase text-[1.25rem] lg:text-[2rem] lg:font-medium lg:tracking-[0.75em] [text-shadow:2px_2px_6px_rgba(0,0,0,1)] font-['Cormorant_Garamond']"
          >
            Wedding Celebration
          </motion.p>

          {/* Info Mobile */}
          <motion.p
            {...fadeUp(0.3)}
            className="mt-2 text-[1.25rem] opacity-70 block md:hidden [text-shadow:2px_2px_6px_rgba(0,0,0,1)] font-['Cormorant_Garamond']"
          >
            <div>Casa Macoto Beach Resort</div>
            <div>July 12, 2026</div>
          </motion.p>

          {/* Info Desktop */}
          <motion.p
            {...fadeUp(0.3)}
            className="mt-5 text-xl tracking-[0.25em] opacity-70 hidden md:block text-white"
          >
            Casa Macoto Beach Resort • July 12, 2026
          </motion.p>

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