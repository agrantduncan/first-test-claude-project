import { useState } from 'react'
import { Upload, Download, Search, X, FileText, File, FileArchive } from 'lucide-react'
import { documents as initialDocuments } from '../data/mockData'

const TYPE_STYLE = {
  Pleading: 'bg-red-500/10 text-red-600 dark:text-red-400',
  Will: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Agreement: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Evidence: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  Filing: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  Report: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
}
const STATUS_STYLE = {
  Final: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Draft: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Review: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
}

function exportCSV(data) {
  const headers = ['ID', 'Name', 'Case', 'Type', 'Uploaded', 'Size', 'Attorney', 'Status']
  const rows = data.map(d => [d.id, d.name, d.case, d.type, d.uploaded, d.size, d.attorney, d.status])
  const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'documents.csv'; a.click()
  URL.revokeObjectURL(url)
}

function FileIcon({ name }) {
  const cls = 'text-gray-400 dark:text-slate-400'
  if (name?.endsWith('.zip')) return <FileArchive size={13} className={cls} />
  if (name?.endsWith('.pdf')) return <FileText size={13} className={cls} />
  return <File size={13} className={cls} />
}

const emptyForm = { name: '', case: '', type: 'Agreement', attorney: '', status: 'Draft' }

export default function Documents() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const filtered = documents.filter(d => {
    const q = search.toLowerCase()
    return d.name.toLowerCase().includes(q) || d.case.toLowerCase().includes(q)
  })

  function handleUpload(e) {
    e.preventDefault()
    setDocuments([{
      id: `D-${String(documents.length + 1).padStart(3, '0')}`,
      ...form,
      uploaded: new Date().toISOString().split('T')[0],
      size: '—',
    }, ...documents])
    setShowModal(false)
    setForm(emptyForm)
  }

  const stats = {
    total: documents.length,
    final: documents.filter(d => d.status === 'Final').length,
    review: documents.filter(d => d.status === 'Review').length,
    draft: documents.filter(d => d.status === 'Draft').length,
  }

  const inputCls = 'w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500 placeholder-gray-400 dark:placeholder-slate-600'
  const selectCls = 'w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500'

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">{documents.length} total documents</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => exportCSV(filtered)} className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition text-sm">
            <Download size={14} /> Export CSV
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition text-sm font-medium">
            <Upload size={14} /> Upload Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total', value: stats.total, color: 'text-gray-900 dark:text-white' },
          { label: 'Final', value: stats.final, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'In Review', value: stats.review, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Draft', value: stats.draft, color: 'text-amber-600 dark:text-amber-400' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
            <p className="text-gray-500 dark:text-slate-400 text-xs">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="relative max-w-xs mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..."
          className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-violet-500" />
      </div>

      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-700">
              {['Document', 'Case', 'Type', 'Attorney', 'Uploaded', 'Size', 'Status'].map(h => (
                <th key={h} className="text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60">
            {filtered.map(d => (
              <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileIcon name={d.name} />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white text-sm font-medium">{d.name}</p>
                      <p className="text-gray-400 dark:text-slate-500 text-xs">{d.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-gray-700 dark:text-slate-300 text-sm">{d.case}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_STYLE[d.type] || 'bg-gray-100 text-gray-600'}`}>{d.type}</span>
                </td>
                <td className="px-5 py-3.5 text-gray-700 dark:text-slate-300 text-sm">{d.attorney}</td>
                <td className="px-5 py-3.5 text-gray-400 dark:text-slate-500 text-sm">{d.uploaded}</td>
                <td className="px-5 py-3.5 text-gray-400 dark:text-slate-500 text-sm">{d.size}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLE[d.status] || 'bg-gray-100 text-gray-600'}`}>{d.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 dark:text-slate-500 py-12 text-sm">No documents found</p>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-gray-900 dark:text-white font-semibold text-lg">Upload Document</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-white transition"><X size={18} /></button>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Document Name *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="e.g. Contract_v1.pdf" />
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={selectCls}>
                    {['Agreement', 'Pleading', 'Will', 'Evidence', 'Filing', 'Report'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 dark:text-slate-400 text-xs block mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={selectCls}>
                    {['Draft', 'Review', 'Final'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-1">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500 dark:text-slate-400 text-sm hover:text-gray-900 dark:hover:text-white transition">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-500 transition font-medium">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
