import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Cases from './pages/Cases'
import Clients from './pages/Clients'
import Documents from './pages/Documents'
import Billing from './pages/Billing'
import Settings from './pages/Settings'

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-slate-900 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/billing" element={<Billing />} />
          <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}
