import Image from 'next/image';
import type { Product } from '@/types';
import { siteConfig } from '@/lib/config';

interface ProductTableProps {
  product: Product | {
    id: string;
    name: string;
    weight: string | null;
    category: string;
    price: number | null;
    image: string | null;
  };
}

export default function ProductTable({ product }: ProductTableProps) {
  return (
    <div className="product-item">
      <div className="product-item-image">
        <Image
          src={product.image || '/images/placeholder.jpg'}
          alt={product.name}
          width={116}
          height={86}
        />
      </div>
      <div className="product-item-details">
        <div className="product-item-info">
          <h3 className="product-item-name">{product.name}</h3>
          <span className="product-item-category">{product.category}</span>
          <span className="product-item-weight">{product.weight}</span>
        </div>
        
        <div className="product-item-actions">
          {/* E-commerce: Price and Add to cart */}
          {siteConfig.isEcommerceEnabled && product.price && (
            <div className="product-item-price">
              ${product.price} MXN
            </div>
          )}
          {siteConfig.isEcommerceEnabled && (
            <button className="product-item-add-to-cart" id={`add-to-cart-list-${product.id}`}>
              Agregar
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
