"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-16">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 z-[-10]">
        <div className="absolute top-20 right-20 w-80 h-80 bg-orange-500 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute bottom-10 left-10 w-60 h-60 bg-blue-500 rounded-full opacity-30 animate-float-reverse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-10 left-1/4 w-40 h-40 bg-cyan-500 rounded-full opacity-50 animate-float-slow"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-16 text-center">
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
            defaultValue="item-1"
          >
            <AccordionItem
              value="item-1"
              className="rounded-xl border-2 border-blue-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <AccordionTrigger className="text-blue-600 text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-6 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300">
                What is SUI AI Assistant ?
              </AccordionTrigger>
              <AccordionContent className="bg-gradient-to-br from-amber-50 to-orange-50 px-8 py-6">
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                  SUI AI Assistant is a smart assistant built on the AI platform, helping users manage and analyze assets on the Sui blockchain. With smart analysis capabilities, the assistant will help you make better investment decisions.
                  </p>
                  <p className="leading-relaxed">
                  The main features include advanced processing capabilities and a user-friendly interface designed for both beginners and experts.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="rounded-xl border-2 border-blue-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <AccordionTrigger className="text-blue-600 text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-6 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300">
                Is my data safe?
              </AccordionTrigger>
              <AccordionContent className="bg-gradient-to-br from-amber-50 to-orange-50 px-8 py-6">
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    We use advanced encryption technology to protect your data.
                    We do not store private keys and only read public data from
                    the blockchain.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="rounded-xl border-2 border-blue-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <AccordionTrigger className="text-blue-600 text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-6 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300">
                How to start?
              </AccordionTrigger>
              <AccordionContent className="bg-gradient-to-br from-amber-50 to-orange-50 px-8 py-6">
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    You only need to connect your SUI wallet and start asking
                    questions to the AI Assistant.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="rounded-xl border-2 border-blue-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <AccordionTrigger className="text-blue-600 text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-6 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300">
              Features & Limits              </AccordionTrigger>
              <AccordionContent className="bg-gradient-to-br from-amber-50 to-orange-50 px-8 py-6">
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                  AI Assistant có thể phân tích:
                  <ul>
                    <li>Your DeFi positions</li>
                    <li>NFT analysis</li>
                    <li>Transaction history</li>
                    <li>And much more...</li>
                  </ul>
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
