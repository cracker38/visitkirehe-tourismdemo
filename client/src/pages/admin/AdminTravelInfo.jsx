import { useEffect, useState } from 'react'
import { travelInfoApi } from '../../api/admin'
import { toast } from '../../components/admin/Toast'

export default function AdminTravelInfo() {
  const [data, setData] = useState({ transport: '', bestTime: '', safety: '', tips: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    travelInfoApi.get().then(setData).catch(() => setData({ transport: '', bestTime: '', safety: '', tips: '' })).finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      await travelInfoApi.update(data)
      toast('Travel info updated')
    } catch {
      toast('Failed to save', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-gray-500">Loading...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Travel Information</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 max-w-3xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transport</label>
          <textarea value={data.transport || ''} onChange={(e) => setData({ ...data, transport: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Best time to visit</label>
          <textarea value={data.bestTime || ''} onChange={(e) => setData({ ...data, bestTime: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={2} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Safety</label>
          <textarea value={data.safety || ''} onChange={(e) => setData({ ...data, safety: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={2} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Travel tips</label>
          <textarea value={data.tips || ''} onChange={(e) => setData({ ...data, tips: e.target.value })} className="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={3} />
        </div>
        <button type="button" onClick={save} disabled={saving} className="px-4 py-2 rounded-lg bg-nature text-white font-medium hover:bg-nature-dark disabled:opacity-50">Save changes</button>
      </div>
    </div>
  )
}
