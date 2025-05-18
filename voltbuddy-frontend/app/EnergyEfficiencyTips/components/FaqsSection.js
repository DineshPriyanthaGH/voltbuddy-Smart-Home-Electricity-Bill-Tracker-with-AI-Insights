import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
/**
 * @param {{ question: string, answer: string, isOpen: boolean, toggleOpen: () => void }} props
 */
const FaqItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <span className="ml-6 flex-shrink-0 text-blue-600">
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-500">{answer}</p>
        </div>
      )}
    </div>
  )
}
/**
 * @param {{ searchQuery: string }} props
 */
export const FaqsSection = ({ searchQuery }) => {
  const faqs = [
    {
      question: 'What are the biggest energy consumers in a typical home?',
      answer:
        'The biggest energy consumers are typically heating and cooling systems (40-50%), water heating (14%), lighting (9%), refrigeration (4%), and other appliances/electronics (33%).',
    },
    {
      question: 'How much can I save by switching to LED bulbs?',
      answer:
        'LED bulbs use up to 90% less energy than traditional incandescent bulbs and last 15-25 times longer. An average household can save about $225 in energy costs per year by replacing incandescent bulbs with LEDs.',
    },
    {
      question: 'Is it better to turn off appliances or leave them on standby?',
      answer:
        "It's always better to completely turn off appliances rather than leaving them on standby. Standby power can account for 5-10% of residential electricity use, costing the average household up to $100 per year.",
    },
    {
      question: 'How often should I service my HVAC system?',
      answer:
        'Your HVAC system should be serviced at least once a year, ideally before heavy-use seasons (summer for cooling, winter for heating). Regular maintenance can improve efficiency by up to 15%.',
    },
    {
      question: 'Do smart power strips really save energy?',
      answer:
        'Yes, smart power strips can detect when devices are in standby mode and cut power completely, eliminating phantom energy use. They can save 5-10% on your electricity bill, depending on how many electronics you use.',
    },
    {
      question: 'What temperature should I set my water heater to?',
      answer:
        'Setting your water heater to 120°F (49°C) is both energy-efficient and safe. Each 10°F reduction in water temperature can save 3-5% on water heating costs.',
    },
  ]
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }
  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs
  return (
    <section id="faqs-section">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {filteredFaqs.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openFaqIndex === index}
            toggleOpen={() => toggleFaq(index)}
          />
        ))}
      </div>
    </section>
  )
}