import React, { useState } from 'react'
import { SearchIcon } from 'lucide-react'
export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex rounded-md shadow-sm">
        <div className="relative flex-grow focus-within:z-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-md border-gray-300 pl-10 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search tips, guides, and FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </form>
  )
}
