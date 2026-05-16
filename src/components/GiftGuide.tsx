import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

// ─── Sparkle canvas background ───────────────────────────────────────────────
function SparkleBackground() {
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

    const COUNT = 65;
    const goldColors = [
      [194, 163, 120],  // wedding-gold
      [201, 191, 143],  // kintab/highlight
      [147, 115, 65],   // dark gold
      [255, 225, 150],  // bright shimmer
    ];

    const sparkles = Array.from({ length: COUNT }, (_, idx) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3.5 + 1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.012 + 0.004,
      drift: (Math.random() - 0.5) * 0.25,
      colorIdx: idx % goldColors.length,
    }));

    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparkles.forEach((s) => {
        const pulse = (Math.sin(t * s.speed + s.phase) + 1) / 2;
        const alpha = pulse * 0.9 + 0.05;
        const [r, g, b] = goldColors[s.colorIdx];
        const cx = s.x + Math.sin(t * 0.008 + s.phase) * 6;
        const cy = s.y + Math.cos(t * 0.006 + s.phase) * 4;
        const sz = s.size * (0.7 + pulse * 0.5);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.globalAlpha = alpha;

        // 4-point star
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          const rad = i % 2 === 0 ? sz : sz * 0.3;
          i === 0
            ? ctx.moveTo(Math.cos(angle) * rad, Math.sin(angle) * rad)
            : ctx.lineTo(Math.cos(angle) * rad, Math.sin(angle) * rad);
        }
        ctx.closePath();
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();

        // Soft glow halo
        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, sz * 4);
        grd.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.35})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(0, 0, sz * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.restore();

        // Gentle upward float
        s.y -= 0.15;
        if (s.y < -10) {
          s.y = canvas.height + 10;
          s.x = Math.random() * canvas.width;
        }
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
      style={{ opacity: 0.75 }}
    />
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const qrOptions = [
  {
    image: "/images/QR1.png",
    label: "GCash",
    name: "FR*******A AV****N R.",
  },
  {
    image: "/images/QR2.png",
    label: "Maya",
    name: "FR*******A AV****N R.",
  },
];

const messageLines = [
  { text: "With grateful hearts, we feel so abundantly blessed.", emoji: "🤍" },
  { text: "Your presence and heartfelt prayers are our greatest request.", emoji: "🙏✨" },
  { text: "But should you also wish to share a gift along the way,", emoji: "🎁" },
  { text: "A monetary blessing would truly mean the world to us.", emoji: "💌" },
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

// ─── Component ───────────────────────────────────────────────────────────────
export default function GiftGuide() {
  return (
    <section
      id="GiftGuide"
      className="relative w-full flex flex-col items-center bg-wedding-warmcream overflow-hidden py-30 px-5"
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute top-0 left-0 w-80 h-80 rounded-full bg-wedding-babyblue/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-wedding-gold/10 blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="pointer-events-none absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-wedding-steel/5 blur-2xl" />

      {/* Gold sparkles */}
      <SparkleBackground />

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

        {/* Single unified card */}
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

            {/* Message lines */}
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
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {line.text}{" "}
                  <span className="not-italic">{line.emoji}</span>
                </motion.p>
              ))}
            </div>
            <GoldDivider />

            {/* QR codes inside same card */}
            <div className="mt-4 flex flex-col sm:flex-row lg:gap-15 gap-8 justify-center items-center">
              {qrOptions.map((qr, i) => (
                <motion.div
                  key={qr.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <p
                    className="text-xs uppercase tracking-[0.3em] text-wedding-gold mb-4 font-light"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    {qr.label}
                  </p>
                  <div className="w-full rounded-xl overflow-hidden border border-wedding-darkcream">
                    <img
                      src={qr.image}
                      alt={`${qr.label} QR Code`}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
              className="mt-8 text-center text-sm text-wedding-grey italic font-light"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              "Every good and perfect gift is from above." — James 1:17
            </motion.p>

          </div>
        </motion.div>

      </div>
    </section>
  );
}