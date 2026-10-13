import React, { useState, useEffect } from "react";
import RedCard from "./RedCard";
import BlackCard from "./BlackCard";

const invitationCss = `
/* Equalizer wave bars */
@keyframes waveBar1 { 0%,100%{height:3px} 50%{height:14px} }
@keyframes waveBar2 { 0%,100%{height:6px} 50%{height:18px} }
@keyframes waveBar3 { 0%,100%{height:4px} 50%{height:12px} }
@keyframes waveBar4 { 0%,100%{height:8px} 50%{height:20px} }
@keyframes waveBar5 { 0%,100%{height:5px} 50%{height:15px} }
@keyframes waveBar6 { 0%,100%{height:3px} 50%{height:11px} }
@keyframes waveBar7 { 0%,100%{height:7px} 50%{height:17px} }

.wave-bar-1 { animation: waveBar1 1.1s ease-in-out infinite; }
.wave-bar-2 { animation: waveBar2 1.3s ease-in-out infinite; animation-delay: 0.12s; }
.wave-bar-3 { animation: waveBar3 0.9s ease-in-out infinite; animation-delay: 0.24s; }
.wave-bar-4 { animation: waveBar4 1.2s ease-in-out infinite; animation-delay: 0.08s; }
.wave-bar-5 { animation: waveBar5 1.0s ease-in-out infinite; animation-delay: 0.36s; }
.wave-bar-6 { animation: waveBar6 1.4s ease-in-out infinite; animation-delay: 0.18s; }
.wave-bar-7 { animation: waveBar7 1.15s ease-in-out infinite; animation-delay: 0.30s; }

.wave-bar-base {
  width: 2.5px;
  border-radius: 2px;
  background: linear-gradient(to top, #cf9e38, #f9ebb2);
  transform-origin: bottom;
  transition: height 0.3s ease;
}

.perspective-stage {
  perspective: 1400px;
}

/* Responsive tilt & offset variables for cards */
.card-stage-container {
  --card-tilt-deg: 1.8deg;
  --card-shift-x: 5px;
  --card-shift-y: -6px;
  --card-scale: 0.99;
}

@media (min-width: 400px) {
  .card-stage-container {
    --card-tilt-deg: 2.5deg;
    --card-shift-x: 8px;
    --card-shift-y: -8px;
    --card-scale: 0.985;
  }
}

@media (min-width: 640px) {
  .card-stage-container {
    --card-tilt-deg: 5.5deg;
    --card-shift-x: 16px;
    --card-shift-y: -14px;
    --card-scale: 0.98;
  }
}

@media (min-width: 1536px) {
  .card-stage-container {
    --card-tilt-deg: 5.5deg;
    --card-shift-x: 22px;
    --card-shift-y: -18px;
    --card-scale: 0.98;
  }
}

.card-layer-black-tilted {
  transform: rotate(calc(-1 * var(--card-tilt-deg))) translate(calc(-1 * var(--card-shift-x)), var(--card-shift-y)) scale(var(--card-scale));
}

.card-layer-black-active {
  transform: rotate(0deg) translate(0px, 0px) scale(1);
}

.card-layer-red-tilted {
  transform: rotate(var(--card-tilt-deg)) translate(var(--card-shift-x), var(--card-shift-y)) scale(var(--card-scale));
}

.card-layer-red-active {
  transform: rotate(0deg) translate(0px, 0px) scale(1);
}

@media (hover: hover) and (pointer: fine) and (min-width: 640px) {
  .card-layer-black-tilted:hover {
    transform: rotate(-7deg) translate(-22px, -18px) scale(0.98);
  }
  .card-layer-red-tilted:hover {
    transform: rotate(7deg) translate(22px, -18px) scale(0.98);
  }
}

@media (hover: hover) and (pointer: fine) and (min-width: 1536px) {
  .card-layer-black-tilted:hover {
    transform: rotate(-7deg) translate(-30px, -24px) scale(0.98);
  }
  .card-layer-red-tilted:hover {
    transform: rotate(7deg) translate(30px, -24px) scale(0.98);
  }
}
`;

export default function Invitaion({ hasEntered = false }) {
    const [activeCard, setActiveCard] = useState("red"); // 'red' in front by default
    /* ---------------- Auto Switch Cards Timer (8 Seconds) ---------------- */
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveCard((prev) => (prev === "red" ? "black" : "red"));
        }, 8000);

        return () => clearInterval(timer);
    }, []);

    /* ---------------- Map Handler ---------------- */
    const handleLocation = () => {
        window.open(
            `https://maps.app.goo.gl/PrKKbRmQRrr3ueLk8`,
            "_blank"
        );
    };

    return (
        <div className="relative py-16 sm:py-20 min-h-screen bg-[#070608] text-zinc-200 antialiased selection:bg-[#c4973f] selection:text-black flex flex-col justify-between overflow-x-hidden font-sans">
            <style>{invitationCss}</style>

            {/* Atmospheric Ambient Lighting Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
                <div className="w-[750px] h-[750px] bg-red-950/25 rounded-full blur-[160px] opacity-70"></div>
                <div className="w-[600px] h-[600px] bg-amber-900/15 rounded-full blur-[170px] translate-y-28"></div>
                <div className="w-[450px] h-[450px] bg-yellow-700/10 rounded-full blur-[140px] -translate-x-28"></div>
            </div>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-5 sm:p-8 lg:p-12 overflow-hidden sm:overflow-visible">
                {/* 3D Layered Cards Showcase */}
                <div className="perspective-stage card-stage-container w-full max-w-[275px] min-[400px]:max-w-[295px] min-[500px]:max-w-[330px] sm:max-w-[450px] 2xl:max-w-[600px] flex items-center justify-center">
                    <div className="relative w-full aspect-[1/1.48]">
                        {/* ========================================================= */}
                        {/* BLACK CARD LAYER (Behind, tilted) */}
                        {/* ========================================================= */}
                        <div
                            onClick={() => {
                                setActiveCard((prev) => (prev === "black" ? "red" : "black"));
                            }}
                            style={{
                                zIndex: activeCard === "black" ? 20 : 10,
                                opacity: activeCard === "black" ? 1 : 0.65,
                                filter:
                                    activeCard === "black"
                                        ? "brightness(1) blur(0px)"
                                        : "brightness(0.82) blur(0.3px)",
                                transition:
                                    "transform 0.9s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.85s ease-in-out, filter 0.85s ease-in-out, z-index 0s " +
                                    (activeCard === "black" ? "0.35s" : "0.45s"),
                            }}
                            className={`absolute inset-0 w-full h-full origin-bottom-left ${activeCard === "red"
                                ? "card-layer-black-tilted cursor-pointer hover:!opacity-85 hover:!brightness-95"
                                : "card-layer-black-active"
                                }`}
                        >
                            <BlackCard
                                cardOnly={true}
                                hideControls={true}
                                disableTilt={activeCard !== "black"}
                            />
                        </div>

                        {/* ========================================================= */}
                        {/* RED CARD LAYER (Front) */}
                        {/* ========================================================= */}
                        <div
                            onClick={() => {
                                setActiveCard((prev) => (prev === "red" ? "black" : "red"));
                            }}
                            style={{
                                zIndex: activeCard === "red" ? 20 : 10,
                                opacity: activeCard === "red" ? 1 : 0.65,
                                filter:
                                    activeCard === "red"
                                        ? "brightness(1) blur(0px)"
                                        : "brightness(0.82) blur(0.3px)",
                                transition:
                                    "transform 0.9s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.85s ease-in-out, filter 0.85s ease-in-out, z-index 0s " +
                                    (activeCard === "red" ? "0.35s" : "0.45s"),
                            }}
                            className={`absolute inset-0 w-full h-full origin-bottom-right ${activeCard === "black"
                                ? "card-layer-red-tilted cursor-pointer hover:!opacity-85 hover:!brightness-95"
                                : "card-layer-red-active"
                                }`}
                        >
                            <RedCard
                                cardOnly={true}
                                hideControls={true}
                                disableTilt={activeCard !== "red"}
                            />
                        </div>
                    </div>
                </div>

                {/* Unified Quick Actions */}
                <section
                    aria-label="Invitation Actions"
                    className="mt-16 2xl:mt-24 flex flex-wrap items-center justify-center gap-3 2xl:gap-5 max-w-md 2xl:max-w-xl w-full px-2"
                >
                    <button
                        type="button"
                        title="View Map Location"
                        onClick={handleLocation}
                        className="px-4 py-2.5 2xl:px-8 2xl:py-4 rounded-full border border-gold-400/30 bg-black/50 backdrop-blur-md text-gold-200 font-serif text-xs 2xl:text-base tracking-wider uppercase hover:bg-gold-500/15 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 2xl:gap-3.5 shadow-lg"
                    >
                        <svg
                            className="w-4 h-4 text-gold-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>Directions</span>
                    </button>

                </section>
            </main>





        </div>
    );
}
