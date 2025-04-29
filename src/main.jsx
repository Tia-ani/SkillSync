import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './contexts/ThemeContext'
import { UserDataProvider } from './contexts/UserDataContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)