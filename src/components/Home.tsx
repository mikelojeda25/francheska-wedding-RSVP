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
    <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <div className="text-center text-white px-6 mb-8">

        {/* Desktop */}
        <h1
            className="hidden md:block text-9xl font-light tracking-wide italic"
            style={{ fontFamily: "'Great Vibes', cursive" }}
        >
            Rhandy & Francheska
        </h1>

        {/* Mobile */} 
        <h1
            className="md:hidden text-[4.5rem] leading-none font-light tracking-wide "
            style={{ fontFamily: "'Great Vibes', cursive" }}
        >
            <p>Rhandy</p>
            <p className="text-[3rem]">&</p>
            <p>Francheska</p>
        </h1>
        
        <p className="mt-4 tracking-[0.25em] font-bold uppercase opacity-80 text-[1rem] lg:text-[1.25rem] lg:font-medium lg:tracking-[0.75em]">
            Wedding Celebration
        </p>

        {/* Info Mobile*/}
        <p className="mt-2 text-xs md:text-sm opacity-70 block md:hidden">
            Casa Macoto Beach Resort • July 12, 2026
        </p>

        {/* Info*/}
                <p className="mt-2 md:text-sm opacity-70 hidden md:block text-white">
            Casa Macoto Beach Resort • July 12, 2026
        </p>

        </div>
        {/* Countdown Mobile*/}
        <div className="md:hidden scale-80 pb-10">
        <Countdown />
        </div>

        {/* RSVP Button */}
        <WeddingButton label="RSVP Now" onClick={() => navigate('/rsvp')} />

        {/* Countdown */}
        <div className="absolute bottom-20 hidden md:block">
        <Countdown />
        </div>
    </div>
    </section>
  );
}