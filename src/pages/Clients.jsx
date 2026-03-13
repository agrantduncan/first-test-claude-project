import { useState } from 'react'
import { Plus, Download, Upload, Search, X, Building2, User } from 'lucide-react'
import { clients as initialClients } from '../data/mockData'

function exportCSV(data) {
  const headers = ['ID', 'Name', 'Type', 'Email', 'Phone', 'Cases', 'Since', 'Status']
  const rows = data.map(c => [c.id, c.name, c.type, c.email, c.phone, c.cases, c.since, c.status])
  const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'clients.csv'; a.click()
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

const emptyForm = { name: '', type: 'Individual', email: '', phone: '' }

export default function Clients() {
  const [clients, setClients] = useState(initialClients)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const filtered = clients.filter(c => {
    const q = search.toLowerCase()
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  })

  function handleAdd(e) {
    e.preventDefault()
    setClients([{
      id: `CL-${String(clients.length + 1).padStart(3, '0')}`,
      ...form,
      cases: 0,
      since: new Date().toISOString().split('T')[0],
      status: 'Active',
    }, ...clients])
    setShowModal(false)
    setForm(emptyForm)
  }

  function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const imported = parseCSV(ev.target.result).map((row, i) => ({
        id: row.id || `CL-IMP-${i + 1}`,
        name: row.name || '',
        type: row.type || 'Individual',
        email: row.email || '',
        phone: row.phone || '',
        cases: Number(row.cases) || 0,
        since: row.since || new Date().toISOString().split('T')[0],
        status: row.status || 'Active',
      }))
      setClients(prev => [...imported, ...prev])
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const inputCls = 'w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500 placeholder-gray-400 dark:placeholder-slate-600'
  const selectCls = 'w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500'

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clients</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">{clients.length} total clients</p>
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
            <Plus size={14} /> New Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total', value: clients.length, color: 'text-gray-900 dark:text-white' },
          { label: 'Active', value: clients.filter(c => c.status === 'Active').length, color: 'text-violet-600 dark:text-violet-400' },
          { label: 'Corporate', value: clients.filter(c => c.type === 'Corporate').length, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Individual', value: clients.filter(c => c.type === 'Individual').length, color: 'text-emerald-600 dark:text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
            <p className="text-gray-500 dark:text-slate-400 text-xs">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="relative max-w-xs mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..."
          className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-violet-500" />
      </div>

      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-700">
              {['Client', 'Type', 'Email', 'Phone', 'Cases', 'Since', 'Status'].map(h => (
                <th key={h} className="text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {c.type === 'Corporate'
                        ? <Building2 size={13} className="text-violet-600 dark:text-violet-400" />
                        : <User size={13} className="text-violet-600 dark:text-violet-400" />
                      }
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white text-sm font-medium">{c.name}</p>
                      <p className="text-gray-400 dark:text-slate-500 text-xs">{c.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.type === 'Corporate' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-violet-500/10 text-violet-600 dark:text-violet-400'}`}>
                    {c.type}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-gray-700 dark:text-slate-300 text-sm">{c.email}</td>
                <td className="px-5 py-3.5 text-gray-700 dark:text-slate-300 text-sm">{c.phone}</td>
                <td className="px-5 py-3.5 text-gray-900 dark:text-white text-sm font-medium">{c.cases}</td>
                <td className="px-5 py-3.5 text-gray-400 dark:text-slate-500 text-sm">{c.since}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-gray-100 dark:bg-slate-600/50 text-gray-500 dark:text-slate-400'}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 dark:text-slate-500 py-12 text-sm">No clients found</p>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-gray-900 dark:text-white font-semibold text-lg">New Client</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-white transition"><X size={18} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Full Name / Company *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Name or company" />
              </div>
              <div>
                <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={selectCls}>
                  <option>Individual</option>
                  <option>Corporate</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="email@example.com" />
              </div>
              <div>
                <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Phone</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="(555) 000-0000" />
              </div>
              <div className="flex justify-end gap-3 pt-1">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500 dark:text-slate-400 text-sm hover:text-gray-900 dark:hover:text-white transition">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-500 transition font-medium">Add Client</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
