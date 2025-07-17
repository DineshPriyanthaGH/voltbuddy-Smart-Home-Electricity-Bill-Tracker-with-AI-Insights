import React from 'react'

export default function CardSkeleton() {
  return (
    <div className="bg-white shadow rounded-lg p-6 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
        <div className="ml-3 h-6 w-2/3 bg-gray-200 rounded" />
      </div>
      <div className="h-4 w-full bg-gray-200 rounded mb-2" />
      <div className="h-4 w-5/6 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-4/6 bg-gray-200 rounded mb-4" />
      <div className="h-8 w-24 bg-gray-200 rounded" />
    </div>
  )
}
