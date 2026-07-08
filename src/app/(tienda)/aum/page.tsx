import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products-aum.json';
import type { StaticProduct } from '@/types';

export const metadata = {
  title: 'Desechables la Estrella - Cubiertos AUM',
  description: 'Catálogo de cubiertos desechables AUM: cucharas neveras, soperas, medianas, pasteleras y más.',
};

export default function AumPage() {
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
