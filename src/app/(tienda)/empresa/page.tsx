import PageLayout from '@/components/PageLayout';
import Lightbox from '@/components/Lightbox';
import BottomCategories from '@/components/BottomCategories';

export const metadata = {
  title: 'Desechables la Estrella - Empresa',
  description: 'Conoce Desechables la Estrella, empresa 100% mexicana fundada en 1988, líder fabricante y distribuidor de desechables y bolsas ecológicas.',
};

const fabricaImages: string[] = [
  '/images/fab/1.jpg',
  '/images/fab/2.jpg',
  '/images/fab/3.jpg',
  '/images/fab/4.jpg',
  '/images/fab/5.jpg',
  '/images/fab/6.jpg',
  '/images/fab/7.jpg',
  '/images/fab/8.jpg',
];

export default function EmpresaPage() {
  return (
    <>
      <PageLayout>
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

        <Lightbox images={fabricaImages} />
      </PageLayout>

      <BottomCategories />
    </>
  );
}
