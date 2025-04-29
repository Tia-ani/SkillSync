import { Link } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useUserData } from '../../contexts/UserDataContext'
import { 
  FiSun, 
  FiMoon, 
  FiMenu, 
  FiX,
  FiBell,
  FiUser,
  FiLogOut
} from 'react-icons/fi'
import { motion } from 'framer-motion'

function Navbar({ toggleSidebar }) {
  const { darkMode, toggleDarkMode } = useTheme()
  const { userData, logout } = useUserData()
  
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-gray-800/10">
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-full text-neutral-600 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors mr-2 md:hidden"
              aria-label="Toggle sidebar"
            >
              <FiMenu className="w-5 h-5" />
            </button>
            
            <Link 
              to="/dashboard" 
              className="flex items-center"
            >
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-8 h-8 rounded-lg mr-3 flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                SkillSync
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-neutral-600 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <motion.div
                initial={false}
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </motion.div>
            </button>
            
            <button className="p-2 rounded-full text-neutral-600 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors relative">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-error-500 w-2 h-2 rounded-full"></span>
            </button>
            
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-full text-neutral-600 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300">
                  <FiUser className="w-4 h-4" />
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {userData.username || 'User'}
                </span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 ease-in-out z-30">
                <button 
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 text-sm text-error-600 dark:text-error-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <FiLogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar