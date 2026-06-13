'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const bannerImages = [
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
    <div className="banner-slider">
      {bannerImages.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Banner ${index + 1}`}
          width={205}
          height={383}
          className={index === currentIndex ? 'active' : ''}
          priority={index === 0}
        />
      ))}
      <div className="banner-slider-dots">
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
