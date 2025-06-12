"use client";

import React from 'react';
import { Star, MessageCircle, Brain, Shield, Zap, Users } from 'lucide-react';
import Header from '@/components/layouts/Header';

const AboutPage = () => {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-amber-300 to-blue-200 opacity-90">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl mb-6">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About AuraFi AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            An intelligent AI assistant designed to support you in your work and daily life
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* What is AuraFi AI */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What is AuraFi AI?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              AuraFi AI is a modern AI chat application built with cutting-edge technology, 
              enabling users to interact intelligently with artificial intelligence. The application was developed 
              with the goal of providing a smooth, intelligent, and useful chat experience.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Built on the Next.js and TypeScript platform, AuraFi AI combines a user-friendly interface 
              with powerful AI processing capabilities to meet all your needs.
            </p>
          </div>

          {/* Key Features */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Chat Room Management</h3>
                  <p className="text-gray-600 text-sm">Create and manage multiple chat rooms for specific purposes</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Intelligent AI</h3>
                  <p className="text-gray-600 text-sm">Integrates advanced AI with contextual understanding and accurate response capabilities</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">High Security</h3>
                  <p className="text-gray-600 text-sm">Uses JWT authentication and data encryption to protect user information</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">High Performance</h3>
                  <p className="text-gray-600 text-sm">Processes messages quickly with an optimized system and smart caching</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Stack */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Technical Stack</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Frontend</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Next.js 15.3 - Modern React framework</li>
                  <li>• TypeScript - Type-safe programming language</li>
                  <li>• Tailwind CSS - Responsive design</li>
                  <li>• Radix UI - High-quality components</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Backend</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Node.js + Express - Powerful server</li>
                  <li>• MongoDB + Mongoose - Flexible database</li>
                  <li>• JWT Authentication - Optimal security</li>
                  <li>• AI Integration - Intelligent AI integration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Architecture */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">System Architecture</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-lg mb-4">
                  <Users className="w-8 h-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Client Layer</h3>
                <p className="text-gray-600 text-sm">Responsive and user-friendly interface</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-lg mb-4">
                  <Zap className="w-8 h-8 text-purple-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">API Layer</h3>
                <p className="text-gray-600 text-sm">RESTful API with security middleware</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-lg mb-4">
                  <Brain className="w-8 h-8 text-green-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">AI Layer</h3>
                <p className="text-gray-600 text-sm">Intelligent processing with AI and Machine Learning</p>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto">
              To create an intelligent, user-friendly, and reliable AI assistant, enabling people 
              to interact effectively with artificial intelligence in their work and daily lives.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>© 2025 AuraFi AI. All rights reserved.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutPage;