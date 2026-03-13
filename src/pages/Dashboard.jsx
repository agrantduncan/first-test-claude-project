import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { Briefcase, Users, TrendingUp, Clock, ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react'
import { cases, monthlyRevenue, casesByStatus, upcomingDeadlines } from '../data/mockData'
import { useTheme } from '../ThemeContext'

const statCards = [
  { label: 'Active Cases', value: '6', change: '+2 this month', trend: 'up', icon: Briefcase, bg: 'bg-violet-500/10', iconColor: 'text-violet-500' },
  { label: 'Total Clients', value: '10', change: '+1 this month', trend: 'up', icon: Users, bg: 'bg-blue-500/10', iconColor: 'text-blue-500' },
  { label: 'Revenue MTD', value: '$48,100', change: '-22% vs last month', trend: 'down', icon: TrendingUp, bg: 'bg-emerald-500/10', iconColor: 'text-emerald-500' },
  { label: 'Billable Hours', value: '34.5h', change: '+8.2h this week', trend: 'up', icon: Clock, bg: 'bg-amber-500/10', iconColor: 'text-amber-500' },
]

export default function Dashboard() {
  const { isDark } = useTheme()
  const recentCases = cases.slice(0, 5)

  const gridColor = isDark ? '#1e293b' : '#f1f5f9'
  const axisColor = isDark ? '#94a3b8' : '#94a3b8'
  const tooltipStyle = {
    background: isDark ? '#1e293b' : '#ffffff',
    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
    borderRadius: '8px',
    fontSize: '12px',
    color: isDark ? '#fff' : '#0f172a',
  }

  return (
    <div className="p-8">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Wednesday, March 20, 2024</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-9 h-9 ${card.bg} rounded-lg flex items-center justify-center`}>
                  <Icon size={16} className={card.iconColor} />
                </div>
                {card.trend === 'up'
                  ? <ArrowUpRight size={14} className="text-emerald-500" />
                  : <ArrowDownRight size={14} className="text-red-500" />
                }
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5">{card.label}</p>
              <p className={`text-xs mt-1.5 ${card.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {card.change}
              </p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-gray-900 dark:text-white font-semibold">Revenue Overview</h2>
              <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5">Last 6 months</p>
            </div>
            <span className="text-xs bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 rounded-full px-3 py-1">Monthly</span>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={monthlyRevenue} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" stroke="transparent" tick={{ fill: axisColor, fontSize: 11 }} />
              <YAxis stroke="transparent" tick={{ fill: axisColor, fontSize: 11 }} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={v => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2} fill="url(#grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <h2 className="text-gray-900 dark:text-white font-semibold mb-1">Cases by Status</h2>
          <p className="text-gray-500 dark:text-slate-400 text-xs mb-4">Current distribution</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={casesByStatus} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value">
                {casesByStatus.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {casesByStatus.map(item => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-gray-500 dark:text-slate-400">{item.name}</span>
                </div>
                <span className="text-gray-900 dark:text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 dark:text-white font-semibold">Recent Cases</h2>
            <a href="/cases" className="text-violet-600 dark:text-violet-400 text-xs hover:opacity-80 transition">View all →</a>
          </div>
          <div className="space-y-1">
            {recentCases.map(c => (
              <div key={c.id} className="flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-slate-700/60 last:border-0">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-900 dark:text-white text-sm font-medium truncate">{c.title}</p>
                  <p className="text-gray-400 dark:text-slate-500 text-xs mt-0.5">{c.id} · {c.attorney}</p>
                </div>
                <span className={`ml-3 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                  c.status === 'Active' ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400' :
                  c.status === 'Pending' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 dark:text-white font-semibold">Upcoming Deadlines</h2>
            <span className="bg-red-500/10 text-red-500 text-xs px-2 py-0.5 rounded-full border border-red-500/20">
              {upcomingDeadlines.filter(d => d.priority === 'High').length} urgent
            </span>
          </div>
          <div className="space-y-1">
            {upcomingDeadlines.map(d => (
              <div key={d.id} className="flex items-start gap-3 py-2.5 border-b border-gray-100 dark:border-slate-700/60 last:border-0">
                <AlertTriangle size={13} className={`flex-shrink-0 mt-0.5 ${d.priority === 'High' ? 'text-red-500' : 'text-amber-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-white text-sm font-medium">{d.task}</p>
                  <p className="text-gray-400 dark:text-slate-500 text-xs mt-0.5 truncate">{d.case}</p>
                </div>
                <span className="text-gray-400 dark:text-slate-500 text-xs flex-shrink-0 mt-0.5">{d.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
