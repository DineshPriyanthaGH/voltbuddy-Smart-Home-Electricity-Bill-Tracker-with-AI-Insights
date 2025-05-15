import React from 'react'
import { HomeIcon, ZapIcon, RefrigeratorIcon } from 'lucide-react'
import { StrategyCard } from './shared/StrategyCard'
export function CostStrategies() {
  const strategies = [
    {
      id: 1,
      icon: <div className="h-10 w-10 text-blue-500" />,
      title: 'Optimize Appliance Usage',
      description:
        'Learn how to use high-energy appliances more efficiently to reduce your energy consumption.',
      tips: [
        'Run full loads in dishwashers and washing machines',
        'Use cold water for laundry when possible',
        'Clean lint filters in dryers regularly',
      ],
    },
    {
      id: 2,
      icon: <HomeIcon className="h-10 w-10 text-blue-500" />,
      title: 'Home Insulation Tips',
      description:
        'Make your home more energy-efficient with proper insulation and sealing techniques.',
      tips: [
        'Seal gaps around windows and doors',
        'Add insulation to your attic',
        'Use draft stoppers for exterior doors',
      ],
    },
    {
      id: 3,
      icon: <RefrigeratorIcon className="h-10 w-10 text-blue-500" />,
      title: 'Kitchen Energy Efficiency',
      description:
        'Small changes in how you use kitchen appliances can lead to significant energy savings.',
      tips: [
        'Keep refrigerator coils clean',
        'Use lids when cooking to reduce cooking time',
        'Use toaster ovens for small meals instead of the full oven',
      ],
    },
    {
      id: 4,
      icon: <ZapIcon className="h-10 w-10 text-blue-500" />,
      title: 'Smart Power Management',
      description:
        'Use power strips and timers to reduce standby power consumption from electronics.',
      tips: [
        'Use smart power strips for entertainment centers',
        'Set timers for outdoor lighting',
        'Install motion sensors for less-used areas',
      ],
    },
  ]
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Cost Reduction Strategies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategies.map((strategy) => (
          <StrategyCard
            key={strategy.id}
            icon={strategy.icon}
            title={strategy.title}
            description={strategy.description}
            tips={strategy.tips}
          />
        ))}
      </div>
    </section>
  )
}

export default CostStrategies;
