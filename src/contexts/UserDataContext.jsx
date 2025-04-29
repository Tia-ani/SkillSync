import { createContext, useContext, useState, useEffect, useCallback } from 'react'

// Default data structure
const defaultUserData = {
  isLoggedIn: false,
  username: '',
  skills: [],
  dailyTasks: [],
  logs: [],
  resources: [],
  statistics: {
    totalSkills: 0,
    mastered: 0,
    learning: 0,
    toLearn: 0,
    completedTasks: 0,
    pendingTasks: 0
  }
}

const UserDataContext = createContext()

export function useUserData() {
  return useContext(UserDataContext)
}

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(defaultUserData)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize data from localStorage
  const initializeData = useCallback(() => {
    try {
      const storedData = localStorage.getItem('skillsync-user-data')
      if (storedData) {
        setUserData(JSON.parse(storedData))
      }
      setIsInitialized(true)
    } catch (error) {
      console.error('Error loading data from localStorage:', error)
      setIsInitialized(true)
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('skillsync-user-data', JSON.stringify(userData))
    }
  }, [userData, isInitialized])

  // Update statistics when relevant data changes
  useEffect(() => {
    if (isInitialized) {
      updateStatistics()
    }
  }, [userData.skills, userData.dailyTasks, isInitialized])

  // Calculate statistics based on current data
  const updateStatistics = () => {
    const stats = {
      totalSkills: userData.skills.length,
      mastered: userData.skills.filter(skill => skill.status === 'Mastered').length,
      learning: userData.skills.filter(skill => skill.status === 'Learning').length,
      toLearn: userData.skills.filter(skill => skill.status === 'To Learn').length,
      completedTasks: userData.dailyTasks.filter(task => task.completed).length,
      pendingTasks: userData.dailyTasks.filter(task => !task.completed).length
    }

    setUserData(prevData => ({
      ...prevData,
      statistics: stats
    }))
  }

  // Login function
  const login = (username) => {
    setUserData(prevData => ({
      ...prevData,
      isLoggedIn: true,
      username
    }))
  }

  // Logout function
  const logout = () => {
    setUserData(defaultUserData)
  }

  // Skill related functions
  const addSkill = (newSkill) => {
    setUserData(prevData => ({
      ...prevData,
      skills: [...prevData.skills, {
        ...newSkill,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        logs: []
      }]
    }))
  }

  const updateSkill = (skillId, updatedData) => {
    setUserData(prevData => ({
      ...prevData,
      skills: prevData.skills.map(skill => 
        skill.id === skillId ? { ...skill, ...updatedData } : skill
      )
    }))
  }

  const deleteSkill = (skillId) => {
    setUserData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter(skill => skill.id !== skillId)
    }))
  }

  // Log entry functions
  const addLogToSkill = (skillId, logEntry) => {
    setUserData(prevData => ({
      ...prevData,
      skills: prevData.skills.map(skill => 
        skill.id === skillId 
          ? { 
              ...skill, 
              logs: [...skill.logs, {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                ...logEntry
              }]
            } 
          : skill
      )
    }))
  }

  // LogBook functions
  const addLogEntry = (entry) => {
    setUserData(prevData => ({
      ...prevData,
      logs: [...prevData.logs, {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...entry
      }]
    }))
  }

  const updateLogEntry = (logId, updatedData) => {
    setUserData(prevData => ({
      ...prevData,
      logs: prevData.logs.map(log => 
        log.id === logId ? { ...log, ...updatedData } : log
      )
    }))
  }

  const deleteLogEntry = (logId) => {
    setUserData(prevData => ({
      ...prevData,
      logs: prevData.logs.filter(log => log.id !== logId)
    }))
  }

  // Daily task functions
  const addDailyTask = (task) => {
    setUserData(prevData => ({
      ...prevData,
      dailyTasks: [...prevData.dailyTasks, {
        id: Date.now().toString(),
        completed: false,
        date: new Date().toISOString(),
        ...task
      }]
    }))
  }

  const updateDailyTask = (taskId, updatedData) => {
    setUserData(prevData => ({
      ...prevData,
      dailyTasks: prevData.dailyTasks.map(task => 
        task.id === taskId ? { ...task, ...updatedData } : task
      )
    }))
  }

  const deleteDailyTask = (taskId) => {
    setUserData(prevData => ({
      ...prevData,
      dailyTasks: prevData.dailyTasks.filter(task => task.id !== taskId)
    }))
  }

  // Resource functions
  const addResource = (resource) => {
    setUserData(prevData => ({
      ...prevData,
      resources: [...prevData.resources, {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...resource
      }]
    }))
  }

  const deleteResource = (resourceId) => {
    setUserData(prevData => ({
      ...prevData,
      resources: prevData.resources.filter(resource => resource.id !== resourceId)
    }))
  }

  const value = {
    userData,
    isInitialized,
    initializeData,
    login,
    logout,
    addSkill,
    updateSkill,
    deleteSkill,
    addLogToSkill,
    addLogEntry,
    updateLogEntry,
    deleteLogEntry,
    addDailyTask,
    updateDailyTask,
    deleteDailyTask,
    addResource,
    deleteResource
  }

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}