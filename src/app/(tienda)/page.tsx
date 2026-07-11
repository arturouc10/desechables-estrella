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
  const [carouselImages, brandImages, siteSetting] = await Promise.all([
    prisma.carouselImage.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    }),
    prisma.brandImage.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    }),
    prisma.siteSetting.findUnique({
      where: { key: 'YOUTUBE_URL' }
    })
  ]);

  const bannerUrls = carouselImages.map((img) => img.url);
  const youtubeUrl = siteSetting?.value || "https://www.youtube.com/embed/ID_DEL_VIDEO_AQUI";

  return (
    <>
      {bannerUrls.length > 0 && <BannerSlider images={bannerUrls} />}

      <PageLayout>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '4rem auto', padding: '0 1.5rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', color: '#173c66', marginBottom: '1.5rem', fontWeight: 'bold', lineHeight: '1.2' }}>
            Líderes en Empaques desde 1988
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#64748b', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Somos una empresa 100% mexicana dedicada a ofrecer la mejor calidad, servicio y variedad en productos desechables, plásticos y ecológicos a nivel nacional.
          </p>
          <Link href="/empresa" style={{ display: 'inline-block', background: '#173c66', color: '#fff', padding: '1rem 2rem', borderRadius: '0.5rem', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem' }}>
            Conoce nuestra historia ➔
          </Link>
        </div>
      </PageLayout>

      {/* 1. Sección de Beneficios */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 1.5rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', textAlign: 'center', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 250px', maxWidth: '350px', padding: '2rem 1.5rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
          <h3 style={{ fontSize: '1.25rem', color: '#173c66', marginBottom: '0.5rem', fontWeight: 'bold' }}>Más de 35 años</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>Experiencia y solidez desde 1988 en el mercado de empaques.</p>
        </div>
        <div style={{ flex: '1 1 250px', maxWidth: '350px', padding: '2rem 1.5rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚚</div>
          <h3 style={{ fontSize: '1.25rem', color: '#173c66', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cobertura Nacional</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>Llegamos a todas las ciudades y poblaciones de México.</p>
        </div>
        <div style={{ flex: '1 1 250px', maxWidth: '350px', padding: '2rem 1.5rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
          <h3 style={{ fontSize: '1.25rem', color: '#173c66', marginBottom: '0.5rem', fontWeight: 'bold' }}>Calidad Garantizada</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>Representamos exclusivamente a las fábricas líderes del país.</p>
        </div>
      </div>

      {/* Contenedor del Video de YouTube */}
      <div style={{ width: '100%', maxWidth: '1200px', margin: '2rem auto 4rem auto', padding: '0 1rem' }}>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', background: '#f1f5f9' }}>
          <iframe
            src={youtubeUrl}
            title="Video Desechables Estrella"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* 4. Tira de Marcas */}
      <div style={{ background: '#f8fafc', padding: '4rem 1rem', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.75rem)', color: '#173c66', marginBottom: '2.5rem', fontWeight: 'bold' }}>Marcas que nos respaldan</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 4vw, 4rem)', flexWrap: 'wrap', opacity: 0.8, alignItems: 'center' }}>
            
            {brandImages.length > 0 ? (
              brandImages.map((brand) => (
                <img 
                  key={brand.id}
                  src={brand.url} 
                  alt="Marca" 
                  style={{ maxHeight: '80px', maxWidth: '200px', objectFit: 'contain' }} 
                />
              ))
            ) : (
              <>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#64748b' }}>MARCA 1</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#64748b' }}>MARCA 2</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#64748b' }}>MARCA 3</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#64748b' }}>MARCA 4</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#64748b' }}>MARCA 5</div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
