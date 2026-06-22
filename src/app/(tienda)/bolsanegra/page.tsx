import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
import BottomCategories from '@/components/BottomCategories';
import products from '@/data/products-envases.json';
import type { StaticProduct } from '@/types';

export const metadata = {
  title: 'Desechables la Estrella - Bolsas Negras',
  description: 'Catálogo de bolsas negras de polietileno para basura en diferentes medidas.',
};

export default function BolsasBasuraPage() {
  return (
    <>
      <PageLayout showRepublica>
        <div className="product-grid">
          {(products as StaticProduct[]).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </PageLayout>

      <BottomCategories />
    </>
  );
}
