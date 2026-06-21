import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
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
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </PageLayout>

      <BottomCategories />
    </>
  );
}
