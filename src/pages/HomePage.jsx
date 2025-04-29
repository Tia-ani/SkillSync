import { Link, Navigate } from 'react-router-dom'
import { useUserData } from '../contexts/UserDataContext'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle, FiClock, FiEdit } from 'react-icons/fi'

function HomePage() {
  const { userData } = useUserData()
  
  // Redirect to dashboard if already logged in
  if (userData.isLoggedIn) {
    return <Navigate to="/dashboard" replace />
  }
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      <header className="py-4 px-6 md:px-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-8 h-8 rounded-lg mr-3 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-semibold text-lg bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              SkillSync
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-6">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Track Your Tech Journey,
                <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                  {" "}One Skill at a Time
                </span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8">
                SkillSync helps you master your technical skills with structured tracking, daily logs, and visual progress indicators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="btn btn-primary px-8 py-3 text-lg">
                  Start Learning
                  <FiArrowRight className="ml-2 inline" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="SkillSync Dashboard" 
                className="w-full h-auto rounded-xl"
              />
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-neutral-50 dark:bg-neutral-800 px-6">
          <div className="container mx-auto">
            <motion.div 
              {...fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Everything You Need to Master Tech Skills
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                SkillSync provides all the tools you need to track your learning journey, stay organized, and visualize your progress.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Feature 
                icon={<FiEdit />}
                title="Skill Tracking"
                description="Track your technical skills with clear status updates: To Learn, Learning, or Mastered."
                delay={0.1}
              />
              <Feature 
                icon={<FiClock />}
                title="Daily Logs"
                description="Keep a journal of your learning journey with daily notes for each skill."
                delay={0.2}
              />
              <Feature 
                icon={<FiCheckCircle />}
                title="Task Management"
                description="Plan tomorrow's tasks before bed and track your daily progress."
                delay={0.3}
              />
              <Feature 
                icon={<FiCheckCircle />}
                title="Visual Progress"
                description="See your progress with elegant charts and status indicators."
                delay={0.4}
              />
              <Feature 
                icon={<FiCheckCircle />}
                title="Calendar View"
                description="Track your consistency with a calendar that shows completed days."
                delay={0.5}
              />
              <Feature 
                icon={<FiCheckCircle />}
                title="Log Book"
                description="Keep track of concepts you need to revise or didn't understand."
                delay={0.6}
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
          <div className="container mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Accelerate Your Learning?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg mb-8 max-w-2xl mx-auto"
            >
              Join SkillSync today and turn your learning goals into measurable achievements.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/login" className="btn bg-white text-primary-600 hover:bg-neutral-100 px-8 py-3 text-lg font-medium">
                Get Started Now
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 px-6 bg-white dark:bg-neutral-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-6 h-6 rounded-lg mr-2 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="font-semibold text-sm">
                SkillSync © {new Date().getFullYear()}
              </span>
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Made with ❤️ for developers
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Feature({ icon, title, description, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </motion.div>
  )
}

export default HomePage