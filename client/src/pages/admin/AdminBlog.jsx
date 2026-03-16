import { useEffect, useState } from 'react'
import { blogApi } from '../../api/admin'
import { toast } from '../../components/admin/Toast'

export default function AdminBlog() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', author: 'Visit Kirehe Team', image: '', date: new Date().toISOString().slice(0, 10) })

  const load = () => {
    setLoading(true)
    blogApi.list().then(setList).catch(() => toast('Failed to load', 'error')).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openCreate = () => {
    setEditing('new')
    setForm({ title: '', excerpt: '', content: '', author: 'Visit Kirehe Team', image: '', date: new Date().toISOString().slice(0, 10) })
  }
  const openEdit = (b) => {
    setEditing(b.id)
    setForm({ title: b.title, excerpt: b.excerpt || '', content: b.content || b.excerpt || '', author: b.author || 'Visit Kirehe Team', image: b.image || '', date: (b.date || '').slice(0, 10) })
  }
  const closeForm = () => setEditing(null)

  const save = async () => {
    try {
      if (editing === 'new') await blogApi.create(form)
      else await blogApi.update(editing, form)
      toast(editing === 'new' ? 'Post created' : 'Post updated')
      closeForm()
      load()
    } catch {
      toast('Failed to save', 'error')
    }
  }

  const remove = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    try {
      await blogApi.delete(id)
      toast('Post deleted')
      load()
    } catch {
      toast('Failed to delete', 'error')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog / News</h1>
        <button type="button" onClick={openCreate} className="px-4 py-2 rounded-lg bg-nature text-white font-medium hover:bg-nature-dark">Create Post</button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full p-6 my-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{editing === 'new' ? 'New Post' : 'Edit Post'}</h2>
            <div className="space-y-3">
              <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
              <input placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <textarea placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={2} />
              <textarea placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={6} />
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
              <thead className="bg-gray-50 dark:bg-gray-700"><tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Author</th><th className="px-4 py-3">Date</th><th className="px-4 py-3 w-28">Actions</th></tr></thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {list.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{b.title}</td>
                    <td className="px-4 py-3">{b.author}</td>
                    <td className="px-4 py-3">{b.date}</td>
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => openEdit(b)} className="text-nature hover:underline mr-2">Edit</button>
                      <button type="button" onClick={() => remove(b.id, b.title)} className="text-red-600 hover:underline">Delete</button>
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
