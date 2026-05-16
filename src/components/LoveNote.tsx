import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";

const ANIMS = { A: "heartPulseA", B: "heartPulseB", C: "heartPulseC" } as const;

function useRevealOnce<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

function AnimatedFlower({ src, className, alt = "" }: { src: string; className: string; alt?: string }) {
  const ref = useRevealOnce<HTMLImageElement>(0.15);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`flower-deco pointer-events-none ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}

function AnimatedHearts({ side, count = 3 }: { side: "left" | "right"; count?: number }) {
  const [phase, setPhase] = useState<"idle" | "entering" | "looping">("idle");
  const ref = useRef<HTMLDivElement>(null);

  const sizes =
    count === 1
      ? ["w-8 h-8"]
      : side === "left"
        ? ["", "w-10 h-10", "w-15 h-15"]
        : ["w-15 h-15", "w-10 h-10", ""];

  const animMap =
    count === 1
      ? [ANIMS.C]
      : side === "left"
        ? [ANIMS.A, ANIMS.B, ANIMS.C]
        : [ANIMS.C, ANIMS.B, ANIMS.A];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("entering");
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "entering") return;
    const timer = setTimeout(() => setPhase("looping"), 900);
    return () => clearTimeout(timer);
  }, [phase]);

  const getStyle = (index: number): React.CSSProperties => {
    if (phase === "idle") return { opacity: 0 };
    if (phase === "entering") {
      return { animation: "heartEnter 0.9s ease forwards", opacity: 0 };
    }
    return {
      animation: `${animMap[index]} 4s ease-in-out infinite`,
      opacity: 1,
      willChange: "opacity",
    };
  };

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 ${side === "right" ? "ml-6" : "mr-6"}`}
      style={{ contain: "layout style" }}
    >
      {sizes.map((size, i) => (
        <Heart
          key={i}
          className={`text-wedding-babyblue fill-wedding-babyblue ${size}`}
          style={getStyle(i)}
        />
      ))}
    </div>
  );
}

export default function LoveNote() {
  const headerRef = useRevealOnce<HTMLDivElement>(0.2);
  const cardRef = useRevealOnce<HTMLDivElement>(0.12);

  return (
    <section
      id="Lovenote"
      className="relative w-full min-h-screen flex-col flex items-center justify-center bg-wedding-slate overflow-hidden py-20 px-5"
    >
      <style>{`
        @keyframes heartEnter {
          from { opacity: 0; transform: translate3d(0, -12px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes heartPulseC {
          0%   { opacity: 0.15; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { opacity: 0.15; }
        }

        @keyframes heartPulseB {
          0%   { opacity: 1; }
          25%  { opacity: 0.15; }
          40%  { opacity: 1; }
          75%  { opacity: 0.15; }
          100% { opacity: 1; }
        }

        @keyframes heartPulseA {
          0%   { opacity: 1; }
          50%  { opacity: 0.15; }
          100% { opacity: 1; }
        }

        @keyframes revealUp {
          from { opacity: 0; transform: translate3d(0, 16px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes blobDrift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(12px, -16px, 0); }
        }

        @keyframes flowerReveal {
          from { opacity: 0; transform: scale(0.6) translate3d(0, 0, 0); }
          to   { opacity: 0.8; transform: scale(1) translate3d(0, 0, 0); }
        }

        @keyframes flowerSway {
          0%, 100% { transform: scale(1) translate3d(0, 0, 0); }
          50%      { transform: scale(1) translate3d(0, -8px, 0); }
        }

        .flower-deco {
          opacity: 0;
          transform: scale(0.6);
          transform-origin: center bottom;
        }

        .flower-deco.is-visible {
          animation:
            flowerReveal 1.4s ease-out forwards,
            flowerSway 7s ease-in-out 1.4s infinite;
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
        }

        .reveal-on-scroll.is-visible {
          animation: revealUp 0.7s ease-out forwards;
        }

        .blob-drift {
          animation: blobDrift 14s ease-in-out infinite;
          will-change: transform;
        }

        .blob-drift-slow {
          animation: blobDrift 18s ease-in-out infinite reverse;
          will-change: transform;
        }

        @media (max-width: 767px) {
          .blob-drift,
          .blob-drift-slow {
            animation: none;
            will-change: auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-on-scroll {
            opacity: 1;
            transform: none;
          }
          .reveal-on-scroll.is-visible {
            animation: none;
          }
          .blob-drift,
          .blob-drift-slow {
            animation: none;
          }
          .flower-deco {
            opacity: 1;
            transform: scale(1);
          }
          .flower-deco.is-visible {
            animation: none;
          }
        }
      `}</style>

      {/* Static blobs on mobile; gentle CSS drift on desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute w-[280px] h-[280px] bg-wedding-babyblue/25 rounded-full blur-2xl top-[-80px] left-[-80px] md:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute w-[240px] h-[240px] bg-wedding-gold/20 rounded-full blur-2xl bottom-[-60px] right-[-60px] md:hidden"
      />

      <div
        aria-hidden
        className="pointer-events-none hidden md:block absolute w-[420px] h-[420px] bg-wedding-babyblue/25 rounded-full blur-3xl top-[-120px] left-[-120px] blob-drift"
      />
      <div
        aria-hidden
        className="pointer-events-none hidden md:block absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl bottom-[-180px] right-[-140px] blob-drift-slow"
      />
      <div
        aria-hidden
        className="pointer-events-none hidden md:block absolute w-[320px] h-[320px] bg-wedding-gold/20 rounded-full blur-2xl top-[30%] left-[65%] blob-drift"
      />
      <div
        aria-hidden
        className="pointer-events-none hidden lg:block absolute w-[260px] h-[260px] bg-wedding-steel/20 rounded-full blur-2xl left-[20%] blob-drift-slow"
      />

      {/* Header row */}
      <div ref={headerRef} className="reveal-on-scroll flex items-center gap-4 z-10">
        <div className="flex md:hidden">
          <AnimatedHearts side="left" count={1} />
        </div>
        <div className="hidden md:flex">
          <AnimatedHearts side="left" />
        </div>

        <div>
          <h1
            className="text-center text-4xl md:text-7xl text-wedding-warmcream font-bold tracking-widest drop-shadow-lg"
            style={{ fontFamily: '"Great Vibes", cursive' }}
          >
            Love Note
          </h1>
          <p className="text-center text-sm md:text-xl text-wedding-softgray mt-2 font-['Cormorant_Garamond'] text-md italic font-light tracking-wide">
            A quiet promise between two souls
          </p>
        </div>

        <div className="flex md:hidden">
          <AnimatedHearts side="right" count={1} />
        </div>
        <div className="hidden md:flex">
          <AnimatedHearts side="right" />
        </div>
      </div>

      {/* Content Card */}
      <div className="relative w-full max-w-[1400px] z-10">
        <AnimatedFlower
          src="/images/up-corner1.webp"
          className="absolute h-[30%] object-cover z-10 -top-5 -left-8 hidden md:block lg:hidden md:top-0 md:h-[50%]"
        />
        <AnimatedFlower
          src="/images/up-corner.webp"
          className="absolute h-[30%] object-cover z-10 -top-5 -right-8 lg:hidden md:top-0 md:h-[50%]"
        />
        <AnimatedFlower
          src="/images/corner.webp"
          className="absolute h-[80%] object-cover z-10 -bottom-25 -left-15 hidden lg:block"
        />

        <div
          ref={cardRef}
          className="reveal-on-scroll mt-10 md:mt-20 bg-white/12 md:bg-white/10 md:backdrop-blur-xl border border-wedding-softgray/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          style={{ contain: "layout style paint" }}
        >
          <div className="md:w-1/2 h-[300px] md:h-auto">
            <img
              src="/images/lovenote.webp"
              className="w-full h-full object-cover"
              alt="Love Note"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-12 space-y-6 justify-between flex flex-col">
            <div>
              <div>
                <h2 className="text-wedding-babyblue font-semibold">Groom</h2>
                <p className="text-wedding-warmcream leading-relaxed">
                  Sample groom message. Three sentences of commitment, love, and future promise together.
                </p>
              </div>
              <div>
                <h2 className="text-wedding-babyblue font-semibold mt-10">Bride</h2>
                <p className="text-wedding-warmcream leading-relaxed">
                  Sample bride message. Emotional, soft, and heartfelt expression of trust and love.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-wedding-softgray/20">
              <p className="italic text-wedding-softgray text-sm">
                "Therefore what God has joined together, let no one separate."
              </p>
              <span className="text-xs text-wedding-softgray">— Mark 10:9</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
