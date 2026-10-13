/**
 * WeddingInvitation.jsx  — single component (React + Tailwind CSS)
 *
 * SETUP: add this to your tailwind.config.js  (theme.extend):
 *
 *   colors: {
 *     burgundy: { 950:'#1b0507', 900:'#2b070b', 800:'#430d12', 700:'#5c1018', 600:'#751722' },
 *     champagne: '#fbf4e6',
 *     gold: { 100:'#fcf3d6', 200:'#f8e6b0', 300:'#eecd82', 400:'#e1b75b', 500:'#cf9e38', 600:'#b07f23' },
 *   },
 *   fontFamily: {
 *     script: ['"Great Vibes"', 'cursive'],
 *     serif: ['"Cinzel"', 'serif'],
 *     sans: ['"Montserrat"', 'sans-serif'],
 *   },
 *
 * (If you use Tailwind CDN, put the same object inside `tailwind.config = { theme: { extend: {...} } }`)
 */
import React, { useEffect, useRef, useState, useCallback } from "react";

/* ---------- Custom CSS (kept as-is from original) ---------- */
const customCss = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Great+Vibes&family=Montserrat:wght@200;300;400;500&display=swap');

/* Deep Rich Radial Maroon Vignette */
.bg-card-vignette {
  background: radial-gradient(circle at 48% 46%, #791823 0%, #4e0d14 42%, #2d060a 82%, #190306 100%);
}

/* Shimmer Foil Light Reflection Effect */
.foil-shimmer {
  position: absolute;
  inset: -100%;
  background: linear-gradient(
    115deg,
    transparent 25%,
    rgba(255, 235, 170, 0.03) 40%,
    rgba(255, 248, 220, 0.28) 47%,
    rgba(255, 223, 130, 0.45) 50%,
    rgba(255, 248, 220, 0.28) 53%,
    rgba(255, 235, 170, 0.03) 60%,
    transparent 75%
  );
  transform: translateX(-100%) rotate(25deg);
  pointer-events: none;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.wedding-card-container:hover .foil-shimmer {
  transform: translateX(100%) rotate(25deg);
  transition-duration: 2.2s;
}

/* Metallic Gold Text Sheen */
.gold-foil-text {
  background: linear-gradient(135deg, #f9ebb2 0%, #e8c374 25%, #cf9f45 50%, #fef5cc 75%, #cca044 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 12px rgba(225, 183, 91, 0.2);
}
.gold-foil-line {
  background: linear-gradient(90deg, rgba(207,158,56,0) 0%, rgba(240,210,140,0.85) 50%, rgba(207,158,56,0) 100%);
}

/* Subdued 3D Perspective Setup */
.perspective-container { perspective: 1400px; }
.preserve-3d { transform-style: preserve-3d; will-change: transform; }

/* Gold Metallic Filter & Drop Glow for Floral SVGs */
.metallic-gold-stroke {
  stroke: #deb352;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.4)) drop-shadow(0 0 2px rgba(238,205,130,0.45));
}
.metallic-gold-fill {
  fill: #deb352;
  filter: drop-shadow(0 0 2px rgba(238,205,130,0.4));
}
.white-petal-glow {
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5)) drop-shadow(0 0 15px rgba(255,245,230,0.25));
}

#particleCanvas,
#particleCanvasRed,
#particleCanvasBlack {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 20;
}

/* Smooth water-wave equalizer bar animation */
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
`;

export default function RedCard({
  hideControls = false,
  cardOnly = false,
  className = "",
  style = {},
  onClick,
  disableTilt = false,
  onOpenRsvp,
}) {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ show: false, text: "" });
  const [musicOn, setMusicOn] = useState(true);

  // audio refs
  const audioCtxRef = useRef(null);
  const playingRef = useRef(true);
  const chordTimerRef = useRef(null);
  const toastTimerRef = useRef(null);

  /* ---------------- Toast ---------------- */
  const showToast = useCallback((text) => {
    setToast({ show: true, text });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(
      () => setToast((t) => ({ ...t, show: false })),
      3200
    );
  }, []);

  /* ---------------- 3D Tilt ---------------- */
  useEffect(() => {
    if (disableTilt) return;
    const card = cardRef.current;
    if (!card) return;
    const maxRotation = 12;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((e.clientY - rect.top - cy) / cy) * -maxRotation;
      const rotateY = ((e.clientX - rect.left - cx) / cx) * maxRotation;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const onLeave = () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    };
    const onOrient = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltX = Math.min(Math.max(e.beta - 45, -15), 15);
        const tiltY = Math.min(Math.max(e.gamma, -15), 15);
        card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(
          2
        )}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      }
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    const useGyro = window.DeviceOrientationEvent && "ontouchstart" in window;
    if (useGyro) window.addEventListener("deviceorientation", onOrient);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      if (useGyro) window.removeEventListener("deviceorientation", onOrient);
    };
  }, [disableTilt]);

  /* ---------------- Gold Dust Particles ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let raf;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.8 + 0.6;
        this.speedY = -(Math.random() * 0.4 + 0.15);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.6 + 0.2;
        this.fadeSpeed = Math.random() * 0.01 + 0.005;
        this.fadingIn = Math.random() > 0.5;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.fadingIn) {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= 0.85) this.fadingIn = false;
        } else {
          this.alpha -= this.fadeSpeed;
          if (this.alpha <= 0.1) this.fadingIn = true;
        }
        if (this.y < -5 || this.x < -5 || this.x > width + 5) {
          this.reset();
          this.y = height + 5;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 226, 150, ${this.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(238, 205, 130, 0.7)";
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 28 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
    };
  }, []);

  /* ---------------- Ambient Music (Warm Romantic Piano / Pad) ---------------- */
  const playRomanticChords = useCallback(() => {
    const audioCtx = audioCtxRef.current;
    if (!playingRef.current || !audioCtx) return;

    const chordProgressions = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00], // Gadd9
      [293.66, 369.99, 440.00, 587.33], // Dsus2
    ];
    const chord = chordProgressions[Math.floor(Math.random() * chordProgressions.length)];

    chord.forEach((freq, idx) => {
      setTimeout(() => {
        if (!playingRef.current || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const noteStart = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteStart);

        const oscHarmonic = ctx.createOscillator();
        const gainHarmonic = ctx.createGain();
        oscHarmonic.type = "triangle";
        oscHarmonic.frequency.setValueAtTime(freq * 2, noteStart);

        const masterNoteGain = ctx.createGain();

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 4.2);

        gainHarmonic.gain.setValueAtTime(0.0001, noteStart);
        gainHarmonic.gain.linearRampToValueAtTime(0.035, noteStart + 0.2);
        gainHarmonic.gain.exponentialRampToValueAtTime(0.0001, noteStart + 2.5);

        masterNoteGain.gain.setValueAtTime(1.0, noteStart);

        osc.connect(gain);
        gain.connect(masterNoteGain);
        oscHarmonic.connect(gainHarmonic);
        gainHarmonic.connect(masterNoteGain);
        masterNoteGain.connect(ctx.destination);

        osc.start(noteStart);
        oscHarmonic.start(noteStart);
        osc.stop(noteStart + 4.5);
        oscHarmonic.stop(noteStart + 4.5);
      }, idx * 240);
    });

    clearTimeout(chordTimerRef.current);
    chordTimerRef.current = setTimeout(playRomanticChords, 4600);
  }, []);

  const initAndResumeContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, []);

  const startMusic = useCallback(() => {
    initAndResumeContext();
    playingRef.current = true;
    setMusicOn(true);
    clearTimeout(chordTimerRef.current);
    setTimeout(() => { playRomanticChords(); }, 50);
  }, [initAndResumeContext, playRomanticChords]);

  const toggleMusic = () => {
    initAndResumeContext();
    if (!playingRef.current) {
      startMusic();
      showToast("Playing gentle ambient notes...");
    } else {
      playingRef.current = false;
      setMusicOn(false);
      clearTimeout(chordTimerRef.current);
      showToast("Ambience paused");
    }
  };

  /* Auto-start ambient audio & unlock on initial user screen touch/click */
  useEffect(() => {
    if (hideControls) return;
    startMusic();

    const handleUnlock = () => {
      if (playingRef.current) {
        if (!audioCtxRef.current || audioCtxRef.current.state === "suspended") {
          initAndResumeContext();
          playRomanticChords();
        }
      }
    };

    window.addEventListener("click", handleUnlock, { passive: true });
    window.addEventListener("touchstart", handleUnlock, { passive: true });
    window.addEventListener("keydown", handleUnlock, { passive: true });

    return () => {
      window.removeEventListener("click", handleUnlock);
      window.removeEventListener("touchstart", handleUnlock);
      window.removeEventListener("keydown", handleUnlock);
      clearTimeout(chordTimerRef.current);
      clearTimeout(toastTimerRef.current);
    };
  }, [hideControls, startMusic, initAndResumeContext, playRomanticChords]);

  /* ---------------- Modal / RSVP ---------------- */
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
      setTimeout(() => setSubmitted(false), 500);
    }, 2400);
  };

  /* ---------------- Calendar / Map ---------------- */
  const handleCalendar = () => {
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "SUMMARY:Sarib & Amna's Wedding",
      "DESCRIPTION:Celebrate with Sarib & Amna",
      "LOCATION:Baithak Khaas Near Faizan-e-Madina",
      "DTSTART:20260925T190000",
      "DTEND:20260926T000000",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", "Sophia-Preston-Wedding.ics");
    a.click();
    URL.revokeObjectURL(url);
    showToast("Wedding event exported to your calendar!");
  };

  const handleLocation = () => {
    const address = encodeURIComponent("747 Front St, San Francisco, CA 94111");
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${address}`,
      "_blank"
    );
  };

  const renderCard = () => (
    <article
      ref={cardRef}
      onClick={onClick}
      style={style}
      className={`wedding-card-container preserve-3d relative w-full aspect-[1/1.48] rounded-[6px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(117,23,34,0.35)] overflow-hidden transition-transform duration-200 ease-out cursor-pointer select-none border border-gold-400/30 ${className}`}
    >
      <canvas id="particleCanvasRed" ref={canvasRef}></canvas>
      <div className="foil-shimmer z-30"></div>

      {/* Inner Bevel */}
      <div className="absolute inset-[6px] border border-gold-300/35 rounded-[3px] pointer-events-none z-20"></div>
      <div className="absolute inset-[10px] border border-gold-400/15 rounded-[2px] pointer-events-none z-20"></div>

      {/* Vignette BG */}
      <div className="absolute inset-0 bg-card-vignette z-0"></div>

      {/* ============ Botanical Art ============ */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* TOP-LEFT */}
        <div className="absolute -top-3 -left-3 w-56 h-56 sm:w-64 sm:h-64 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full white-petal-glow" fill="none" viewBox="0 0 250 250">
            <path d="M10 10 C35 30, 60 70, 52 110 C45 145, 15 155, 5 125 C-5 90, -5 35, 10 10 Z" fill="url(#petalGrad1)" opacity="0.94" />
            <path d="M35 15 C70 20, 115 50, 110 88 C105 120, 75 130, 48 110 C25 90, 15 45, 35 15 Z" fill="url(#petalGrad2)" opacity="0.92" />
            <path d="M12 55 C45 60, 95 95, 90 135 C85 160, 55 170, 30 148 C12 130, 0 85, 12 55 Z" fill="url(#petalGrad1)" opacity="0.88" />
            <path d="M70 22 C105 10, 142 30, 145 65 C147 95, 118 110, 95 90 C78 75, 60 40, 70 22 Z" fill="url(#petalGrad3)" opacity="0.85" />
            <ellipse cx="62" cy="74" fill="#1e0508" opacity="0.75" rx="14" ry="16" />
            <circle cx="61" cy="73" fill="#2d0a0f" r="10" />
            <circle cx="63" cy="71" fill="#dfad40" opacity="0.9" r="5" />
            <defs>
              <linearGradient id="petalGrad1" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#f5e8d8" />
                <stop offset="100%" stopColor="#c99f82" />
              </linearGradient>
              <linearGradient id="petalGrad2" x1="10%" x2="90%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#fceddd" />
                <stop offset="100%" stopColor="#b88365" />
              </linearGradient>
              <linearGradient id="petalGrad3" x1="0%" x2="100%" y1="20%" y2="80%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#faeee2" />
                <stop offset="100%" stopColor="#d0a789" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="absolute inset-0 w-full h-full metallic-gold-stroke" fill="none" strokeWidth="1.2" viewBox="0 0 250 250">
            <path d="M4 120 C45 135, 90 140, 130 115 C170 90, 180 50, 210 32" strokeLinecap="round" />
            <path d="M125 118 C140 145, 175 160, 205 155" />
            <path d="M80 30 C120 25, 170 30, 215 15" />
            <path d="M145 105 C155 95, 175 92, 178 108 C165 114, 150 114, 145 105 Z" fill="#cf9e38" fillOpacity="0.25" />
            <path d="M175 75 C190 65, 205 68, 204 82 C190 86, 178 82, 175 75 Z" fill="#cf9e38" fillOpacity="0.3" />
            <path d="M105 130 C120 135, 132 150, 125 160 C112 158, 102 145, 105 130 Z" fill="#cf9e38" fillOpacity="0.2" />
            <path d="M188 38 C202 26, 222 30, 224 44 C210 48, 195 45, 188 38 Z" fill="#eecd82" fillOpacity="0.35" />
            <path d="M50 78 C42 62, 52 50, 64 58 C62 70, 56 78, 50 78 Z" fill="#deb352" fillOpacity="0.6" />
            <path d="M62 72 Q72 58 82 56" stroke="#fcf3d6" strokeLinecap="round" strokeWidth="1.5" />
            <circle cx="83" cy="56" fill="#ffe28a" r="2.2" />
            <path d="M60 74 Q68 62 78 68" stroke="#fcf3d6" strokeLinecap="round" strokeWidth="1.5" />
            <circle cx="79" cy="68" fill="#ffe28a" r="2.2" />
            <path d="M64 76 Q78 80 88 78" stroke="#fcf3d6" strokeLinecap="round" strokeWidth="1.5" />
            <circle cx="89" cy="78" fill="#ffe28a" r="2.2" />
          </svg>
        </div>

        {/* TOP-RIGHT */}
        <div className="absolute -top-2 -right-2 w-48 h-48 sm:w-56 sm:h-56 pointer-events-none">
          <svg className="w-full h-full metallic-gold-stroke" fill="none" strokeWidth="1.2" viewBox="0 0 200 200">
            <path d="M200 15 C160 20, 140 45, 135 85 C130 120, 150 150, 168 180" strokeLinecap="round" />
            <path d="M142 60 C118 68, 105 85, 100 110" />
            <path d="M152 35 C135 30, 128 15, 142 8 C155 12, 156 26, 152 35 Z" fill="#eecd82" fillOpacity="0.3" />
            <path d="M125 70 C108 65, 100 52, 114 42 C126 48, 128 62, 125 70 Z" fill="#deb352" fillOpacity="0.25" />
            <path d="M102 105 C85 102, 78 88, 92 80 C104 86, 105 98, 102 105 Z" fill="#cf9e38" fillOpacity="0.3" />
            <path d="M145 105 C130 115, 125 130, 138 138 C148 132, 150 118, 145 105 Z" fill="#deb352" fillOpacity="0.3" />
            <path d="M170 140 C155 152, 152 168, 166 172 C176 164, 176 150, 170 140 Z" fill="#eecd82" fillOpacity="0.25" />
            <circle cx="118" cy="35" fill="#f8e6b0" opacity="0.8" r="2.5" />
            <circle cx="92" cy="72" fill="#f8e6b0" opacity="0.8" r="2.2" />
            <circle cx="75" cy="112" fill="#f8e6b0" opacity="0.8" r="2" />
          </svg>
        </div>

        {/* BOTTOM-LEFT */}
        <div className="absolute -bottom-2 -left-2 w-48 h-56 pointer-events-none">
          <svg className="w-full h-full metallic-gold-stroke" fill="none" strokeWidth="1.2" viewBox="0 0 180 220">
            <path d="M10 220 C25 170, 45 140, 30 95 C20 65, 5 45, 12 10" strokeLinecap="round" />
            <path d="M32 145 C55 155, 75 170, 78 198" />
            <path d="M26 100 C48 95, 68 85, 75 60" />
            <ellipse cx="45" cy="50" fill="#deb352" fillOpacity="0.15" rx="16" ry="11" stroke="#deb352" strokeWidth="1.3" transform="rotate(-15 45 50)" />
            <path d="M33 52 C35 40, 52 40, 56 50 C52 58, 38 60, 33 52 Z" stroke="#eecd82" strokeWidth="1" />
            <circle cx="45" cy="50" fill="#fcf3d6" r="3" />
            <path d="M48 152 C65 148, 76 156, 74 168 C60 170, 50 162, 48 152 Z" fill="#deb352" fillOpacity="0.3" />
            <path d="M30 185 C42 195, 45 208, 36 215 C26 210, 24 196, 30 185 Z" fill="#cf9e38" fillOpacity="0.35" />
            <path d="M18 125 C30 120, 35 110, 30 102 C20 106, 15 116, 18 125 Z" fill="#deb352" fillOpacity="0.25" />
          </svg>
        </div>

        {/* BOTTOM-RIGHT */}
        <div className="absolute -bottom-4 -right-4 w-60 h-60 sm:w-72 sm:h-72 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full white-petal-glow" fill="none" viewBox="0 0 260 260">
            <path d="M250 250 C230 200, 195 160, 160 170 C125 180, 120 220, 140 250 Z" fill="url(#botPetalGrad1)" opacity="0.95" />
            <path d="M170 175 C150 135, 110 120, 80 145 C60 165, 80 200, 125 210 C155 215, 168 195, 170 175 Z" fill="url(#botPetalGrad2)" opacity="0.92" />
            <path d="M210 165 C220 125, 185 95, 150 110 C125 120, 135 155, 165 168 Z" fill="url(#botPetalGrad1)" opacity="0.88" />
            <path d="M255 190 C260 145, 230 115, 205 130 C190 140, 195 170, 220 185 Z" fill="url(#botPetalGrad3)" opacity="0.85" />
            <ellipse cx="190" cy="195" fill="#200407" opacity="0.8" rx="16" ry="14" />
            <circle cx="188" cy="193" fill="#3a0910" r="8" />
            <defs>
              <linearGradient id="botPetalGrad1" x1="100%" x2="0%" y1="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#fdf1e2" />
                <stop offset="100%" stopColor="#b6896e" />
              </linearGradient>
              <linearGradient id="botPetalGrad2" x1="100%" x2="0%" y1="80%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#faeee0" />
                <stop offset="100%" stopColor="#c5997a" />
              </linearGradient>
              <linearGradient id="botPetalGrad3" x1="80%" x2="0%" y1="100%" y2="20%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#f8ebda" />
                <stop offset="100%" stopColor="#b88365" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="absolute inset-0 w-full h-full metallic-gold-stroke" fill="none" strokeWidth="1.2" viewBox="0 0 260 260">
            <path d="M250 110 C210 115, 175 130, 145 160 C110 195, 80 235, 30 248" strokeLinecap="round" />
            <path d="M150 155 C120 135, 90 130, 60 145" />
            <path d="M120 190 C95 180, 70 185, 45 205" />
            <path d="M130 138 C115 125, 95 128, 92 142 C105 148, 120 148, 130 138 Z" fill="#cf9e38" fillOpacity="0.35" />
            <path d="M72 142 C58 135, 45 142, 45 155 C58 158, 68 150, 72 142 Z" fill="#deb352" fillOpacity="0.3" />
            <path d="M90 182 C75 175, 62 180, 64 195 C76 195, 86 188, 90 182 Z" fill="#deb352" fillOpacity="0.25" />
            <path d="M188 192 Q174 180, 162 178" stroke="#fcf3d6" strokeLinecap="round" strokeWidth="1.5" />
            <circle cx="160" cy="178" fill="#ffe28a" r="2.2" />
            <path d="M190 190 Q180 172, 172 165" stroke="#fcf3d6" strokeLinecap="round" strokeWidth="1.5" />
            <circle cx="171" cy="164" fill="#ffe28a" r="2.2" />
            <path d="M192 194 Q186 182, 178 184" stroke="#fcf3d6" strokeLinecap="round" strokeWidth="1.5" />
            <circle cx="177" cy="184" fill="#ffe28a" r="2" />
          </svg>
        </div>

        {/* Side Sprigs */}
        <div className="absolute left-1 top-1/2 -translate-y-12 w-12 h-36 pointer-events-none opacity-85">
          <svg className="w-full h-full metallic-gold-stroke" fill="none" strokeWidth="1.1" viewBox="0 0 50 150">
            <path d="M0 75 Q25 65 30 40 Q35 15 20 0" />
            <path d="M22 55 Q35 55 40 45 Q35 38 25 45 Z" fill="#deb352" fillOpacity="0.3" />
            <path d="M0 80 Q20 95 25 120" />
            <path d="M18 105 Q30 110 32 122 Q22 125 15 115 Z" fill="#deb352" fillOpacity="0.3" />
          </svg>
        </div>
        <div className="absolute right-1 top-1/2 -translate-y-20 w-12 h-44 pointer-events-none opacity-85">
          <svg className="w-full h-full metallic-gold-stroke" fill="none" strokeWidth="1.1" viewBox="0 0 50 160">
            <path d="M50 80 Q25 70 20 45 Q15 20 30 0" />
            <path d="M28 55 Q12 55 10 42 Q20 38 30 48 Z" fill="#deb352" fillOpacity="0.3" />
            <path d="M50 85 Q28 105 22 135" />
            <path d="M30 115 Q15 125 18 138 Q28 135 34 122 Z" fill="#deb352" fillOpacity="0.3" />
          </svg>
        </div>
      </div>

      {/* ============ Typography ============ */}
      <div className="relative z-20 h-full w-full flex flex-col justify-between items-center px-8 py-9 sm:py-11 sm:px-10 2xl:px-14 2xl:py-16 text-center select-none">
        <div className="w-48 sm:w-56 2xl:w-72 h-[1.5px] 2xl:h-[2px] gold-foil-line mt-1 opacity-90"></div>

        <header className="flex flex-col items-center mt-3 2xl:mt-4">
          <p className="font-sans text-[10.5px] sm:text-[11.5px] 2xl:text-sm font-medium tracking-[0.34em] uppercase text-gold-200/90 drop-shadow-sm">
            Together With
          </p>
          <p className="font-sans text-[10.5px] sm:text-[11.5px] 2xl:text-sm font-medium tracking-[0.34em] uppercase text-gold-200/90 mt-1 2xl:mt-1.5 drop-shadow-sm">
            Their Families
          </p>
        </header>

        <div className="my-auto py-2 flex flex-col items-center justify-center transform -translate-y-1">
          <h1 className="font-script text-5xl sm:text-[78px] 2xl:text-[98px] gold-foil-text tracking-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] pt-3 2xl:pt-4">
            Amna
          </h1>
          <div className="my-0.5 flex items-center justify-center">
            <span className="font-script text-2xl sm:text-3xl 2xl:text-4xl text-gold-200/90 drop-shadow font-normal italic">&amp;</span>
          </div>
          <h1 className="font-script text-5xl sm:text-[78px] 2xl:text-[98px] gold-foil-text tracking-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] pt-2.5 2xl:pt-3">
            Sarib
          </h1>
        </div>

        <div className="w-full flex flex-col items-center mb-20 2xl:mb-24">

          <p className="font-serif text-[11px] sm:text-xs 2xl:text-sm tracking-[0.38em] uppercase text-gold-300 font-medium mb-2.5 2xl:mb-4">
            October
          </p>

          <div className="w-full max-w-[270px] 2xl:max-w-[340px] flex items-center justify-between gap-1.5 sm:gap-2 2xl:gap-3">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/70 to-gold-400/90"></div>
              <span className="py-1 text-[9.5px] sm:text-[10px] 2xl:text-xs font-sans font-medium tracking-[0.24em] text-gold-200 uppercase whitespace-nowrap">
                Friday
              </span>
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/70 to-gold-400/90"></div>
            </div>

            <div className="px-2 sm:px-3 2xl:px-4 -my-2">
              <span className="font-serif text-2xl sm:text-3xl 2xl:text-4xl text-gold-200 font-normal tracking-tight drop-shadow-sm">
                23
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="w-full h-[1px] bg-gradient-to-l from-transparent via-gold-400/70 to-gold-400/90"></div>
              <span className="py-1 text-[9.5px] sm:text-[10px] 2xl:text-xs font-sans font-medium tracking-[0.24em] text-gold-200 uppercase whitespace-nowrap">
                At 7 PM
              </span>
              <div className="w-full h-[1px] bg-gradient-to-l from-transparent via-gold-400/70 to-gold-400/90"></div>
            </div>
          </div>

          <p className="font-serif text-[11.5px] sm:text-[12.5px] 2xl:text-sm tracking-[0.32em] text-gold-300 mt-2.5 2xl:mt-3.5 font-medium">
            2026
          </p>

          <div className="mt-4 2xl:mt-6 flex flex-col items-center text-[8.5px] sm:text-[9.5px] 2xl:text-xs leading-relaxed font-sans font-normal tracking-[0.22em] text-gold-300 sm:text-gold-200/90 uppercase">
            <span>Baithak Khaas</span>
            <span className="mt-0.5">Near Faizan-e-Madina</span>
          </div>

        </div>

        <div className="w-44 sm:w-52 2xl:w-64 h-[1.5px] 2xl:h-[2px] gold-foil-line mb-1 opacity-90"></div>
      </div>
    </article>
  );

  if (cardOnly) {
    return (
      <>
        <style>{customCss}</style>
        {renderCard()}
      </>
    );
  }

  return (
    <div className="h-full bg-[#0d0d11] text-zinc-200 antialiased selection:bg-gold-500 selection:text-burgundy-950 flex flex-col justify-between overflow-x-hidden min-h-screen font-sans">
      <style>{customCss}</style>

      {/* Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-red-950/20 rounded-full blur-[140px] opacity-70"></div>
        <div className="w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[160px] translate-y-24"></div>
      </div>

      {/* Main Showcase */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="perspective-container w-full max-w-[430px] sm:max-w-[450px] 2xl:max-w-[600px]">
          {renderCard()}
        </div>

        {/* Quick Actions */}
        <section aria-label="Invitation Actions" className="mt-8 2xl:mt-12 flex flex-wrap items-center justify-center gap-3 max-w-md 2xl:max-w-xl w-full px-2">
          <button
            type="button"
            title="View Map Location"
            onClick={handleLocation}
            className="px-4 py-2.5 2xl:px-7 2xl:py-3.5 rounded-full border border-gold-400/30 bg-black/40 text-gold-200 font-serif text-xs 2xl:text-base tracking-wider uppercase hover:bg-gold-500/10 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5 2xl:gap-2.5"
          >
            <svg className="w-4 h-4 2xl:w-6 2xl:h-6 text-gold-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Directions</span>
          </button>
        </section>

      </main>

      
    </div>
  );
}
