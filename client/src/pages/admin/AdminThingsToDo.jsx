import { useEffect, useState, useRef } from 'react'
import { activitiesApi, uploadFile } from '../../api/admin'
import { toast } from '../../components/admin/Toast'

const DEFAULT_ICONS = ['🌿', '🎭', '🛶', '🛒', '🏘️', '📷', '✨', '🏞️', '🍽️', '👣']

export default function AdminThingsToDo() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({ title: '', description: '', icon: '✨', image: '', sort_order: 0 })

  const load = () => {
    setLoading(true)
    activitiesApi.list().then(setList).catch(() => toast('Failed to load', 'error')).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openCreate = () => {
    setEditing('new')
    setForm({ title: '', description: '', icon: '✨', image: '', sort_order: list.length })
  }
  const openEdit = (a) => {
    setEditing(a.id)
    setForm({ title: a.title, description: a.description || '', icon: a.icon || '✨', image: a.image || '', sort_order: a.sort_order ?? 0 })
  }
  const closeForm = () => setEditing(null)

  const save = async () => {
    if (!form.title?.trim()) {
      toast('Title is required', 'error')
      return
    }
    try {
      if (editing === 'new') await activitiesApi.create(form)
      else await activitiesApi.update(editing, form)
      toast(editing === 'new' ? 'Activity added' : 'Activity updated')
      closeForm()
      load()
    } catch {
      toast('Failed to save', 'error')
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) {
      toast('Please select an image file', 'error')
      return
    }
    setUploading(true)
    try {
      const url = await uploadFile(file)
      setForm((f) => ({ ...f, image: url }))
      toast('Image uploaded')
    } catch {
      toast('Upload failed', 'error')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const remove = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    try {
      await activitiesApi.delete(id)
      toast('Activity deleted')
      load()
    } catch {
      toast('Failed to delete', 'error')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Things To Do</h1>
        <button type="button" onClick={openCreate} className="px-4 py-2 rounded-lg bg-nature text-white font-medium hover:bg-nature-dark">Add Activity</button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{editing === 'new' ? 'New Activity' : 'Edit Activity'}</h2>
            <div className="space-y-3">
              <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={3} />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon (emoji)</label>
                <div className="flex flex-wrap gap-2 mb-1">
                  {DEFAULT_ICONS.map((emoji) => (
                    <button key={emoji} type="button" onClick={() => setForm({ ...form, icon: emoji })} className={`text-2xl p-1 rounded-lg border ${form.icon === emoji ? 'border-nature dark:border-lake-light bg-nature/10' : 'border-gray-200 dark:border-gray-600'}`}>
                      {emoji}
                    </button>
                  ))}
                </div>
                <input placeholder="Or type emoji" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value || '✨' })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xl" maxLength={4} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image</label>
                {form.image && (
                  <div className="mb-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                    <img src={form.image} alt="" className="w-full h-24 object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                  </div>
                )}
                <div className="flex gap-2 flex-wrap items-center">
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="px-3 py-2 rounded-lg border border-nature dark:border-lake-light text-nature dark:text-lake-light text-sm font-medium hover:bg-nature/10 disabled:opacity-50">
                    {uploading ? 'Uploading…' : 'Upload image'}
                  </button>
                  <span className="text-xs text-gray-500 dark:text-gray-400">or paste URL</span>
                </div>
                <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full mt-1.5 px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort order (0 = first)</label>
                <input type="number" min={0} value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value, 10) || 0 })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button type="button" onClick={save} className="px-4 py-2 rounded-lg bg-nature text-white font-medium">Save</button>
              <button type="button" onClick={closeForm} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 dark:text-white">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-gray-500">Loading...</p>
        ) : list.length === 0 ? (
          <p className="p-8 text-center text-gray-500 dark:text-gray-400">No activities yet. Add one to show on the Things To Do page.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-3 w-12">#</th>
                  <th className="px-4 py-3 w-12">Icon</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Description</th>
                  <th className="px-4 py-3 w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {list.map((a, i) => (
                  <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 text-gray-500">{a.sort_order ?? i + 1}</td>
                    <td className="px-4 py-3 text-2xl">{a.icon || '✨'}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{a.title}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300 hidden sm:table-cell max-w-xs truncate">{a.description}</td>
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => openEdit(a)} className="text-nature dark:text-lake-light hover:underline mr-2">Edit</button>
                      <button type="button" onClick={() => remove(a.id, a.title)} className="text-red-600 hover:underline">Delete</button>
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
