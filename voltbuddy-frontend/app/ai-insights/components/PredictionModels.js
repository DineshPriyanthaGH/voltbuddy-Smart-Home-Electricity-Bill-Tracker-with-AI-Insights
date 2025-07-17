'use client'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { TrendingDownIcon, AlertCircleIcon, InfoIcon } from 'lucide-react'
export function PredictionModels() {
  // Sample data for the prediction chart
  const data = [
    {
      month: 'Jan',
      current: 120,
      predicted: 120,
    },
    {
      month: 'Feb',
      current: 130,
      predicted: 125,
    },
    {
      month: 'Mar',
      current: 125,
      predicted: 118,
    },
    {
      month: 'Apr',
      current: 118,
      predicted: 110,
    },
    {
      month: 'May',
      current: null,
      predicted: 105,
    },
    {
      month: 'Jun',
      current: null,
      predicted: 100,
    },
    {
      month: 'Jul',
      current: null,
      predicted: 95,
    },
  ]
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Prediction Models
      </h2>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-gray-800">
            Future Bill Predictions
          </h3>
          <div className="flex items-center text-green-600">
            <TrendingDownIcon className="h-5 w-5 mr-1" />
            <span className="font-medium">Projected 21% Savings</span>
          </div>
        </div>
        <div className="h-80 mb-6">
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
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#10B981"
                name="Predicted Usage"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4 mb-6">
          <PredictionInsight
            icon={<TrendingDownIcon className="h-6 w-6 text-green-500" />}
            title="Savings Trend"
            description="If you continue with your current optimization efforts, you could save up to $25 on your next bill."
          />
          <PredictionInsight
            icon={<AlertCircleIcon className="h-6 w-6 text-orange-500" />}
            title="Usage Alert"
            description="Your air conditioner usage has increased by 15% compared to last month. Consider adjusting the temperature."
          />
          <PredictionInsight
            icon={<InfoIcon className="h-6 w-6 text-blue-500" />}
            title="Seasonal Adjustment"
            description="Summer is approaching. We've adjusted our predictions to account for typical seasonal changes in energy usage."
          />
        </div>
        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
          View More Predictions
        </button>
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
export default PredictionModels