import React from 'react'
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { DemoVideoSection } from './components/DemoVideoSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FeaturesSection } from './components/FeaturesSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavBar />
      <HeroSection/>
      <DemoVideoSection/>
      <HowItWorksSection/>
      <FeaturesSection/>
      
      <Footer/>
    </div>
  );
}
