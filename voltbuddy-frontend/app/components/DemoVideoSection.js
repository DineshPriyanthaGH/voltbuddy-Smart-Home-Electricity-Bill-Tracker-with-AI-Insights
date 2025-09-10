"use client";

import React, { useState } from "react";
import { Play, X, Monitor, Smartphone, Zap } from "lucide-react";

export const DemoVideoSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  return (
    <>
      {/* Demo Video Section */}
      <section className="w-full py-20 md:py-28 relative overflow-hidden" id="demo">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-200/15 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 md:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg shadow-blue-100/50 mb-6">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">See VoltBuddy in Action</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text">
                Experience the Future of
              </span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                Smart Energy Management
              </span>
            </h2>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Watch how VoltBuddy transforms the way you manage electricity bills with 
              AI-powered insights, real-time monitoring, and intelligent cost optimization.
            </p>
          </div>

          {/* Video Preview Card */}
          <div className="max-w-6xl mx-auto">
            <div className="relative group cursor-pointer" onClick={openVideo}>
              {/* Main Video Card */}
              <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-500/20 overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl group-hover:shadow-blue-500/30">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  {/* Left Content */}
                  <div className="flex-1 text-white space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl font-bold">
                        Interactive Product Demo
                      </h3>
                      <p className="text-blue-100 text-lg leading-relaxed">
                        Discover how our AI analyzes your consumption patterns, 
                        predicts future bills, and provides personalized energy-saving recommendations.
                      </p>
                    </div>

                    {/* Features Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Monitor className="w-4 h-4 text-blue-300" />
                        </div>
                        <span className="text-blue-100">Real-time Dashboard</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-green-300" />
                        </div>
                        <span className="text-blue-100">Mobile Responsive</span>
                      </div>
                    </div>

                    {/* Demo Stats */}
                    <div className="flex items-center gap-6 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">10:40</div>
                        <div className="text-xs text-blue-200">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">HD</div>
                        <div className="text-xs text-blue-200">Quality</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">🔊</div>
                        <div className="text-xs text-blue-200">Audio</div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Video Preview */}
                  <div className="relative">
                    {/* Video Thumbnail */}
                    <div className="relative w-80 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                      {/* Enhanced fallback content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-br from-slate-900/90 to-blue-900/90">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Play className="w-8 h-8 text-blue-300" />
                          </div>
                          <div className="text-2xl font-bold">VoltBuddy Demo</div>
                          <div className="text-sm opacity-80 max-w-xs">
                            Experience smart energy management with AI-powered insights and real-time monitoring
                          </div>
                          <div className="flex items-center justify-center gap-4 text-xs opacity-60">
                            <span>• Dashboard Tour</span>
                            <span>• AI Features</span>
                            <span>• Live Demo</span>
                          </div>
                        </div>
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                          <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                        </div>
                      </div>

                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[300%] transition-transform duration-1000"></div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs font-bold text-white">AI</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Click to Play Indicator */}
                <div className="absolute bottom-4 right-4 text-white/60 text-sm font-medium">
                  Click to play →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Container */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video relative">
                {/* Custom Video Player Overlay */}
                <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-white/90 text-sm ml-2 font-medium">VoltBuddy Product Demo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-green-500/20 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs font-medium">LIVE</span>
                    </div>
                    <span className="text-white/80 text-xs">10:40</span>
                  </div>
                </div>

                {/* Bottom Controls Bar */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/90 to-transparent z-20 flex items-center justify-between px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                      <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                    </div>
                    
                    {/* Custom Volume Control */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                        </svg>
                      </div>
                      <div className="w-20 h-1 bg-white/30 rounded-full">
                        <div className="w-16 h-1 bg-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-blue-300 text-xs font-medium">HD Audio</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-white/60 text-xs">2:15</span>
                      <div className="w-32 h-1 bg-white/30 rounded-full">
                        <div className="w-8 h-1 bg-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-white/60 text-xs">10:40</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-purple-500/20 rounded-full">
                      <span className="text-purple-300 text-xs font-medium">AI Demo</span>
                    </div>
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* YouTube Video with Minimal Branding */}
                <iframe
                  src="https://www.youtube.com/embed/Rf8IC5e5FE4?si=bPdlHkErWvbZvO7e&autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0&controls=0&disablekb=1&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&loop=1&playlist=Rf8IC5e5FE4"
                  title="Product Demo"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen={false}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};