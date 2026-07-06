import PageLayout from '@/components/PageLayout';
import Carousel from '@/components/Carousel';

export const metadata = {
  title: 'Empresa | Desechables la Estrella',
  description: 'Conoce Desechables la Estrella, empresa 100% mexicana fundada en 1988, líder fabricante y distribuidor de desechables y bolsas ecológicas.',
};

// Generar array con todas las imágenes
const allImages: string[] = [
  ...Array.from({ length: 8 }, (_, i) => `/images/fab/${i + 1}.jpg`),
  ...Array.from({ length: 9 }, (_, i) => `/images/empresa/${i + 1}.jpg`)
];

export default function EmpresaPage() {
  return (
    <PageLayout>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="titulo" style={{ fontSize: '32px', marginBottom: '1rem' }}>Sobre Nosotros</h1>
      </div>

      <Carousel images={allImages} autoPlayInterval={4000} />

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', fontSize: '18px' }}>
        <p>
          Desechables la Estrella, es una empresa 100% mexicana fundada en el año de 1988,
          que se mantiene como líder fabricante y distribuidor de desechables y bolsas ecologicas.
        </p>
        <p>
          Nuestra empresa siempre se ha caracterizado por ofrecer calidad, servicio y variedad
          de productos de diferentes marcas como son: Desechables la Estrella AUM y ECO BOLSAS
          (marcas registradas). Llegamos a toda la Republica Mexicana atendiendo altos volumenes
          de consumo y cumpliendo los mas altos estandares de calidad.
        </p>
      </div>
    </PageLayout>
  );
}
