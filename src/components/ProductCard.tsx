import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import type { Product } from '@/types';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product | {
    id: string;
    name: string;
    weight: string | null;
    category: string;
    price: number | null;
    image: string | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card" id={`product-${product.id}`}>
      <Link href={`/productos/${product.id}`} className="product-card-image-link">
        <Image
          className="product-card-image"
          src={product.image || '/images/placeholder.jpg'}
          alt={product.name}
          width={200}
          height={120}
        />
      </Link>
      <div className="product-card-body">
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-weight">{product.weight}</div>
        <div className="product-card-category">{product.category}</div>

        {/* E-commerce fields - conditionally rendered */}
        {siteConfig.isEcommerceEnabled && product.price && (
          <div className="product-card-price">
            ${product.price} MXN
          </div>
        )}
        <div className="product-card-buttons">
          <Link href={`/productos/${product.id}`} className="product-card-details-btn">
            Ver detalles
          </Link>
          {siteConfig.isEcommerceEnabled && (
            <AddToCartButton product={product} />
          )}
        </div>
      </div>
    </div>
  );
}
