import { useState } from 'react'
import { motion } from 'framer-motion'
import { useUserData } from '../contexts/UserDataContext'
import { FiPlus, FiBookOpen, FiEdit, FiTrash2, FiFilter, FiClock, FiCheckCircle, FiInfo } from 'react-icons/fi'
import { format } from 'date-fns'

function SkillsPage() {
  const { userData, addSkill, updateSkill, deleteSkill, addLogToSkill } = useUserData()
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [newSkillData, setNewSkillData] = useState({
    name: '',
    category: '',
    status: 'To Learn',
    description: ''
  })
  const [filter, setFilter] = useState('All')
  const [addingLogToSkillId, setAddingLogToSkillId] = useState(null)
  const [newLog, setNewLog] = useState('')
  
  const handleAddSkill = (e) => {
    e.preventDefault()
    addSkill(newSkillData)
    setNewSkillData({
      name: '',
      category: '',
      status: 'To Learn',
      description: ''
    })
    setIsAddingSkill(false)
  }
  
  const handleStatusChange = (skillId, newStatus) => {
    updateSkill(skillId, { status: newStatus })
  }
  
  const handleAddLog = (skillId) => {
    if (newLog.trim()) {
      addLogToSkill(skillId, { content: newLog })
      setNewLog('')
      setAddingLogToSkillId(null)
    }
  }
  
  const filteredSkills = userData.skills.filter(skill => {
    if (filter === 'All') return true
    return skill.status === filter
  })
  
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          My Skills
        </motion.h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500 dark:text-neutral-400">
              <FiFilter className="w-4 h-4" />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input pl-9 pr-8 py-2 appearance-none"
            >
              <option value="All">All Skills</option>
              <option value="To Learn">To Learn</option>
              <option value="Learning">Learning</option>
              <option value="Mastered">Mastered</option>
            </select>
          </div>
          
          <button 
            onClick={() => setIsAddingSkill(true)}
            className="btn btn-primary flex items-center"
          >
            <FiPlus className="mr-2" />
            Add New Skill
          </button>
        </div>
      </div>
      
      {isAddingSkill && (
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          className="card p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Add New Skill</h2>
          <form onSubmit={handleAddSkill}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="skillName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Skill Name
                </label>
                <input
                  id="skillName"
                  type="text"
                  value={newSkillData.name}
                  onChange={(e) => setNewSkillData({...newSkillData, name: e.target.value})}
                  className="input w-full"
                  placeholder="e.g. React, Git, DSA"
                  required
                />
              </div>
              <div>
                <label htmlFor="skillCategory" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Category
                </label>
                <input
                  id="skillCategory"
                  type="text"
                  value={newSkillData.category}
                  onChange={(e) => setNewSkillData({...newSkillData, category: e.target.value})}
                  className="input w-full"
                  placeholder="e.g. Frontend, DevOps, Algorithms"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="skillStatus" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Status
              </label>
              <select
                id="skillStatus"
                value={newSkillData.status}
                onChange={(e) => setNewSkillData({...newSkillData, status: e.target.value})}
                className="input w-full"
              >
                <option value="To Learn">To Learn</option>
                <option value="Learning">Learning</option>
                <option value="Mastered">Mastered</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="skillDescription" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Description
              </label>
              <textarea
                id="skillDescription"
                value={newSkillData.description}
                onChange={(e) => setNewSkillData({...newSkillData, description: e.target.value})}
                className="input w-full h-24"
                placeholder="A brief description of what you want to learn..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingSkill(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newSkillData.name.trim()}
                className="btn btn-primary"
              >
                Add Skill
              </button>
            </div>
          </form>
        </motion.div>
      )}
      
      {filteredSkills.length === 0 ? (
        <div className="card p-12 text-center">
          <FiInfo className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No skills found</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {filter !== 'All' 
              ? `You don't have any skills with "${filter}" status.`
              : "You haven't added any skills yet. Start tracking your learning journey!"}
          </p>
          <button 
            onClick={() => setIsAddingSkill(true)}
            className="btn btn-primary inline-flex items-center"
          >
            <FiPlus className="mr-2" />
            Add Your First Skill
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(skill => (
            <SkillCard 
              key={skill.id}
              skill={skill}
              onStatusChange={handleStatusChange}
              onDelete={deleteSkill}
              isAddingLog={addingLogToSkillId === skill.id}
              onAddLogClick={() => setAddingLogToSkillId(skill.id)}
              onCancelLog={() => setAddingLogToSkillId(null)}
              newLog={newLog}
              onLogChange={(e) => setNewLog(e.target.value)}
              onSaveLog={() => handleAddLog(skill.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function SkillCard({ 
  skill, 
  onStatusChange, 
  onDelete, 
  isAddingLog, 
  onAddLogClick, 
  onCancelLog, 
  newLog, 
  onLogChange, 
  onSaveLog 
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  let statusColor = ''
  let statusIcon = null
  
  switch (skill.status) {
    case 'To Learn':
      statusColor = 'bg-accent-100 text-accent-800 dark:bg-accent-900/50 dark:text-accent-300'
      statusIcon = <FiBookOpen className="w-4 h-4" />
      break
    case 'Learning':
      statusColor = 'bg-warning-100 text-warning-800 dark:bg-warning-900/50 dark:text-warning-300'
      statusIcon = <FiClock className="w-4 h-4" />
      break
    case 'Mastered':
      statusColor = 'bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-300'
      statusIcon = <FiCheckCircle className="w-4 h-4" />
      break
    default:
      statusColor = 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
  }
  
  const recentLogs = skill.logs ? [...skill.logs].reverse().slice(0, 3) : []
  
  return (
    <motion.div 
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}>
              {statusIcon}
              <span className="ml-1">{skill.status}</span>
            </span>
            {skill.category && (
              <span className="ml-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {skill.category}
              </span>
            )}
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => onDelete(skill.id)}
              className="p-1 text-neutral-500 hover:text-error-500 dark:text-neutral-400 dark:hover:text-error-400"
              aria-label="Delete skill"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
        
        {skill.description && (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
            {skill.description}
          </p>
        )}
        
        <div className="mb-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
            Change Status:
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => onStatusChange(skill.id, 'To Learn')}
              className={`px-3 py-1 text-xs rounded-full ${
                skill.status === 'To Learn'
                  ? 'bg-accent-100 text-accent-800 dark:bg-accent-900/50 dark:text-accent-300 font-medium'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-accent-50 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-accent-900/30'
              }`}
            >
              To Learn
            </button>
            <button
              onClick={() => onStatusChange(skill.id, 'Learning')}
              className={`px-3 py-1 text-xs rounded-full ${
                skill.status === 'Learning'
                  ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/50 dark:text-warning-300 font-medium'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-warning-50 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-warning-900/30'
              }`}
            >
              Learning
            </button>
            <button
              onClick={() => onStatusChange(skill.id, 'Mastered')}
              className={`px-3 py-1 text-xs rounded-full ${
                skill.status === 'Mastered'
                  ? 'bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-300 font-medium'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-success-50 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-success-900/30'
              }`}
            >
              Mastered
            </button>
          </div>
        </div>
        
        {recentLogs.length > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Recent Logs</h4>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
              >
                {isExpanded ? 'Show Less' : 'Show All'}
              </button>
            </div>
            
            <div className="space-y-2">
              {(isExpanded ? skill.logs : recentLogs).map(log => (
                <div 
                  key={log.id} 
                  className="p-2 bg-neutral-50 dark:bg-neutral-800/60 rounded text-sm"
                >
                  <p className="text-neutral-800 dark:text-neutral-200">{log.content}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                    {format(new Date(log.date), 'MMM d, yyyy')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {isAddingLog ? (
          <div className="mt-4">
            <textarea
              value={newLog}
              onChange={onLogChange}
              className="input w-full h-20 text-sm"
              placeholder="What did you learn today?"
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={onCancelLog}
                className="btn btn-secondary text-xs py-1"
              >
                Cancel
              </button>
              <button
                onClick={onSaveLog}
                disabled={!newLog.trim()}
                className="btn btn-primary text-xs py-1"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={onAddLogClick}
            className="w-full py-2 mt-2 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:border-primary-400 hover:text-primary-500 dark:hover:border-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <FiPlus className="inline mr-1" />
            Add Daily Log
          </button>
        )}
      </div>
      
      <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800/60 text-xs text-neutral-500 dark:text-neutral-400">
        Added {format(new Date(skill.createdAt), 'MMM d, yyyy')}
      </div>
    </motion.div>
  )
}

export default SkillsPage