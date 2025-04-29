import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import SkillsPage from './pages/SkillsPage'
import LogBookPage from './pages/LogBookPage'
import CalendarPage from './pages/CalendarPage'
import ResourcesPage from './pages/ResourcesPage'

// Components
import ProtectedRoute from './components/routing/ProtectedRoute'
import Layout from './components/layout/Layout'
import NotFoundPage from './pages/NotFoundPage'

// Hooks
import { useUserData } from './contexts/UserDataContext'

function App() {
  const location = useLocation()
  const { initializeData } = useUserData()
  
  useEffect(() => {
    // Initialize user data from localStorage
    initializeData()
  }, [initializeData])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<Layout />}>
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/skills" 
            element={
              <ProtectedRoute>
                <SkillsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/logbook" 
            element={
              <ProtectedRoute>
                <LogBookPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/calendar" 
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/resources" 
            element={
              <ProtectedRoute>
                <ResourcesPage />
              </ProtectedRoute>
            } 
          />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App