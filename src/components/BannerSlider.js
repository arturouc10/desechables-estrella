'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const bannerImages = [
  '/banner_images/banner1.jpg',
  '/banner_images/banner2.jpg',
  '/banner_images/banner3.jpg',
  '/banner_images/banner4.jpg',
];

export default function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered]);

  return (
    <div 
      className="modern-banner-slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="slider-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {bannerImages.map((src, index) => (
          <div key={src} className="slider-slide">
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              fill
              className="slider-image"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <button 
        className={`slider-arrow slider-arrow-left ${isHovered ? 'show' : ''}`} 
        onClick={prevSlide}
        aria-label="Anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button 
        className={`slider-arrow slider-arrow-right ${isHovered ? 'show' : ''}`} 
        onClick={nextSlide}
        aria-label="Siguiente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <div className="slider-dots">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
