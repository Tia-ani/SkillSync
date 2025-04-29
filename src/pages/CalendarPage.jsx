import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useUserData } from '../contexts/UserDataContext'
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
  isToday,
  addDays
} from 'date-fns'
import { FiChevronLeft, FiChevronRight, FiCheck, FiX, FiCalendar } from 'react-icons/fi'

function CalendarPage() {
  const { userData, addDailyTask } = useUserData()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [completionMap, setCompletionMap] = useState({})
  
  useEffect(() => {
    // Build map of dates and completion status
    const completionStatus = {}
    
    userData.dailyTasks.forEach(task => {
      const dateStr = format(new Date(task.date), 'yyyy-MM-dd')
      
      if (!completionStatus[dateStr]) {
        completionStatus[dateStr] = {
          total: 0,
          completed: 0
        }
      }
      
      completionStatus[dateStr].total += 1
      if (task.completed) {
        completionStatus[dateStr].completed += 1
      }
    })
    
    setCompletionMap(completionStatus)
  }, [userData.dailyTasks])
  
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }
  
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }
  
  const handleDateClick = (date) => {
    setSelectedDate(date)
  }
  
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // Get tasks for selected date
  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd')
  const tasksForSelectedDate = userData.dailyTasks.filter(task => {
    const taskDate = format(new Date(task.date), 'yyyy-MM-dd')
    return taskDate === selectedDateStr
  })
  
  // Plan for tomorrow
  const handlePlanTomorrow = () => {
    const tomorrow = addDays(new Date(), 1)
    setSelectedDate(tomorrow)
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Calendar
        </motion.h1>
        
        <button 
          onClick={handlePlanTomorrow}
          className="btn btn-primary flex items-center self-start"
        >
          <FiCalendar className="mr-2" />
          Plan for Tomorrow
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Previous month"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Next month"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-px bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-hidden">
              {/* Calendar header (days of week) */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div
                  key={day}
                  className="bg-neutral-100 dark:bg-neutral-800 p-2 text-center text-sm font-medium"
                >
                  {day}
                </div>
              ))}
              
              {/* Fill in empty cells at the beginning */}
              {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                <div
                  key={`empty-start-${index}`}
                  className="bg-white dark:bg-neutral-900 p-3 min-h-[80px]"
                />
              ))}
              
              {/* Calendar days */}
              {monthDays.map(day => {
                const dateStr = format(day, 'yyyy-MM-dd')
                const dayCompletionData = completionMap[dateStr]
                const hasCompletedAll = dayCompletionData && 
                  dayCompletionData.completed > 0 && 
                  dayCompletionData.completed === dayCompletionData.total
                
                const hasIncomplete = dayCompletionData && 
                  dayCompletionData.total > 0 && 
                  dayCompletionData.completed < dayCompletionData.total
                
                const isSelected = isSameDay(day, selectedDate)
                
                return (
                  <div
                    key={day.toISOString()}
                    onClick={() => handleDateClick(day)}
                    className={`bg-white dark:bg-neutral-900 p-2 min-h-[80px] cursor-pointer transition-colors ${
                      isSelected 
                        ? 'ring-2 ring-primary-500 dark:ring-primary-400 relative z-10' 
                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    } ${
                      isToday(day) 
                        ? 'bg-primary-50 dark:bg-primary-900/20' 
                        : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-sm font-medium ${
                        isToday(day) 
                          ? 'text-primary-600 dark:text-primary-400' 
                          : !isSameMonth(day, currentDate) 
                            ? 'text-neutral-400 dark:text-neutral-600' 
                            : ''
                      }`}>
                        {format(day, 'd')}
                      </span>
                      
                      {hasCompletedAll && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300">
                          <FiCheck className="h-3 w-3" />
                        </span>
                      )}
                      
                      {hasIncomplete && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300">
                          <FiX className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                    
                    {dayCompletionData && dayCompletionData.total > 0 && (
                      <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                        {dayCompletionData.completed}/{dayCompletionData.total} done
                      </div>
                    )}
                  </div>
                )
              })}
              
              {/* Fill in empty cells at the end */}
              {Array.from({ length: (6 - monthEnd.getDay()) % 7 }).map((_, index) => (
                <div
                  key={`empty-end-${index}`}
                  className="bg-white dark:bg-neutral-900 p-3 min-h-[80px]"
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="card p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-1">
                {isToday(selectedDate) 
                  ? "Today's Tasks" 
                  : format(selectedDate, 'MMMM d, yyyy')}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {isToday(selectedDate) 
                  ? format(selectedDate, 'EEEE, MMMM d') 
                  : format(selectedDate, 'EEEE')}
              </p>
            </div>
            
            {tasksForSelectedDate.length > 0 ? (
              <div className="space-y-2">
                {tasksForSelectedDate.map(task => (
                  <div 
                    key={task.id}
                    className={`p-3 rounded-lg flex items-center ${
                      task.completed 
                        ? 'bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-900/30' 
                        : 'bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50'
                    }`}
                  >
                    <div className={`w-5 h-5 mr-3 rounded-full flex items-center justify-center border ${
                      task.completed 
                        ? 'border-success-500 bg-success-500 text-white' 
                        : 'border-neutral-400 dark:border-neutral-600'
                    }`}>
                      {task.completed && <FiCheck className="w-3 h-3" />}
                    </div>
                    <span className={`${
                      task.completed 
                        ? 'text-success-800 dark:text-success-300 line-through' 
                        : 'text-neutral-800 dark:text-neutral-200'
                    }`}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiCalendar className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                  No tasks for this day
                </p>
                {isToday(selectedDate) ? (
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">
                    Add tasks from the Dashboard
                  </p>
                ) : (
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">
                    Select a different day or plan ahead
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CalendarPage