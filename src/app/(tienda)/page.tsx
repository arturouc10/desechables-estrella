import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import BannerSlider from '@/components/BannerSlider';

export const metadata = {
  title: 'Desechables la Estrella - Inicio',
  description: 'AUM Desechables la Estrella. Empresa líder en distribución de productos desechables desde 1988 en Guadalajara, Jalisco.',
};

export default function HomePage() {
  return (
    <>
      <BannerSlider />
      <PageLayout>

        <div className="homepage-intro" style={{ marginTop: '40px', marginBottom: '40px' }}>
          <p>
            AUM Desechables la Estrella. Nace en Guadalajara el 12 de Diciembre de 1988,
            fue creada con el propósito de satisfacer las necesidades de empaque del mercado
            de Guadalajara Jalisco.
          </p>
          <p>
            A lo largo de los años, la compañía ha representado de manera exclusiva las más
            importantes fábricas mexicanas de este gremio y la distribucion de marcas lideres.
            Con más de 20 años de experiencia, Desechables la Estrella se ha consolidado como
            una empresa líder en la distribución y representación de productos desechables,
            llegando a todas las ciudades y poblaciones que componen a nivel Nacional, ocupando
            orgullosamente un lugar dentro de las 10 empresas más importantes y de Guadalajara.
          </p>

          <div className="vision-section">
            <div className="vision-text">
              <p className="titulo">VISION</p>
              <p>
                Ser líder en el mercado de productos desechables a Nivel Nacional, ofreciendo
                y garantizando calidad en todos sus productos y servicios, generando resultados
                óptimos que contribuyan al crecimiento de la organización.
              </p>
            </div>
            <div className="vision-image">
              <Image
                src="/images/fabrica.png"
                alt="Fábrica Desechables la Estrella"
                width={800}
                height={500}
                style={{ borderRadius: '0.75rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0' }}
              />
            </div>
          </div>

          <p className="titulo">MISION</p>
          <p>
            Nuestra razón de ser, es ofrecer productos desechables de la mejor calidad y al
            mejor precio, brindando un servicio de calidad de clase mundial con el respaldo
            de nuestras fabricas de producto.
          </p>
          <p>
            Nuestra labor principal es satisfacer las necesidades del mercado, haciendo énfasis
            en la logística y preparación de nuestro equipo para brindar un excelente servicio.
          </p>
          <p className="titulo">CRECIMIENTO</p>
          <p>
            El constante crecimiento y desarrollo de Desechables la Estrella, durante su
            prolongada trayectoria empresarial que fue iniciada en 1988- llevaron a una
            diversificación de sus actividades y por ende de sus productos.
          </p>
          <p>
            Estos tienen por finalidad satisfacer las variadas necesidades de los desechables
            como lo son bolsas de polietileno, bolsa de tipo camiseta, bolsas negras para
            basura, cubiertos desechables en general, algunos envases plásticos, etc.
          </p>
          <p>
            <strong>Consulte nuestro catálogo interactivo para conocer en detalle la variedad de productos que
              Desechables la Estrella le ofrece.</strong>
          </p>
        </div>
      </PageLayout>
    </>
  );
}
