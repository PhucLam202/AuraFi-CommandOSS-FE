"use client"

import React from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  ArrowUp,
  Github,
  Heart
} from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-float-slow"
        ></div>
        <div 
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-xl animate-float-reverse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  SUI AI Assistant
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We are committed to bringing high-quality products and services, meeting every customer's need with dedication and professionalism. 
                </p>
              </div>
              
              {/* Social Media */}
              {/* <div>
                <h4 className="text-lg font-semibold mb-4 text-cyan-300">Follow us</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: "#", color: "hover:text-blue-400" },
                    { icon: Twitter, href: "#", color: "hover:text-sky-400" },
                    { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                    { icon: Linkedin, href: "#", color: "hover:text-blue-500" },
                    { icon: Youtube, href: "#", color: "hover:text-red-500" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-lg`}
                      aria-label={`Follow us on ${social.icon.name}`}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div> */}
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-cyan-300">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  "Home",
                  "Products",
                  "Services", 
                  "About Us",
                  "News",
                  "Contact"
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:translate-x-2 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-cyan-300">Services</h4>
              <ul className="space-y-3">
                {[
                  "Professional Consulting", 
                  "Technical Support",
                  "Regular Maintenance",
                  "Staff Training",
                  "Custom Design",
                  "24/7 Support"
                ].map((service, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:translate-x-2 inline-block"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-cyan-300">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Github size={16} />
                  </div>
                  <div>
                    <p className="text-gray-300 leading-relaxed">
                     <a href="https://github.com/PhucLam202"> PhucLam </a>
                      </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 group">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail size={16} />
                  </div>
                  <a 
                    href="mailto:phuclpst09495@gmail.com" 
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                  >
                    phuclpst09495@gmail.com
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h5 className="text-lg font-semibold mb-3 text-cyan-300">Subscribe to our newsletter</h5>
                <p className="text-gray-300 text-sm mb-4">
                  Get the latest information about our products and special offers
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:scale-105">
                    <Mail size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-300">
                <span>&copy; {currentYear} YourCompany. All rights reserved.</span>
                <span className="hidden md:inline">|</span>
                <span className="flex items-center space-x-1">
                  <span>Made with</span>
                  <Heart size={16} className="text-red-500 animate-pulse" />
                  <span>in Vietnam</span>
                </span>
              </div>

              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Terms of Use
                </a>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Privacy Policy
                </a>
                <button
                  onClick={scrollToTop}
                  className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Scroll to top"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        @keyframes float-reverse {
          0%, 100% {
            transform: translateY(-20px) scale(1.05);
          }
          50% {
            transform: translateY(0px) scale(1);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;