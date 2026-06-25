'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface LightboxProps {
  images: string[];
}

export default function Lightbox({ images }: LightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  const prev = useCallback((e: React.MouseEvent | React.KeyboardEvent | globalThis.KeyboardEvent) => {
    if ('stopPropagation' in e) e.stopPropagation();
    setSelectedIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = useCallback((e: React.MouseEvent | React.KeyboardEvent | globalThis.KeyboardEvent) => {
    if ('stopPropagation' in e) e.stopPropagation();
    setSelectedIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev(e);
      if (e.key === 'ArrowRight') next(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, close, prev, next]);

  return (
    <>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={src}
              alt={`Foto ${index + 1}`}
              width={120}
              height={120}
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="lightbox-overlay" onClick={close}>
          <button className="lightbox-close" onClick={close} aria-label="Cerrar">
            &times;
          </button>
          <button className="lightbox-prev" onClick={prev} aria-label="Anterior">
            &#8249;
          </button>
          <Image
            src={images[selectedIndex]}
            alt={`Foto ${selectedIndex + 1}`}
            width={800}
            height={600}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox-next" onClick={next} aria-label="Siguiente">
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
