import React from 'react'
import { ReceiptIcon, BrainIcon, HomeIcon, BellIcon } from 'lucide-react'
export const FeaturesSection = () => {
  const features = [
    {
      icon: <ReceiptIcon className="h-8 w-8 text-blue-600" />,
      title: 'Bill Tracking',
      description:
        'Easily track and manage your electricity bills in one place.',
    },
    {
      icon: <BrainIcon className="h-8 w-8 text-blue-600" />,
      title: 'AI Insights',
      description:
        'AI-driven tips to reduce electricity costs and optimize usage.',
    },
    {
      icon: <HomeIcon className="h-8 w-8 text-blue-600" />,
      title: 'Appliance Management',
      description:
        'Add household appliances and track their energy consumption.',
    },
    {
      icon: <BellIcon className="h-8 w-8 text-blue-600" />,
      title: 'Bill Increase Alerts',
      description: 'Get notified if your bill increases unexpectedly.',
    },
  ]
  return (
    <div className="w-full bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Ceylon Power Tracker offers powerful tools to help you understand
            and reduce your electricity costs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
