import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MediaVenue() {
  const photosRef = useRef(null)

  useEffect(() => {
    const photos = gsap.utils.toArray('.venue-photo')
    
    gsap.fromTo(photos, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: photosRef.current,
          start: 'top 75%',
        }
      }
    )
  }, [])

  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 space-y-32">
        
        {/* Memories / Video Section */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-12">Our Pre-Wedding Story</h2>
          <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-bg-page">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/jAnp7UiGFZk?autoplay=0&controls=0&modestbranding=1&rel=0" 
              title="Pre-Wedding Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>

        {/* Venue Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Where We Unite</h2>
            <h3 className="text-2xl font-serif text-secondary mb-4">The Tamarind Tree</h3>
            <p className="text-gray-600 font-sans mb-8">
              Join us at one of Bangalore's most enchanting heritage venues, where timeless architecture meets nature's grace.
            </p>
            
            <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15557.822557551468!2d77.56816!3d12.87834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b3531b99a67%3A0xe54d92bd12dd9b5e!2nThe%20Tamarind%20Tree!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
          
          <div ref={photosRef} className="relative h-[600px] w-full flex flex-col gap-6 pt-10">
            <img src="/Assets/Wedding_venue.png" alt="Venue" className="venue-photo w-[80%] ml-auto rounded-xl shadow-xl object-cover h-[250px]" />
            <img src="/Assets/Buffet_dinner.png" alt="Dining" className="venue-photo w-[80%] mr-auto rounded-xl shadow-xl object-cover h-[250px] -mt-10 relative z-10" />
          </div>
        </div>

      </div>
    </section>
  )
}
