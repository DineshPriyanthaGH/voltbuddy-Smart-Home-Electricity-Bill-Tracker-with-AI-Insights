'use client'
import React, { useEffect, useState } from 'react'
import { LightbulbIcon, ThermometerIcon, TvIcon, PlugZapIcon } from 'lucide-react'
import TipCard from './shared/TipCard'
import CardSkeleton from './shared/CardSkeleton'

const iconMap = {
  led: <LightbulbIcon className="h-8 w-8 text-green-500" />,
  thermostat: <ThermometerIcon className="h-8 w-8 text-green-500" />,
  tv: <TvIcon className="h-8 w-8 text-green-500" />,
  plug: <PlugZapIcon className="h-8 w-8 text-green-500" />,
}

function getIconForTip(title) {
  title = title.toLowerCase()
  if (title.includes('led')) return iconMap.led
  if (title.includes('thermostat')) return iconMap.thermostat
  if (title.includes('tv')) return iconMap.tv
  if (title.includes('plug') || title.includes('unplug')) return iconMap.plug
  // fallback
  return <LightbulbIcon className="h-8 w-8 text-green-500" />
}

export function EnergyTips() {
  const [tips, setTips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchTips() {
      setLoading(true)
      setError('')
      try {
        const token = localStorage.getItem('token')
        const billHistory = JSON.parse(localStorage.getItem('billHistory') || '[]')
        const applianceUsage = JSON.parse(localStorage.getItem('applianceUsage') || '[]')

        const res = await fetch('http://localhost:5001/api/energy-tips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
          body: JSON.stringify({
            billHistory,
            applianceUsage,
          }),
        })
        const data = await res.json()
        if (res.ok && data.tips) {
          setTips(data.tips)
        } else {
          setError(data.message || 'Failed to load tips')
        }
      } catch (e) {
        setError('Could not fetch energy tips. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchTips()
  }, [])

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Energy-Saving Tips
      </h2>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {[...Array(4)].map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      )}
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, idx) => (
          <TipCard
            key={idx}
            icon={getIconForTip(tip.title)}
            title={tip.title}
            description={tip.description}
            learnMore={tip.learnMore}
          />
        ))}
      </div>
    </section>
  )
}

export default EnergyTips
