'use client'
import React, { useEffect, useState } from 'react'
import { HomeIcon, ZapIcon, RefrigeratorIcon } from 'lucide-react'
import StrategyCard from './shared/StrategyCard'
import InsightModal from './shared/InsightModal'
import CardSkeleton from './shared/CardSkeleton'

function getIconForTitle(title) {
  const t = title.toLowerCase()
  if (t.includes('kitchen')) return <RefrigeratorIcon className="h-10 w-10" style={{color: '#2441E1'}} />
  if (t.includes('power') || t.includes('smart')) return <ZapIcon className="h-10 w-10 text-yellow-400" />
  if (t.includes('insulation') || t.includes('home')) return <HomeIcon className="h-10 w-10" style={{color: '#2441E1'}} />
  // fallback
  return <HomeIcon className="h-10 w-10" style={{color: '#2441E1'}} />
}

export function CostStrategies({ onDataLoad }) {
  const [strategies, setStrategies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function fetchStrategies() {
      setLoading(true)
      setError('')
      try {
        const token = localStorage.getItem('token')
        const billHistory = JSON.parse(localStorage.getItem('billHistory') || '[]')
        const applianceUsage = JSON.parse(localStorage.getItem('applianceUsage') || '[]')

        const res = await fetch('http://localhost:5001/api/energy-tips/cost-strategies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
          body: JSON.stringify({ billHistory, applianceUsage }),
        })
        const data = await res.json()
        if (res.ok && data.strategies) {
          setStrategies(data.strategies)
          // Pass data back to parent for PDF generation
          if (onDataLoad) {
            onDataLoad(data.strategies)
          }
        } else {
          setError(data.message || 'Failed to load strategies')
        }
      } catch (e) {
        setError('Could not fetch cost reduction strategies. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchStrategies()
  }, [])

  return (
    <section className="mb-12">
      {/* Modern Section Header */}
      <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl p-8 mb-8 shadow-2xl">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 rounded-2xl shadow-lg" 
               style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
            <ZapIcon className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-transparent" 
              style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                      WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
            Cost Reduction Strategies
          </h2>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          Smart strategies and actionable insights to significantly reduce your electricity costs.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategies.map((s, idx) => (
          <StrategyCard
            key={idx}
            icon={getIconForTitle(s.title)}
            title={s.title}
            description={s.summary}
            tips={s.details}
            onLearnMore={() => setSelected(s)}
          />
        ))}
      </div>
      {selected && (
        <InsightModal
          tip={{
            title: selected.title,
            problem: selected.problem,
            tip: selected.strategy,
            controls: selected.controls,
            learnMore: selected.learnMore
          }}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}

export default CostStrategies
