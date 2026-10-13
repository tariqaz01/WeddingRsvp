import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { motion, AnimatePresence } from 'framer-motion'

/* ---- Wave Bar CSS for music button ---- */
const waveCss = `
@keyframes waveBar1 { 0%,100%{height:3px} 50%{height:14px} }
@keyframes waveBar2 { 0%,100%{height:6px} 50%{height:18px} }
@keyframes waveBar3 { 0%,100%{height:4px} 50%{height:12px} }
@keyframes waveBar4 { 0%,100%{height:8px} 50%{height:20px} }
@keyframes waveBar5 { 0%,100%{height:5px} 50%{height:15px} }
@keyframes waveBar6 { 0%,100%{height:3px} 50%{height:11px} }
@keyframes waveBar7 { 0%,100%{height:7px} 50%{height:17px} }
.app-wave-bar-1{animation:waveBar1 1.1s ease-in-out infinite;}
.app-wave-bar-2{animation:waveBar2 1.3s ease-in-out infinite;animation-delay:0.12s;}
.app-wave-bar-3{animation:waveBar3 0.9s ease-in-out infinite;animation-delay:0.24s;}
.app-wave-bar-4{animation:waveBar4 1.2s ease-in-out infinite;animation-delay:0.08s;}
.app-wave-bar-5{animation:waveBar5 1.0s ease-in-out infinite;animation-delay:0.36s;}
.app-wave-bar-6{animation:waveBar6 1.4s ease-in-out infinite;animation-delay:0.18s;}
.app-wave-bar-7{animation:waveBar7 1.15s ease-in-out infinite;animation-delay:0.30s;}
.app-wave-bar-base{
  width:2.5px;
  border-radius:2px;
  background:linear-gradient(to top,#cf9e38,#f9ebb2);
  transform-origin:bottom;
  transition:height 0.3s ease;
}
`;

import Popup from './components/Popup'
import Hero from './components/Hero'
import RSVP from './components/RSVP'
import Invitaion from './components/Invitaion'

function App() {
  const [guestName, setGuestName] = useState('')
  const [hasEntered, setHasEntered] = useState(false)
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true);
    // Start music when envelope is opened
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(() => {
        // Autoplay blocked by browser, user can toggle manually
      });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play();
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Wave Bar CSS Animations */}
      <style>{waveCss}</style>

      {/* Background Music */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* Floating Wave-Bar Music Button */}
      {isEnvelopeOpen && (
        <div className="fixed bottom-6 right-6 z-[9999]">
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={isMusicPlaying ? 'Pause Music' : 'Play Music'}
            title={isMusicPlaying ? 'Music playing — click to pause' : 'Music paused — click to play'}
            className={`w-12 h-12 rounded-full border backdrop-blur-md active:scale-90 transition-all duration-300 flex items-end justify-center gap-[2.5px] px-2.5 pb-[10px] pt-1 ${
              isMusicPlaying
                ? 'bg-[#1a0508]/85 border-yellow-500 shadow-[0_0_20px_rgba(207,158,56,0.4),0_4px_20px_rgba(0,0,0,0.7)]'
                : 'bg-black/80 border-yellow-600/30 hover:border-yellow-500/70 shadow-[0_4px_16px_rgba(0,0,0,0.6)]'
            }`}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <span
                key={n}
                className={`app-wave-bar-base app-wave-bar-${n}${isMusicPlaying ? '' : ' !h-[3px] opacity-30'}`}
                style={isMusicPlaying ? {} : { animation: 'none' }}
              />
            ))}
          </button>
        </div>
      )}
      {/* 1. Name Entry Popup */}
      <Popup
        guestName={guestName}
        setGuestName={setGuestName}
        hasEntered={hasEntered}
        setHasEntered={setHasEntered}
      />

      {/* 2. Envelope Landing Page - appears after entering name */}
      <AnimatePresence>
        {hasEntered && !isEnvelopeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5DC] px-4"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E5DCC8' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            <div className="relative z-10 text-center max-w-lg w-full flex flex-col items-center">
              {/* Guest Name on Envelope */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="mb-8"
              >
                <p className="font-serif italic text-xs md:text-sm tracking-[0.3em] uppercase text-[#8B7355] mb-2">
                  Cordially Invited
                </p>
                <h2 className="font-serif text-3xl md:text-5xl text-[#3A2D1D] tracking-wide font-normal">
                  {guestName || 'Honored Guest'}
                </h2>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <div className="w-12 h-[1px] bg-[#C4B49A]/60" />
                  <span className="text-[#A89678] text-sm">❦</span>
                  <div className="w-12 h-[1px] bg-[#C4B49A]/60" />
                </div>
              </motion.div>

              {/* Wax Seal */}
              <motion.button
                onClick={handleEnvelopeClick}
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Click to open invitation"
              >
                {/* Realistic Wax Seal */}
                <div className="relative w-44 h-44 md:w-60 md:h-60">
                  {/* Main seal circle */}
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F0E8D8] via-[#E8DCC0] to-[#D4C4A8] shadow-2xl"
                    style={{
                      boxShadow:
                        "0 20px 60px rgba(0,0,0,0.3), inset 0 -5px 15px rgba(0,0,0,0.2), inset 0 5px 15px rgba(255,255,255,0.5)",
                    }}
                  />

                  {/* Inner embossed circle */}
                  <div
                    className="absolute inset-5 md:inset-8 rounded-full border-4 border-[#C4B49A]/40"
                    style={{
                      boxShadow: "inset 0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  />

                  {/* Monogram */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-serif text-4xl md:text-6xl text-[#A89678] italic"
                      style={{
                        textShadow:
                          "2px 2px 4px rgba(0,0,0,0.2), -1px -1px 2px rgba(255,255,255,0.5)",
                        fontWeight: 300,
                        letterSpacing: "0",
                      }}
                    >
                      S ♥A
                    </span>
                  </div>

                  {/* Texture overlay */}
                  <div
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    }}
                  />
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
              </motion.button>

              {/* Envelope fold lines */}
              <div className="absolute inset-0 pointer-events-none -z-10">
                <svg
                  className="w-full h-full opacity-10"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="50"
                    y2="50"
                    stroke="#8B7355"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="100"
                    y1="0"
                    x2="50"
                    y2="50"
                    stroke="#8B7355"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="0"
                    y1="100"
                    x2="50"
                    y2="50"
                    stroke="#8B7355"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="100"
                    y1="100"
                    x2="50"
                    y2="50"
                    stroke="#8B7355"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>

              {/* Call-to-action under seal */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 text-center font-serif font-semibold text-sm md:text-base tracking-widest text-[#4A3A25] uppercase animate-pulse"
              >
                Tap seal to open
              </motion.p>

              {/* Bottom text */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="mt-3 mx-auto max-w-md text-[#8B7355] text-xs md:text-sm font-serif italic text-center px-6"
              >
                This invitation is personal and non-transferable.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Content - Revealed once envelope is opened */}
      <main className={`transition-opacity duration-1000 ${hasEntered && isEnvelopeOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden pointer-events-none'}`}>
        <Hero guestName={guestName} />
        <Invitaion hasEntered={hasEntered} />
        <RSVP guestName={guestName} />
      </main>
    </div>
  )
}

export default App
