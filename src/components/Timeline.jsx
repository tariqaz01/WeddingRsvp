import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    id: 1,
    title: 'Haldi Ceremony',
    time: '11:00 AM',
    desc: 'Kickstarting the celebrations with vibrant colors and blessings.',
    image: '/Assets/Haldi_ceremony.png',
  },
  {
    id: 2,
    title: 'Mehendi & Sangeet',
    time: '2:00 PM',
    desc: 'An afternoon of henna, music, and dance performances.',
    image: '/Assets/Sangeet.png',
  },
  {
    id: 3,
    title: 'Reception & Dinner',
    time: '8:00 PM',
    desc: 'A grand feast to celebrate the evening together.',
    image: '/Assets/poolside_reception.png',
  },
  {
    id: 4,
    title: 'Wedding Ceremony (Phere)',
    time: '12:00 AM Midnight',
    desc: 'The sacred vows under the stars.',
    image: '/Assets/Phere_stage.png',
  }
]

export default function Timeline() {
  const containerRef = useRef(null)

  useEffect(() => {
    const panels = gsap.utils.toArray('.timeline-panel')

    panels.forEach((panel, i) => {
      const isLeft = i % 2 === 0
      const img = panel.querySelector('.timeline-img')
      const text = panel.querySelector('.timeline-text')

      gsap.fromTo(img, 
        { x: isLeft ? -100 : 100, opacity: 0 },
        { 
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
          }
        }
      )

      gsap.fromTo(text, 
        { x: isLeft ? 100 : -100, opacity: 0 },
        { 
          x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
          }
        }
      )
    })
  }, [])

  return (
    <section ref={containerRef} className="py-32 bg-bg-page overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">
        <h2 className="text-4xl md:text-5xl font-serif text-primary text-center mb-24">The Celebration</h2>
        
        {/* Central Spine */}
        <div className="absolute left-[50%] top-32 bottom-0 w-[2px] bg-primary/30 hidden md:block"></div>

        <div className="flex flex-col gap-20 md:gap-32">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0

            return (
              <div key={event.id} className={`timeline-panel flex flex-col md:flex-row items-center gap-10 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                {/* Image */}
                <div className="timeline-img w-full md:w-1/2 relative group">
                  <div className="overflow-hidden rounded-xl shadow-xl">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-[300px] md:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  {/* Spine Node (Desktop) */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary ${isLeft ? '-right-[2.6rem]' : '-left-[2.6rem]'}`}></div>
                </div>

                {/* Text */}
                <div className="timeline-text w-full md:w-1/2 text-center md:text-left flex flex-col justify-center">
                  <span className="text-primary font-sans uppercase tracking-widest text-sm font-semibold mb-2 block">{event.time}</span>
                  <h3 className="text-3xl font-serif text-secondary mb-4">{event.title}</h3>
                  <p className="text-gray-600 font-sans leading-relaxed">{event.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
