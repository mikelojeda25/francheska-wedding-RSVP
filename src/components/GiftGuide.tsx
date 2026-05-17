import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Sparkle canvas background ───────────────────────────────────────────────
function ButterflyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const COUNT = isMobile ? 8 : 18;
    const colors = [
      [134, 175, 205],  // baby blue
      [180, 210, 230],  // light blue
      [194, 163, 120],  // gold
      [200, 185, 210],  // lavender
    ];

    const butterflies = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 10 + 8,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.4 - 0.2,
      phase: Math.random() * Math.PI * 2,
      flapSpeed: Math.random() * 0.08 + 0.06,
      colorIdx: i % colors.length,
      wobble: Math.random() * 0.02 + 0.01,
      wobbleOffset: Math.random() * Math.PI * 2,
    }));

    const drawWing = (
      ctx: CanvasRenderingContext2D,
      size: number,
      flap: number,
      side: 1 | -1,
      r: number, g: number, b: number,
      alpha: number
    ) => {
      const wingSpread = size * flap * side;
      const wingH = size * 0.75;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        wingSpread * 0.4, -wingH * 0.8,
        wingSpread * 1.1, -wingH * 0.5,
        wingSpread * 1.0, wingH * 0.1
      );
      ctx.bezierCurveTo(
        wingSpread * 0.9, wingH * 0.6,
        wingSpread * 0.3, wingH * 0.5,
        0, 0
      );
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.55})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.8})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Lower wing
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        wingSpread * 0.5, wingH * 0.3,
        wingSpread * 0.9, wingH * 0.9,
        wingSpread * 0.4, wingH * 1.1
      );
      ctx.bezierCurveTo(
        wingSpread * 0.1, wingH * 1.2,
        -wingSpread * 0.1 * side, wingH * 0.6,
        0, 0
      );
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.4})`;
      ctx.fill();
    };

    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      butterflies.forEach((b) => {
        const flap = Math.abs(Math.sin(t * b.flapSpeed + b.phase));
        const alpha = 0.5 + Math.sin(t * 0.01 + b.wobbleOffset) * 0.2;
        const [r, g, bl] = colors[b.colorIdx];

        // Gentle wobble path
        b.x += b.speedX + Math.sin(t * b.wobble + b.wobbleOffset) * 0.4;
        b.y += b.speedY + Math.cos(t * b.wobble * 0.7 + b.wobbleOffset) * 0.3;

        // Wrap around edges
        if (b.x < -50) b.x = canvas.width + 50;
        if (b.x > canvas.width + 50) b.x = -50;
        if (b.y < -50) b.y = canvas.height + 50;
        if (b.y > canvas.height + 50) b.y = -50;

        ctx.save();
        ctx.translate(b.x, b.y);

        // Left wing
        drawWing(ctx, b.size, flap, -1, r, g, bl, alpha);
        // Right wing
        drawWing(ctx, b.size, flap, 1, r, g, bl, alpha);

        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, 1.2, b.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${bl},${alpha * 0.9})`;
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const qrOptions = [
  {
    image: "/images/QR1-GCash.webp",
    label: "GCash",
    name: "FR*******A AV****N R.",
  },
  {
    image: "/images/QR2-BPI.webp",
    label: "BPI",
    name: "RJandFA",
  },
  {
    image: "/images/QR3-MariBank.webp",
    label: "MariBank",
    name: "FRNCHESKA AVELEEN RUIZ",
  },
];

const messageLines = [
  { text: "Your love, laughter, and prayers are the greatest gifts of all.", emoji: "🤍" },
  { text: "But if you wish to bless us further as we begin this new chapter together", emoji: "🙏✨" },
  { text: "A monetary gift would be warmly appreciated and received with gratitude", emoji: "🎁" },
];

// ─── Divider ──────────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-5">
      <div className="h-px w-16 bg-wedding-gold opacity-50" />
      <div className="w-1.5 h-1.5 rounded-full bg-wedding-gold opacity-80 rotate-45" />
      <div className="h-px w-16 bg-wedding-gold opacity-50" />
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  src,
  label,
  name,
  onClose,
}: {
  src: string;
  label: string;
  name: string;
  onClose: () => void;
}) {
  // Close on backdrop click or Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-60 flex items-center justify-center
                     w-10 h-10 rounded-full bg-white/15 border border-white/25
                     text-white hover:bg-white/25 transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Image container — stops click propagation so only backdrop closes */}
        <motion.div
          key="lightbox-image"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Label */}
          <p
            className="text-xs uppercase tracking-[0.3em] text-wedding-gold mb-3 font-light"
           
          >
            {label}
          </p>

          {/*
            Desktop → fixed tall height, auto width
            Mobile  → full viewport width minus padding, auto height
          */}
          <img
            src={src}
            alt={`${label} QR Code`}
            className="
              rounded-xl object-contain shadow-2xl
              w-[calc(100vw-3rem)] h-auto
              md:w-auto md:h-[85vh]
            "
          />

          {/* Name */}
          <p
            className="mt-4 text-white/80 text-sm font-light tracking-wide"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            {name}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function GiftGuide() {
  const [activeQr, setActiveQr] = useState<null | typeof qrOptions[0]>(null);

  return (
    <section
      id="GiftGuide"
      className="relative w-full flex flex-col items-center bg-wedding-warmcream overflow-hidden py-30 px-5"
      style={{ background: "linear-gradient(160deg, #deeef7 0%, #c5dff0 30%, #e8f3fa 65%, #d4e8f5 100%)" }}
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute top-0 left-0 w-80 h-80 rounded-full bg-wedding-babyblue/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-wedding-gold/10 blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="pointer-events-none absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-wedding-steel/5 blur-2xl" />

      <ButterflyBackground />


      <div className="relative w-full max-w-5xl flex flex-col items-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          className="text-center mb-6"
        >
          <h1
            className="text-5xl md:text-7xl text-wedding-slate font-bold tracking-widest drop-shadow-sm"
            style={{ fontFamily: '"Great Vibes", cursive' }}
          >
            Gift Guide
          </h1>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.15 }}
          className="relative w-full max-w-5xl mt-2"
        >
          <span className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-wedding-gold/50" />
          <span className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-wedding-gold/50" />
          <span className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-wedding-gold/50" />
          <span className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-wedding-gold/50" />

          <div className="bg-white border border-wedding-darkcream rounded-2xl px-8 md:px-14 py-10 shadow-sm text-center">

            {/* Message */}
            <GoldDivider />
            <div className="flex flex-col gap-2 my-1">
              {messageLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.12 }}
                  className="text-wedding-slate text-base md:text-lg font-light leading-snug"
                  
                >
                  {line.text}{" "}
                  <span className="not-italic">{line.emoji}</span>
                </motion.p>
              ))}
            </div>
            <GoldDivider />

            {/* QR codes — same height via items-stretch on the row + h-full on images */}
            <div className="mt-4 flex flex-col sm:flex-row lg:gap-15 gap-8 justify-center items-stretch">
              {qrOptions.map((qr, i) => (
                <motion.div
                  key={qr.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                  className="flex flex-col items-center flex-1"
                >
                  <p
                    className="text-xs uppercase tracking-[0.3em] text-wedding-gold mb-4 font-bold"
                  >
                    {qr.label}
                  </p>

                  {/* Image wrapper — flex-1 + cursor-pointer for lightbox */}
                  <button
                    onClick={() => setActiveQr(qr)}
                    className="flex-1 w-full rounded-xl overflow-hidden border border-wedding-darkcream
                               cursor-zoom-in group relative focus:outline-none
                               transition-shadow hover:shadow-md"
                    aria-label={`View ${qr.label} QR Code`}
                  >
                    <img
                      src={qr.image}
                      alt={`${qr.label} QR Code`}
                      className="w-full h-full object-cover"
                    />
                    {/* Hover hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-wedding-babyblue/50
                                    transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity
                                       text-white text-xs tracking-widest uppercase bg-black/80
                                       px-3 py-1.5 rounded-full"
                        style={{ fontFamily: '"Cormorant Garamond", serif' }}
                      >
                        Tap to expand
                      </span>
                    </div>
                  </button>

                  <p
                    className="mt-3 text-wedding-slate text-sm font-light tracking-wide"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    {qr.name}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Closing verse */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.7 }}
              className="mt-8 text-center text-sm text-black/50 italic font-bold"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              "Every good and perfect gift is from above." — James 1:17
            </motion.p>

          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {activeQr && (
        <Lightbox
          src={activeQr.image}
          label={activeQr.label}
          name={activeQr.name}
          onClose={() => setActiveQr(null)}
        />
      )}
    </section>
  );
}