import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const blobVariants = {
  animate: (i: number) => ({
    y: [0, -20, 0],
    x: [0, 15, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 8 + i * 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  }),
};

// C = biggest/closest → dims first (0% of cycle)
// B = middle          → dims at 25% and 75%
// A = smallest/far    → dims at 50%
const ANIMS = { A: "heartPulseA", B: "heartPulseB", C: "heartPulseC" } as const;

// Add count prop — defaults to 3 (desktop), pass 1 for mobile
function AnimatedHearts({ side, count = 3 }: { side: "left" | "right"; count?: number }) {
  const [phase, setPhase] = useState<"idle" | "entering" | "looping">("idle");
  const ref = useRef<HTMLDivElement>(null);

  const allLeftSizes  = ["", "w-10 h-10", "w-15 h-15"];
  const allRightSizes = ["w-15 h-15", "w-10 h-10", ""];

  // count=1: only take the big heart (closest to title)
  // left  → last item  ["w-15 h-15"]
  // right → first item ["w-15 h-15"]
  const sizes =
    count === 1
      ? ["w-8 h-8"]  // single heart, slightly smaller for mobile
      : side === "left"
      ? allLeftSizes
      : allRightSizes;

  const allAnimMap = {
    left:  [ANIMS.A, ANIMS.B, ANIMS.C],
    right: [ANIMS.C, ANIMS.B, ANIMS.A],
  };

  // For single heart, always use C (big heart pulse)
  const animMap = count === 1 ? [ANIMS.C] : allAnimMap[side];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("entering");
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "entering") return;
    const timer = setTimeout(() => setPhase("looping"), 1400);
    return () => clearTimeout(timer);
  }, [phase]);

  const getStyle = (index: number): React.CSSProperties => {
    if (phase === "idle") return { opacity: 0 };
    if (phase === "entering") {
      return {
        animation: `heartEnter 2s ease forwards`,  // no stagger, same duration as title
        opacity: 0,
      };
    }
    return {
      animation: `${animMap[index]} 4s ease-in-out infinite`,
      opacity: 1,
    };
  };

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 ${side === "right" ? "ml-6" : "mr-6"}`}
    >
      {sizes.map((size, i) => (
        <Heart
          key={i}
          className={`text-wedding-babyblue fill-wedding-babyblue ${size}`}
          style={getStyle(i)}
        />
      ))}
    </div>
  );
}
export default function LoveNote() {
  return (
    <section
      id="Lovenote"
      className="relative w-full min-h-screen flex-col flex items-center justify-center bg-wedding-slate overflow-hidden py-20 px-5"
    >
      <style>{`
        @keyframes heartEnter {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* C: biggest/closest to title — dims at 0% (start of each cycle) */
        @keyframes heartPulseC {
          0%   { opacity: 0.15; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { opacity: 0.15; }
        }

        /* B: middle — dims at 25% and 75% */
        @keyframes heartPulseB {
          0%   { opacity: 1; }
          15%  { opacity: 1; }
          25%  { opacity: 0.15; }
          40%  { opacity: 1; }
          60%  { opacity: 1; }
          75%  { opacity: 0.15; }
          85%  { opacity: 1; }
          100% { opacity: 1; }
        }

        /* A: smallest/farthest — dims at 50% */
        @keyframes heartPulseA {
          0%   { opacity: 1; }
          35%  { opacity: 1; }
          50%  { opacity: 0.15; }
          65%  { opacity: 1; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* Header row */}
      <div className="flex items-center gap-4">

        {/* Mobile: 1 heart each side */}
        <div className="flex md:hidden">
          <AnimatedHearts side="left" count={1} />
        </div>

        {/* Desktop: 3 hearts each side */}
        <div className="hidden md:flex">
          <AnimatedHearts side="left" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        >
          <h1
            className="text-center text-4xl md:text-7xl text-wedding-warmcream font-bold tracking-widest drop-shadow-lg"
            style={{ fontFamily: '"Great Vibes", cursive' }}
          >
            Love Note
          </h1>
          <p className="text-center text-sm md:text-xl text-wedding-softgray mt-2 font-['Cormorant_Garamond'] text-md italic font-light tracking-wide">
            My beloved is mine, and I am his
          </p>
        </motion.div>

        {/* Mobile: 1 heart each side */}
        <div className="flex md:hidden">
          <AnimatedHearts side="right" count={1} />
        </div>

        {/* Desktop: 3 hearts each side */}
        <div className="hidden md:flex">
          <AnimatedHearts side="right" />
        </div>

      </div>

      {/* Animated Background Blobs */}
      <motion.div custom={0} variants={blobVariants} animate="animate"
        className="absolute w-[420px] h-[420px] bg-wedding-babyblue/25 rounded-full blur-3xl top-[-120px] left-[-120px]" />
      <motion.div custom={1} variants={blobVariants} animate="animate"
        className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl bottom-[-180px] right-[-140px]" />
      <motion.div custom={2} variants={blobVariants} animate="animate"
        className="absolute w-[320px] h-[320px] bg-wedding-gold/20 rounded-full blur-2xl top-[30%] left-[65%]" />
      <motion.div custom={3} variants={blobVariants} animate="animate"
        className="absolute w-[260px] h-[260px] bg-wedding-steel/20 rounded-full blur-2xl left-[20%]" />

      {/* Content Card */}
      <div className="relative w-full max-w-[1400px]">
        {/* Flowers */}
        <motion.img
          src="/images/up-corner1.webp"
          className="absolute h-[30%] object-cover z-10 -top-5 -left-8 opacity-80 hidden md:block lg:hidden md:top-0 md:h-[50%]"
          alt="Love Note"
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <motion.img
          src="/images/up-corner.webp"
          className="absolute h-[30%] object-cover z-10 -top-5 -right-8 opacity-80 lg:hidden md:top-0 md:h-[50%]"
          alt="Love Note"
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <motion.img
          src="/images/corner.webp"
          className="absolute h-[80%] object-cover z-10 -bottom-25 -left-15 hidden lg:block"
          alt="Love Note"
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div>
          <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="mt-10 md:mt-20 bg-white/10 backdrop-blur-xl border border-wedding-softgray/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <div className="md:w-1/2 h-[300px] md:h-auto">
              <img src="/images/lovenote.webp" className="w-full h-full object-cover" alt="Love Note" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 space-y-6 justify-between flex flex-col">
              <div>
                <div>
                  <h2 className="text-wedding-babyblue font-semibold">Groom</h2>
                  <p className="text-wedding-warmcream leading-relaxed">
                    Sample groom message. Three sentences of commitment, love, and future promise together.
                  </p>
                </div>
                <div>
                  <h2 className="text-wedding-babyblue font-semibold mt-10">Bride</h2>
                  <p className="text-wedding-warmcream leading-relaxed">
                    Sample bride message. Emotional, soft, and heartfelt expression of trust and love.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-wedding-softgray/20">
                <p className="italic text-wedding-softgray text-sm">
                  "Therefore what God has joined together, let no one separate."
                </p>
                <span className="text-xs text-wedding-softgray">— Mark 10:9</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}