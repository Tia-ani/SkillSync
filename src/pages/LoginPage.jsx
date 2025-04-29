import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useUserData } from '../contexts/UserDataContext'
import { FiArrowLeft } from 'react-icons/fi'
import { motion } from 'framer-motion'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { userData, login } = useUserData()
  
  // Redirect if already logged in
  if (userData.isLoggedIn) {
    return <Navigate to="/dashboard" replace />
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!username.trim()) return
    
    setIsSubmitting(true)
    
    // Simulate login process
    setTimeout(() => {
      login(username)
      setIsSubmitting(false)
    }, 800)
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                S
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-6">Welcome to SkillSync</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label 
                  htmlFor="username" 
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input w-full"
                  placeholder="Enter your username"
                  autoFocus
                  required
                />
              </div>
              
              <div className="mb-6">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input w-full"
                  placeholder="Enter your password"
                  value="password" // For demo purposes
                  readOnly
                />
                <p className="text-xs text-neutral-500 mt-1">
                  For this demo, any username works with any password
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !username.trim()}
                className="btn btn-primary w-full flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage