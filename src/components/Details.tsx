import { motion } from "framer-motion";
import { MapPin, Calendar, Shirt, Clock } from "lucide-react";

const cards = [
  {
    icon: MapPin,
    title: "Venue",
    primary: "Casa Macoto",
    secondary: "Sea Ridge Alley, Maryland, Barangay Samara, Aringay, La Union, Philippines",
  },
  {
    icon: Calendar,
    title: "Date",
    primary: "July 25, 2026",
    secondary: "Save the date!",
  },
  {
    icon: Shirt,
    title: "Dress Code",
    primary: "Black Tie Optional",
    secondary: "Dusty blue & champagne encouraged",
    colors: ["#B0AEAE", "#797B84", "#86AFCD", "#7A8DA6"],
  },
];

const schedule = [
  {
    time: "2:00 PM",
    event: "Ceremony",
    description: "Join us for an intimate outdoor ceremony surrounded by blooming roses and lavender.",
  },
  {
    time: "6:00 PM",
    event: "Reception & Program",
    description: "Celebrate with dinner, dancing, and unforgettable moments.",
  },
  {
    time: "8:00 PM",
    event: "Cocktail Hour",
    description: "Enjoy signature cocktails and hors d'oeuvres while mingling with family and friends.",
  },
];

export default function Details() {
  return (
    <section
      id="Details"
      className="relative w-full bg-wedding-babyblue/60 overflow-hidden pt-17 lg:pt-25"
      style={{ background: "linear-gradient(160deg, #deeef7 0%, #c5dff0 30%, #e8f3fa 65%, #d4e8f5 100%)" }}
    >
      {/* Top section — header + cards */}
      <div className="w-full px-5 py-5 flex flex-col items-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center mb-12"
        >
          <h1
            className="text-5xl md:text-7xl text-wedding-slate font-bold tracking-widest drop-shadow-sm"
            style={{ fontFamily: '"Great Vibes", cursive' }}
          >
            Details
          </h1>
          <p
            className="text-wedding-slate mt-2 tracking-wide text-sm md:text-base"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            All the information you need for our special day
          </p>
        </motion.div>

        {/* Cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm border border-wedding-darkcream"
            >
              <div className="flex items-center gap-1">
                <card.icon
                  className="text-wedding-steel mb-4"
                  size={32}
                  strokeWidth={1.5}
                />
                <h2
                  className="text-wedding-steel font-semibold text-lg mb-3 tracking-wide"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {card.title}
                </h2>
              </div>
              <p
                className="text-wedding-slate font-medium text-sm md:text-base leading-relaxed mb-1"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {card.primary}
              </p>
              <p
                className="text-wedding-grey text-sm"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {card.colors ? (
                  <div className="flex gap-2 mt-1">
                    {card.colors.map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full border border-wedding-darkcream shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                ) : (
                  <p
                    className="text-wedding-grey text-sm"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {card.secondary}
                  </p>
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Schedule section */}
      <div className="w-full px-5 py-5 flex flex-col items-center">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-wedding-darkcream px-8 md:px-14 py-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-4xl md:text-5xl text-wedding-slate font-bold tracking-widest"
              style={{ fontFamily: '"Great Vibes", cursive' }}
            >
              Schedule of Events
            </h2>
          </motion.div>

          {schedule.map((item, i) => (
            <motion.div
              key={item.event}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15 }}
              className="flex gap-6 relative"
            >
              {/* Timeline line */}
              {i < schedule.length - 1 && (
                <div className="absolute left-[18px] top-10 bottom-0 w-[1px] bg-wedding-darkcream" />
              )}

              {/* Icon bubble */}
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-wedding-steel/20 flex items-center justify-center mt-1">
                <Clock className="text-wedding-steel" size={16} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className={`flex-1 ${i < schedule.length - 1 ? "pb-10" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <h3
                    className="text-wedding-steel font-semibold text-base md:text-lg tracking-wide w-[120px]"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {item.event}
                  </h3>
                  <span
                    className="text-wedding-grey text-sm"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {item.time}
                  </span>
                </div>
                <p
                  className="text-wedding-slate/80 text-sm leading-relaxed"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col items-center pb-20 px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center mb-8"
        >
          <h2
            className="text-4xl md:text-5xl text-wedding-slate font-bold tracking-widest mt-5 -mb-5"
            style={{ fontFamily: '"Great Vibes", cursive' }}
          >
            Find Us
          </h2>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-md border border-wedding-darkcream"
        >
          <iframe
            title="Casa Macoto Beach Resort Map"
            src="https://www.google.com/maps?q=Casa+Macoto+Beach+Resort+La+Union+Philippines&output=embed"
            className="w-full"
            height="380"
            loading="lazy"
            style={{ border: 0, display: "block" }}
            allowFullScreen
          />
        </motion.div>

        {/* Bottom label */}
        <motion.a
          href="https://maps.google.com/?q=Casa+Macoto+Beach+Resort+La+Union+Philippines"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-4 flex items-center gap-1.5 text-wedding-steel/70 hover:text-wedding-steel transition-colors text-xs tracking-widest uppercase"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          <MapPin className="w-3 h-3" strokeWidth={1.5} />
          Open in Google Maps
        </motion.a>
      </div>
    </section>
  );
}