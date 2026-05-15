
// ─── Gold color token ──────────────────────────────────────────────────────
const GOLD = "#C9A77C"

// Base delay (after parent motion.div enters) and stagger step between pieces
const BASE = 0.62
const STEP = 0.18

// ─── Sub-components ────────────────────────────────────────────────────────

/** Thin horizontal line that scales outward from the text side */
function OrnLine({
  w,
  delay,
  origin,
}: {
  w: number
  delay: number
  origin: "left" | "right"
}) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.72 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay, ease: "easeOut" }}
      style={{
        width: w,
        height: "0.5px",
        backgroundColor: GOLD,
        transformOrigin: origin,
        flexShrink: 0,
      }}
    />
  )
}

/** Diamond ◆ that pops in with a springy overshoot */
function OrnDiamond({ size, delay }: { size: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.34, delay, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
    >
      <svg width={size} height={size} viewBox="0 0 10 10">
        <polygon points="5,0 10,5 5,10 0,5" fill={GOLD} />
      </svg>
    </motion.div>
  )
}

/** Twin-leaf floral motif that blooms from the center */
function OrnFloral({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.48, delay, ease: "easeOut" }}
      style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
    >
      <svg width="24" height="13" viewBox="0 0 24 13" fill="none">
        {/* Left leaf */}
        <path d="M12,6.5 Q8,.5 2,4.5 Q8,11 12,6.5Z" fill={GOLD} opacity="0.92" />
        {/* Right leaf */}
        <path d="M12,6.5 Q16,.5 22,4.5 Q16,11 12,6.5Z" fill={GOLD} opacity="0.92" />
        {/* Center gem */}
        <circle cx="12" cy="6.5" r="2" fill={GOLD} />
      </svg>
    </motion.div>
  )
}

// ─── Main ornament component ───────────────────────────────────────────────

interface WeddingOrnamentProps {
  side: "left" | "right"
}

/**
 * Elegant gold ornament that stagger-grows outward from the center text.
 *
 * Pattern (near → far from text):
 *   short line · small ◆ · medium line · twin-leaf floral · medium line · large ◆ · longer line
 *
 * Usage:
 *   <div className="flex items-center justify-center gap-3">
 *     <WeddingOrnament side="left" />
 *     <p>A quiet promise between two souls</p>
 *     <WeddingOrnament side="right" />
 *   </div>
 */
export function WeddingOrnament({ side }: WeddingOrnamentProps) {
  const isRight = side === "right"
  // Lines grow outward from the text: "left" origin for right-side, "right" origin for left-side
  const lineOrigin = isRight ? "left" : "right"

  // Define pieces in center-to-edge order (index 0 = nearest to text)
  const pieces = [
    <OrnLine key="l1" w={10} delay={BASE + 0 * STEP} origin={lineOrigin} />,
    <OrnDiamond key="d1" size={6} delay={BASE + 1 * STEP} />,
    <OrnLine key="l2" w={24} delay={BASE + 2 * STEP} origin={lineOrigin} />,
    <OrnFloral key="fl" delay={BASE + 3 * STEP} />,
    <OrnLine key="l3" w={24} delay={BASE + 4 * STEP} origin={lineOrigin} />,
    <OrnDiamond key="d2" size={9} delay={BASE + 5 * STEP} />,
    <OrnLine key="l4" w={16} delay={BASE + 6 * STEP} origin={lineOrigin} />,
  ]

  // Left side: reverse display order so the ornament grows leftward from center
  const display = isRight ? pieces : [...pieces].reverse()

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {display}
    </div>
  )
}

// ─── Updated LoveNoteHeader (drop-in replacement) ─────────────────────────

import { motion } from "framer-motion"

export function LoveNoteHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 2 }}
      style={{ fontFamily: "Playfair Display, serif" }}
      className="absolute top-30 text-center w-full"
    >
      <h1
        className="text-center text-5xl md:text-7xl text-wedding-warmcream font-bold tracking-widest drop-shadow-lg"
        style={{ fontFamily: '"Great Vibes", cursive' }}
      >
        Love Note
      </h1>

      {/* Ornament row */}
      <div className="flex items-center justify-center gap-3 mt-2">
        <WeddingOrnament side="left" />
        <p className="text-wedding-softgray font-['Cormorant_Garamond'] text-md italic font-light tracking-wide whitespace-nowrap m-0">
          A quiet promise between two souls
        </p>
        <WeddingOrnament side="right" />
      </div>
    </motion.div>
  )
}