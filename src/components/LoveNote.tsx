import { motion } from "framer-motion";

const blobVariants = {
  animate: (i) => ({
    y: [0, -20, 0],
    x: [0, 15, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 8 + i * 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

export default function LoveNote() {
  return (
    <section
      id="Lovenote"
      className="relative w-full min-h-screen flex-col flex items-center justify-center bg-wedding-slate overflow-hidden px-5"
    >
    
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
                
        <p className="text-center text-xl text-wedding-softgray mt-2 font-['Cormorant_Garamond'] text-md italic font-light tracking-wide">
          A quiet promise between two souls
        </p>
        
      </motion.div>


      {/* Animated Background Blobs */}
      <motion.div
        custom={0}
        variants={blobVariants}
        animate="animate"
        className="absolute w-[420px] h-[420px] bg-wedding-babyblue/25 rounded-full blur-3xl top-[-120px] left-[-120px]"
      />

      <motion.div
        custom={1}
        variants={blobVariants}
        animate="animate"
        className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl bottom-[-180px] right-[-140px]"
      />

      <motion.div
        custom={2}
        variants={blobVariants}
        animate="animate"
        className="absolute w-[320px] h-[320px] bg-wedding-gold/20 rounded-full blur-2xl top-[30%] left-[65%]"
      />

      <motion.div
        custom={3}
        variants={blobVariants}
        animate="animate"
        className="absolute w-[260px] h-[260px] bg-wedding-steel/20 rounded-full blur-2xl left-[20%]"
      />

      {/* Flowers */}
      
      <motion.img
        src="/images/corner.webp"
        className="absolute h-[70%] object-cover z-10 bottom-0 left-30"
        alt="Love Note"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
      />
      
      {/* Content */}
      <div className="relative w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="mt-50 md:mt-40 bg-white/10 backdrop-blur-xl border border-wedding-softgray/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        > 
          {/* Image */}
          <div className="md:w-1/2 h-[300px] md:h-auto">
            <img
              src="/images/lovenote.webp"
              className="w-full h-full object-cover"
              alt="Love Note"
            />
          </div>

          {/* Text */}
          <div className="md:w-1/2 p-8 md:p-12 space-y-6 justify-between flex flex-col">
            <div>
              <div>
                <h2 className="text-wedding-babyblue font-semibold">Groom</h2>
                <p className="text-wedding-warmcream leading-relaxed">
                  Sample groom message. Three sentences of commitment, love, and
                  future promise together.
                </p>
              </div>

              <div>
                <h2 className="text-wedding-babyblue font-semibold mt-10">Bride</h2>
                <p className="text-wedding-warmcream leading-relaxed">
                  Sample bride message. Emotional, soft, and heartfelt expression
                  of trust and love.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-wedding-softgray/20">
              <p className="italic text-wedding-softgray text-sm">
                “Therefore what God has joined together, let no one separate.”
              </p>
              <span className="text-xs text-wedding-softgray">
                — Mark 10:9
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}