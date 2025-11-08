
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import StreakProvider from './context/StreakContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StreakProvider>
    <App />
  </StreakProvider>
)
