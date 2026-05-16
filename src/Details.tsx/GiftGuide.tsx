import { motion } from "framer-motion";

const qrOptions = [
  {
    image: "/images/QR1.webp",
    label: "GCash",
    name: "Sample Name",
  },
  {
    image: "/images/QR2.webp",
    label: "Maya",
    name: "Sample Name",
  },
];

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="h-px w-16 bg-wedding-gold opacity-40" />
      <div className="w-1 h-1 rounded-full bg-wedding-gold opacity-70" />
      <div className="h-px w-16 bg-wedding-gold opacity-40" />
    </div>
  );
}

export default function GiftGuide() {
  return (
    <section
      id="Gift-Guide"
      className="relative w-full flex flex-col items-center bg-wedding-warmcream overflow-hidden py-30 px-5"
    >
      {/* Subtle blobs — warmcream version */}
      <div className="pointer-events-none absolute top-0 left-0 w-80 h-80 rounded-full bg-wedding-babyblue/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-wedding-gold/10 blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="pointer-events-none absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-wedding-steel/5 blur-2xl" />

      <div className="relative w-full max-w-5xl flex flex-col items-center">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          className="text-center mb-4"
        >
          <h1
            className="text-5xl md:text-7xl text-wedding-slate font-bold tracking-widest drop-shadow-sm"
            style={{ fontFamily: '"Great Vibes", cursive' }}
          >
            Gift Guide
          </h1>
        </motion.div>

        {/* ── Heartfelt message ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="text-center "
        >
          <GoldDivider />

          <p
            className="text-wedding-slate text-lg md:text-xl font-light leading-relaxed mt-2"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Your presence on our special day is already the greatest gift we
            could ever ask for. Having you there to witness and celebrate this
            moment with us means everything.
          </p>

          <p
            className="text-wedding-grey text-base md:text-lg font-light leading-relaxed mt-5 italic"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            However, if you feel moved to bless us as we begin this new chapter
            together, we have made it easy for you below.
          </p>

          <GoldDivider />
        </motion.div>

        {/* ── QR Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row gap-8 justify-center items-center w-full"
        >
          {qrOptions.map((qr, i) => (
            <motion.div
              key={qr.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 + i * 0.15 }}
              className="relative flex flex-col items-center"
            >
              {/* Corner accents */}
              <span className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-wedding-gold/50" />
              <span className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-wedding-gold/50" />
              <span className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-wedding-gold/50" />
              <span className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-wedding-gold/50" />

              <div className="bg-white border border-wedding-darkcream rounded-2xl px-8 py-8 flex flex-col items-center shadow-sm">
                {/* Label */}
                <p
                  className="text-xs uppercase tracking-[0.3em] text-wedding-gold mb-5 font-light"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {qr.label}
                </p>

                {/* QR image */}
                <div className="w-44 h-44 rounded-xl overflow-hidden border border-wedding-darkcream">
                  <img
                    src={qr.image}
                    alt={`${qr.label} QR Code`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <p
                  className="mt-5 text-wedding-slate text-base font-light tracking-wide"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {qr.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Closing note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="mt-14 text-center text-sm text-wedding-grey italic font-light"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          "Every good and perfect gift is from above." — James 1:17
        </motion.p>

      </div>
    </section>
  );
}