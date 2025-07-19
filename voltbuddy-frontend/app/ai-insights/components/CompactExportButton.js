'use client'
import React, { useState } from 'react'
import { DownloadIcon, MailIcon, FileTextIcon, ChevronDownIcon } from 'lucide-react'
import { toast } from 'react-toastify'

export default function CompactExportButton({ 
  energyTips, 
  costStrategies, 
  predictionData, 
  userEmail 
}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Calculate total insights count
  const totalInsights = (energyTips?.length || 0) + (costStrategies?.length || 0) + (predictionData ? 1 : 0)
  const hasData = totalInsights > 0

  const generatePDFData = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    return {
      title: 'VoltBuddy AI Insights Report',
      generatedDate: currentDate,
      userEmail: userEmail,
      sections: {
        energyTips: {
          title: 'Energy Saving Tips',
          data: energyTips || []
        },
        costStrategies: {
          title: 'Cost Reduction Strategies', 
          data: costStrategies || []
        },
        predictions: {
          title: 'Energy Consumption Predictions',
          data: predictionData || []
        }
      }
    }
  }

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    setIsOpen(false)
    try {
      const token = localStorage.getItem('token')
      const pdfData = generatePDFData()

      const response = await fetch('http://localhost:5001/api/insights/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pdfData)
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `VoltBuddy-AI-Insights-${new Date().toISOString().split('T')[0]}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        toast.success('PDF downloaded successfully!')
      } else {
        throw new Error('Failed to generate PDF')
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSendEmail = async () => {
    setIsSending(true)
    setIsOpen(false)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found. Please login again.')
      }

      if (!userEmail) {
        throw new Error('User email not found. Please check your profile settings.')
      }

      const pdfData = generatePDFData()

      const response = await fetch('http://localhost:5001/api/insights/send-pdf-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pdfData)
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(`AI Insights report sent to ${userEmail}!`)
      } else {
        throw new Error(result.message || `Server error: ${response.status}`)
      }
    } catch (error) {
      console.error('Error sending email:', error)
      if (error.message.includes('authentication') || error.message.includes('token')) {
        toast.error('Authentication error. Please login again.')
      } else if (error.message.includes('email')) {
        toast.error('Email address not found. Please check your profile.')
      } else {
        toast.error(`Failed to send email: ${error.message}`)
      }
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="relative">
      {/* Main Export Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={!hasData}
        className={`flex items-center space-x-2 px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-lg transition-all duration-200 text-xs md:text-sm font-medium ${
          !hasData
            ? 'bg-gray-400 cursor-not-allowed text-white'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
        }`}
        title={!hasData ? 'Please wait for insights to load' : `Export ${totalInsights} insights`}
      >
        <FileTextIcon className="w-3 h-3 md:w-4 md:h-4" />
        <span className="hidden sm:inline">Export Report</span>
        <span className="sm:hidden">Export</span>
        {hasData && (
          <span className="bg-white bg-opacity-20 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs">
            {totalInsights}
          </span>
        )}
        <ChevronDownIcon className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && hasData && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="py-2">
            <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wide font-semibold border-b border-gray-100">
              Export {totalInsights} AI Insights
            </div>
            
            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <DownloadIcon className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <div className="flex-1 text-left">
                <div className="font-medium">
                  {isGenerating ? 'Generating PDF...' : 'Download PDF'}
                </div>
                <div className="text-xs text-gray-500">Save report to your device</div>
              </div>
            </button>

            <button
              onClick={handleSendEmail}
              disabled={isSending || !userEmail}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MailIcon className={`w-4 h-4 ${isSending ? 'animate-spin' : ''}`} />
              <div className="flex-1 text-left">
                <div className="font-medium">
                  {isSending ? 'Sending Email...' : 'Send to Email'}
                </div>
                <div className="text-xs text-gray-500">
                  {userEmail ? `Send to ${userEmail}` : 'Email not available'}
                </div>
              </div>
            </button>

            {(!userEmail) && (
              <div className="px-4 py-2 text-xs text-red-600 bg-red-50 border-t border-gray-100">
                ⚠️ Email address not found. Please check your profile.
              </div>
            )}

            {/* Report Summary */}
            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
              <div className="text-xs text-gray-600">
                <div># {energyTips?.length || 0} Energy Tips</div>
                <div># {costStrategies?.length || 0} Cost Strategies</div>
                <div># {predictionData ? 'Predictions Available' : 'No Predictions'}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
