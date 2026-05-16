import { motion } from "framer-motion";
import {
  Wifi, Home, Clock, Baby, CloudRain, Waves,
  ShieldAlert, KeyRound, Shirt, CarFront, UserX, CheckSquare,
} from "lucide-react";

// ─── Blob variants ────────────────────────────────────────────────────────────
const blobVariants = {
  animate: (i: number) => ({
    y: [0, -20, 0],
    x: [0, 15, 0],
    scale: [1, 1.1, 1],
    transition: { duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" },
  }),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Rule {
  icon: React.ElementType;
  text: string;
}

const venueRules: Rule[] = [
  { icon: Wifi,        text: "WiFi Network: CASA MACOTO BEACH RESORT — Password: @ringaylu (same for all extensions)" },
  { icon: ShieldAlert, text: "Smoking and vaping is strictly NOT allowed indoors. A PHP 5,000 fine will be imposed." },
  { icon: Home,        text: "Small to medium pets are allowed but must be diapered and vaccinated." },
  { icon: CheckSquare, text: "Any damage to resort property, amenities, linens, percolator, hair dryer, or fixtures will result in charges and replacement fees." },
  { icon: KeyRound,    text: "Lost keys will be charged PHP 2,000." },
  { icon: Waves,       text: "Swimming in the beach is until 6:00 PM. Swimming in the pool is until 10:00 PM." },
  { icon: Shirt,       text: "Proper swimming attire is required in the pool. No cotton fabric allowed." },
  { icon: CarFront,    text: "Management shall not be liable for any damage or loss of belongings or vehicles left on the premises." },
  { icon: UserX,       text: "Management reserves the right to refuse entry for any untoward behavior toward staff or property." },
  { icon: Clock,       text: "Check-in: 2:00 PM · Check-out: 12:00 Noon. Extensions and early check-in are subject to availability." },
  { icon: Home,        text: "A security deposit (cash) will be collected upon check-in and refunded upon check-out." },
];

const gentleRules: Rule[] = [
  {
    icon: Baby,
    text: "We can't wait to celebrate with you! Just a gentle reminder that our venue is right by the open seaside. Because we want everyone especially the little ones to stay safe, we’re kindly suggesting a child free evening, with the exception of our secondary sponsors. We’d love for you to have a night off to fully relax and celebrate with us! However, if you do need to bring your children, we just ask that they stay under close supervision at all times. Thank you so much for understanding! 🤍",
  },
  {
    icon: CloudRain,
    text: "Our wedding falls during the rainy season, and we love it — but please come prepared! We suggest bringing a light umbrella or jacket, especially for the outdoor ceremony. Don't worry, a little rain only adds to the romance. ☔✨",
  },
  {
    icon: ShieldAlert,
    text: "Out of respect for the sacred moment, we ask that phones be silenced and kept away during the ceremony. Our photographer will capture everything beautifully — just be present with us! 📷",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div id="Rules" className="flex items-center gap-3 my-5">
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

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Rules() {
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
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Left — Venue Rules Image */}
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

            <div className="relative overflow-hidden rounded-2xl border border-wedding-gold/20 h-full min-h-[675px]">
              {/* Image */}
              <img
                src="/images/Rules.webp"
                alt="Casa Macoto Venue Rules"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              
            </div>
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
    </section>
  );
}