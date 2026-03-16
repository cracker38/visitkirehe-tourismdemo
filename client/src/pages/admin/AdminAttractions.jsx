import { useEffect, useState, useRef } from 'react'
import { attractionsApi, uploadFile } from '../../api/admin'
import { resolveMediaUrl } from '../../api/apiUrl'
import { toast } from '../../components/admin/Toast'

const PER_PAGE = 8
const CATEGORIES = ['Nature', 'Wildlife', 'Landscape', 'Culture']

export default function AdminAttractions() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({ name: '', description: '', location: '', image: '', category: 'Nature', mapLink: '' })

  const load = () => {
    setLoading(true)
    attractionsApi.list().then(setList).catch(() => toast('Failed to load', 'error')).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const filtered = list.filter(
    (a) => !search || a.name?.toLowerCase().includes(search.toLowerCase()) || a.location?.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1
  const pageList = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const openCreate = () => {
    setEditing('new')
    setForm({ name: '', description: '', location: '', image: '', category: 'Nature', mapLink: '' })
  }
  const openEdit = (a) => {
    setEditing(a.id)
    setForm({ name: a.name, description: a.description || '', location: a.location || '', image: a.image || '', category: a.category || 'Nature', mapLink: a.mapLink || '' })
  }
  const closeForm = () => setEditing(null)

  const save = async () => {
    try {
      if (editing === 'new') {
        await attractionsApi.create({ ...form, coordinates: [0, 0] })
        toast('Attraction created')
      } else {
        await attractionsApi.update(editing, form)
        toast('Attraction updated')
      }
      closeForm()
      load()
    } catch {
      toast('Failed to save', 'error')
    }
  }

  const remove = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return
    try {
      await attractionsApi.delete(id)
      toast('Attraction deleted')
      load()
    } catch {
      toast('Failed to delete', 'error')
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) {
      toast('Please select an image file (JPG, PNG, etc.)', 'error')
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Attractions</h1>
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
          />
          <button type="button" onClick={openCreate} className="px-4 py-2 rounded-lg bg-nature text-white font-medium hover:bg-nature-dark">
            Add Attraction
          </button>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{editing === 'new' ? 'New Attraction' : 'Edit Attraction'}</h2>
            <div className="space-y-3">
              <input placeholder="Attraction Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={3} />
              <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />

              {/* Image: upload or URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image</label>
                {form.image && (
                  <div className="mb-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                    <img src={resolveMediaUrl(form.image)} alt="" className="w-full h-32 object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                  </div>
                )}
                <div className="flex gap-2 flex-wrap items-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-3 py-2 rounded-lg border border-nature dark:border-lake-light text-nature dark:text-lake-light text-sm font-medium hover:bg-nature/10 dark:hover:bg-lake-blue/10 disabled:opacity-50"
                  >
                    {uploading ? 'Uploading…' : 'Upload image'}
                  </button>
                  <span className="text-xs text-gray-500 dark:text-gray-400">or paste URL below</span>
                </div>
                <input
                  placeholder="Image URL (or use upload above)"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full mt-1.5 px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                />
              </div>

              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input placeholder="Google Map link" value={form.mapLink} onChange={(e) => setForm({ ...form, mapLink: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="button" onClick={save} className="px-4 py-2 rounded-lg bg-nature text-white font-medium">Save</button>
              <button type="button" onClick={closeForm} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3 w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {pageList.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{a.name}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.location}</td>
                      <td className="px-4 py-3">{a.category}</td>
                      <td className="px-4 py-3">
                        <button type="button" onClick={() => openEdit(a)} className="text-nature hover:underline mr-2">Edit</button>
                        <button type="button" onClick={() => remove(a.id, a.name)} className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Page {page} of {totalPages} ({filtered.length} items)
                </p>
                <div className="flex gap-2">
                  <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 disabled:opacity-50">Previous</button>
                  <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 disabled:opacity-50">Next</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
