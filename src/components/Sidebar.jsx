import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Briefcase, Users, FileText, DollarSign, Scale, Settings } from 'lucide-react'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/cases', icon: Briefcase, label: 'Cases' },
  { path: '/clients', icon: Users, label: 'Clients' },
  { path: '/documents', icon: FileText, label: 'Documents' },
  { path: '/billing', icon: DollarSign, label: 'Billing' },
]

export default function Sidebar() {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setPopoverOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <aside className="w-60 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col flex-shrink-0">
      <div className="p-5 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <Scale size={15} className="text-white" />
          </div>
          <div>
            <h1 className="text-gray-900 dark:text-white font-bold text-base leading-none">LexCore</h1>
            <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5">Legal Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                isActive
                  ? 'bg-violet-600 text-white font-medium'
                  : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-200 dark:border-slate-700" ref={popoverRef}>
        {popoverOpen && (
          <div className="mb-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden">
            <NavLink
              to="/settings"
              onClick={() => setPopoverOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm transition ${
                  isActive
                    ? 'bg-violet-600 text-white'
                    : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`
              }
            >
              <Settings size={15} />
              Settings
            </NavLink>
          </div>
        )}

        <button
          onClick={() => setPopoverOpen(o => !o)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition group"
        >
          <div className="w-7 h-7 bg-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            SC
          </div>
          <div className="min-w-0 text-left">
            <p className="text-gray-900 dark:text-white text-sm font-medium truncate">Sarah Chen</p>
            <p className="text-gray-500 dark:text-slate-400 text-xs">Senior Attorney</p>
          </div>
        </button>
      </div>
    </aside>
  )
}
