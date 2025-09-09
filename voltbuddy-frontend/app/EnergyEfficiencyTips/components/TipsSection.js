import React from 'react'
import {
  PowerOffIcon,
  LightbulbIcon,
  ThermometerIcon,
  RefrigeratorIcon,
  FanIcon,
  MonitorIcon,
  ShowerHeadIcon,
} from 'lucide-react'
import PropTypes from 'prop-types'

const Tip = ({ icon, title, description, tooltip }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className="p-2 bg-blue-50 rounded-full text-blue-600 group-hover:bg-blue-100 transition-colors">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          {tooltip && (
            <div className="mt-2 text-xs text-gray-400 italic">
              <span className="font-medium">Tip:</span> {tooltip}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

Tip.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
}

export const TipsSection = ({ searchQuery }) => {
  const tips = [
    {
      icon: <PowerOffIcon className="w-5 h-5" />,
      title: 'Unplug devices when not in use',
      description:
        'Many electronics consume power even when turned off. Unplug chargers, appliances, and electronics when not in use.',
      tooltip: 'This can save up to 10% on your electricity bill.',
    },
    {
      icon: <LightbulbIcon className="w-5 h-5" />,
      title: 'Switch to LED lighting',
      description:
        'LED bulbs use up to 90% less energy than incandescent bulbs and last much longer.',
      tooltip:
        'Replace your five most-used light fixtures with LED bulbs to save up to $75 annually.',
    },
    {
      icon: <ThermometerIcon className="w-5 h-5" />,
      title: 'Optimize AC usage',
      description:
        'Set your thermostat to 78°F (26°C) in summer and 68°F (20°C) in winter for optimal energy savings.',
      tooltip: 'Each degree adjustment can save 3-5% on energy costs.',
    },
    {
      icon: <div className="w-5 h-5" />,
      title: 'Wash clothes in cold water',
      description:
        'Using cold water for laundry saves energy and keeps clothes looking new longer.',
      tooltip: 'Up to 90% of washing machine energy goes to heating water.',
    },
    {
      icon: <RefrigeratorIcon className="w-5 h-5" />,
      title: 'Maintain your refrigerator',
      description:
        'Keep refrigerator coils clean and set the temperature between 37-40°F for optimal efficiency.',
      tooltip: 'Clean coils twice a year to improve efficiency by up to 30%.',
    },
    {
      icon: <FanIcon className="w-5 h-5" />,
      title: 'Use ceiling fans',
      description:
        'Ceiling fans allow you to raise your thermostat setting by 4°F with no reduction in comfort.',
      tooltip: 'Remember to turn fans off when you leave the room.',
    },
    {
      icon: <MonitorIcon className="w-5 h-5" />,
      title: 'Enable power management on devices',
      description:
        'Configure computers and other electronics to enter sleep mode when not in use.',
      tooltip: 'This can save up to $50 per device annually.',
    },
    {
      icon: <ShowerHeadIcon className="w-5 h-5" />,
      title: 'Install low-flow showerheads',
      description:
        'Reduce hot water usage without sacrificing pressure or comfort.',
      tooltip: 'Can save up to 2,700 gallons of water annually per household.',
    },
  ]
  const filteredTips = searchQuery
    ? tips.filter(
        (tip) =>
          tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tip.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tips
  return (
    <section id="tips-section">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Energy-Saving Tips
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTips.map((tip, index) => (
          <Tip key={index} {...tip} />
        ))}
      </div>
    </section>
  )
}

TipsSection.propTypes = {
  searchQuery: PropTypes.string.isRequired,
}
