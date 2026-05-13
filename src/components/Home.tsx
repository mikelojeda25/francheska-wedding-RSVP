import Countdown from './Countdown';
import WeddingButton from './WeddingButton';
import { Heart } from "lucide-react"

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
    <div className="absolute inset-0 bg-black/75" />

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
            className="mt-20 md:hidden text-[2.25rem] leading-none font-light tracking-wide [text-shadow:0_2px_10px_rgba(201,168,76,0.35)] flex flex-row justify-center items-center gap-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
            >
            <span>Rhandy</span>
            <Heart className="w-8 h-8 text-[#C9A84C]" />
            <span>Francheska</span>
        </h1>
        
        <p className="mt-4 text-[#D4AF37] tracking-[0.1em] font-bold uppercase text-[1.25rem] lg:text-[2rem] lg:font-medium lg:tracking-[0.75em] [text-shadow:2px_2px_6px_rgba(0,0,0,1)] font-['Cormorant_Garamond'] ">
            Wedding Celebration
        </p>

        {/* Info Mobile*/}
        <p className="mt-2 text-[1.25rem] opacity-70 block md:hidden [text-shadow:2px_2px_6px_rgba(0,0,0,1)] font-['Cormorant_Garamond']">
            <div>Casa Macoto Beach Resort</div>
            <div>July 12, 2026</div>
        </p>

        {/* Info*/}
        <p className="mt-2 text-xl tracking-[0.25em] mt-5 opacity-70 hidden md:block text-white">
            Casa Macoto Beach Resort • July 12, 2026
        </p>
        </div>

       

        {/* Countdown Mobile*/}
        <div className="md:hidden scale-80 pb-5">
        <Countdown />
        </div>

        {/* RSVP Button */}
        <WeddingButton />

        {/* Countdown */}
        <div className="absolute bottom-20 hidden md:block">
        <Countdown />
        </div>
    </div>
    </section>
  );
}