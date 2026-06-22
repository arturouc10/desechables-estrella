import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import BottomCategories from '@/components/BottomCategories';
import categoriesData from '@/data/categories.json';
import type { Category } from '@/types';

export const metadata = {
  title: 'Desechables la Estrella - Productos',
  description: 'Catálogo de productos desechables: cubiertos AUM, envases, ecobolsas, bolsas tipo camiseta. Consulte nuestra variedad.',
};

export default function ProductosPage() {
  const categories = categoriesData as Category[];

  return (
    <>
      <PageLayout>
        <p>
          El constante crecimiento y desarrollo de Desechables la Estrella, durante su
          prolongada trayectoria empresarial que fue iniciada en 1988- llevaron a una
          diversificación de sus actividades y por ende de sus productos.
        </p>
        <p>
          Estos tienen por finalidad satisfacer las variadas necesidades de los desechables
          como lo son bolsas de polietileno, bolsa de tipo camiseta, bolsas negras para
          basura, cubiertos desechables en general, algunos envases plasticos, etc.
        </p>
        <p>
          Consulte esta sección y conozca en detalle la variedad de productos que
          Desechables la Estrella le ofrece.
        </p>

        <div className="categories-grid">
          {categories.map((cat) => (
            <Link key={cat.id} href={cat.href} className="category-item">
              <Image
                src={cat.image}
                alt={cat.name}
                width={160}
                height={160}
              />
            </Link>
          ))}
        </div>

        <p>
          Selecciona una categoria a consultar para conocer sus caracteristicas y
          especialidades de cada producto que traemos para ti, todos con la mejor
          calidad y utilidad.
        </p>
        <p className="titulo text-right">Gracias por visitar nuestro sitio web!!</p>
      </PageLayout>

      <BottomCategories />
    </>
  );
}
