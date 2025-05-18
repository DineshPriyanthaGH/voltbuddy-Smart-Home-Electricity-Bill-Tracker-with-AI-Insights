'use client'
import React, { useState } from 'react'
import { Header } from './Header'
import { TipsSection } from './TipsSection'
import { GuidesSection } from './GuidesSection'
import { FaqsSection } from './FaqsSection'
import { SearchBar } from './SearchBar'
export default function EnergyEfficiencyTipsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Energy Efficiency Tips & Resources
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Discover practical ways to reduce your energy consumption and optimize
          your electricity usage.
        </p>
        <SearchBar onSearch={handleSearch} />
        <div className="space-y-12 mt-8">
          <TipsSection searchQuery={searchQuery} />
          <GuidesSection searchQuery={searchQuery} />
          <FaqsSection searchQuery={searchQuery} />
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© 2023 Ceylon Power Tracker / VoltBuddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}