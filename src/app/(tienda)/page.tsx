import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import BannerSlider from '@/components/BannerSlider';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Inicio | Desechables la Estrella',
  description: 'AUM Desechables la Estrella. Empresa líder en distribución de productos desechables desde 1988 en Guadalajara, Jalisco.',
};

export const revalidate = 0; // Revalida en cada request para mostrar nuevas imágenes

export default async function HomePage() {
  const carouselImages = await prisma.carouselImage.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });

  const bannerUrls = carouselImages.map((img) => img.url);

  return (
    <>
      {bannerUrls.length > 0 && <BannerSlider images={bannerUrls} />}

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
              <p className="titulo" style={{ marginTop: '2rem' }}>MISION</p>
              <p>
                Nuestra razón de ser, es ofrecer productos desechables de la mejor calidad y al
                mejor precio, brindando un servicio de calidad de clase mundial con el respaldo
                de nuestras fabricas de producto.
              </p>
              <p>
                Nuestra labor principal es satisfacer las necesidades del mercado, haciendo énfasis
                en la logística y preparación de nuestro equipo para brindar un excelente servicio.
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

      {/* 1. Sección de Beneficios */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'center' }}>
        <div style={{ padding: '2rem 1.5rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
          <h3 style={{ fontSize: '1.25rem', color: '#173c66', marginBottom: '0.5rem', fontWeight: 'bold' }}>Más de 35 años</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>Experiencia y solidez desde 1988 en el mercado de empaques.</p>
        </div>
        <div style={{ padding: '2rem 1.5rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚚</div>
          <h3 style={{ fontSize: '1.25rem', color: '#173c66', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cobertura Nacional</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>Llegamos a todas las ciudades y poblaciones de México.</p>
        </div>
        <div style={{ padding: '2rem 1.5rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
          <h3 style={{ fontSize: '1.25rem', color: '#173c66', marginBottom: '0.5rem', fontWeight: 'bold' }}>Calidad Garantizada</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>Representamos exclusivamente a las fábricas líderes del país.</p>
        </div>
      </div>

      {/* Contenedor del Video de YouTube */}
      <div style={{ width: '100%', maxWidth: '1200px', margin: '2rem auto 4rem auto', padding: '0 1rem' }}>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', background: '#f1f5f9' }}>
          <iframe
            src="https://www.youtube.com/embed/ID_DEL_VIDEO_AQUI"
            title="Video Desechables Estrella"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* 4. Tira de Marcas (Fuera del PageLayout para que ocupe todo el ancho) */}
      <div style={{ background: '#f8fafc', padding: '4rem 1rem', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', color: '#173c66', marginBottom: '2.5rem', fontWeight: 'bold' }}>Marcas que nos respaldan</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', opacity: 0.8, alignItems: 'center' }}>
            {/* Ejemplo de cómo agregar un logo real: */}
            {/* 
            <Image 
              src="/images/logos/marca1.png" 
              alt="Logo Marca 1" 
              width={120} 
              height={60} 
              style={{ objectFit: 'contain' }} 
            /> 
            */}
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#64748b' }}>MARCA 1</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#64748b' }}>MARCA 2</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#64748b' }}>MARCA 3</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#64748b' }}>MARCA 4</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#64748b' }}>MARCA 5</div>
          </div>
        </div>
      </div>
    </>
  );
}
