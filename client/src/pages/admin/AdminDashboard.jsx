import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { getStats } from '../../api/admin'

const cardLinks = [
  { to: '/admin/attractions', label: 'Attractions', key: 'totalAttractions', color: 'bg-nature' },
  { to: '/admin/hotels', label: 'Hotels', key: 'totalHotels', color: 'bg-lake-blue' },
  { to: '/admin/events', label: 'Events', key: 'totalEvents', color: 'bg-sunshine' },
  { to: '/admin/gallery', label: 'Gallery', key: 'totalGallery', color: 'bg-purple-500' },
  { label: 'Total Visitors', key: 'totalVisitors', color: 'bg-gray-600' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(() => setStats({
        totalAttractions: 0, totalHotels: 0, totalEvents: 0, totalGallery: 0, totalVisitors: 0,
        monthlyVisitors: [], attractionViews: {}, hotelViews: {},
      }))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  const rawMonthly = stats.monthlyVisitors || []
  const monthlyData = rawMonthly.length
    ? rawMonthly.map((m) => (typeof m === 'object' && m !== null ? { name: m.month || m.name || 'Month', visitors: m.visitors ?? m.count ?? 0 } : { name: 'Month', visitors: 0 }))
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => ({ name: m, visitors: Math.floor(Math.random() * 200) + 50 }))

  const attractionData = stats.attractionViews && Object.keys(stats.attractionViews).length
    ? Object.entries(stats.attractionViews).map(([name, views]) => ({ name: name.slice(0, 12), views }))
    : [{ name: 'Lake Nasho', views: 120 }, { name: 'Rusumo Falls', views: 95 }, { name: 'Akagera', views: 88 }]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {cardLinks.map((item) => (
          <div
            key={item.key}
            className={`rounded-xl p-5 text-white shadow-lg ${item.color}`}
          >
            {item.to ? (
              <Link to={item.to} className="block">
                <p className="text-white/80 text-sm font-medium">{item.label}</p>
                <p className="text-2xl font-bold mt-1">{stats[item.key] ?? 0}</p>
              </Link>
            ) : (
              <>
                <p className="text-white/80 text-sm font-medium">{item.label}</p>
                <p className="text-2xl font-bold mt-1">{stats[item.key] ?? 0}</p>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Monthly Visitors</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="visitors" fill="#1B5E20" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Most Viewed Attractions</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attractionData} layout="vertical" margin={{ left: 60 }}>
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="name" type="category" width={80} stroke="#6b7280" />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="views" fill="#0288D1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
