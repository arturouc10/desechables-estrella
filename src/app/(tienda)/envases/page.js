import PageLayout from '@/components/PageLayout';
import ProductTable from '@/components/ProductTable';
import BottomCategories from '@/components/BottomCategories';
import products from '@/data/products-envases.json';

export const metadata = {
  title: 'Desechables la Estrella - Envases y Bolsas Negras',
  description: 'Catálogo de bolsas negras de polietileno para basura en diferentes medidas.',
};

export default function EnvasesPage() {
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
