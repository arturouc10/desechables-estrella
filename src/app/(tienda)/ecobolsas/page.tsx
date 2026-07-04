import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products-ecobolsas.json';
import type { StaticProduct } from '@/types';

export const metadata = {
  title: 'Desechables la Estrella - Eco Bolsas',
  description: 'Catálogo de ecobolsas: bolsas de polietileno de alta y baja densidad en diferentes medidas.',
};

export default function EcobolsasPage() {
  return (
      <PageLayout>
        <div className="product-grid">
          {(products as StaticProduct[]).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </PageLayout>
  );
}
