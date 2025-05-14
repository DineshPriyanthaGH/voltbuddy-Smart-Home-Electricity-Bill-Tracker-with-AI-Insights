import React from 'react'
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FeaturesSection } from './components/FeaturesSection';



export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
    <NavBar />
    <HeroSection/>
    <HowItWorksSection/>
    <FeaturesSection/>

      
    </div>
  );
}
