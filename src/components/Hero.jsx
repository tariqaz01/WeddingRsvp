import { useEffect, useState } from 'react'

export default function Hero({ guestName }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [petals, setPetals] = useState([])
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer (Walima date)
  useEffect(() => {
    const walimaDate = new Date("2026-10-23T18:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = walimaDate - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true);
  };

  useEffect(() => {
    // Generate static random positions for CSS petals
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 10,
      animationDelay: Math.random() * 5,
    }))
    setPetals(newPetals)

    const targetDate = new Date('2026-06-24T00:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-bg-page">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/Assets/Couple_image.png')` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      {/* CSS Petals */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {petals.map(petal => (
          <div
            key={petal.id}
            className="absolute top-[-5%] w-3 h-3 bg-white/60 rounded-full"
            style={{
              left: `${petal.left}%`,
              animation: `fall ${petal.animationDuration}s linear infinite`,
              animationDelay: `${petal.animationDelay}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        <style>{`
          @keyframes fall {
            0% { transform: translateY(-5vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <p className="font-sans text-sm md:text-lg tracking-widest mb-4 uppercase">
          {guestName ? `${guestName}, Welcome to the Engagement of` : 'Welcome to the Engagement of'}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl 2xl:text-[140px] text-[#fce3b6] drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mb-8">
          Amna & Sarib<br />
          <hr className='h-px w-1/2 bg-gray-600 mx-auto my-2' />
          Rimsha & Shahid
        </h1>

        {/* Countdown */}
        <div className="flex gap-4 sm:gap-6 mb-4 sm:mb-0 justify-center text-center">
          {[
            { value: countdown.days, label: "Days" },
            { value: countdown.hours, label: "Hours" },
            { value: countdown.minutes, label: "Minutes" },
            { value: countdown.seconds, label: "Seconds" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-serif text-3xl md:text-5xl 2xl:text-7xl">
                {item.value}
              </span>
              <span className="font-sans text-xs tracking-widest uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 z-20 flex flex-col items-center animate-pulse text-white">
        <span className="font-sans text-xs 2xl:text-lg tracking-widest uppercase mb-2">Scroll to Begin</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
