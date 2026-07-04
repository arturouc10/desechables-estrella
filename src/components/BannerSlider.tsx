'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const bannerImages: string[] = [
  '/banner_images/banner1.jpg',
  '/banner_images/banner2.jpg',
  '/banner_images/banner3.jpg',
  '/banner_images/banner4.jpg',
];

export default function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-slider">
      {bannerImages.map((src, index) => (
        <div key={src} className={`hero-slide ${index === currentIndex ? 'active' : ''}`}>
          <Image
            src={src}
            alt={`Banner ${index + 1}`}
            fill
            className="hero-image"
            priority={index === 0}
          />
          {/* Optional: Add an overlay or text content over the hero image here later */}
        </div>
      ))}
      <div className="hero-slider-dots">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
