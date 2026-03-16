import { useEffect, useState } from 'react'
import { settingsApi } from '../../api/admin'
import { toast } from '../../components/admin/Toast'

export default function AdminSettings() {
  const [data, setData] = useState({ siteName: '', contactEmail: '', phone: '', facebook: '', twitter: '', instagram: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    settingsApi.get().then(setData).catch(() => setData({ siteName: 'Visit Kirehe', contactEmail: '', phone: '', facebook: '', twitter: '', instagram: '' })).finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      await settingsApi.update(data)
      toast('Settings saved')
    } catch {
      toast('Failed to save', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-gray-500">Loading...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website name</label>
          <input value={data.siteName || ''} onChange={(e) => setData({ ...data, siteName: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact email</label>
          <input type="email" value={data.contactEmail || ''} onChange={(e) => setData({ ...data, contactEmail: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
          <input value={data.phone || ''} onChange={(e) => setData({ ...data, phone: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Facebook URL</label>
          <input value={data.facebook || ''} onChange={(e) => setData({ ...data, facebook: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="https://" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Twitter URL</label>
          <input value={data.twitter || ''} onChange={(e) => setData({ ...data, twitter: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="https://" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram URL</label>
          <input value={data.instagram || ''} onChange={(e) => setData({ ...data, instagram: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="https://" />
        </div>
        <button type="button" onClick={save} disabled={saving} className="px-4 py-2 rounded-lg bg-nature text-white font-medium hover:bg-nature-dark disabled:opacity-50">Save settings</button>
      </div>
    </div>
  )
}
