import { NavLink } from 'react-router-dom'
import { 
  FiHome, 
  FiBookOpen, 
  FiCodepen, 
  FiCalendar, 
  FiBookmark,
  FiX
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
  { to: '/skills', label: 'Skills', icon: <FiCodepen /> },
  { to: '/logbook', label: 'Log Book', icon: <FiBookOpen /> },
  { to: '/calendar', label: 'Calendar', icon: <FiCalendar /> },
  { to: '/resources', label: 'Resources', icon: <FiBookmark /> },
]

function Sidebar({ isOpen, toggleSidebar }) {
  const activeClass = "flex items-center space-x-3 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 font-medium p-3 rounded-lg"
  const inactiveClass = "flex items-center space-x-3 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-3 rounded-lg transition-colors"
  
  // Sidebar variants for animation
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  }
  
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: {
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2 }
    }
  }
  
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar for mobile */}
      <motion.aside
        className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-neutral-900 shadow-lg z-30 md:hidden overflow-y-auto"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-8 h-8 rounded-lg mr-3 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-semibold text-lg bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              SkillSync
            </span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <motion.div key={item.to} variants={itemVariants}>
                <NavLink
                  to={item.to}
                  onClick={toggleSidebar}
                  className={({ isActive }) => isActive ? activeClass : inactiveClass}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </div>
        </nav>
      </motion.aside>
      
      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-gray-800/10 pt-16 pb-4 px-4 z-10">
        <nav className="mt-8 sticky top-24">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar