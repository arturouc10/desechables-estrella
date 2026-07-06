import PageLayout from '@/components/PageLayout';
import ProductCatalog from '@/components/ProductCatalog';
import categoriesData from '@/data/categories.json';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Productos | Desechables la Estrella',
  description: 'Catálogo de productos desechables: cubiertos AUM, envases, ecobolsas, bolsas tipo camiseta. Filtre y consulte nuestra variedad.',
};

export const dynamic = 'force-dynamic'; // To ensure we fetch fresh products

export default async function ProductosPage() {
  const categories = categoriesData;

  // Fetch products from database
  let products = [];
  try {
    const allProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    products = allProducts.filter(p => p.disabled !== true);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <PageLayout>


      <ProductCatalog products={products} categories={categories} />

      <p className="titulo text-right" style={{ marginTop: '40px' }}>
        ¡Gracias por visitar nuestro sitio web!
      </p>
    </PageLayout>
  );
}
