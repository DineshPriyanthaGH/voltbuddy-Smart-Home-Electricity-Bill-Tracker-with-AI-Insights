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

export default function PredictionModels({ onDataLoad }) {
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
          
          // Pass data back to parent for PDF generation
          if (onDataLoad) {
            onDataLoad({
              predictionTable: r.prediction.predictionTable,
              insights: r.prediction.insights,
              chartData: data
            })
          }
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
    if (title.toLowerCase().includes('savings')) return <TrendingDownIcon className="h-6 w-6 text-yellow-400" />
    if (title.toLowerCase().includes('alert')) return <AlertCircleIcon className="h-6 w-6 text-orange-500" />
    if (title.toLowerCase().includes('season')) return <InfoIcon className="h-6 w-6" style={{color: '#2441E1'}} />
    return <InfoIcon className="h-6 w-6" style={{color: '#2441E1'}} />
  }

  // Calculate projected savings if possible
  const projectedSavings =
    data.length && data[0].current && data[data.length - 1].predicted
      ? `${(100 * (1 - data[data.length - 1].predicted / (data[0].current || 1))).toFixed(1)}% Savings`
      : ''

  return (
    <section className="mb-12">
      {/* Modern Section Header */}
      <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl p-8 mb-8 shadow-2xl">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 rounded-2xl shadow-lg" 
               style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
            <TrendingDownIcon className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-transparent" 
              style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                      WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
            Prediction Models
          </h2>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          AI-powered forecasting to predict your future energy consumption and optimize spending.
        </p>
      </div>

      {/* Modern Chart Container */}
      <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-800">Future Bill Predictions</h3>
          <div className="flex items-center px-4 py-2 rounded-2xl shadow-lg" 
               style={{background: 'linear-gradient(to right, #10B981, #059669)'}}>
            <TrendingDownIcon className="h-5 w-5 mr-2 text-white" />
            <span className="font-bold text-white">{projectedSavings}</span>
          </div>
        </div>
        
        <div className="h-80 mb-8 p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-inner">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 rounded-2xl w-full h-full"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#2441E1"
                  name="Current Usage"
                  strokeWidth={3}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#10B981"
                  name="Predicted Usage"
                  strokeWidth={3}
                  strokeDasharray="8 8"
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        
        <div className="mb-8 space-y-4">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div className="bg-gray-100/60 backdrop-blur-sm h-20 w-full rounded-2xl animate-pulse" key={i} />
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
          className="w-full py-4 px-6 font-bold text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}
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
        
        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 mt-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function PredictionInsight({ icon, title, description }) {
  return (
    <div className="flex items-start p-6 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="flex-shrink-0 p-2 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-md group-hover:shadow-lg transition-shadow duration-300">
        {icon}
      </div>
      <div className="ml-4">
        <h4 className="font-bold text-gray-800 text-lg group-hover:text-gray-900 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-gray-600 mt-1 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  )
}
