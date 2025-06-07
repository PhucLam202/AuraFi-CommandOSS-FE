"use client"

import React, { useState } from "react";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Tạo mailto link với thông tin form
      const subject = encodeURIComponent(`[Liên hệ] ${formData.subject}`);
      const body = encodeURIComponent(`
Họ tên: ${formData.name}
Email: ${formData.email}
Số điện thoại: ${formData.phone}
Chủ đề: ${formData.subject}

Nội dung:
${formData.message}
      `);
      
      const mailtoLink = `mailto:phuclpst09495@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Animated Background */}
      <div className="absolute inset-0 z-[-10]">
        <div
          className="absolute top-1/4 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-float-slow"
        ></div>
        <div
          className="absolute bottom-1/4 left-10 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-15 animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Liên Hệ Với Chúng Tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hãy để lại thông tin của bạn, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-700 block">
                    Họ và Tên *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-gray-700 block">
                    Số Điện Thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    placeholder="0123 456 789"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-gray-700 block">
                    Chủ Đề *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="Tư vấn sản phẩm">Tư vấn sản phẩm</option>
                    <option value="Hỗ trợ kỹ thuật">Hỗ trợ kỹ thuật</option>
                    <option value="Khiếu nại">Khiếu nại</option>
                    <option value="Hợp tác">Hợp tác</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-700 block">
                  Nội Dung *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl">
                  Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                  Có lỗi xảy ra. Vui lòng thử lại sau.
                </div>
              )}

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang gửi...
                    </span>
                  ) : (
                    'Gửi Tin Nhắn'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
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
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;