import PageLayout from '@/components/PageLayout';
import ProductTable from '@/components/ProductTable';
import BottomCategories from '@/components/BottomCategories';
import products from '@/data/products-ecobolsas.json';

export const metadata = {
  title: 'Desechables la Estrella - Eco Bolsas',
  description: 'Catálogo de ecobolsas: bolsas de polietileno de alta y baja densidad en diferentes medidas.',
};

export default function EcobolsasPage() {
  return (
    <>
      <PageLayout showRepublica>
        {products.map((product) => (
          <ProductTable key={product.id} product={product} />
        ))}
      </PageLayout>

      <BottomCategories />
    </>
  );
}
