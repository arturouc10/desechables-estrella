'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BannerSliderProps {
  images: string[];
}

export default function BannerSlider({ images }: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return null; // No images to show
  }

  return (
    <div className="hero-slider">
      {images.map((src, index) => (
        <div key={src} className={`hero-slide ${index === currentIndex ? 'active' : ''}`}>
          <Image
            src={src}
            alt={`Banner ${index + 1}`}
            fill
            className="hero-image"
            priority={index === 0}
          />
        </div>
      ))}
      {images.length > 1 && (
        <div className="hero-slider-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir a banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
