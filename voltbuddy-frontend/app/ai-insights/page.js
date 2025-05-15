// app/ai-insights/page.js
import React from 'react';
import Header from './components/Header';
import EnergyTips from './components/EnergyTips';
import CostStrategies from './components/CostStrategies';
import PredictionModels from './components/PredictionModels';
import Footer from './components/Footer';

export default function AiInsightsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">AI Insights</h1>
        <p className="text-lg text-gray-600 mb-10">
          Personalized recommendations and actionable insights to help you
          reduce your electricity bills and optimize energy usage.
        </p>
        <EnergyTips />
        <CostStrategies />
        <PredictionModels />
      </main>
      <Footer />
    </div>
  );
}
