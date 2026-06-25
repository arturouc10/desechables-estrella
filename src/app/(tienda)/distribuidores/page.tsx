import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import BottomCategories from '@/components/BottomCategories';

export const metadata = {
  title: 'Desechables la Estrella - Distribuidores',
  description: 'Red de distribución de Desechables la Estrella a nivel nacional. Cobertura en toda la República Mexicana.',
};

export default function DistribuidoresPage() {
  return (
    <>
      <PageLayout>
        <div className="distributor-map">
          <Image
            src="/images/mapa.png"
            alt="Mapa de distribuidores - Cobertura nacional"
            width={670}
            height={383}
          />
        </div>
      </PageLayout>

      <BottomCategories />
    </>
  );
}
