'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="product-gallery-container">
      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="product-gallery-thumbnails">
          {images.map((img, index) => (
            <div
              key={index}
              className={`product-gallery-thumbnail ${index === currentIndex ? 'active' : ''}`}
              onMouseEnter={() => setCurrentIndex(index)}
              onClick={() => setCurrentIndex(index)}
            >
              <Image
                src={img}
                alt={`${productName} - thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="thumbnail-img"
              />
            </div>
          ))}
        </div>
      )}

      {/* Imagen Principal (Clic para abrir lightbox) */}
      <div
        className="product-gallery-main"
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image
          src={images[currentIndex]}
          alt={productName}
          width={600}
          height={600}
          className="main-img-base"
          priority
        />

        <div className="zoom-hint">
          <span>Clic para ver completa</span>
        </div>
      </div>

      {/* Lightbox para pantalla completa */}
      {isLightboxOpen && (
        <div className="product-gallery-lightbox" onClick={() => setIsLightboxOpen(false)}>
          <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>✕</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[currentIndex]}
              alt={productName}
              width={1200}
              height={1200}
              className="lightbox-img"
            />
            {images.length > 1 && (
              <>
                <button
                  className="lightbox-nav prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                  }}
                >
                  ‹
                </button>
                <button
                  className="lightbox-nav next"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                  }}
                >
                  ›
                </button>
                <div className="lightbox-thumbnails">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`lightbox-thumb ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <Image src={img} alt="" width={60} height={60} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
