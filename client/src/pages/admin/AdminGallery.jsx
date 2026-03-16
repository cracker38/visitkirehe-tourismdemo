import { useEffect, useState, useRef } from 'react'
import { galleryApi, uploadFile } from '../../api/admin'
import { toast } from '../../components/admin/Toast'

const CATEGORIES = ['Nature', 'Culture', 'Events', 'Tourism', 'Landscape', 'Markets']

export default function AdminGallery() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({ src: '', alt: '', category: 'Nature' })

  const load = () => {
    setLoading(true)
    galleryApi.list().then(setList).catch(() => toast('Failed to load', 'error')).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd = () => {
    setEditing(null)
    setAdding(true)
    setForm({ src: '', alt: '', category: 'Nature' })
  }
  const openEdit = (img) => {
    setAdding(false)
    setEditing(img.id)
    setForm({ src: img.src || '', alt: img.alt || '', category: img.category || 'Nature' })
  }
  const closeForm = () => {
    setAdding(false)
    setEditing(null)
    setForm({ src: '', alt: '', category: 'Nature' })
  }

  const save = async () => {
    if (!form.src?.trim()) {
      toast('Image URL or file is required', 'error')
      return
    }
    try {
      if (editing) {
        await galleryApi.update(editing, form)
        toast('Image updated')
      } else {
        await galleryApi.create(form)
        toast('Image added')
      }
      closeForm()
      load()
    } catch {
      toast(editing ? 'Failed to update' : 'Failed to add', 'error')
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
      setForm((f) => ({ ...f, src: url }))
      toast('Image uploaded')
    } catch {
      toast('Upload failed', 'error')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this image?')) return
    try {
      await galleryApi.delete(id)
      toast('Image deleted')
      load()
    } catch {
      toast('Failed to delete', 'error')
    }
  }

  const isFormOpen = adding || editing

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gallery</h1>
        <button type="button" onClick={openAdd} className="px-4 py-2 rounded-lg bg-nature text-white font-medium hover:bg-nature-dark">Add Image</button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{editing ? 'Edit Image' : 'Add Image'}</h2>
            <div className="space-y-3">
              {form.src && (
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                  <img src={form.src} alt="" className="w-full h-32 object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                </div>
              )}
              <div className="flex gap-2 flex-wrap items-center">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
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
              <input placeholder="Image URL" value={form.src} onChange={(e) => setForm({ ...form, src: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input placeholder="Alt / Caption" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button type="button" onClick={save} className="px-4 py-2 rounded-lg bg-nature text-white font-medium">{editing ? 'Save' : 'Add'}</button>
              <button type="button" onClick={closeForm} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 dark:text-white">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {loading ? <p className="col-span-full text-center py-8 text-gray-500">Loading...</p> : list.map((img) => (
          <div key={img.id} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
            <img src={img.src} alt={img.alt} className="w-full aspect-square object-cover" />
            <div className="p-2 flex justify-between items-center flex-wrap gap-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">{img.category}</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => openEdit(img)} className="text-nature dark:text-lake-light text-sm hover:underline">Edit</button>
                <button type="button" onClick={() => remove(img.id)} className="text-red-600 text-sm hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
