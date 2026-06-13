import PageLayout from '@/components/PageLayout';
import ProductTable from '@/components/ProductTable';
import BottomCategories from '@/components/BottomCategories';
import products from '@/data/products-camisa.json';

export const metadata = {
  title: 'Desechables la Estrella - Bolsas Tipo Camiseta',
  description: 'Catálogo de bolsas tipo camiseta de alta densidad marca Modara en diferentes tamaños.',
};

export default function BolsasCamisaPage() {
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
