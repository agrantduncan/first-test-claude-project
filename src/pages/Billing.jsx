import { useState } from 'react'
import { Plus, Download, Search, X, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { billingEntries as initialEntries } from '../data/mockData'

const STATUS_STYLE = {
  Paid: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Overdue: 'bg-red-500/10 text-red-600 dark:text-red-400',
}

function exportCSV(data) {
  const headers = ['ID', 'Date', 'Client', 'Case', 'Description', 'Hours', 'Rate', 'Amount', 'Status', 'Attorney']
  const rows = data.map(b => [b.id, b.date, b.client, b.case, b.description, b.hours, b.rate, b.amount, b.status, b.attorney])
  const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'billing.csv'; a.click()
  URL.revokeObjectURL(url)
}

const today = new Date().toISOString().split('T')[0]
const emptyForm = { date: today, client: '', case: '', description: '', hours: '', rate: '400', attorney: '', status: 'Pending' }

export default function Billing() {
  const [entries, setEntries] = useState(initialEntries)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const filtered = entries.filter(e => {
    const q = search.toLowerCase()
    return (e.client.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)) &&
      (filterStatus === 'All' || e.status === filterStatus)
  })

  function handleAdd(ev) {
    ev.preventDefault()
    const hours = Number(form.hours)
    const rate = Number(form.rate)
    setEntries([{
      id: `B-${String(entries.length + 1).padStart(3, '0')}`,
      ...form, hours, rate, amount: hours * rate,
    }, ...entries])
    setShowModal(false)
    setForm(emptyForm)
  }

  const totalBilled = entries.reduce((s, e) => s + e.amount, 0)
  const totalPaid = entries.filter(e => e.status === 'Paid').reduce((s, e) => s + e.amount, 0)
  const totalPending = entries.filter(e => e.status === 'Pending').reduce((s, e) => s + e.amount, 0)
  const totalHours = entries.reduce((s, e) => s + e.hours, 0)

  const summaryCards = [
    { label: 'Total Billed', value: `$${totalBilled.toLocaleString()}`, icon: TrendingUp, color: 'text-gray-900 dark:text-white', bg: 'bg-violet-500/10', iconColor: 'text-violet-600 dark:text-violet-400' },
    { label: 'Collected', value: `$${totalPaid.toLocaleString()}`, icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', iconColor: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Pending', value: `$${totalPending.toLocaleString()}`, icon: AlertCircle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10', iconColor: 'text-amber-600 dark:text-amber-400' },
    { label: 'Total Hours', value: `${totalHours.toFixed(1)}h`, icon: Clock, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', iconColor: 'text-blue-600 dark:text-blue-400' },
  ]

  const inputCls = 'w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500 placeholder-gray-400 dark:placeholder-slate-600'
  const selectCls = 'w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500'

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">{entries.length} time entries</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => exportCSV(filtered)} className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition text-sm">
            <Download size={14} /> Export CSV
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition text-sm font-medium">
            <Plus size={14} /> Log Time
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {summaryCards.map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-500 dark:text-slate-400 text-xs">{s.label}</p>
                <div className={`w-7 h-7 ${s.bg} rounded-lg flex items-center justify-center`}>
                  <Icon size={13} className={s.iconColor} />
                </div>
              </div>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search billing entries..."
            className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-violet-500" />
        </div>
        <div className="flex items-center gap-1.5">
          {['All', 'Paid', 'Pending', 'Overdue'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${filterStatus === s ? 'bg-violet-600 text-white' : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-700">
              {['Date', 'Client', 'Case', 'Description', 'Hours', 'Rate', 'Amount', 'Attorney', 'Status'].map(h => (
                <th key={h} className="text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60">
            {filtered.map(e => (
              <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition">
                <td className="px-4 py-3.5 text-gray-400 dark:text-slate-500 text-sm">{e.date}</td>
                <td className="px-4 py-3.5 text-gray-900 dark:text-white text-sm font-medium">{e.client}</td>
                <td className="px-4 py-3.5 text-gray-500 dark:text-slate-400 text-sm">{e.case}</td>
                <td className="px-4 py-3.5 text-gray-700 dark:text-slate-300 text-sm max-w-[180px] truncate">{e.description}</td>
                <td className="px-4 py-3.5 text-gray-900 dark:text-white text-sm">{e.hours}h</td>
                <td className="px-4 py-3.5 text-gray-500 dark:text-slate-400 text-sm">${e.rate}/hr</td>
                <td className="px-4 py-3.5 text-gray-900 dark:text-white text-sm font-semibold">${e.amount.toLocaleString()}</td>
                <td className="px-4 py-3.5 text-gray-700 dark:text-slate-300 text-sm">{e.attorney}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLE[e.status]}`}>{e.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 dark:text-slate-500 py-12 text-sm">No entries found</p>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-gray-900 dark:text-white font-semibold text-lg">Log Time Entry</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-white transition"><X size={18} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Date</label>
                  <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Client *</label>
                  <input required value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} className={inputCls} placeholder="Client name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Case ID</label>
                  <input value={form.case} onChange={e => setForm({ ...form, case: e.target.value })} className={inputCls} placeholder="e.g. C-001" />
                </div>
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Attorney</label>
                  <input value={form.attorney} onChange={e => setForm({ ...form, attorney: e.target.value })} className={inputCls} placeholder="Attorney name" />
                </div>
              </div>
              <div>
                <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Description *</label>
                <input required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputCls} placeholder="Work performed..." />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Hours *</label>
                  <input required type="number" step="0.25" min="0" value={form.hours} onChange={e => setForm({ ...form, hours: e.target.value })} className={inputCls} placeholder="0.0" />
                </div>
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Rate ($/hr)</label>
                  <input type="number" value={form.rate} onChange={e => setForm({ ...form, rate: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={selectCls}>
                    {['Pending', 'Paid', 'Overdue'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-1">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500 dark:text-slate-400 text-sm hover:text-gray-900 dark:hover:text-white transition">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-500 transition font-medium">Log Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
