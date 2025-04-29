import { useState } from 'react'
import { motion } from 'framer-motion'
import { useUserData } from '../contexts/UserDataContext'
import { FiPlus, FiSearch, FiTrash2, FiEdit, FiInfo, FiSave, FiX } from 'react-icons/fi'
import { format } from 'date-fns'

function LogBookPage() {
  const { userData, addLogEntry, updateLogEntry, deleteLogEntry } = useUserData()
  const [isAddingLog, setIsAddingLog] = useState(false)
  const [newLogData, setNewLogData] = useState({
    title: '',
    content: '',
    type: 'Revise' // Default type
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [editingLogId, setEditingLogId] = useState(null)
  const [editData, setEditData] = useState({
    title: '',
    content: '',
    type: ''
  })
  
  const handleAddLog = (e) => {
    e.preventDefault()
    addLogEntry(newLogData)
    setNewLogData({
      title: '',
      content: '',
      type: 'Revise'
    })
    setIsAddingLog(false)
  }
  
  const handleStartEdit = (log) => {
    setEditingLogId(log.id)
    setEditData({
      title: log.title,
      content: log.content,
      type: log.type
    })
  }
  
  const handleSaveEdit = () => {
    if (editData.title.trim() && editData.content.trim()) {
      updateLogEntry(editingLogId, editData)
      setEditingLogId(null)
    }
  }
  
  const cancelEdit = () => {
    setEditingLogId(null)
  }
  
  const filteredLogs = userData.logs.filter(log => {
    const searchLower = searchTerm.toLowerCase()
    return (
      log.title.toLowerCase().includes(searchLower) ||
      log.content.toLowerCase().includes(searchLower) ||
      log.type.toLowerCase().includes(searchLower)
    )
  })
  
  // Sort logs by date (newest first)
  const sortedLogs = [...filteredLogs].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'Revise':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300'
      case 'Retry':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900/50 dark:text-warning-300'
      case 'Didn\'t Understand':
        return 'bg-error-100 text-error-800 dark:bg-error-900/50 dark:text-error-300'
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
    }
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Log Book
        </motion.h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500 dark:text-neutral-400">
              <FiSearch className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..."
              className="input pl-9 pr-4 py-2 w-full"
            />
          </div>
          
          <button 
            onClick={() => setIsAddingLog(true)}
            className="btn btn-primary flex items-center"
          >
            <FiPlus className="mr-2" />
            Add New Entry
          </button>
        </div>
      </div>
      
      {isAddingLog && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Add New Log Entry</h2>
          <form onSubmit={handleAddLog}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="logTitle" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Title
                </label>
                <input
                  id="logTitle"
                  type="text"
                  value={newLogData.title}
                  onChange={(e) => setNewLogData({...newLogData, title: e.target.value})}
                  className="input w-full"
                  placeholder="e.g. React Hooks Concept"
                  required
                />
              </div>
              <div>
                <label htmlFor="logType" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Type
                </label>
                <select
                  id="logType"
                  value={newLogData.type}
                  onChange={(e) => setNewLogData({...newLogData, type: e.target.value})}
                  className="input w-full"
                >
                  <option value="Revise">Revise</option>
                  <option value="Retry">Retry</option>
                  <option value="Didn't Understand">Didn't Understand</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="logContent" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Notes
              </label>
              <textarea
                id="logContent"
                value={newLogData.content}
                onChange={(e) => setNewLogData({...newLogData, content: e.target.value})}
                className="input w-full h-36"
                placeholder="Describe the concept and what you need to remember..."
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingLog(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newLogData.title.trim() || !newLogData.content.trim()}
                className="btn btn-primary"
              >
                Add Entry
              </button>
            </div>
          </form>
        </motion.div>
      )}
      
      {sortedLogs.length === 0 ? (
        <div className="card p-12 text-center">
          <FiInfo className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No log entries found</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {searchTerm 
              ? `No entries match your search "${searchTerm}".`
              : "You haven't added any log entries yet. Start tracking concepts you want to revise or revisit."}
          </p>
          {!searchTerm && (
            <button 
              onClick={() => setIsAddingLog(true)}
              className="btn btn-primary inline-flex items-center"
            >
              <FiPlus className="mr-2" />
              Add Your First Entry
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {sortedLogs.map(log => (
            <LogEntryCard 
              key={log.id}
              log={log}
              isEditing={editingLogId === log.id}
              editData={editData}
              setEditData={setEditData}
              onStartEdit={() => handleStartEdit(log)}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={cancelEdit}
              onDelete={() => deleteLogEntry(log.id)}
              getTypeColor={getTypeColor}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function LogEntryCard({ 
  log, 
  isEditing, 
  editData, 
  setEditData, 
  onStartEdit, 
  onSaveEdit, 
  onCancelEdit, 
  onDelete,
  getTypeColor
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card"
      layout
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(log.type)}`}>
            {log.type}
          </span>
          
          {!isEditing && (
            <div className="flex space-x-1">
              <button
                onClick={onStartEdit}
                className="p-1 text-neutral-500 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
                aria-label="Edit log"
              >
                <FiEdit className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-1 text-neutral-500 hover:text-error-500 dark:text-neutral-400 dark:hover:text-error-400"
                aria-label="Delete log"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {isEditing && (
            <div className="flex space-x-1">
              <button
                onClick={onSaveEdit}
                disabled={!editData.title.trim() || !editData.content.trim()}
                className="p-1 text-neutral-500 hover:text-success-500 dark:text-neutral-400 dark:hover:text-success-400 disabled:opacity-50 disabled:hover:text-neutral-500 dark:disabled:hover:text-neutral-400"
                aria-label="Save changes"
              >
                <FiSave className="w-4 h-4" />
              </button>
              <button
                onClick={onCancelEdit}
                className="p-1 text-neutral-500 hover:text-error-500 dark:text-neutral-400 dark:hover:text-error-400"
                aria-label="Cancel editing"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="editTitle" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Title
              </label>
              <input
                id="editTitle"
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                className="input w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="editType" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Type
              </label>
              <select
                id="editType"
                value={editData.type}
                onChange={(e) => setEditData({...editData, type: e.target.value})}
                className="input w-full"
              >
                <option value="Revise">Revise</option>
                <option value="Retry">Retry</option>
                <option value="Didn't Understand">Didn't Understand</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="editContent" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Notes
              </label>
              <textarea
                id="editContent"
                value={editData.content}
                onChange={(e) => setEditData({...editData, content: e.target.value})}
                className="input w-full h-36"
                required
              />
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-3">{log.title}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4 whitespace-pre-line">
              {log.content}
            </p>
          </>
        )}
      </div>
      
      {!isEditing && (
        <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800/60 text-xs text-neutral-500 dark:text-neutral-400">
          Created on {format(new Date(log.date), 'MMMM d, yyyy')}
        </div>
      )}
    </motion.div>
  )
}

export default LogBookPage