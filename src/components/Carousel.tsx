'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css';

interface CarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

export default function Carousel({ images, autoPlayInterval = 3000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [next, autoPlayInterval]);

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.carouselContainer}>
      <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prev}>
        &#8249;
      </button>
      
      <div className={styles.imageWrapper}>
        <Image
          src={images[currentIndex]}
          alt=""
          fill
          className={styles.carouselImageBackground}
          priority
        />
        <Image
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          fill
          className={styles.carouselImage}
          priority
        />
      </div>

      <button className={`${styles.navButton} ${styles.nextButton}`} onClick={next}>
        &#8250;
      </button>

      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
