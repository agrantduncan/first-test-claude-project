import { useState } from 'react'
import { Plus, Download, Upload, Search, X } from 'lucide-react'
import { cases as initialCases } from '../data/mockData'

const STATUS_STYLE = {
  Active: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  Pending: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Closed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
}
const TYPE_STYLE = {
  Litigation: 'bg-red-500/10 text-red-600 dark:text-red-400',
  Corporate: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'Real Estate': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Estate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Family: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  Immigration: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
}

function exportCSV(data) {
  const headers = ['ID', 'Title', 'Client', 'Type', 'Status', 'Attorney', 'Opened', 'Value']
  const rows = data.map(c => [c.id, c.title, c.client, c.type, c.status, c.attorney, c.opened, c.value])
  const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'cases.csv'; a.click()
  URL.revokeObjectURL(url)
}

function parseCSV(text) {
  const lines = text.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase())
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.replace(/"/g, '').trim())
    return Object.fromEntries(headers.map((h, i) => [h, values[i] || '']))
  })
}

const emptyForm = { title: '', client: '', type: 'Litigation', status: 'Active', attorney: '', value: '', description: '' }

export default function Cases() {
  const [cases, setCases] = useState(initialCases)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const filtered = cases.filter(c => {
    const q = search.toLowerCase()
    return (c.title.toLowerCase().includes(q) || c.client.toLowerCase().includes(q)) &&
      (filterStatus === 'All' || c.status === filterStatus)
  })

  function handleAdd(e) {
    e.preventDefault()
    setCases([{
      id: `C-${String(cases.length + 1).padStart(3, '0')}`,
      ...form,
      value: Number(form.value) || 0,
      opened: new Date().toISOString().split('T')[0],
    }, ...cases])
    setShowModal(false)
    setForm(emptyForm)
  }

  function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const imported = parseCSV(ev.target.result).map((row, i) => ({
        id: row.id || `C-IMP-${i + 1}`,
        title: row.title || '',
        client: row.client || '',
        type: row.type || 'Litigation',
        status: row.status || 'Active',
        attorney: row.attorney || '',
        opened: row.opened || new Date().toISOString().split('T')[0],
        value: Number(row.value) || 0,
        description: row.description || '',
      }))
      setCases(prev => [...imported, ...prev])
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const stats = {
    active: cases.filter(c => c.status === 'Active').length,
    pending: cases.filter(c => c.status === 'Pending').length,
    closed: cases.filter(c => c.status === 'Closed').length,
    value: cases.reduce((sum, c) => sum + (Number(c.value) || 0), 0),
  }

  const inputCls = 'w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500 placeholder-gray-400 dark:placeholder-slate-600'
  const selectCls = 'w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500'

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cases</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">{cases.length} total cases</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition text-sm">
            <Upload size={14} /> Import CSV
            <input type="file" accept=".csv" className="hidden" onChange={handleImport} />
          </label>
          <button onClick={() => exportCSV(filtered)} className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition text-sm">
            <Download size={14} /> Export CSV
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition text-sm font-medium">
            <Plus size={14} /> New Case
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Active', value: stats.active, color: 'text-violet-600 dark:text-violet-400' },
          { label: 'Pending', value: stats.pending, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Closed', value: stats.closed, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Total Value', value: `$${stats.value.toLocaleString()}`, color: 'text-gray-900 dark:text-white' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
            <p className="text-gray-500 dark:text-slate-400 text-xs">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cases or clients..."
            className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-violet-500" />
        </div>
        <div className="flex items-center gap-1.5">
          {['All', 'Active', 'Pending', 'Closed'].map(s => (
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
              {['Case', 'Client', 'Type', 'Status', 'Attorney', 'Value', 'Opened'].map(h => (
                <th key={h} className="text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition">
                <td className="px-5 py-3.5">
                  <p className="text-gray-900 dark:text-white text-sm font-medium">{c.title}</p>
                  <p className="text-gray-400 dark:text-slate-500 text-xs mt-0.5">{c.id}</p>
                </td>
                <td className="px-5 py-3.5 text-gray-700 dark:text-slate-300 text-sm">{c.client}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_STYLE[c.type] || 'bg-gray-100 text-gray-600'}`}>{c.type}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLE[c.status]}`}>{c.status}</span>
                </td>
                <td className="px-5 py-3.5 text-gray-700 dark:text-slate-300 text-sm">{c.attorney}</td>
                <td className="px-5 py-3.5 text-gray-900 dark:text-white text-sm font-medium">${Number(c.value).toLocaleString()}</td>
                <td className="px-5 py-3.5 text-gray-400 dark:text-slate-500 text-sm">{c.opened}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 dark:text-slate-500 py-12 text-sm">No cases found</p>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-gray-900 dark:text-white font-semibold text-lg">New Case</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-white transition"><X size={18} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Case Title *</label>
                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="e.g. Smith v. Johnson Corp" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Client *</label>
                  <input required value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} className={inputCls} placeholder="Client name" />
                </div>
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Attorney *</label>
                  <input required value={form.attorney} onChange={e => setForm({ ...form, attorney: e.target.value })} className={inputCls} placeholder="Attorney name" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={selectCls}>
                    {['Litigation', 'Corporate', 'Real Estate', 'Estate', 'Family', 'Immigration'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={selectCls}>
                    {['Active', 'Pending', 'Closed'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Est. Value ($)</label>
                  <input type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} className={inputCls} placeholder="0" />
                </div>
              </div>
              <div>
                <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2}
                  className={`${inputCls} resize-none`} placeholder="Brief case description..." />
              </div>
              <div className="flex justify-end gap-3 pt-1">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500 dark:text-slate-400 text-sm hover:text-gray-900 dark:hover:text-white transition">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-500 transition font-medium">Create Case</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
