'use client'
import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { TrendingDownIcon, AlertCircleIcon, InfoIcon } from 'lucide-react'
import PredictionModal from './shared/PredictionModal'
import CardSkeleton from './shared/CardSkeleton'

export default function PredictionModels() {
  const [data, setData] = useState([])
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function fetchPrediction() {
      setLoading(true)
      setError('')
      try {
        const token = localStorage.getItem('token')
        const res = await fetch('http://localhost:5001/api/energy-tips/predictions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({}), // server gets bills from DB, not from client
        })
        const r = await res.json()
        if (res.ok && r.prediction) {
          setData(
            r.prediction.predictionTable.map((row) => ({
              month: row.month,
              current:
                row.currentConsumption !== undefined && row.currentConsumption !== null
                  ? row.currentConsumption
                  : null,
              predicted:
                row.predictedConsumption !== undefined && row.predictedConsumption !== null
                  ? row.predictedConsumption
                  : null,
            }))
          )
          setInsights(r.prediction.insights)
        } else {
          setError(r.message || 'Failed to load predictions')
        }
      } catch (e) {
        setError('Could not fetch predictions. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchPrediction()
  }, [])

  function getIcon(title) {
    if (title.toLowerCase().includes('savings')) return <TrendingDownIcon className="h-6 w-6 text-green-500" />
    if (title.toLowerCase().includes('alert')) return <AlertCircleIcon className="h-6 w-6 text-orange-500" />
    if (title.toLowerCase().includes('season')) return <InfoIcon className="h-6 w-6 text-blue-500" />
    return <InfoIcon className="h-6 w-6 text-blue-500" />
  }

  // Calculate projected savings if possible
  const projectedSavings =
    data.length && data[0].current && data[data.length - 1].predicted
      ? `${(100 * (1 - data[data.length - 1].predicted / (data[0].current || 1))).toFixed(1)}% Savings`
      : ''

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Prediction Models</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-gray-800">Future Bill Predictions</h3>
          <div className="flex items-center text-green-600">
            <TrendingDownIcon className="h-5 w-5 mr-1" />
            <span className="font-medium">{projectedSavings}</span>
          </div>
        </div>
        <div className="h-80 mb-6">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <CardSkeleton />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#3B82F6"
                  name="Current Usage"
                  strokeWidth={2}
                  connectNulls // key for joining lines even with nulls [2][7]
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#10B981"
                  name="Predicted Usage"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="mb-6 space-y-4">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div className="bg-gray-50 h-16 w-full rounded animate-pulse" key={i} />
              ))
            : insights.map((ins, i) => (
                <PredictionInsight
                  key={i}
                  icon={getIcon(ins.title)}
                  title={ins.title}
                  description={ins.description}
                />
              ))}
        </div>
        <button
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          onClick={() => setShowModal(true)}
          disabled={loading || !!error}
          aria-label="View Complete Prediction Table and Insights"
        >
          View More Predictions
        </button>
        {showModal && (
          <PredictionModal
            data={data}
            insights={insights}
            onClose={() => setShowModal(false)}
          />
        )}
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </section>
  )
}

function PredictionInsight({ icon, title, description }) {
  return (
    <div className="flex items-start p-4 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-4">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}
