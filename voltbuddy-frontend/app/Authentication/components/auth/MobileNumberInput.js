import React, { useState } from 'react'
import { PhoneIcon } from 'lucide-react'
export function MobileNumberInput({
  value,
  onChange,
  error,
}) {
  const [isFocused, setIsFocused] = useState(false)
  // Format the phone number as user types
  const handleChange = (e) => {
    // Allow only numbers and some special characters
    const input = e.target.value.replace(/[^\d\s+]/g, '')
    onChange(input)
  }
  return (
    <div className="space-y-2">
      <label
        htmlFor="mobile-number"
        className="block text-sm font-medium text-gray-700"
      >
        Mobile Number
      </label>
      <div
        className={`flex border rounded-lg overflow-hidden ${error ? 'border-red-500' : isFocused ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'}`}
      >
        <div className="bg-gray-50 px-3 py-2 flex items-center border-r border-gray-300">
          <PhoneIcon size={18} className="text-gray-500" />
        </div>
        <input
          id="mobile-number"
          type="tel"
          placeholder="+94 7X XXX XXXX"
          className="block w-full px-3 py-2 outline-none"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete="tel"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-gray-500">
        Enter the mobile number registered with your CEB account
      </p>
    </div>
  )
}


