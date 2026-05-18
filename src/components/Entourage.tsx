import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type PillColor =
  | "gold"
  | "pearl"
  | "dustyblue"
  | "pink"
  | "sage"
  | "violet"
  | "default";

interface EntouragePerson {
  name: string;
  role?: string;
}

interface EntourageGroup {
  title: string;
  subtitle?: string;
  members: EntouragePerson[];
  columns?: 1 | 2;
  highlight?: boolean;
  rowGroup?: string;
  color?: PillColor;
}
// ─── Shimmer stars ────────────────────────────────────────────────────────────
const stars = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  top: `${(i * 37.3) % 100}%`,
  left: `${(i * 61.7) % 100}%`,
  size: (i % 3) + 3,
  duration: (i % 3) + 2,
  delay: (i * 0.4) % 4,
  isLarge: i % 5 === 0,
}));

function ShimmerStars() {
  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute pointer-events-none flex items-center justify-center"
          style={{ top: star.top, left: star.left }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.3, 1, 0.3],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {star.isLarge ? (
            <svg
              width={star.size * 6}
              height={star.size * 6}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                fill="white"
                fillOpacity={0.95}
              />
            </svg>
          ) : (
            <div
              className="rounded-full bg-white"
              style={{
                width: star.size * 2,
                height: star.size * 2,
                boxShadow: `0 0 ${star.size * 3}px ${star.size}px rgba(255,255,255,0.6)`,
              }}
            />
          )}
        </motion.div>
      ))}
    </>
  );
}

// ─── Color palettes ───────────────────────────────────────────────────────────
const colorStyles: Record<
  PillColor,
  { border: string; bg: string; text: string; label: string }
> = {
  gold: {
    border: "border-wedding-gold/50",
    bg: "bg-wedding-gold/10",
    text: "text-wedding-warmcream",
    label: "text-wedding-gold/60",
  },
  pearl: {
    border: "border-[#F0EDE8]/50",
    bg: "bg-[#F0EDE8]/8",
    text: "text-[#FAF8F5]",
    label: "text-[#F0EDE8]/55",
  },
  dustyblue: {
    border: "border-[#8FAFC4]/45",
    bg: "bg-[#8FAFC4]/10",
    text: "text-[#C9DDE9]",
    label: "text-[#8FAFC4]/60",
  },
  pink: {
    border: "border-[#D9A0AD]/45",
    bg: "bg-[#D9A0AD]/10",
    text: "text-[#F0D3D8]",
    label: "text-[#D9A0AD]/60",
  },
  sage: {
    border: "border-[#92B89A]/45",
    bg: "bg-[#92B89A]/10",
    text: "text-[#CCE2CF]",
    label: "text-[#92B89A]/60",
  },
  violet: {
    border: "border-[#B8A9D4]/45",
    bg: "bg-[#B8A9D4]/10",
    text: "text-[#DDD6F0]",
    label: "text-[#B8A9D4]/60",
  },
  default: {
    border: "border-wedding-softgray/15",
    bg: "bg-white/5",
    text: "text-wedding-softgray",
    label: "text-wedding-gold/60",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const groups: EntourageGroup[] = [
  {
    title: "Parents of the Bride",
    members: [{ name: "Mr. Avelino V. Ruiz & Mrs. Maria Theresa C. Ruiz" }],
    columns: 1,
    highlight: true,
    color: "gold",
    rowGroup: "parents",
  },
  {
    title: "Parents of the Groom",
    members: [{ name: "Mr. Hansel B. Wanawan & Mrs. Mauricia W. Wanawan" }],
    columns: 1,
    highlight: true,
    color: "gold",
    rowGroup: "parents",
  },
  {
    title: "Ninong",
    subtitle: "Principal Sponsors",
    members: [
      { name: "Bel. Filmore Almeda-Awas" },
      { name: "Leonardo C. Tagufa" },
      { name: "Noel Aguinalde" },
      { name: "Blaisandrew B. Dao-nis" },
      { name: "Russel Jardiolin" },
      { name: "Karlos Lanuza" },
      { name: "John Benter" },
      { name: "Raymond Ferrer" },
      { name: "Marcelino Ruiz" },
      { name: "Ryan Peters" },
      { name: "Tony Patin" },
      { name: "Antolin Potpoten" },
      { name: "Constante Arzadon" },
      { name: "Albert Deleon" },
      { name: "Rafael Saltiban" },
      { name: "Joel Ureta" },
      { name: "Bryan Jardiolin" },
      { name: "June Dacoco" },
      { name: "Ferdie Soriano" },
      { name: "Joegie Tawaran" },
      { name: "Danilo Dalog" },
    ],
    columns: 1,
    color: "dustyblue",
    rowGroup: "principal",
  },
  {
    title: "Ninang",
    subtitle: "Principal Sponsors",
    members: [
      { name: "Bel. Lotz Almeda-Awas" },
      { name: "Army Love Martin" },
      { name: "Marivic Aguinalde" },
      { name: "Myra P. Dao-nis" },
      { name: "Maricel Jardiolin" },
      { name: "Fely W. Lanuza" },
      { name: "Janice Benter" },
      { name: "Rosalyn Ferrer" },
      { name: "Cathy Ruiz" },
      { name: "Rochelle Peters" },
      { name: "Jacqueline Patin" },
      { name: "Cyprene Potpoten" },
      { name: "Evinia Arzadon" },
      { name: "Myline Deleon" },
      { name: "Grace Guatno" },
      { name: "Mayanne Czarina Ureta" },
      { name: "Ellani M. Jardiolin" },
      { name: "Eliza C. Orquez" },
      { name: "Evelyn R. Mulleno" },
      { name: "Madelaine Tawaran" },
      { name: "Noeta Dalog" },

      { name: "Marieta Camat" },
      { name: "Jane De Chavez" },
      { name: "Cathy De Chavez" },
      { name: "Aileen Bermudez Baldo" },
    ],
    columns: 1,
    color: "dustyblue",
    rowGroup: "principal",
  },
  {
    title: "Best Man",
    members: [{ name: "Simoth Caballero" }],
    columns: 1,
    highlight: true,
    color: "pearl",
    rowGroup: "honor",
  },
  {
    title: "Maid of Honor",
    members: [{ name: "Yvannah Iozsablle Salupen" }],
    columns: 1,
    highlight: true,
    color: "pearl",
    rowGroup: "honor",
  },
  {
    title: "Groomsmen",
    members: [
      { name: "Rhain Adriane Arboleda" },
      { name: "Knight Arren Lanuza" },
      { name: "Rankine Capuyan" },
      { name: "Diego A. Wanawan" },
      { name: "Daniel John Cabading" },
      { name: "John Raven Gabriz" },
      { name: "Jalen Jardiolin" },
    ],
    columns: 1,
    color: "violet",
    rowGroup: "bm-gm",
  },
  {
    title: "Bridesmaids",
    members: [
      { name: "Gemalyn Akilith" },
      { name: "Rhymaea Abigail Arboleda" },
      { name: "Maxyne Piper Cabading" },
      { name: "Emma Rachelle Cabading" },
      { name: "Chloe Blanche Cabading" },
      { name: "Daf Elise Jardiolin" },
      { name: "Mia Klarisse Tellez" },
    ],
    columns: 1,
    color: "violet",
    rowGroup: "bm-gm",
  },
  {
    title: "Flower Girls",
    members: [
      { name: "Riona Arabelle Arboleda" },
      { name: "Atikah Keefe W. Briones" },
      { name: "River Lynne Celia Tagufa-Kuong" },
      { name: "Iara Kyryn G. Wanawan" },
    ],
    columns: 2,
    color: "pink",
  },
  {
    title: "Ring Bearer",
    members: [{ name: "Kanoa Farweg W. Briones" }],
    columns: 1,
    color: "sage",
    rowGroup: "bearers",
  },
  {
    title: "Bible Bearer",
    members: [{ name: "Ryu Andie Arboleda" }],
    columns: 1,
    color: "sage",
    rowGroup: "bearers",
  },
  {
    title: "Coin Bearer",
    members: [{ name: "Szage B. Wanawan" }],
    columns: 1,
    color: "sage",
    rowGroup: "bearers",
  },
];

// ─── Blob animation ───────────────────────────────────────────────────────────
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

const serif = { fontFamily: '"Cormorant Garamond", serif' } as const;

// ─── Decorative divider ───────────────────────────────────────────────────────
function GoldDivider({ color = "gold" }: { color?: PillColor }) {
  const dotColor: Record<PillColor, string> = {
    gold: "bg-wedding-gold",
    pearl: "bg-[#F0EDE8]",
    dustyblue: "bg-[#8FAFC4]",
    pink: "bg-[#D9A0AD]",
    sage: "bg-[#92B89A]",
    violet: "bg-[#B8A9D4]",
    default: "bg-wedding-gold",
  };
  const lineColor: Record<PillColor, string> = {
    gold: "bg-wedding-gold-metallic",
    pearl: "bg-[#F0EDE8]",
    dustyblue: "bg-[#8FAFC4]",
    pink: "bg-[#D9A0AD]",
    sage: "bg-[#92B89A]",
    violet: "bg-[#B8A9D4]",
    default: "bg-wedding-gold-metallic",
  };

  return (
    <div className="flex items-center justify-center gap-3 my-1.5">
      <div className={`h-px w-10 ${lineColor[color]} opacity-50`} />
      <div className={`w-1 h-1 rounded-full ${dotColor[color]} opacity-70`} />
      <div className={`h-px w-10 ${lineColor[color]} opacity-50`} />
    </div>
  );
}

// ─── Group header ─────────────────────────────────────────────────────────────
function GroupHeader({
  title,
  subtitle,
  compact = false,
  color = "gold",
}: {
  title: string;
  subtitle?: string;
  compact?: boolean;
  color?: PillColor;
}) {
  const labelColor: Record<PillColor, string> = {
    gold: "text-wedding-gold/70",
    pearl: "text-[#F0EDE8]/60",
    dustyblue: "text-[#8FAFC4]/65",
    pink: "text-[#D9A0AD]/65",
    sage: "text-[#92B89A]/65",
    violet: "text-[#B8A9D4]/65",
    default: "text-wedding-gold/70",
  };

  return (
    <div className={`text-center ${compact ? "mb-2" : "mb-3 md:mb-5"}`}>
      <p
        className={`uppercase tracking-[0.3em] mb-0.5 ${labelColor[color]} ${
          compact ? "text-[10px] md:text-[10px]" : "text-[11px] md:text-xs"
        }`}
        style={serif}
      >
        {subtitle ?? "\u00A0"}
      </p>
      <h3
        className={`text-wedding-warmcream font-light ${
          compact ? "text-[18px] md:text-2xl" : "text-lg md:text-3xl"
        }`}
        style={serif}
      >
        {title}
      </h3>
      <GoldDivider color={color} />
    </div>
  );
}

// ─── Person pill ──────────────────────────────────────────────────────────────
function PersonPill({
  person,
  color = "default",
}: {
  person: EntouragePerson;
  color?: PillColor;
}) {
  const styles = colorStyles[color];

  return (
    <div
      className={`
        flex flex-col items-center justify-center text-center
        px-3 py-[5px] md:px-6 md:py-[9px]
        border
        ${styles.border} ${styles.bg}
      `}
      style={{ borderRadius: 9999, width: "100%", boxSizing: "border-box" }}
    >
      <span
        className={`font-light leading-tight ${styles.text} text-[13px] md:text-[15px]`}
        style={serif}
      >
        {person.name}
      </span>
      {person.role && (
        <span
          className={`text-[7px] md:text-[9px] tracking-widest uppercase mt-0.5 ${styles.label}`}
          style={serif}
        >
          {person.role}
        </span>
      )}
    </div>
  );
}

// ─── Paired members grid (syncs row heights across two groups) ────────────────
function PairedMembersGrid({
  leftMembers,
  rightMembers,
  leftColor = "default",
  rightColor = "default",
}: {
  leftMembers: EntouragePerson[];
  rightMembers: EntouragePerson[];
  leftColor?: PillColor;
  rightColor?: PillColor;
}) {
  const maxLen = Math.max(leftMembers.length, rightMembers.length);

  return (
    <div
      className="grid gap-1.5 md:gap-2 w-full"
      style={{ gridTemplateColumns: "1fr 1fr", gridAutoRows: "1fr" }}
    >
      {Array.from({ length: maxLen }).map((_, i) => (
        <>
          {leftMembers[i] ? (
            <PersonPill
              key={`l-${i}`}
              person={leftMembers[i]}
              color={leftColor}
            />
          ) : (
            <div key={`l-empty-${i}`} />
          )}
          {rightMembers[i] ? (
            <PersonPill
              key={`r-${i}`}
              person={rightMembers[i]}
              color={rightColor}
            />
          ) : (
            <div key={`r-empty-${i}`} />
          )}
        </>
      ))}
    </div>
  );
}

// ─── Members grid ─────────────────────────────────────────────────────────────
function MembersGrid({
  members,
  columns = 1,
  color = "default",
}: {
  members: EntouragePerson[];
  columns?: 1 | 2;
  color?: PillColor;
}) {
  return (
    <div
      className={`grid gap-1.5 md:gap-2 w-full ${
        columns === 2 ? "grid-cols-2" : "grid-cols-1"
      }`}
      style={{ gridAutoRows: "1fr", alignItems: "stretch" }}
    >
      {members.map((m, i) => (
        <PersonPill key={i} person={m} color={color} />
      ))}
    </div>
  );
}

// ─── Row-group section ────────────────────────────────────────────────────────
function RowGroupSection({
  siblings,
  index,
}: {
  siblings: EntourageGroup[];
  index: number;
}) {
  const n = siblings.length;
  const mobileColClass =
    n === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : n === 2
        ? "grid-cols-2"
        : "grid-cols-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
      className="w-full mb-6 md:mb-10"
    >
      {/* Mobile */}
      {n === 2 ? (
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-2 mb-2">
            {siblings.map((s) => (
              <div key={s.title} className="flex flex-col min-w-0">
                <GroupHeader
                  title={s.title}
                  subtitle={s.subtitle}
                  compact
                  color={s.color ?? "default"}
                />
              </div>
            ))}
          </div>
          <PairedMembersGrid
            leftMembers={siblings[0].members}
            rightMembers={siblings[1].members}
            leftColor={siblings[0].color ?? "default"}
            rightColor={siblings[1].color ?? "default"}
          />
        </div>
      ) : (
        <div className={`md:hidden grid ${mobileColClass} gap-2 items-start`}>
          {siblings.map((s) => (
            <div
              key={s.title}
              className="flex flex-col min-w-0 w-full max-w-xs mx-auto sm:max-w-none"
            >
              <GroupHeader
                title={s.title}
                subtitle={s.subtitle}
                compact
                color={s.color ?? "default"}
              />
              <MembersGrid
                members={s.members}
                columns={1}
                color={s.color ?? "default"}
              />
            </div>
          ))}
        </div>
      )}

      {/* Desktop */}
      {n === 2 ? (
        <div className="hidden md:block">
          <div className="flex gap-8 justify-center mb-3 md:mb-5">
            {siblings.map((s) => (
              <div key={s.title} className="flex-1 min-w-0">
                <GroupHeader
                  title={s.title}
                  subtitle={s.subtitle}
                  color={s.color ?? "default"}
                />
              </div>
            ))}
          </div>
          <PairedMembersGrid
            leftMembers={siblings[0].members}
            rightMembers={siblings[1].members}
            leftColor={siblings[0].color ?? "default"}
            rightColor={siblings[1].color ?? "default"}
          />
        </div>
      ) : (
        <div className="hidden md:flex gap-8 justify-center items-start">
          {siblings.map((s) => (
            <div
              key={s.title}
              className="flex-1 min-w-0 flex flex-col items-stretch"
            >
              <GroupHeader
                title={s.title}
                subtitle={s.subtitle}
                color={s.color ?? "default"}
              />
              <MembersGrid
                members={s.members}
                columns={s.columns ?? 1}
                color={s.color ?? "default"}
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Standalone group section ─────────────────────────────────────────────────
function EntourageSection({
  group,
  index,
}: {
  group: EntourageGroup;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
      className="w-full mb-6 md:mb-10"
    >
      <GroupHeader
        title={group.title}
        subtitle={group.subtitle}
        color={group.color ?? "default"}
      />
      <MembersGrid
        members={group.members}
        columns={group.columns ?? 1}
        color={group.color ?? "default"}
      />
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Entourage() {
  return (
    <section
      id="Entourage"
      className="relative w-full flex flex-col items-center bg-wedding-slate overflow-hidden py-16 md:py-24 px-4 md:px-5"
    >
      <ShimmerStars />
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

      <div className="relative w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <h1
            className="text-5xl md:text-7xl text-wedding-warmcream font-bold tracking-widest drop-shadow-lg pt-8 lg:pt-5"
            style={{ fontFamily: '"Great Vibes", cursive' }}
          >
            Entourage
          </h1>
          <p
            className="text-wedding-softgray mt-2 tracking-wide text-sm md:text-base italic font-light"
            style={serif}
          >
            The beloved people walking beside us
          </p>
        </motion.div>

        <div className="flex items-center gap-4 mb-10 md:mb-16 opacity-30">
          <div className="flex-1 h-px bg-wedding-softgray" />
          <div className="w-1.5 h-1.5 rounded-full bg-wedding-gold rotate-45" />
          <div className="flex-1 h-px bg-wedding-softgray" />
        </div>

        {(() => {
          const rendered = new Set<string>();
          return groups.map((group, i) => {
            if (group.rowGroup) {
              if (rendered.has(group.rowGroup)) return null;
              rendered.add(group.rowGroup);
              const siblings = groups.filter(
                (g) => g.rowGroup === group.rowGroup,
              );
              return (
                <RowGroupSection
                  key={group.rowGroup}
                  siblings={siblings}
                  index={i}
                />
              );
            }
            return (
              <EntourageSection key={group.title} group={group} index={i} />
            );
          });
        })()}
      </div>
    </section>
  );
}
