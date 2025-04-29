import { FiBookOpen } from 'react-icons/fi'
import { motion } from 'framer-motion'

function DailyQuote({ quote }) {
  if (!quote) return null
  
  return (
    <motion.div 
      className="card p-6 h-full flex flex-col"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="mb-4">
        <div className="w-12 h-12 bg-accent-100 text-accent-800 dark:bg-accent-900/50 dark:text-accent-300 rounded-full flex items-center justify-center">
          <FiBookOpen className="w-6 h-6" />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Quote of the Day</h2>
      
      <blockquote className="text-neutral-700 dark:text-neutral-300 mb-6 flex-grow italic text-lg">
        "{quote.text}"
      </blockquote>
      
      <footer className="text-right text-sm text-neutral-600 dark:text-neutral-400">
        — {quote.author}
      </footer>
    </motion.div>
  )
}

export default DailyQuote