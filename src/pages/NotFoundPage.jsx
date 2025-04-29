import { Link } from 'react-router-dom'
import { FiArrowLeft, FiHome } from 'react-icons/fi'
import { motion } from 'framer-motion'

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-50 dark:bg-neutral-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="btn btn-primary flex items-center justify-center"
          >
            <FiHome className="mr-2" />
            Go to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="btn btn-secondary flex items-center justify-center"
          >
            <FiArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage