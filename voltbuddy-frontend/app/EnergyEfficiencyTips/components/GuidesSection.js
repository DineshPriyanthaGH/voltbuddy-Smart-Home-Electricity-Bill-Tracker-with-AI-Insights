import React, { useState } from 'react'
import { BookOpenIcon, FileTextIcon, HomeIcon } from 'lucide-react'
import { Modal } from './Modal'
/**
 * @typedef {Object} GuideProps
 * @property {React.ReactNode} icon
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {{
 *   overview: string,
 *   details: string[],
 *   tips?: string[],
 *   resources?: { title: string, description: string }[]
 * }} content
 * @property {() => void} onReadMore
 */
const Guide = ({
  icon,
  title,
  description,
  category,
  onReadMore,
}) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-green-50 rounded-full text-green-600 mr-3">
            {icon}
          </div>
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 flex-grow mb-4">{description}</p>
        <button
          onClick={onReadMore}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
        >
          Read More
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
/**
 * @typedef {Object} GuidesSectionProps
 * @property {string} searchQuery
 */
/**
 * @param {GuidesSectionProps} props
 */
export const GuidesSection = ({ searchQuery }) => {
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null)
  const guides = [
    {
      icon: <HomeIcon className="w-5 h-5" />,
      title: 'Home Energy Audit Guide',
      description:
        'Learn how to conduct a DIY energy audit to identify areas for improvement in your home.',
      category: 'Guide',
      content: {
        overview:
          "A home energy audit is the first step to understanding your home's energy usage and identifying opportunities for savings.",
        details: [
          'Start by examining your energy bills to establish a baseline',
          'Check for air leaks around windows, doors, and other openings',
          'Inspect insulation levels in walls, attic, and basement',
          'Evaluate heating and cooling system efficiency',
          'Assess lighting and appliance energy usage',
        ],
        tips: [
          'Choose a mild day to conduct your audit',
          'Create a checklist before starting',
          'Take photos to document findings',
          'Consider professional assessment for complex issues',
        ],
        resources: [
          {
            title: 'Professional Energy Audit',
            description:
              'Learn when and why to consider a professional energy assessment',
          },
          {
            title: 'DIY Audit Tools',
            description:
              'Essential tools and equipment for conducting your own energy audit',
          },
        ],
      },
    },
    {
      icon: <div className="w-5 h-5" />,
      title: 'Understanding Your Electricity Bill',
      description:
        'A comprehensive breakdown of electricity bill components and how to interpret usage patterns.',
      category: 'Article',
      content: {
        overview:
          'Understanding your electricity bill is crucial for managing energy costs and identifying opportunities for savings.',
        details: [
          'Basic charge vs. consumption charge',
          'Peak and off-peak rates explanation',
          'Common fees and surcharges',
          'How to read meter values',
          'Understanding seasonal variations',
        ],
        tips: [
          'Keep monthly records to track patterns',
          'Compare bills year-over-year',
          'Look for unusual spikes in usage',
          'Understand your rate structure',
        ],
        resources: [
          {
            title: 'Rate Comparison Tool',
            description:
              'Compare different rate plans to find the best option for your usage pattern',
          },
          {
            title: 'Bill Calculator',
            description: 'Estimate your monthly bill based on typical usage',
          },
        ],
      },
    },
    {
      icon: <FileTextIcon className="w-5 h-5" />,
      title: 'Seasonal Energy Saving Tips',
      description:
        'Specific strategies for reducing energy consumption during different seasons of the year.',
      category: 'Guide',
      content: {
        overview:
          'Energy-saving strategies should adapt to seasonal changes for maximum effectiveness.',
        details: [
          'Summer cooling optimization techniques',
          'Winter heating efficiency tips',
          'Spring and fall transition strategies',
          'Seasonal maintenance checklist',
          'Weather-specific energy-saving measures',
        ],
        tips: [
          'Adjust thermostat settings seasonally',
          'Use natural ventilation when possible',
          'Maintain HVAC systems before peak seasons',
          'Utilize seasonal sunlight patterns',
        ],
      },
    },
    {
      icon: <BookOpenIcon className="w-5 h-5" />,
      title: 'Energy-Efficient Appliance Buying Guide',
      description:
        'What to look for when purchasing new appliances to maximize energy savings.',
      category: 'Guide',
      content: {
        overview:
          'Choosing energy-efficient appliances can significantly reduce your long-term energy costs.',
        details: [
          'Understanding Energy Star ratings',
          'Cost-benefit analysis of efficient models',
          'Size and capacity considerations',
          'Features that save energy',
          'Installation requirements',
        ],
        tips: [
          'Calculate lifetime energy costs',
          'Consider water usage for applicable appliances',
          'Look for rebate opportunities',
          'Check for smart home compatibility',
        ],
        resources: [
          {
            title: 'Appliance Calculator',
            description:
              'Compare the lifetime costs of different appliance models',
          },
          {
            title: 'Rebate Finder',
            description:
              'Find available rebates and incentives for energy-efficient appliances',
          },
        ],
      },
    },
    {
      icon: <FileTextIcon className="w-5 h-5" />,
      title: 'Smart Home Technology for Energy Management',
      description:
        "How smart devices can help monitor and reduce your home's energy consumption.",
      category: 'Article',
      content: {
        overview:
          'Smart home technology can provide detailed insights and automation to optimize energy usage.',
        details: [
          'Smart thermostat features and benefits',
          'Connected lighting systems',
          'Smart plug functionality',
          'Home energy monitoring systems',
          'Integration and automation possibilities',
        ],
        tips: [
          'Start with high-impact devices first',
          'Ensure compatibility between devices',
          'Set up proper automation rules',
          'Regular system updates',
        ],
      },
    },
    {
      icon: <div className="w-5 h-5" />,
      title: 'Understanding Energy Star Ratings',
      description:
        'How to interpret energy efficiency ratings and what they mean for your utility bills.',
      category: 'Article',
      content: {
        overview:
          'Energy Star ratings help consumers make informed decisions about energy-efficient products.',
        details: [
          'Energy Star certification requirements',
          'Reading and comparing EnergyGuide labels',
          'Cost savings calculations',
          'Product categories and criteria',
          'Verification and testing standards',
        ],
        tips: [
          'Compare similar models',
          'Look beyond the Energy Star logo',
          'Consider regional factors',
          'Verify rebate eligibility',
        ],
        resources: [
          {
            title: 'Product Finder',
            description: 'Search and compare Energy Star certified products',
          },
          {
            title: 'Savings Calculator',
            description:
              'Calculate potential savings from Energy Star certified products',
          },
        ],
      },
    },
  ]
  const filteredGuides = searchQuery
    ? guides.filter(
        (guide) =>
          guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guide.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : guides
  const selectedGuideContent =
    selectedGuide !== null ? guides[selectedGuide].content : null
  return (
    <section id="guides-section">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Guides & Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuides.map((guide, index) => (
          <Guide
            key={index}
            {...guide}
            onReadMore={() => setSelectedGuide(index)}
          />
        ))}
      </div>
      <Modal
        isOpen={selectedGuide !== null}
        onClose={() => setSelectedGuide(null)}
        title={selectedGuide !== null ? guides[selectedGuide].title : ''}
      >
        {selectedGuideContent && (
          <div className="space-y-6">
            <p className="text-gray-700">{selectedGuideContent.overview}</p>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Key Details</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {selectedGuideContent.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            {selectedGuideContent.tips && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Helpful Tips</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {selectedGuideContent.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedGuideContent.resources && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Additional Resources
                </h4>
                <div className="space-y-3">
                  {selectedGuideContent.resources.map((resource, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <h5 className="font-medium text-gray-900">
                        {resource.title}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {resource.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  )
}
