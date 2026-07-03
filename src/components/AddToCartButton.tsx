'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      className="product-card-add-to-cart" 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAdd();
      }}
      style={{ 
        backgroundColor: added ? '#10b981' : undefined,
        borderColor: added ? '#10b981' : undefined,
        color: added ? '#fff' : undefined,
        cursor: 'pointer'
      }}
    >
      {added ? '✓ Agregado' : 'Agregar al pedido'}
    </button>
  );
}
