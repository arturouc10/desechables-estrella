import Image from 'next/image';
import type { Product } from '@/types';

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
      <div className="product-item-table">
        <table className="product-table">
          <thead>
            <tr>
              <th style={{ width: '250px' }}>Descripción</th>
              <th>Peso/Cantidad</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product.name}</td>
              <td>{product.weight}</td>
              <td>{product.category}</td>
            </tr>
          </tbody>
        </table>

        {/* E-commerce: Price display (hidden until activated via CSS) */}
        {product.price && (
          <div className="product-card-price">
            ${product.price} MXN
          </div>
        )}
      </div>
    </div>
  );
}
