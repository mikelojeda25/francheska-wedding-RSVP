import { motion } from "framer-motion";
import { MapPin, Calendar, UtensilsCrossed, Clock } from "lucide-react";

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
    primary: "June 15, 2026",
    secondary: "Save the date!",
  },
  {
    icon: UtensilsCrossed,
    title: "Dress Code",
    primary: "Black Tie Optional",
    secondary: "Dusty blue & champagne encouraged",
  },
];

const schedule = [
  {
    time: "4:00 PM",
    event: "Ceremony",
    venue: "Casa Macoto",
    description: "Join us for an intimate outdoor ceremony surrounded by blooming roses and lavender.",
  },
  {
    time: "5:00 PM",
    event: "Cocktail Hour",
    venue: "Terrace Lounge",
    description: "Enjoy signature cocktails and hors d'oeuvres while mingling with family and friends.",
  },
  {
    time: "6:30 PM",
    event: "Reception",
    venue: "Grand Ballroom",
    description: "Celebrate with dinner, dancing, and unforgettable moments under the chandeliers.",
  },
];

export default function Details() {
  return (
    <section
      id="Details"
      className="relative w-full bg-wedding-babyblue/20 overflow-hidden pt-17 lg:pt-25"
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
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm border border-wedding-darkcream"
            >
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
                {card.secondary}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Schedule section */}
      <div className="w-full px-5 py-20 flex flex-col items-center">
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
                    className="text-wedding-steel font-semibold text-base md:text-lg tracking-wide"
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
                <div
                  className="flex items-center gap-1 text-wedding-grey text-xs mb-2"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  <MapPin size={11} strokeWidth={1.5} />
                  <span>{item.venue}</span>
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
    </section>
  );
}