
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import StreakProvider from './context/StreakContext.tsx'
import DashboardProvider from './context/DashboardContext.tsx'

createRoot(document.getElementById('root')!).render(
  <DashboardProvider>
    <StreakProvider>
      <App />
    </StreakProvider>
  </DashboardProvider>
)
