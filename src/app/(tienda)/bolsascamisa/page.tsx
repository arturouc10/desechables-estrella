import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
import BottomCategories from '@/components/BottomCategories';
import products from '@/data/products-camisa.json';
import type { StaticProduct } from '@/types';

export const metadata = {
  title: 'Desechables la Estrella - Bolsas Tipo Camiseta',
  description: 'Catálogo de bolsas tipo camiseta de alta densidad marca Modara en diferentes tamaños.',
};

export default function BolsasCamisaPage() {
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
