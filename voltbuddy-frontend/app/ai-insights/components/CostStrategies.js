'use client'
import React, { useEffect, useState } from 'react'
import { HomeIcon, ZapIcon, RefrigeratorIcon } from 'lucide-react'
import StrategyCard from './shared/StrategyCard'
import InsightModal from './shared/InsightModal'
import CardSkeleton from './shared/CardSkeleton'

function getIconForTitle(title) {
  const t = title.toLowerCase()
  if (t.includes('kitchen')) return <RefrigeratorIcon className="h-10 w-10 text-blue-500" />
  if (t.includes('power') || t.includes('smart')) return <ZapIcon className="h-10 w-10 text-blue-500" />
  if (t.includes('insulation') || t.includes('home')) return <HomeIcon className="h-10 w-10 text-blue-500" />
  // fallback
  return <HomeIcon className="h-10 w-10 text-blue-500" />
}

export function CostStrategies() {
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Cost Reduction Strategies
      </h2>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {[...Array(4)].map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
