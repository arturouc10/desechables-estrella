import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    return {
      title: 'Producto no encontrado | Desechables la Estrella',
    };
  }

  return {
    title: `${product.name} | Desechables la Estrella`,
    description: product.description || `Compre ${product.name} en Desechables la Estrella.`,
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  // Fetch related products (same category, excluding the current one)
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      NOT: { id: product.id }
    },
    take: 4
  });

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || '/images/placeholder.jpg'];

  return (
    <PageLayout>
      <div className="product-details-container">
        <div className="product-details-image-wrapper">
          <ProductGallery images={productImages} productName={product.name} />
        </div>
        
        <div className="product-details-info">
          <div>
            <div className="product-details-category">{product.category}</div>
            <h1 className="product-details-title">{product.name}</h1>
          </div>
          
          {product.price && (
            <div className="product-details-price">${product.price} MXN</div>
          )}
          
          {product.description && (
            <div className="product-details-description">
              {product.description}
            </div>
          )}
          
          <div className="product-details-characteristics">
            <h3>Características</h3>
            <ul>
              {product.sku && (
                <li>
                  <span>SKU:</span>
                  <span>{product.sku}</span>
                </li>
              )}
              {product.weight && (
                <li>
                  <span>Presentación / Peso:</span>
                  <span>{product.weight}</span>
                </li>
              )}
              {product.stock !== null && product.stock !== undefined && (
                <li>
                  <span>Disponibilidad:</span>
                  <span>{product.stock > 0 ? 'En stock' : 'Agotado'}</span>
                </li>
              )}
            </ul>
          </div>
          
          <div className="product-details-actions">
            <button className="product-details-add-to-cart" id={`add-to-cart-detail-${product.id}`}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2 className="related-products-title">Productos Similares</h2>
          <div className="product-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
      
      <div style={{ marginTop: '40px' }}>
        <Link href="/productos" className="btn-clear-filters" style={{ display: 'inline-block', maxWidth: '200px', textAlign: 'center' }}>
          Volver al catálogo
        </Link>
      </div>
    </PageLayout>
  );
}
