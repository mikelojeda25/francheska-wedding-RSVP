import Countdown from './Countdown';

export default function Home() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/home.webp')",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center flex-col">
        <div className="text-center text-white px-6">
          
          {/* Names */}
          <h1 className="text-5xl md:text-7xl font-light tracking-wide italic"
              style={{ fontFamily: "'Great Vibes', cursive" }}>
            Rhandy & Franchaska
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-sm md:text-base tracking-widest uppercase opacity-80">
            Wedding Celebration
          </p>

          {/* Optional date */}
          <p className="mt-2 text-xs md:text-sm opacity-70">
            Save the Date • 2026
          </p>
        </div>

        {/* Countdown */}
            <div className="mt-8">
                <Countdown />
            </div>

      </div>
    </section>
  );
}