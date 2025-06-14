"use client"

import React from "react"

const Banner: React.FC = () => {
  // Dữ liệu ảnh mẫu - bạn có thể thay thế bằng ảnh thực tế
  const images = [
    {
      id: 1,
      src: "/images/Kai.png",
      alt: "Sui Logo",
      title: "SUI"
    },
    {
      id: 2,
      src: "/images/sui.png",
      alt: "Sui Logo", 
      
      title: "SUI"
    },
    {
      id: 3,
      src: "/images/my-logo-rm-bg.png",
      alt: "Sui Logo",
      title: "SUI"
    },
    {
      id: 4,
      src: "/images/walrus.png",
      alt: "Sui Logo",
      title: "SUI"
    },
    {
      id: 5,
      src: "/images/Kai.png",
      alt: "Sui Logo",
      title: "SUI"
    },
    {
      id: 6,
      src: "/images/sui.png",
      alt: "Sui Logo",
      title: "SUI"
    },
    {
      id: 7,
      src: "/images/my-logo-rm-bg.png",
      alt: "Sui Logo",
      title: "SUI"
    },
    {
      id: 8,
      src: "/images/walrus.png",
      alt: "Sui Logo",
      title: "SUI"
    }
  ]

  // Nhân đôi mảng để tạo hiệu ứng vòng lặp liên tục
  const duplicatedImages = [...images, ...images]

  return (
    <div className="w-full overflow-hidden bg-transparent py-4">
      {/* Banner chạy liên tục */}
      <div className="relative">
        <div className="flex animate-scroll">
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="flex-shrink-0 mx-2"
              style={{ width: '280px' }}
              >
              <div className="relative bg-transparent rounded-lg  overflow-hidden h-10 w-10">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain"
                />
                {/* <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                  <h3 className="text-white text-lg font-bold text-center px-2">
                    {image.title}
                  </h3>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
          width: calc(280px * ${duplicatedImages.length} + ${duplicatedImages.length * 16}px);
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

export default Banner;