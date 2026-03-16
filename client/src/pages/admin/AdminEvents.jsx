import { useEffect, useState } from 'react'
import { eventsApi } from '../../api/admin'
import { toast } from '../../components/admin/Toast'

export default function AdminEvents() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', date: '', location: '', description: '', image: '' })

  const load = () => {
    setLoading(true)
    eventsApi.list().then(setList).catch(() => toast('Failed to load', 'error')).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openCreate = () => {
    setEditing('new')
    setForm({ title: '', date: '', location: '', description: '', image: '' })
  }
  const openEdit = (e) => {
    setEditing(e.id)
    setForm({ title: e.title, date: e.date || '', location: e.location || '', description: e.description || '', image: e.image || '' })
  }
  const closeForm = () => setEditing(null)

  const save = async () => {
    try {
      if (editing === 'new') await eventsApi.create(form)
      else await eventsApi.update(editing, form)
      toast(editing === 'new' ? 'Event created' : 'Event updated')
      closeForm()
      load()
    } catch {
      toast('Failed to save', 'error')
    }
  }

  const remove = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    try {
      await eventsApi.delete(id)
      toast('Event deleted')
      load()
    } catch {
      toast('Failed to delete', 'error')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events</h1>
        <button type="button" onClick={openCreate} className="px-4 py-2 rounded-lg bg-nature text-white font-medium hover:bg-nature-dark">Create Event</button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{editing === 'new' ? 'New Event' : 'Edit Event'}</h2>
            <div className="space-y-3">
              <input placeholder="Event Name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={3} />
              <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="button" onClick={save} className="px-4 py-2 rounded-lg bg-nature text-white font-medium">Save</button>
              <button type="button" onClick={closeForm} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? <p className="p-8 text-center text-gray-500">Loading...</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-700"><tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Location</th><th className="px-4 py-3 w-28">Actions</th></tr></thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {list.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{e.title}</td>
                    <td className="px-4 py-3">{e.date}</td>
                    <td className="px-4 py-3">{e.location}</td>
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => openEdit(e)} className="text-nature hover:underline mr-2">Edit</button>
                      <button type="button" onClick={() => remove(e.id, e.title)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
