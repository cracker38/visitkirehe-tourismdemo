import { useEffect, useState } from 'react'
import { messagesApi } from '../../api/admin'
import { toast } from '../../components/admin/Toast'

export default function AdminMessages() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const load = () => {
    setLoading(true)
    messagesApi.list().then(setList).catch(() => toast('Failed to load', 'error')).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const markRead = async (m) => {
    try {
      await messagesApi.update(m.id, { read: true })
      load()
    } catch {
      toast('Failed to update', 'error')
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      await messagesApi.delete(id)
      toast('Message deleted')
      load()
    } catch {
      toast('Failed to delete', 'error')
    }
  }

  const filtered = list.filter(
    (m) => !search || m.name?.toLowerCase().includes(search.toLowerCase()) || m.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Messages</h1>
        <input type="search" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm max-w-xs" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? <p className="p-8 text-center text-gray-500">Loading...</p> : filtered.length === 0 ? (
          <p className="p-8 text-center text-gray-500">No messages yet.</p>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filtered.map((m) => (
              <div key={m.id} className={`p-4 ${m.read ? 'bg-gray-50/50 dark:bg-gray-800/50' : ''}`}>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{m.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{m.email}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{m.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{m.date ? new Date(m.date).toLocaleString() : ''}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {!m.read && (
                      <button type="button" onClick={() => markRead(m)} className="px-2 py-1 text-xs rounded bg-nature text-white">Mark read</button>
                    )}
                    <button type="button" onClick={() => remove(m.id)} className="px-2 py-1 text-xs rounded bg-red-100 dark:bg-red-900/30 text-red-600">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
