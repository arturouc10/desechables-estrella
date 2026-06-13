import PageLayout from '@/components/PageLayout';
import ProductTable from '@/components/ProductTable';
import BottomCategories from '@/components/BottomCategories';
import products from '@/data/products-aum.json';

export const metadata = {
  title: 'Desechables la Estrella - Cubiertos AUM',
  description: 'Catálogo de cubiertos desechables AUM: cucharas neveras, soperas, medianas, pasteleras y más.',
};

export default function AumPage() {
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
