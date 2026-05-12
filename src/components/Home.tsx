import Countdown from './Countdown';
import WeddingButton from './WeddingButton';

export default function Home() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
    {/* Background Images */}
    <div
        className="absolute inset-0 bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: "url('/images/home.webp')" }}
    />
    <div
        className="absolute inset-0 bg-cover bg-center lg:hidden"
        style={{ backgroundImage: "url('/images/homeMobile.webp')" }}
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/40" />

    {/* Content */}
    <div className="relative z-10 flex h-full flex-col items-center justify-center pt-20">
        <div className="text-center text-white px-6 mb-8">

        {/* Desktop */}
        <h1
            className="hidden lg:block text-9xl font-light tracking-wide italic"
            style={{ fontFamily: "'Great Vibes', cursive" }}
        >
            Rhandy & Francheska
        </h1>

        {/* Mobile */}
        <h1
            className="lg:hidden text-[5rem] leading-none font-light tracking-wide italic"
            style={{ fontFamily: "'Great Vibes', cursive" }}
        >
            <p>Rhandy</p>
            <p className="text-[3rem]">&</p>
            <p>Francheska</p>
        </h1>

        <p className="mt-4 text-sm md:text-base tracking-widest uppercase opacity-80">
            Wedding Celebration
        </p>
        <p className="mt-2 text-xs md:text-sm opacity-70">
            Save the Date • 2026
        </p>
        </div>

        {/* RSVP Button */}
        <WeddingButton label="RSVP Now" onClick={() => navigate('/rsvp')} />

        {/* Countdown */}
        <div className="absolute bottom-20">
        <Countdown />
        </div>
    </div>
    </section>
  );
}