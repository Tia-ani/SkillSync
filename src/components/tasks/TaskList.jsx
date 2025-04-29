import { useState } from 'react'
import { useUserData } from '../../contexts/UserDataContext'
import { FiPlus, FiTrash2, FiCheck, FiEdit, FiAlertCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

function TaskList() {
  const { userData, addDailyTask, updateDailyTask, deleteDailyTask } = useUserData()
  const [newTask, setNewTask] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  
  // Filter tasks for today
  const today = new Date().toISOString().split('T')[0]
  const todaysTasks = userData.dailyTasks.filter(task => {
    const taskDate = new Date(task.date).toISOString().split('T')[0]
    return taskDate === today
  })
  
  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    
    addDailyTask({
      title: newTask,
      completed: false
    })
    
    setNewTask('')
    setIsAdding(false)
  }
  
  const handleToggleComplete = (taskId) => {
    const task = userData.dailyTasks.find(t => t.id === taskId)
    if (task) {
      updateDailyTask(taskId, { completed: !task.completed })
    }
  }
  
  return (
    <div className="space-y-4">
      {todaysTasks.length === 0 && !isAdding && (
        <div className="text-center py-6">
          <FiAlertCircle className="h-10 w-10 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">No tasks planned for today</p>
          <button 
            onClick={() => setIsAdding(true)}
            className="btn btn-primary text-sm"
          >
            <FiPlus className="mr-2" />
            Add Your First Task
          </button>
        </div>
      )}
      
      {todaysTasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task} 
          onToggleComplete={handleToggleComplete}
          onDelete={deleteDailyTask}
          onUpdate={updateDailyTask}
        />
      ))}
      
      {(isAdding || todaysTasks.length > 0) && (
        <div>
          {isAdding ? (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
              onSubmit={handleAddTask}
            >
              <div className="flex items-center">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="What do you plan to learn today?"
                  className="input flex-grow mr-2"
                  autoFocus
                />
                <button 
                  type="submit"
                  disabled={!newTask.trim()}
                  className="btn btn-primary disabled:opacity-50"
                >
                  Add
                </button>
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="btn btn-secondary ml-2"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAdding(true)}
              className="w-full py-2 mt-4 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-600 dark:text-neutral-400 hover:border-primary-400 hover:text-primary-500 dark:hover:border-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FiPlus className="inline mr-2" />
              Add New Task
            </motion.button>
          )}
        </div>
      )}
    </div>
  )
}

function TaskItem({ task, onToggleComplete, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)
  
  const handleSave = () => {
    if (editValue.trim()) {
      onUpdate(task.id, { title: editValue })
      setIsEditing(false)
    }
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setEditValue(task.title)
      setIsEditing(false)
    }
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 rounded-lg flex items-center justify-between ${
        task.completed 
          ? 'bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-900/30' 
          : 'bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50'
      }`}
    >
      <div className="flex items-center flex-grow mr-2">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center border ${
            task.completed 
              ? 'border-success-500 bg-success-500 text-white' 
              : 'border-neutral-400 dark:border-neutral-600'
          }`}
        >
          {task.completed && <FiCheck className="w-4 h-4" />}
        </button>
        
        {isEditing ? (
          <input 
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="input flex-grow"
            autoFocus
          />
        ) : (
          <span className={`flex-grow ${
            task.completed 
              ? 'text-success-800 dark:text-success-300 line-through' 
              : 'text-neutral-800 dark:text-neutral-200'
          }`}>
            {task.title}
          </span>
        )}
      </div>
      
      <div className="flex space-x-1">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-neutral-500 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
              aria-label="Edit task"
            >
              <FiEdit className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-neutral-500 hover:text-error-500 dark:text-neutral-400 dark:hover:text-error-400"
              aria-label="Delete task"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default TaskList