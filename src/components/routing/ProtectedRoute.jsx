import { Navigate } from 'react-router-dom'
import { useUserData } from '../../contexts/UserDataContext'

function ProtectedRoute({ children }) {
  const { userData, isInitialized } = useUserData()
  
  // Wait until data is initialized from localStorage
  if (!isInitialized) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  }
  
  if (!userData.isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default ProtectedRoute