import React from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with enhanced gradient and blockchain elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-amber-300 to-blue-200 opacity-90"></div>
      
      {/* Decorative blockchain nodes */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500 rounded-full opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-8 h-8 bg-blue-500 rounded-full opacity-30"></div>
      <div className="absolute bottom-0 left-20 w-10 h-10 bg-blue-500 rounded-full opacity-30"></div>
      <div className="absolute bottom-40 right-20 w-6 h-6 bg-orange-500 rounded-full opacity-40"></div>
      <div className="absolute top-35 right-10 w-10 h-10 bg-orange-500 rounded-full opacity-30"></div>
      <div className="absolute top-20 right-10 w-6 h-6 bg-orange-500 rounded-full opacity-50"></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-amber-500 rounded-full opacity-35"></div>
      
      <div className="relative flex flex-col md:flex-row items-center justify-between py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
        
        {/* Left Content - Enhanced */}
        <div className="flex-1 md:w-1/2 text-center md:text-left mb-12 md:mb-0 md:pr-8">
          
          {/* Badge */} 
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            🚀 Powered by Advanced AI
          </div>
          
          {/* Main Headlines */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              SUI AI
            </span>
            <br />
            <span className="text-gray-800">Assistant</span>
          </h1>

          {/* Enhanced Description */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-xl">
            Your intelligent companion for the SUI blockchain ecosystem. 
            <span className="font-semibold text-blue-700"> Portfolio analysis, DeFi insights, and NFT management</span> - all powered by cutting-edge AI.
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center md:justify-start gap-6 mb-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>10K+ Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>24/7 AI Support</span>
            </div>
          </div>

          {/* Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-amber-500 text-white rounded-xl hover:from-blue-700 hover:bg-gradient-to-r from-blue-500 to-amber-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
            >
              Try Free Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            {/* <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-700 bg-white border-2 border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
            >
              View Demo
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m1-5.5a2.5 2.5 0 11-5 0v3a2.5 2.5 0 015 0z" />
              </svg>
            </Link> */}
          </div>
        </div>

        <div className="flex-1 md:w-1/2 flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full opacity-20 blur-lg"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-30 blur-md"></div>
            
            <div className="relative w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
              <img 
                src="/images/my-logo.png" 
                alt="SUI AI Assistant - Blockchain AI Helper" 
                className="w-full h-full object-cover rounded-3xl transform hover:scale-105 transition-transform duration-500" 
              />
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                AI Powered
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-orange-600">
                SUI Ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;