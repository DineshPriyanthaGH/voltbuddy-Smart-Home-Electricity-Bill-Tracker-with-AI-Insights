'use client'
import React, { useState } from 'react'
import { DownloadIcon, MailIcon, FileTextIcon } from 'lucide-react'
import { toast } from 'react-toastify'

export default function InsightsPDFExport({ 
  energyTips, 
  costStrategies, 
  predictionData, 
  userEmail 
}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Debug logging
  console.log('InsightsPDFExport props:', {
    energyTips: energyTips?.length || 0,
    costStrategies: costStrategies?.length || 0,
    predictionData: predictionData ? 'Available' : 'Not available',
    userEmail: userEmail || 'Not provided'
  });

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
        
        // Show success message
        toast.success('PDF generated and downloaded successfully!')
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
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found. Please login again.')
      }

      if (!userEmail) {
        throw new Error('User email not found. Please check your profile settings.')
      }

      console.log('Sending PDF to email:', userEmail)
      const pdfData = generatePDFData()
      console.log('PDF data prepared:', {
        title: pdfData.title,
        energyTipsCount: pdfData.sections.energyTips.data.length,
        costStrategiesCount: pdfData.sections.costStrategies.data.length,
        userEmail: userEmail
      })

      const response = await fetch('http://localhost:5001/api/insights/send-pdf-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pdfData)
      })

      const result = await response.json()
      console.log('Email response:', result)

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
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4">
          <FileTextIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Export AI Insights Report</h3>
        <p className="text-gray-600">
          Generate a comprehensive PDF report with all your AI insights and recommendations
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Report includes:</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            {energyTips?.length || 0} Energy Saving Tips
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            {costStrategies?.length || 0} Cost Reduction Strategies
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            Energy Consumption Predictions
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
            Professional formatting with charts and insights
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className={`
            flex items-center justify-center px-6 py-4 rounded-xl font-semibold text-white
            transition-all duration-300 transform hover:scale-105
            ${isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
            }
          `}
        >
          <DownloadIcon className={`w-5 h-5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating PDF...' : 'Download PDF Report'}
        </button>

        <button
          onClick={handleSendEmail}
          disabled={isSending || !userEmail}
          className={`
            flex items-center justify-center px-6 py-4 rounded-xl font-semibold text-white
            transition-all duration-300 transform hover:scale-105
            ${isSending || !userEmail
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
            }
          `}
          title={!userEmail ? 'Email address not found. Please check your profile.' : ''}
        >
          <MailIcon className={`w-5 h-5 mr-2 ${isSending ? 'animate-spin' : ''}`} />
          {isSending ? 'Sending Email...' : 'Send to Email'}
        </button>
      </div>

      {userEmail ? (
        <p className="text-sm text-gray-500 mt-4 text-center">
          Report will be sent to: <span className="font-medium text-gray-700">{userEmail}</span>
        </p>
      ) : (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 text-center">
            ⚠️ Email address not found. Please check your profile settings or login again.
          </p>
        </div>
      )}
    </div>
  )
}
