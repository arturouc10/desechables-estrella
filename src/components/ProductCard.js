import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="product-card" id={`product-${product.id}`}>
      <Image
        className="product-card-image"
        src={product.image}
        alt={product.name}
        width={200}
        height={120}
      />
      <div className="product-card-body">
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-weight">{product.weight}</div>
        <div className="product-card-category">{product.category}</div>

        {/* E-commerce fields - hidden via CSS until activated */}
        {product.price && (
          <div className="product-card-price">
            ${product.price} MXN
          </div>
        )}
        <button className="product-card-add-to-cart" id={`add-to-cart-${product.id}`}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
