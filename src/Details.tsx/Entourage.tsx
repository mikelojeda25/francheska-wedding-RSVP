import { motion } from "framer-motion";

// ─── Types ──────────────────────────────────────────────────────────────────
interface EntouragePerson {
  name: string;
  role?: string;
}

interface EntourageGroup {
  title: string;
  subtitle?: string;
  members: EntouragePerson[];
  layout?: "single" | "pair" | "grid";
  rowGroup?: string; // groups with same rowGroup render side-by-side
}

// ─── Data ───────────────────────────────────────────────────────────────────
const officiant = {
  name: "Rev. Emmanuel D. Santos",
  role: "Officiating Minister",
  church: "Grace Bible Church of Aringay",
};

const groups: EntourageGroup[] = [
  {
    title: "Parents of the Bride",
    members: [
      { name: "Mr. Roberto & Mrs. Lourdes dela Cruz" },
    ],
    layout: "single",
    rowGroup: "parents",
  },
  {
    title: "Parents of the Groom",
    members: [
      { name: "Mr. Danilo & Mrs. Carmelita Reyes" },
    ],
    layout: "single",
    rowGroup: "parents",
  },
  {
    title: "Principal Sponsors",
    subtitle: "Ninong & Ninang",
    members: [
      { name: "Atty. Fernando & Mrs. Gloria Santos" },
      { name: "Dr. Ramon & Mrs. Cynthia Villanueva" },
      { name: "Mr. Jose & Mrs. Marites Castillo" },
      { name: "Engr. Ricardo & Mrs. Rowena Bautista" },
    ],
    layout: "grid",
  },
  {
    title: "Secondary Sponsors",
    subtitle: "Veil, Cord & Candle",
    members: [
      { name: "Mr. Marco Villanueva", role: "Veil" },
      { name: "Ms. Patricia Aguila", role: "Veil" },
      { name: "Mr. Luis Fernandez", role: "Cord" },
      { name: "Ms. Angela Ramos", role: "Cord" },
      { name: "Mr. Paolo Ocampo", role: "Candle" },
      { name: "Ms. Bianca Torres", role: "Candle" },
    ],
    layout: "grid",
  },
  {
    title: "Maid of Honor",
    members: [{ name: "Ms. Isabelle Marie dela Cruz" }],
    layout: "single",
    rowGroup: "honor",
  },
  {
    title: "Best Man",
    members: [{ name: "Mr. Rafael Antonio Reyes" }],
    layout: "single",
    rowGroup: "honor",
  },
  {
    title: "Bridesmaids",
    members: [
      { name: "Ms. Sofia Manalo" },
      { name: "Ms. Camille Navarro" },
      { name: "Ms. Andrea Lim" },
      { name: "Ms. Katrina Morales" },
    ],
    layout: "grid",
  },
  {
    title: "Groomsmen",
    members: [
      { name: "Mr. Miguel Santos" },
      { name: "Mr. Joshua Dela Torre" },
      { name: "Mr. Christian Aquino" },
      { name: "Mr. Daniel Cruz" },
    ],
    layout: "grid",
  },
  {
    title: "Flower Girls",
    members: [
      { name: "Little Mia Villanueva" },
      { name: "Little Cara Fernandez" },
    ],
    layout: "pair",
  },
  {
    title: "Ring Bearer",
    members: [{ name: "Little Noah Bautista" }],
    layout: "single",
    rowGroup: "bearers",
  },
  {
    title: "Bible Bearer",
    members: [{ name: "Little Eli Santos" }],
    layout: "single",
    rowGroup: "bearers",
  },
  {
    title: "Coin Bearer",
    members: [{ name: "Little Mateo Reyes" }],
    layout: "single",
    rowGroup: "bearers",
  },
];

// ─── Blob variants (same as LoveNote) ────────────────────────────────────────
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

// ─── Decorative divider ───────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div id="Entourage" className="flex items-center justify-center gap-3 my-2 pt">
      <div className="h-px w-12 bg-wedding-gold-metallic opacity-60" />
      <div className="w-1 h-1 rounded-full bg-wedding-gold opacity-80" />
      <div className="h-px w-12 bg-wedding-gold-metallic opacity-60" />
    </div>
  );
}

// ─── Officiant card ───────────────────────────────────────────────────────────
function OffciantCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative mx-auto max-w-sm w-full mb-10"
    >
      {/* Corner accents */}
      <span className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-wedding-gold/60" />
      <span className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-wedding-gold/60" />
      <span className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-wedding-gold/60" />
      <span className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-wedding-gold/60" />

      <div className="bg-wedding-slate border border-wedding-gold/30 rounded-xl px-10 py-8 text-center shadow-lg shadow-black/30">
        {/* Small cross */}
        <div className="flex items-center justify-center mb-4">
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="opacity-70">
            <rect x="8" y="0" width="4" height="24" rx="2" fill="#C2A378"/>
            <rect x="0" y="7" width="20" height="4" rx="2" fill="#C2A378"/>
          </svg>
        </div>
        <p
          className="text-xs uppercase tracking-[0.3em] text-wedding-gold/70 mb-3"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Officiating Minister
        </p>
        <h3
          className="text-2xl md:text-3xl font-light text-wedding-warmcream leading-tight"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {officiant.name}
        </h3>
        <GoldDivider />
        <p
          className="text-wedding-grey text-xs tracking-widest uppercase mt-2"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {officiant.church}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Group section ─────────────────────────────────────────────────────────────
function EntourageSection({ group, index }: { group: EntourageGroup; index: number }) {
  const isSingle = group.layout === "single";
  const isPair   = group.layout === "pair";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
      className="w-full mb-10"
    >
      {/* Group header */}
      <div className="text-center mb-6">
        <p
          className="text-xs uppercase tracking-[0.35em] text-wedding-gold/70 mb-1"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {group.subtitle ?? "\u00A0"}
        </p>
        <h3
          className="text-2xl md:text-3xl text-wedding-warmcream font-light"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {group.title}
        </h3>
        <GoldDivider />
      </div>

      {/* Members */}
      {isSingle ? (
        <div className="flex justify-center">
          <PersonPill person={group.members[0]} highlight />
        </div>
      ) : isPair ? (
        <div className="flex flex-wrap justify-center gap-4">
          {group.members.map((m, i) => (
            <PersonPill key={i} person={m} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {group.members.map((m, i) => (
            <PersonPill key={i} person={m} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Person pill ──────────────────────────────────────────────────────────────
function PersonPill({ person, highlight = false }: { person: EntouragePerson; highlight?: boolean }) {
  return (
    <div
      className={`
        flex flex-col items-center text-center px-8 py-4 rounded-full border transition-colors
        ${highlight
          ? "border-wedding-gold/50 bg-wedding-gold/10"
          : "border-wedding-softgray/15 bg-white/5"
        }
      `}
    >
      <span
        className={`text-base md:text-xl font-light leading-snug ${highlight ? "text-wedding-warmcream" : "text-wedding-softgray"}`}
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        {person.name}
      </span>
      {person.role && (
        <span
          className="text-xs text-wedding-gold/60 tracking-widest uppercase mt-1"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {person.role}
        </span>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Entourage() {
  return (
    <section
      id="Entourage"
      className="relative w-full flex flex-col items-center bg-wedding-slate overflow-hidden py-24 px-5"
    >
      {/* Blobs — same as LoveNote */}
      <motion.div custom={0} variants={blobVariants} animate="animate"
        className="absolute w-[420px] h-[420px] bg-wedding-babyblue/25 rounded-full blur-3xl top-[-120px] left-[-120px]" />
      <motion.div custom={1} variants={blobVariants} animate="animate"
        className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl bottom-[-180px] right-[-140px]" />
      <motion.div custom={2} variants={blobVariants} animate="animate"
        className="absolute w-[320px] h-[320px] bg-wedding-gold/20 rounded-full blur-2xl top-[30%] left-[65%]" />
      <motion.div custom={3} variants={blobVariants} animate="animate"
        className="absolute w-[260px] h-[260px] bg-wedding-steel/20 rounded-full blur-2xl left-[20%]" />

      <div className="relative w-full max-w-5xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          className="text-center mb-16"
        >
          <h1
            className="text-5xl md:text-7xl text-wedding-warmcream font-bold tracking-widest drop-shadow-lg pt-5"
            style={{ fontFamily: '"Great Vibes", cursive' }}
          >
            Entourage
          </h1>
          <p
            className="text-wedding-softgray mt-2 tracking-wide text-sm md:text-base italic font-light"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            The beloved people walking beside us
          </p>
        </motion.div>

        {/* ── Officiant — first & most prominent ── */}
        <OffciantCard />

        {/* ── Horizontal rule ── */}
        <div className="flex items-center gap-4 mb-16 opacity-30">
          <div className="flex-1 h-px bg-wedding-softgray" />
          <div className="w-1.5 h-1.5 rounded-full bg-wedding-gold rotate-45" />
          <div className="flex-1 h-px bg-wedding-softgray" />
        </div>

        {/* ── Entourage groups — row-aware ── */}
        {(() => {
          const rendered = new Set<string>();
          return groups.map((group, i) => {
            if (group.rowGroup) {
              if (rendered.has(group.rowGroup)) return null;
              rendered.add(group.rowGroup);
              const siblings = groups.filter((g) => g.rowGroup === group.rowGroup);
              return (
                <motion.div
                  key={group.rowGroup}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                  className="w-full mb-10 flex flex-col sm:flex-row gap-12 sm:gap-6 justify-center items-center sm:items-start"
                >
                  {siblings.map((s) => (
                    <div key={s.title} className="flex-1 flex flex-col items-center text-center min-w-0">
                      <div className="text-center mb-6 w-full">
                        <p
                          className="text-xs uppercase tracking-[0.35em] text-wedding-gold/70 mb-1"
                          style={{ fontFamily: '"Cormorant Garamond", serif' }}
                        >
                          {s.subtitle ?? "\u00A0"}
                        </p>
                        <h3
                          className="text-2xl md:text-3xl text-wedding-warmcream font-light"
                          style={{ fontFamily: '"Cormorant Garamond", serif' }}
                        >
                          {s.title}
                        </h3>
                        <GoldDivider />
                      </div>
                      <PersonPill person={s.members[0]} highlight />
                    </div>
                  ))}
                </motion.div>
              );
            }
            return <EntourageSection key={group.title} group={group} index={i} />;
          });
        })()}

      </div>
    </section>
  );
}