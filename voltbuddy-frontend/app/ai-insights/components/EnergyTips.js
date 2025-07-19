'use client'
import React, { useEffect, useState } from 'react'
import { LightbulbIcon, ThermometerIcon, TvIcon, PlugZapIcon } from 'lucide-react'
import TipCard from './shared/TipCard'
import CardSkeleton from './shared/CardSkeleton'

const iconMap = {
  led: <LightbulbIcon className="h-8 w-8 text-yellow-400" />,
  thermostat: <ThermometerIcon className="h-8 w-8" style={{color: '#2441E1'}} />,
  tv: <TvIcon className="h-8 w-8" style={{color: '#2441E1'}} />,
  plug: <PlugZapIcon className="h-8 w-8" style={{color: '#2441E1'}} />,
}

function getIconForTip(title) {
  title = title.toLowerCase()
  if (title.includes('led')) return iconMap.led
  if (title.includes('thermostat')) return iconMap.thermostat
  if (title.includes('tv')) return iconMap.tv
  if (title.includes('plug') || title.includes('unplug')) return iconMap.plug
  // fallback
  return <LightbulbIcon className="h-8 w-8 text-yellow-400" />
}

export function EnergyTips({ onDataLoad }) {
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
          // Pass data back to parent for PDF generation
          if (onDataLoad) {
            onDataLoad(data.tips)
          }
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
      {/* Modern Section Header */}
      <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl p-8 mb-8 shadow-2xl">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 rounded-2xl shadow-lg" 
               style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
            <LightbulbIcon className="h-6 w-6 text-yellow-400" />
          </div>
          <h2 className="text-3xl font-bold text-transparent" 
              style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                      WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
            Energy-Saving Tips
          </h2>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          AI-powered recommendations to reduce your energy consumption and save money on electricity bills.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {[...Array(4)].map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      )}
      {error && (
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        </div>
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
