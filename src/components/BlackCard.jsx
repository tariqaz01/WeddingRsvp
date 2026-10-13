
import React, { useEffect, useRef, useState, useCallback } from "react";

/* ---------- Custom CSS ---------- */
const customCss = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Kaushan+Script&family=Sacramento&display=swap');

/* Card base: deep black */
.bg-card-black { background: #0d0d0d; }

/* Foil light sweep */
.foil-shimmer {
  position: absolute;
  inset: -100%;
  background: linear-gradient(
    115deg,
    transparent 25%,
    rgba(255, 235, 170, 0.02) 40%,
    rgba(255, 248, 220, 0.16) 47%,
    rgba(255, 223, 130, 0.28) 50%,
    rgba(255, 248, 220, 0.16) 53%,
    rgba(255, 235, 170, 0.02) 60%,
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

/* Gold brush-script names */
.gold-foil-text {
  background: linear-gradient(135deg, #dcb25f 0%, #c4973f 35%, #b98b35 60%, #d9ae58 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Gold line-art glow */
.gold-line-art {
  filter: drop-shadow(0 0 2px rgba(224, 182, 96, 0.35));
}

/* String-light bulbs */
.bulb-glow {
  filter: drop-shadow(0 0 7px rgba(255, 248, 210, 0.95)) drop-shadow(0 0 16px rgba(255, 235, 170, 0.5));
  animation: bulbTwinkle 3.4s ease-in-out infinite;
}
@keyframes bulbTwinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
@media (prefers-reduced-motion: reduce) {
  .bulb-glow { animation: none; }
}

.perspective-container { perspective: 1400px; }
.preserve-3d { transform-style: preserve-3d; will-change: transform; }

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
  background: linear-gradient(to top, #c4973f, #f5dfa5);
  transform-origin: bottom;
  transition: height 0.3s ease;
}
`;

/* ---------- SVG art helpers ---------- */
const GOLDS = ["#f2d896", "#e0b660", "#c99a46", "#b07f2a"];
const BG = "#0d0d0d";

// One peony: layered heart-shaped petals + veins (unit-size petal scaled by r)
const PETAL =
  "M0 0 C-0.62 -0.25, -0.72 -0.95, -0.12 -1 Q0 -0.86 0.12 -1 C0.72 -0.95, 0.62 -0.25, 0 0Z";
const VEINS = [
  "M0 -0.03 Q-0.2 -0.5 -0.3 -0.82",
  "M0 -0.03 Q0 -0.5 0 -0.88",
  "M0 -0.03 Q0.2 -0.5 0.3 -0.82",
];

function Peony({ cx, cy, r, rot = 0 }) {
  const layers = [
    { n: 8, s: 1, off: 0 },
    { n: 7, s: 0.74, off: 20 },
    { n: 6, s: 0.52, off: 12 },
    { n: 5, s: 0.32, off: 36 },
  ];
  
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      {layers.map((L, li) =>
        Array.from({ length: L.n }).map((_, i) => {
          const a = L.off + (360 / L.n) * i;
          const stroke = GOLDS[(i + li) % GOLDS.length];
          return (
            <g key={`${li}-${i}`} transform={`rotate(${a}) scale(${r * L.s})`}>
              <path d={PETAL} fill={BG} stroke={stroke} strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
              {VEINS.map((v, vi) => (
                <path key={vi} d={v} fill="none" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.8" vectorEffect="non-scaling-stroke" />
              ))}
            </g>
          );
        })
      )}
      <circle r={r * 0.07} fill={BG} stroke="#f2d896" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
    </g>
  );
}

// One leaf: outline + midrib + side veins
function Leaf({ x, y, len, rot, wide = 0.5 }) {
  const veins = [1, 2, 3, 4, 5, 6].map((i) => {
    const yy = -i * 0.14;
    const dx = 0.3 - 0.03 * i;
    return (
      <g key={i}>
        <path d={`M0 ${yy} Q0.18 ${yy - 0.06} ${dx} ${yy - 0.16}`} />
        <path d={`M0 ${yy} Q-0.18 ${yy - 0.06} ${-dx} ${yy - 0.16}`} />
      </g>
    );
  });
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${len * wide} ${len})`}>
      <path
        d="M0 0 C0.45 -0.2, 0.5 -0.65, 0 -1 C-0.5 -0.65, -0.45 -0.2, 0 0Z"
        fill={BG}
        stroke="#e0b660"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
      <g fill="none" stroke="#c99a46" strokeWidth="0.9" vectorEffect="non-scaling-stroke">
        <path d="M0 0 L0 -1" vectorEffect="non-scaling-stroke" />
        {React.Children.map(veins, (c) =>
          React.cloneElement(c, {
            children: React.Children.map(c.props.children, (p) =>
              React.cloneElement(p, { vectorEffect: "non-scaling-stroke" })
            ),
          })
        )}
      </g>
    </g>
  );
}

const LEAVES = [
  { x: 240, y: 130, len: 280, rot: -35 },
  { x: 480, y: 80, len: 200, rot: 20 },
  { x: 780, y: 170, len: 300, rot: 40 },
  { x: 790, y: 230, len: 340, rot: 80 },
  { x: 760, y: 330, len: 260, rot: 125 },
  { x: 640, y: 420, len: 240, rot: 190 },
  { x: 100, y: 640, len: 260, rot: 200 },
];
const PEONIES = [
  { cx: 260, cy: 340, r: 300, rot: 8 },
  { cx: 600, cy: 250, r: 250, rot: -12 },
  { cx: 320, cy: 650, r: 110, rot: 20 },
];

// String lights: cubic Bezier strands + bulbs placed along them
const bez = (p, t) => {
  const u = 1 - t;
  return {
    x: u * u * u * p[0] + 3 * u * u * t * p[2] + 3 * u * t * t * p[4] + t * t * t * p[6],
    y: u * u * u * p[1] + 3 * u * u * t * p[3] + 3 * u * t * t * p[5] + t * t * t * p[7],
  };
};
const STRANDS = [
  { p: [0, 30, 250, 190, 650, 200, 930, 45], beads: true, bulbs: [0.08, 0.26, 0.47, 0.66, 0.9], sizes: [13, 17, 15, 14, 17] },
  { p: [0, 120, 300, 240, 800, 230, 1240, 60], bulbs: [0.06, 0.2, 0.4, 0.6, 0.78, 0.95], sizes: [13, 11, 14, 12, 15, 14] },
  { p: [0, 170, 350, 330, 800, 330, 1240, 295], bulbs: [0.12, 0.3, 0.5, 0.68, 0.85, 0.97], sizes: [14, 13, 15, 12, 11, 12] },
  { p: [0, 200, 400, 360, 900, 430, 1240, 412], bulbs: [0.1, 0.32, 0.5, 0.7, 0.88], sizes: [12, 15, 14, 15, 15] },
];

export default function BlackCard({
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

  const audioCtxRef = useRef(null);
  const playingRef = useRef(true);
  const chordTimerRef = useRef(null);
  const toastTimerRef = useRef(null);

  /* ---------------- Toast ---------------- */
  const showToast = useCallback((text) => {
    setToast({ show: true, text });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 3200);
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
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const onLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    };
    const onOrient = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltX = Math.min(Math.max(e.beta - 45, -15), 15);
        const tiltY = Math.min(Math.max(e.gamma, -15), 15);
        card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
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
        this.white = Math.random() > 0.7;
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
        ctx.fillStyle = this.white
          ? `rgba(255, 250, 230, ${this.alpha})`
          : `rgba(222, 179, 82, ${this.alpha})`;
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
  const playChords = useCallback(() => {
    const audioCtx = audioCtxRef.current;
    if (!playingRef.current || !audioCtx) return;

    // Rich pentatonic & major 7th chord progressions for elegant wedding ambience
    const chordProgressions = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
      [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
      [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
      [196.00, 246.94, 293.66, 392.00], // Gadd9 (G3, B3, D4, G4)
      [293.66, 369.99, 440.00, 587.33], // Dsus2 (D4, F#4, A4, D5)
    ];

    const chord = chordProgressions[Math.floor(Math.random() * chordProgressions.length)];
    const now = audioCtx.currentTime;

    chord.forEach((freq, idx) => {
      setTimeout(() => {
        if (!playingRef.current || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const noteStart = ctx.currentTime;

        // Main gentle sine tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteStart);

        // Harmonic overtone for warmth
        const oscHarmonic = ctx.createOscillator();
        const gainHarmonic = ctx.createGain();
        oscHarmonic.type = "triangle";
        oscHarmonic.frequency.setValueAtTime(freq * 2, noteStart);

        // Master gain for this note
        const masterNoteGain = ctx.createGain();

        // Envelopes: soft gentle attack + sweet resonant bell decay
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
    chordTimerRef.current = setTimeout(playChords, 4600);
  }, []);

  const initAndResumeContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
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
    // Slight tick to ensure context is fully active
    setTimeout(() => {
      playChords();
    }, 50);
  }, [initAndResumeContext, playChords]);

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
    // Attempt automatic playback
    startMusic();

    // Browsers block unmuted AudioContext until the first user interaction
    const handleUnlock = () => {
      if (playingRef.current) {
        if (!audioCtxRef.current || audioCtxRef.current.state === "suspended") {
          initAndResumeContext();
          playChords();
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
  }, [hideControls, startMusic, initAndResumeContext, playChords]);

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
      "SUMMARY:Sofia Phillips + Joseph Brown - Engagement Party",
      "DESCRIPTION:Please join us for an engagement party in honor of Sofia + Joseph. RSVP: Mary 123-456-7890",
      "LOCATION:123 Anywhere St., Any City, ST 12345",
      "DTSTART:20290822T190000",
      "DTEND:20290822T230000",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", "Sofia-Joseph-Engagement.ics");
    a.click();
    URL.revokeObjectURL(url);
    showToast("Event exported to your calendar!");
  };

  const handleLocation = () => {
    const address = encodeURIComponent("123 Anywhere St., Any City, ST 12345");
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, "_blank");
  };

  const renderCard = () => (
    <article
      ref={cardRef}
      onClick={onClick}
      style={style}
      className={`wedding-card-container preserve-3d [container-type:inline-size] relative w-full aspect-[1240/1748] rounded-[4px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(196,151,63,0.12)] overflow-hidden transition-transform duration-200 ease-out cursor-pointer select-none border border-[#c4973f]/25 ${className}`}
    >
      <canvas id="particleCanvasBlack" ref={canvasRef}></canvas>
      <div className="foil-shimmer z-30"></div>
      <div className="absolute inset-0 bg-card-black z-0"></div>

            {/* ===== Gold peonies + string lights ===== */}
            <svg
              aria-hidden="true"
              className="absolute top-0 left-0 w-full pointer-events-none z-10"
              viewBox="0 0 1240 900"
              preserveAspectRatio="xMinYMin meet"
              fill="none"
            >
              <g className="gold-line-art">
                {LEAVES.map((l, i) => (
                  <Leaf key={i} {...l} />
                ))}
                {PEONIES.map((p, i) => (
                  <Peony key={i} {...p} />
                ))}
              </g>

              {/* String lights */}
              <g>
                {STRANDS.map((s, si) => {
                  const d = `M${s.p[0]} ${s.p[1]} C${s.p[2]} ${s.p[3]}, ${s.p[4]} ${s.p[5]}, ${s.p[6]} ${s.p[7]}`;
                  return (
                    <g key={si}>
                      <path d={d} stroke="#e8c777" strokeWidth="2.2" strokeOpacity="0.9" strokeLinecap="round" />
                      {s.beads && (
                        <path d={d} stroke="#f2d896" strokeWidth="6" strokeLinecap="round" strokeDasharray="0.1 14" transform="translate(0 6)" />
                      )}
                      {/* tiny sparkle dots */}
                      {[0.15, 0.35, 0.55, 0.75, 0.92].map((t, ti) => {
                        const pt = bez(s.p, t);
                        return <circle key={ti} cx={pt.x} cy={pt.y} r="3.2" fill="#fff8e0" opacity="0.85" />;
                      })}
                      {/* bulbs */}
                      {s.bulbs.map((t, bi) => {
                        const pt = bez(s.p, t);
                        const r = s.sizes[bi];
                        return (
                          <g key={bi} transform={`translate(${pt.x} ${pt.y + r * 0.9})`}>
                            <rect x={-r * 0.38} y={-r * 1.55} width={r * 0.76} height={r * 0.7} rx="2" fill="#0d0d0d" />
                            <circle
                              className="bulb-glow"
                              r={r}
                              fill="#fffbe8"
                              style={{ animationDelay: `${(si * 5 + bi) * 0.37}s` }}
                            />
                          </g>
                        );
                      })}
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* ===== Typography (sizes scale with card width via cqw) ===== */}
            <div className="absolute inset-0 z-20 text-center">
              {/* Intro */}
              <p className="absolute left-0 right-0 top-[50.5cqw] font-['Playfair_Display',serif] italic text-[3.1cqw] leading-[4.5cqw] text-white">
                Please Join Us For An
                <br />
                Engagement Party In Honor Of
              </p>

              {/* Names */}
              <div className="absolute left-0 right-0 top-[66cqw] h-[28cqw]">
                <span className="absolute left-[28.5%] top-0 -translate-x-1/2 whitespace-nowrap font-['Kaushan_Script',cursive] text-[10.8cqw] leading-[1.2] gold-foil-text pr-[0.15em]">
                  Rimsha
                </span>
                <span className="absolute left-[50%] top-[1cqw] -translate-x-1/2 whitespace-nowrap font-['Kaushan_Script',cursive] text-[8cqw] leading-[1.2] gold-foil-text">
                  &
                </span>
                <span className="absolute left-[72.5%] top-0 -translate-x-1/2 whitespace-nowrap font-['Kaushan_Script',cursive] text-[10.8cqw] leading-[1.2] gold-foil-text pr-[0.45em]">
                  Shahid
                </span>
              </div>

              {/* Date between two rules */}
              <div className="absolute left-1/2 top-[96.8cqw] -translate-x-1/2 w-[32cqw] h-[8.2cqw] border-y-[0.25cqw] border-white flex items-center justify-center whitespace-nowrap">
                <span className="font-['Playfair_Display',serif] uppercase text-[3.9cqw] tracking-[0.03em] text-white leading-none">
                  October
                </span>
                <span className="inline-block w-[0.2cqw] h-[3.4cqw] bg-white mx-[1.5cqw]"></span>
                <span className="font-['Playfair_Display',serif] text-[3.9cqw] text-white leading-none">23</span>
                <span className="inline-block w-[0.2cqw] h-[3.4cqw] bg-white mx-[1.5cqw]"></span> 
                <span className="font-['Playfair_Display',serif] text-[3.9cqw] tracking-[0.03em] text-white leading-none">2026</span>
              </div>

              {/* Details */}
              <div className="absolute left-0 right-0 top-[108cqw] font-['Playfair_Display',serif] italic text-[2.9cqw] leading-[4.2cqw] text-white uppercase">
                <p className="mb-2">Friday</p>
                <p className="mb-2">7:00 pm</p>
                <p className="mt-[0.4cqw]">Baithak Khaas</p>
                <p className="mt-[0.4cqw]">Near Faizan-e-Madina</p>
              </div>
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
    <div className="h-full bg-[#070707] text-zinc-200 antialiased selection:bg-[#c4973f] selection:text-black flex flex-col justify-between overflow-x-hidden min-h-screen font-['Playfair_Display',serif]">
      <style>{customCss}</style>

      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-amber-900/10 rounded-full blur-[150px] opacity-70"></div>
        <div className="w-[500px] h-[500px] bg-yellow-700/10 rounded-full blur-[160px] translate-y-24"></div>
      </div>

      {/* Main */}
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
            className="px-4 py-2.5 2xl:px-7 2xl:py-3.5 rounded-full border border-[#c4973f]/30 bg-black/40 text-[#f2d896] text-xs 2xl:text-base tracking-wider uppercase hover:bg-[#c4973f]/10 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5 2xl:gap-2.5"
          >
            <svg className="w-4 h-4 2xl:w-6 2xl:h-6 text-[#dcb25f]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Directions</span>
          </button>
        </section>
      </main>

      {/* RSVP Modal */}
      <div
        onClick={(e) => e.target === e.currentTarget && closeModal()}
        className={`fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${modalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="relative w-full max-w-lg bg-[#0d0d0d] border border-[#c4973f]/40 rounded-lg p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
          <div className="absolute inset-[3px] border border-[#c4973f]/20 rounded pointer-events-none"></div>

          <button type="button" onClick={closeModal} className="absolute top-4 right-4 text-[#dcb25f]/70 hover:text-[#f2d896] p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="text-center mb-6">
            <h3 className="text-2xl text-[#dcb25f] font-normal tracking-wider">RSVP</h3>
            <p className="font-['Kaushan_Script',cursive] text-2xl gold-foil-text mt-1">Sofia + Joseph</p>
            <p className="text-xs uppercase tracking-widest text-zinc-400 mt-2">
              Please reply to Mary · 123 - 456 - 7890
            </p>
          </div>

          {!submitted ? (
            <form className="space-y-4" onSubmit={handleRsvpSubmit}>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#f2d896] mb-1.5">Guest Full Name(s)</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Lady Catherine de Bourgh"
                  className="w-full bg-black/70 border border-[#c4973f]/30 rounded px-3.5 py-2 text-sm text-[#fcf3d6] placeholder-zinc-500 focus:outline-none focus:border-[#dcb25f] focus:ring-1 focus:ring-[#dcb25f]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#f2d896] mb-1.5">Attendance</label>
                  <select className="w-full bg-black/70 border border-[#c4973f]/30 rounded px-3.5 py-2 text-sm text-[#fcf3d6] focus:outline-none focus:border-[#dcb25f] focus:ring-1 focus:ring-[#dcb25f]">
                    <option value="accept">Accepts with Pleasure</option>
                    <option value="decline">Declines with Regret</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#f2d896] mb-1.5">Total Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="4"
                    defaultValue={1}
                    className="w-full bg-black/70 border border-[#c4973f]/30 rounded px-3.5 py-2 text-sm text-[#fcf3d6] focus:outline-none focus:border-[#dcb25f] focus:ring-1 focus:ring-[#dcb25f]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#f2d896] mb-1.5">Dietary Preferences or Notes</label>
                <textarea
                  rows={2}
                  placeholder="Vegetarian, allergies, or lovely wishes..."
                  className="w-full bg-black/70 border border-[#c4973f]/30 rounded px-3.5 py-2 text-sm text-[#fcf3d6] placeholder-zinc-500 focus:outline-none focus:border-[#dcb25f] focus:ring-1 focus:ring-[#dcb25f]"
                ></textarea>
              </div>
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-[#c4973f] to-[#dcb25f] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded shadow hover:brightness-110 active:scale-[0.99] transition"
                >
                  Confirm RSVP
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6">
              <svg className="w-12 h-12 text-[#dcb25f] mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h4 className="text-xl text-[#dcb25f]">Thank You!</h4>
              <p className="text-xs text-zinc-300 mt-2 tracking-wide">
                Your response has been received. We look forward to celebrating together!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Action Buttons */}
      {/* RSVP Button - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={openModal}
          className="text-xs tracking-wider uppercase px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c4973f] via-[#dcb25f] to-[#c4973f] text-black font-semibold shadow-[0_4px_20px_rgba(196,151,63,0.45)] hover:shadow-[0_0_25px_rgba(220,178,95,0.7)] hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-[#f2d896]/40"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>RSVP</span>
        </button>
      </div>

      {/* Music Wave Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={musicOn ? "Pause Music" : "Play Music"}
          title={musicOn ? "Music playing — click to pause" : "Music paused — click to play"}
          className={`w-12 h-12 rounded-full border backdrop-blur-md active:scale-90 transition-all duration-300 flex items-end justify-center gap-[2.5px] px-2.5 pb-[10px] pt-1 ${musicOn
              ? "bg-[#0e0b05]/85 border-[#dcb25f] shadow-[0_0_20px_rgba(220,178,95,0.4),0_4px_20px_rgba(0,0,0,0.7)]"
              : "bg-black/80 border-[#c4973f]/30 hover:border-[#c4973f]/70 shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            }`}
        >
          {/* 7 smooth water-wave equalizer bars */}
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <span
              key={n}
              className={`wave-bar-base wave-bar-${n} ${musicOn
                  ? ""
                  : "!h-[3px] opacity-30 !bg-[#7a6438] !animation-none"
                }`}
              style={musicOn ? {} : { animation: "none" }}
            />
          ))}
        </button>
      </div>

      {/* Toast */}
      <div
        className={`fixed bottom-20 right-6 z-50 bg-[#141008] border border-[#c4973f]/50 text-[#f2d896] px-4 py-2.5 rounded-lg shadow-xl text-xs tracking-wide transform transition-all duration-300 flex items-center gap-2 pointer-events-none ${toast.show ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#dcb25f]"></span>
        <span>{toast.text}</span>
      </div>
    </div>
  );
}
