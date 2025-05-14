import React from 'react'
import { UserIcon, MessageSquareIcon, LightbulbIcon } from 'lucide-react'
export const HowItWorksSection = () => {
  const steps = [
    {
      icon: <UserIcon className="h-10 w-10 text-blue-600" />,
      title: 'Sign Up',
      description: 'Register with your mobile number for quick setup.',
    },
    {
      icon: <MessageSquareIcon className="h-10 w-10 text-blue-600" />,
      title: 'Receive Bill Data via SMS',
      description:
        'Automatically retrieve your electricity bills from CEB via SMS.',
    },
    {
      icon: <LightbulbIcon className="h-10 w-10 text-blue-600" />,
      title: 'Get AI Insights',
      description:
        'Receive actionable AI-driven insights to optimize your electricity usage and reduce bills.',
    },
  ]
  return (
    <div className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Getting started with Ceylon Power Tracker is simple and
            straightforward.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
