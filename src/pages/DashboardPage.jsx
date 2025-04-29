import { useUserData } from '../contexts/UserDataContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiBookOpen, 
  FiCodepen, 
  FiCalendar, 
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiInfo
} from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import ProgressChart from '../components/dashboard/ProgressChart'
import DailyQuote from '../components/dashboard/DailyQuote'
import TaskList from '../components/tasks/TaskList'

// Mock quotes for the dashboard
const quotes = [
  {
    text: "Learning is not attained by chance, it must be sought for with ardor and diligence.",
    author: "Abigail Adams"
  },
  {
    text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    author: "Brian Herbert"
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi"
  },
  {
    text: "The beautiful thing about learning is that nobody can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "Education is not the filling of a pail, but the lighting of a fire.",
    author: "W.B. Yeats"
  }
]

function DashboardPage() {
  const { userData } = useUserData()
  const [currentDate] = useState(new Date())
  const [randomQuote, setRandomQuote] = useState(null)
  
  useEffect(() => {
    // Get a random quote on mount
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setRandomQuote(quotes[randomIndex])
  }, [])
  
  if (!userData) {
    return <div>Loading...</div>
  }
  
  const { statistics } = userData
  
  // Recent skills (limit to 3)
  const recentSkills = [...userData.skills].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 3)
  
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold mb-2"
        >
          Welcome back, {userData.username}! 👋
        </motion.h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Today is {format(currentDate, 'EEEE, MMMM d, yyyy')}
        </p>
      </div>
      
      {/* Status Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <StatusCard 
          title="Total Skills"
          value={statistics.totalSkills}
          icon={<FiCodepen className="h-5 w-5" />}
          color="bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300"
        />
        <StatusCard 
          title="Mastered"
          value={statistics.mastered}
          icon={<FiCheckCircle className="h-5 w-5" />}
          color="bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-300"
        />
        <StatusCard 
          title="In Progress"
          value={statistics.learning}
          icon={<FiClock className="h-5 w-5" />}
          color="bg-warning-100 text-warning-800 dark:bg-warning-900/50 dark:text-warning-300"
        />
        <StatusCard 
          title="To Learn"
          value={statistics.toLearn}
          icon={<FiBookOpen className="h-5 w-5" />}
          color="bg-accent-100 text-accent-800 dark:bg-accent-900/50 dark:text-accent-300"
        />
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress chart section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Learning Progress</h2>
              <Link to="/skills" className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
                View All Skills
              </Link>
            </div>
            
            {userData.skills.length > 0 ? (
              <div className="h-64">
                <ProgressChart 
                  toLearn={statistics.toLearn}
                  learning={statistics.learning}
                  mastered={statistics.mastered}
                />
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center flex-col text-center">
                <FiInfo className="h-10 w-10 text-neutral-400 mb-4" />
                <p className="text-neutral-600 dark:text-neutral-400 mb-2">No skills added yet</p>
                <Link to="/skills" className="btn btn-primary text-sm">
                  Add Your First Skill
                </Link>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Quote of the day */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="lg:col-span-1"
        >
          <DailyQuote quote={randomQuote} />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent skills */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Skills</h2>
              <Link to="/skills" className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
                View All
              </Link>
            </div>
            
            {recentSkills.length > 0 ? (
              <div className="space-y-4">
                {recentSkills.map(skill => (
                  <div key={skill.id} className="flex items-center p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg">
                    <div className="mr-4">
                      <StatusBadge status={skill.status} />
                    </div>
                    <div>
                      <h3 className="font-medium">{skill.name}</h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {format(new Date(skill.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
                
                {userData.skills.length > 3 && (
                  <Link 
                    to="/skills" 
                    className="block text-center text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline mt-4"
                  >
                    +{userData.skills.length - 3} more skills
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiCodepen className="h-10 w-10 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">No skills added yet</p>
                <Link to="/skills" className="btn btn-primary text-sm">
                  <FiPlus className="mr-2" />
                  Add Your First Skill
                </Link>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Tasks for Today */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Today's Tasks</h2>
              <Link to="/calendar" className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline flex items-center">
                <FiCalendar className="mr-1" />
                Calendar View
              </Link>
            </div>
            
            <TaskList />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function StatusCard({ title, value, icon, color }) {
  return (
    <div className="card p-6 h-full">
      <div className="flex items-start">
        <div className={`${color} p-3 rounded-lg mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  let bgColor = ''
  
  switch (status) {
    case 'To Learn':
      bgColor = 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300'
      break
    case 'Learning':
      bgColor = 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300'
      break
    case 'Mastered':
      bgColor = 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300'
      break
    default:
      bgColor = 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
  }
  
  return (
    <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${bgColor}`}>
      {status}
    </span>
  )
}

export default DashboardPage