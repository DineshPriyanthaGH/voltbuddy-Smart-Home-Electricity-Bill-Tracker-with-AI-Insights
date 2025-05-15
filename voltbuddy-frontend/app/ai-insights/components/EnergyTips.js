import React from 'react'
import { LightbulbIcon, ThermometerIcon, TvIcon } from 'lucide-react'
import { TipCard } from './shared/TipCard'
export function EnergyTips() {
  const tips = [
    {
      id: 1,
      icon: <div className="h-8 w-8 text-green-500" />,
      title: 'Use your washing machine during off-peak hours',
      description:
        'Running your washing machine during off-peak hours can save you up to 20% on energy costs for laundry.',
    },
    {
      id: 2,
      icon: <LightbulbIcon className="h-8 w-8 text-green-500" />,
      title: 'Switch to energy-efficient LED lights',
      description:
        'LED bulbs use up to 90% less energy than traditional incandescent bulbs and last much longer.',
    },
    {
      id: 3,
      icon: <ThermometerIcon className="h-8 w-8 text-green-500" />,
      title: 'Adjust your thermostat by 1-2 degrees',
      description:
        'Small adjustments to your thermostat can lead to significant energy savings without sacrificing comfort.',
    },
    {
      id: 4,
      icon: <TvIcon className="h-8 w-8 text-green-500" />,
      title: 'Unplug electronics when not in use',
      description:
        "Many devices consume energy even when turned off. Unplugging them can reduce your 'phantom' energy usage.",
    },
  ]
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Energy-Saving Tips
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip) => (
          <TipCard
            key={tip.id}
            icon={tip.icon}
            title={tip.title}
            description={tip.description}
          />
        ))}
      </div>
    </section>
  )
}
export default EnergyTips