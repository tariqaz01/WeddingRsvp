import { motion, AnimatePresence } from 'framer-motion'
import { User } from 'lucide-react'

export default function Popup({ guestName, setGuestName, hasEntered, setHasEntered }) {
  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-center mb-4 text-primary">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h2 className="text-primary text-2xl md:text-3xl mb-1 font-serif">Please let us know your name</h2>
            <p className="text-sm text-gray-600 mb-8 font-sans">to unlock your personalized invitation experience.</p>

            <div className="text-left mb-6">
              <label className="block text-xs text-gray-600 font-sans mb-1 uppercase tracking-wide">Your Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 font-sans focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && guestName.trim()) setHasEntered(true)
                  }}
                />
              </div>
            </div>

            <button
              className="w-full bg-slate-800 text-white rounded-full py-3.5 px-2 sm:px-0 font-sans font-bold tracking-widest text-xs sm:text-sm hover:bg-opacity-90 transition-all border border-primary"
              onClick={() => {
                if (guestName.trim()) setHasEntered(true)
              }}
            >
              CONTINUE TO INVITATION
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
