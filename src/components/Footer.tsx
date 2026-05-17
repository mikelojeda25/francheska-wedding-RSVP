const Footer = () => {
    return (
      <footer className="relative w-full " style={{ backgroundColor: "#D9C8B4" }}>
        {/* Sand/light brown background base */}
        <img
        src="/images/Chibi.webp"
        alt="R&F"
        className="absolute left-1/2 -translate-x-1/2 bottom-50 lg:bottom-70 lg:left-auto lg:translate-x-0 lg:right-[130px] w-40 md:w-56 z-10 pointer-events-none"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #D9C8B4 0%, #C9B99A 100%)",
          }}
        />
  
        {/* Wave layers - multiple stacked */}
        <div className="relative w-full scale-120 h-[100px] lg:h-[170px]">
          {/* Wave 1 - back, slowest, most transparent */}
          <svg
            className="absolute bottom-0 w-full"
            style={{
              animation: "waveMove1 8s ease-in-out infinite",
              opacity: 0.35,
            }}
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 L1440,120 L0,120 Z"
              fill="#86afcd"
            />
          </svg>
  
          {/* Wave 2 - mid, medium speed */}
          <svg
            className="absolute bottom-0 w-full"
            style={{
              animation: "waveMove2 6s ease-in-out infinite",
              opacity: 0.5,
            }}
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,40 C180,90 360,20 540,55 C720,90 900,15 1080,55 C1260,90 1350,30 1440,50 L1440,120 L0,120 Z"
              fill="#86afcd"
            />
          </svg>
  
          {/* Wave 3 - front, fastest, most opaque */}
          <svg
            className="absolute bottom-0 w-full"
            style={{
              animation: "waveMove3 4.5s ease-in-out infinite",
              opacity: 0.75,
            }}
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,70 C120,30 300,100 480,55 C660,10 840,90 1020,55 C1200,20 1320,80 1440,50 L1440,120 L0,120 Z"
              fill="#86afcd"
            />
          </svg>
  
          {/* Wave 4 - frontmost fill, solid */}
          <svg
            className="absolute bottom-0 w-full"
            style={{
              animation: "waveMove4 5.5s ease-in-out infinite",
            }}
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,85 C200,50 400,100 600,75 C800,50 1000,95 1200,70 C1320,55 1380,80 1440,72 L1440,120 L0,120 Z"
              fill="#86afcd"
            />
          </svg>
        </div>
  
        {/* Footer content area - solid baby blue */}
        <div
          className="relative flex flex-col items-center justify-center py-10 px-6"
          style={{ backgroundColor: "#86afcd" }}
        >
          {/* Decorative top flourish */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="h-px w-16"
              style={{ background: "rgba(255,255,255,0.5)" }}
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: 0.7 }}
            >
              <path
                d="M12 2C12 2 8 6 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 6 12 2 12 2Z"
                fill="white"
              />
              <path
                d="M6 12C4 13 2 15 2 17C2 19.2 4.8 21 8 21C9.4 21 10.7 20.6 11.7 20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M18 12C20 13 22 15 22 17C22 19.2 19.2 21 16 21C14.6 21 13.3 20.6 12.3 20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div
              className="h-px w-16"
              style={{ background: "rgba(255,255,255,0.5)" }}
            />
          </div>
  
          {/* Main text */}
          <p
            className="text-center text-white tracking-widest uppercase text-sm font-light"
            style={{
              fontFamily: "'Cormorant Garamond', 'Palatino Linotype', serif",
              fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
              letterSpacing: "0.25em",
              textShadow: "0 1px 8px rgba(60,90,120,0.18)",
            }}
          >
            Your attendance is appreciated
          </p>
  
          {/* Decorative bottom flourish */}
          <div className="flex items-center gap-3 mt-5">
            <div
              className="h-px w-10"
              style={{ background: "rgba(255,255,255,0.35)" }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.5)" }}
            />
            <div
              className="h-px w-10"
              style={{ background: "rgba(255,255,255,0.35)" }}
            />
          </div>
        </div>
  
        {/* Wave keyframes */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
  
          @keyframes waveMove1 {
            0%   { transform: translateX(0) scaleY(1); }
            50%  { transform: translateX(-3%) scaleY(1.08); }
            100% { transform: translateX(0) scaleY(1); }
          }
          @keyframes waveMove2 {
            0%   { transform: translateX(0) scaleY(1); }
            50%  { transform: translateX(4%) scaleY(0.93); }
            100% { transform: translateX(0) scaleY(1); }
          }
          @keyframes waveMove3 {
            0%   { transform: translateX(0) scaleY(1); }
            50%  { transform: translateX(-5%) scaleY(1.12); }
            100% { transform: translateX(0) scaleY(1); }
          }
          @keyframes waveMove4 {
            0%   { transform: translateX(0) scaleY(1); }
            50%  { transform: translateX(3%) scaleY(0.96); }
            100% { transform: translateX(0) scaleY(1); }
          }
        `}</style>
      </footer>
    );
  };
  
  export default Footer;