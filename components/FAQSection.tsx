"use client"

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
        <div
          className="absolute top-20 right-20 w-80 h-80 bg-orange-500 rounded-full opacity-20 animate-float"
        ></div>
        <div
          className="absolute bottom-10 left-10 w-60 h-60 bg-blue-500 rounded-full opacity-30 animate-float-reverse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-10 left-1/4 w-40 h-40 bg-cyan-500 rounded-full opacity-50 animate-float-slow"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>

      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-16 text-center">
          Câu Hỏi Thường Gặp
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1" className="rounded-xl border-2 border-blue-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <AccordionTrigger className="text-blue-600 text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-6 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300">
                Thông Tin Sản Phẩm
              </AccordionTrigger>
              <AccordionContent className="bg-gradient-to-br from-amber-50 to-orange-50 px-8 py-6">
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Sản phẩm chủ lực của chúng tôi kết hợp công nghệ tiên tiến với thiết kế hiện đại. 
                    Được chế tạo từ vật liệu cao cấp, mang lại hiệu suất và độ tin cậy vượt trội.
                  </p>
                  <p className="leading-relaxed">
                    Các tính năng chính bao gồm khả năng xử lý tiên tiến và giao diện người dùng 
                    trực quan được thiết kế cho cả người mới bắt đầu và chuyên gia.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="rounded-xl border-2 border-blue-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <AccordionTrigger className="text-blue-600 text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-6 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300">
                Chi Tiết Vận Chuyển
              </AccordionTrigger>
              <AccordionContent className="bg-gradient-to-br from-amber-50 to-orange-50 px-8 py-6">
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Chúng tôi cung cấp dịch vụ vận chuyển toàn cầu thông qua các đối tác chuyển phát 
                    uy tín. Giao hàng tiêu chuẩn mất 3-5 ngày làm việc, trong khi vận chuyển nhanh 
                    đảm bảo giao hàng trong vòng 1-2 ngày làm việc.
                  </p>
                  <p className="leading-relaxed">
                    Tất cả đơn hàng được đóng gói cẩn thận và bảo hiểm toàn phần. Theo dõi lô hàng 
                    của bạn theo thời gian thực thông qua cổng theo dõi chuyên dụng của chúng tôi.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="rounded-xl border-2 border-blue-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <AccordionTrigger className="text-blue-600 text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-6 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300">
                Chính Sách Đổi Trả
              </AccordionTrigger>
              <AccordionContent className="bg-gradient-to-br from-amber-50 to-orange-50 px-8 py-6">
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Chúng tôi đứng sau sản phẩm của mình với chính sách đổi trả toàn diện trong 30 ngày. 
                    Nếu bạn không hoàn toàn hài lòng, chỉ cần trả lại sản phẩm trong tình trạng ban đầu.
                  </p>
                  <p className="leading-relaxed">
                    Quy trình đổi trả dễ dàng của chúng tôi bao gồm miễn phí vận chuyển trả hàng và 
                    hoàn tiền đầy đủ được xử lý trong vòng 48 giờ sau khi nhận được sản phẩm trả lại.
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