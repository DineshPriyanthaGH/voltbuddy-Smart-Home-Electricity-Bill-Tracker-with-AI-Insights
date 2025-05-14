import React from 'react'
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';



export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
    <NavBar />
    <HeroSection/>

      
    </div>
  );
}
