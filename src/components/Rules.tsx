import { motion, AnimatePresence } from "framer-motion";
import { Baby, CloudRain, ShieldAlert, X } from "lucide-react";
import { useState, useEffect } from "react";

// ─── Blob variants ────────────────────────────────────────────────────────────
const blobVariants = {
  animate: (i: number) => ({
    y: [0, -20, 0],
    x: [0, 15, 0],
    scale: [1, 1.1, 1],
    transition: { duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" as const },
  }),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Rule {
  icon: React.ElementType;
  text: string;
}

const gentleRules: Rule[] = [
  {
    icon: Baby,
    text: "We can't wait to celebrate with you! Just a gentle reminder that our venue is right by the open seaside. Because we want everyone especially the little ones to stay safe, we're kindly suggesting a child free evening, with the exception of our secondary sponsors. We'd love for you to have a night off to fully relax and celebrate with us! However, if you do need to bring your children, we just ask that they stay under close supervision at all times. Thank you so much for understanding! 🤍",
  },
  {
    icon: CloudRain,
    text: "Our wedding falls during the rainy season, and we love it — but please come prepared! We suggest bringing a light umbrella or jacket, especially for the outdoor ceremony. Don't worry, a little rain only adds to the romance. ☔✨",
  },
  {
    icon: ShieldAlert,
    text: "Out of respect for the ceremony, we kindly ask that phones be silenced and kept away during the program. Feel free to take photos and videos. We'd love to see and appreciate your captured moments with us! 📷",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-wedding-gold opacity-25" />
      <div className="w-1.5 h-1.5 rounded-full bg-wedding-gold opacity-60 rotate-45" />
      <div className="flex-1 h-px bg-wedding-gold opacity-25" />
    </div>
  );
}

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <p
        className="text-xs uppercase tracking-[0.3em] text-wedding-gold/70 mb-1"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        {label}
      </p>
      <h3
        className="text-2xl md:text-3xl text-wedding-warmcream font-light"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        {title}
      </h3>
      <GoldDivider />
    </div>
  );
}

function RuleItem({ rule, index }: { rule: Rule; index: number }) {
  const Icon = rule.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: "easeOut" }}
      className="flex items-start gap-3"
    >
      <div className="mt-0.5 shrink-0 w-7 h-7 rounded-full bg-wedding-gold/10 border border-wedding-gold/25 flex items-center justify-center">
        <Icon size={13} className="text-wedding-gold" strokeWidth={1.5} />
      </div>
      <p
        className="text-wedding-warmcream text-sm md:text-[15px] font-normal leading-relaxed tracking-wide"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        {rule.text}
      </p>
    </motion.div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="rules-lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-60 flex items-center justify-center
                     w-10 h-10 rounded-full bg-white/15 border border-white/25
                     text-white hover:bg-white/25 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <motion.img
          key="rules-img"
          src="/images/Rules.webp"
          alt="Casa Macoto Venue Rules"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="
            rounded-xl shadow-2xl object-contain
            w-[calc(100vw-3rem)] h-auto
            md:w-auto md:h-[85vh]
          "
        />
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Rules() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section
      id="Rules"
      className="relative w-full flex flex-col items-center bg-wedding-slate overflow-hidden py-25 px-5"
    >
      {/* Blobs */}
      <motion.div custom={0} variants={blobVariants} animate="animate"
        className="absolute w-[420px] h-[420px] bg-wedding-babyblue/25 rounded-full blur-3xl top-[-120px] left-[-120px]" />
      <motion.div custom={1} variants={blobVariants} animate="animate"
        className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl bottom-[-180px] right-[-140px]" />
      <motion.div custom={2} variants={blobVariants} animate="animate"
        className="absolute w-[320px] h-[320px] bg-wedding-gold/20 rounded-full blur-2xl top-[30%] left-[65%]" />
      <motion.div custom={3} variants={blobVariants} animate="animate"
        className="absolute w-[260px] h-[260px] bg-wedding-steel/20 rounded-full blur-2xl left-[20%]" />

      <div className="relative w-full max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          className="text-center mb-14"
        >
          <h1
            className="text-5xl md:text-7xl text-wedding-warmcream font-bold tracking-widest drop-shadow-lg"
            style={{ fontFamily: '"Great Vibes", cursive' }}
          >
            Things to Know
          </h1>
          <p
            className="text-wedding-softgray mt-2 tracking-wide text-sm md:text-base italic font-light"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            A few notes to help you enjoy the day to the fullest
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left — Venue Rules Image (clickable) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="relative flex-1 min-w-0"
          >
            {/* Corner accents */}
            <span className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-wedding-gold/40 z-10" />
            <span className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-wedding-gold/40 z-10" />
            <span className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-wedding-gold/40 z-10" />
            <span className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-wedding-gold/40 z-10" />

            <button
              onClick={() => setLightboxOpen(true)}
              className="relative w-full overflow-hidden rounded-2xl border border-wedding-gold/20 cursor-zoom-in group focus:outline-none"
              aria-label="View venue rules full size"
            >
              <img
                src="/images/Rules.webp"
                alt="Casa Macoto Venue Rules"
                className="w-auto lg:h-[692px] object-cover"
              />

              {/* Gold hover overlay — 30% opacity */}
              <div
                className="absolute inset-0 bg-wedding-gold opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              />

              {/* Tap to expand label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span
                  className="opacity-0 group-hover:opacity-80 transition-opacity duration-300
                             text-white text-xs tracking-widest uppercase
                             bg-black/90 px-4 py-2 rounded-full"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  Tap to expand
                </span>
              </div>
            </button>
          </motion.div>

          {/* Right — Gentle reminders */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.22 }}
            className="relative flex-1 min-w-0"
          >
            <span className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-wedding-gold/40" />
            <span className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-wedding-gold/40" />
            <span className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-wedding-gold/40" />
            <span className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-wedding-gold/40" />

            <div className="bg-wedding-slate border border-wedding-gold/20 rounded-2xl px-7 py-8 h-full">
              <SectionTitle label="From the Couple" title="Gentle Reminders" />
              <div className="flex flex-col gap-5">
                {gentleRules.map((rule, i) => (
                  <RuleItem key={i} rule={rule} index={i} />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && <Lightbox onClose={() => setLightboxOpen(false)} />}
    </section>
  );
}