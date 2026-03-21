import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const ScreenshotCarousel: React.FC = () => {
  const screenshots = [1, 2, 3, 4, 5, 6];

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 }
        }}
        className="w-full pb-12"
      >
        {screenshots.map((num) => (
          <SwiperSlide key={num}>
            <div className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 hover:ring-1 hover:ring-primary/50 bg-surface-elevated">
              <img 
                src={`/screenshots/${num}.png`} 
                alt={`Screenshot ${num}`} 
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
