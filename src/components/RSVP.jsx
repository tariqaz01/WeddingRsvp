import { useState } from 'react'

// TODO: Replace these with your actual Google Form details (See Walkthrough for instructions)
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd876W36I5gJ3-SncAMD9usJCKDn0DygiVhf1Ns_RgEazoDcQ/formResponse"
const ENTRY_ID_NAME = "entry.587455401"        // Guest Name entry ID
const ENTRY_ID_ATTENDING = "entry.871555943"   // Attending status entry ID
const ENTRY_ID_GUESTS = "entry.1668843926"      // Guest Count entry ID
const ENTRY_ID_MESSAGE = "entry.926674489"     // Message entry ID

export default function RSVP({ guestName }) {
  const [attending, setAttending] = useState(null)
  const [guests, setGuests] = useState(1)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (attending === null) return

    setIsSubmitting(true)

    // Prepare form data using URLSearchParams for application/x-www-form-urlencoded
    const formData = new URLSearchParams()
    formData.append(ENTRY_ID_NAME, guestName || 'Anonymous')
    formData.append(ENTRY_ID_ATTENDING, attending ? "Yes" : "No")

    // Only send guest count if attending
    if (attending) {
      formData.append(ENTRY_ID_GUESTS, guests.toString())
    } else {
      formData.append(ENTRY_ID_GUESTS, "0")
    }

    if (message.trim()) {
      formData.append(ENTRY_ID_MESSAGE, message)
    }

    try {
      // Submit the form using no-cors mode to bypass CORS restrictions
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      })
      // Since mode is no-cors, we won't be able to see the response.
      // We'll assume success if no error was thrown.
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      alert("There was an issue submitting your RSVP. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-20 sm:py-32 bg-[#070608] flex items-center justify-center px-4 overflow-hidden text-zinc-200">
      {/* Atmospheric Ambient Lighting Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <div className="w-[750px] h-[750px] bg-red-950/20 rounded-full blur-[160px] opacity-70"></div>
        <div className="w-[600px] h-[600px] bg-amber-900/15 rounded-full blur-[170px]"></div>
      </div>

      <div className="bg-[#140608] max-w-2xl w-full p-10 md:p-16 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(207,158,56,0.12)] text-center border border-gold-400/35 border-t-8 border-t-gold-400 relative overflow-hidden z-10">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-bl-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-400/5 rounded-tr-full pointer-events-none"></div>

        {!submitted ? (
          <>
            <h2 className="text-3xl md:text-5xl font-serif text-gold-300 mb-6">
              {guestName ? `${guestName}, will you be joining us?` : 'Will you be joining us?'}
            </h2>
            <p className="text-zinc-400 font-sans mb-12">
              Please let us know if you can make it to our special day.
            </p>

            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              {/* Toggle */}
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`flex-1 py-4 px-6 text-sm sm:text-base rounded-full border-2 transition-all font-sans tracking-wide font-semibold ${attending === true
                    ? 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-[#1b0507] border-gold-300 shadow-[0_4px_20px_rgba(207,158,56,0.35)] scale-105'
                    : 'border-gold-500/30 text-gold-200/70 bg-black/40 hover:border-gold-400/60 hover:text-gold-100'
                    }`}
                >
                  JOYFULLY ACCEPT
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`flex-1 py-4 px-6 text-sm sm:text-base rounded-full border-2 transition-all font-sans tracking-wide font-semibold ${attending === false
                    ? 'bg-zinc-800 border-zinc-500 text-white shadow-lg scale-105'
                    : 'border-gold-500/30 text-gold-200/70 bg-black/40 hover:border-gold-400/60 hover:text-gold-100'
                    }`}
                >
                  REGRETFULLY DECLINE
                </button>
              </div>

              {/* Guest Counter - Only visible if attending is true */}
              <div className={`transition-all duration-500 overflow-hidden ${attending === true ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <label className="block text-sm text-gold-200/80 font-sans mb-4 uppercase tracking-wider">Number of Guests (including you)</label>
                <div className="flex items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-12 h-12 rounded-full border-2 border-gold-400/60 text-gold-300 bg-black/40 flex items-center justify-center hover:bg-gold-500/20 hover:text-gold-100 hover:border-gold-400 transition-colors"
                  >
                    -
                  </button>
                  <span className="font-serif text-3xl text-gold-200 w-8">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    className="w-12 h-12 rounded-full border-2 border-gold-400/60 text-gold-300 bg-black/40 flex items-center justify-center hover:bg-gold-500/20 hover:text-gold-100 hover:border-gold-400 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Optional Message - Visible once a choice is made */}
              <div className={`transition-all duration-500 overflow-hidden ${attending !== null ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <label className="block text-sm text-gold-200/80 font-sans mb-4 uppercase tracking-wider text-left">Message to the Couple (Optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a sweet note or any dietary restrictions..."
                  className="w-full bg-black/60 border border-gold-500/30 text-gold-100 placeholder-zinc-500 rounded-xl p-4 font-sans focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors resize-none h-32"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={attending === null || isSubmitting}
                className="w-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-[#1b0507] rounded-full py-4 font-sans font-bold tracking-widest text-sm hover:brightness-110 active:scale-[0.99] transition-all border border-gold-300/40 shadow-[0_4px_20px_rgba(207,158,56,0.35)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-[#1b0507]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SENDING...
                  </>
                ) : 'SEND RSVP'}
              </button>
            </form>
          </>
        ) : (
          <div className="py-12 relative z-10 animate-fade-in">
            <div className="w-20 h-20 bg-gold-500/10 text-gold-400 border border-gold-400/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif text-gold-300 mb-4">
              {attending ? "We can't wait to see you!" : "You will be missed!"}
            </h2>
            <p className="text-zinc-300 font-sans">
              Thank you for letting us know, {guestName || 'friend'}.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
