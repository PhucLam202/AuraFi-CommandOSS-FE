"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Định nghĩa dữ liệu cho từng tính năng
const featureData = [
  {
    id: "portfolio",
    name: "Portfolio Analysis",
    description: "Analyze your comprehensive SUI portfolio with advanced metrics and insights",
    imageUrl: "/images/portfolio.jpg",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "position",
    name: "Position Tracking",
    description: "Track your trading positions in real-time with detailed analytics",
    imageUrl: "/images/Position_Tracking.jpg",
    color: "from-teal-500 to-blue-500",
  },
  {
    id: "nft",
    name: "NFT Collection Manager",
    description: "Manage and analyze your NFT collections with smart organization tools",
    imageUrl: "/images/NFT_Collection.jpg",
    color: "from-cyan-500 to-teal-500",
  },
  {
    id: "transaction",
    name: "Smart Transaction Analysis",
    description: "Analyze blockchain transactions with AI-powered insights and patterns",
    imageUrl: "/images/Transaction.jpg",
    color: "from-blue-600 to-indigo-500",
  },
];

const FeaturesSection: React.FC = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState(featureData[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const selectedFeature = featureData.find(
    (feature) => feature.id === selectedFeatureId
  );

  const selectedIndex = featureData.findIndex(
    (feature) => feature.id === selectedFeatureId
  );

  const handleFeatureChange = (featureId: string) => {
    if (featureId === selectedFeatureId) return;
    
    const newIndex = featureData.findIndex(feature => feature.id === featureId);
    const currentIndex = selectedIndex;
    
    setIsTransitioning(true);
    
    // Tính toán góc xoay dựa trên vị trí
    const angleDiff = (newIndex - currentIndex) * 90;
    setRotationAngle(prev => prev + angleDiff);
    
    setTimeout(() => {
      setSelectedFeatureId(featureId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  return (
    <section className="relative overflow-hidden mb-20 py-16">
      {/* Animated Background */}
      <div className="absolute inset-0 z-[-10]">
        <div
          className={`absolute inset-0 transition-all duration-1500 ease-in-out
                     bg-gradient-to-br ${selectedFeature?.color || 'from-blue-500 to-cyan-500'}`}
          style={{
            opacity: 0.05,
            transform: isTransitioning ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0deg)',
          }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
      <h2 className="left-0 relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-16 text-left z-10">
          Features
        </h2>

        <div className="relative flex flex-col lg:flex-row gap-16 items-center justify-center z-10">
          {/* Button Section */}
          <div className="flex-shrink-0 flex flex-col items-center lg:items-start gap-6 lg:w-1/3">
            <div className="space-y-4 w-full max-w-sm">
              {featureData.map((feature, index) => (
                <button
                  key={feature.id}
                  className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-500 ease-in-out
                             transform hover:scale-105 relative overflow-hidden group
                             border-2 backdrop-blur-sm
                             ${
                               selectedFeatureId === feature.id
                                 ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-2xl scale-105 shadow-blue-500/25"
                                 : "text-blue-600 border-blue-200 hover:border-blue-400 scale-95 opacity-70 hover:opacity-100 bg-white/50"
                             }`}
                  onClick={() => handleFeatureChange(feature.id)}
                  style={{
                    transform: selectedFeatureId === feature.id 
                      ? 'scale(1.05) translateX(8px)' 
                      : 'scale(0.95) translateX(0px)',
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 
                                   ${selectedFeatureId === feature.id ? 'bg-white' : 'bg-blue-400'}`} />
                    <span className="relative z-10 text-left">{feature.name}</span>
                  </div>
                  
                  {/* Animated background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} transition-all duration-500 ease-in-out
                               ${selectedFeatureId === feature.id ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      transform: selectedFeatureId === feature.id ? 'translateX(0)' : 'translateX(-100%)',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Carousel Image Section */}
          <div className="flex-grow w-full max-w-2xl relative lg:w-2/3">
            {/* Rotating Background Circle */}
            <div
              className={`absolute w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] 
                         rounded-full z-[-1] transition-all duration-1000 ease-in-out
                         top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                         bg-gradient-to-br ${selectedFeature?.color || 'from-blue-500 to-cyan-500'}`}
              style={{
                transform: `translate(-50%, -50%) scale(${isTransitioning ? 0.9 : 1}) rotate(${rotationAngle}deg)`,
                opacity: 0.1,
              }}
            />

            {/* Carousel Container */}
            <div className="relative w-full h-[400px] lg:h-[500px] perspective-1000">
              <div
                className="relative w-full h-full preserve-3d transition-transform duration-700 ease-in-out"
                style={{
                  transform: `rotateY(${-selectedIndex * 90}deg)`,
                }}
              >
                {featureData.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="absolute inset-0 backface-hidden"
                    style={{
                      transform: `rotateY(${index * 90}deg) translateZ(250px)`,
                    }}
                  >
                    <div className={`relative w-full h-full overflow-hidden rounded-2xl shadow-2xl
                                   transition-all duration-500 ease-in-out
                                   ${selectedIndex === index ? 'scale-100 opacity-100' : 'scale-90 opacity-40'}`}>
                      <Image
                        src={feature.imageUrl}
                        alt={feature.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-all duration-700 ease-in-out"
                        priority={index === 0}
                      />

                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-20`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                        <div className={`transform transition-all duration-500 ease-in-out delay-200
                                       ${selectedIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                            {feature.name}
                          </h3>
                          <p className="text-white/90 text-lg leading-relaxed max-w-md drop-shadow-md">
                            {feature.description}
                          </p>
                        </div>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {featureData.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out
                             ${selectedIndex === index 
                               ? 'bg-blue-500 scale-125 shadow-lg' 
                               : 'bg-blue-200 hover:bg-blue-300'}`}
                  onClick={() => handleFeatureChange(featureData[index].id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;