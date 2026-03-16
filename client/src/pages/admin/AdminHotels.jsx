import { useEffect, useState } from 'react'
import { accommodationsApi } from '../../api/admin'
import { toast } from '../../components/admin/Toast'

export default function AdminHotels() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', location: '', description: '', priceRange: '$$', contact: '', image: '' })

  const load = () => {
    setLoading(true)
    accommodationsApi.list().then(setList).catch(() => toast('Failed to load', 'error')).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const filtered = list.filter(
    (h) => !search || h.name?.toLowerCase().includes(search.toLowerCase()) || h.location?.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setEditing('new')
    setForm({ name: '', location: '', description: '', priceRange: '$$', contact: '', image: '' })
  }
  const openEdit = (h) => {
    setEditing(h.id)
    setForm({ name: h.name, location: h.location || '', description: h.description || '', priceRange: h.priceRange || '$$', contact: h.contact || '', image: h.image || '' })
  }
  const closeForm = () => setEditing(null)

  const save = async () => {
    try {
      if (editing === 'new') await accommodationsApi.create(form)
      else await accommodationsApi.update(editing, form)
      toast(editing === 'new' ? 'Hotel added' : 'Hotel updated')
      closeForm()
      load()
    } catch {
      toast('Failed to save', 'error')
    }
  }

  const remove = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return
    try {
      await accommodationsApi.delete(id)
      toast('Hotel deleted')
      load()
    } catch {
      toast('Failed to delete', 'error')
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hotels / Accommodation</h1>
        <div className="flex gap-2">
          <input type="search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm" />
          <button type="button" onClick={openCreate} className="px-4 py-2 rounded-lg bg-nature text-white font-medium hover:bg-nature-dark">Add Hotel</button>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{editing === 'new' ? 'New Hotel' : 'Edit Hotel'}</h2>
            <div className="space-y-3">
              <input placeholder="Hotel Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
              <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={2} />
              <select value={form.priceRange} onChange={(e) => setForm({ ...form, priceRange: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="$">$</option><option value="$$">$$</option><option value="$$$">$$$</option>
              </select>
              <input placeholder="Contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
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
              <thead className="bg-gray-50 dark:bg-gray-700"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Price</th><th className="px-4 py-3 w-28">Actions</th></tr></thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filtered.map((h) => (
                  <tr key={h.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{h.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{h.location}</td>
                    <td className="px-4 py-3">{h.priceRange}</td>
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => openEdit(h)} className="text-nature hover:underline mr-2">Edit</button>
                      <button type="button" onClick={() => remove(h.id, h.name)} className="text-red-600 hover:underline">Delete</button>
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
